import { useCallback, useEffect, useMemo, useState } from 'react';
import useDetailProjectContext from './useDetailProjectContext';
import services from '@/services';
import { transformTasksToWorkloadData } from '@/utils/dataTransform';
import datetime from '@/utils/datetime';

const useDashboardData = () => {
  const [totalTaskSummary, setTotalTaskSummary] = useState([]);
  const [workloadSumarry, setWorkloadSummary] = useState([]);
  const [overdueTasksSummary, setOverdueTasksSummary] = useState([]);
  const [dueSoonTasksSummary, setDueSoonTasksSummary] = useState([]);

  const { isLoadingBoardLists, boardListData, getTaskItemsByListId } =
    useDetailProjectContext();

  const mergeListAndTaskData = useMemo(() => {
    const taskItems = boardListData.map((item) => {
      const { title, public_id } = item;
      const tasks = getTaskItemsByListId(public_id) || [];
      return {
        ...item,
        title,
        tasks,
        count: tasks.length,
      };
    });

    return taskItems;
  }, [boardListData, getTaskItemsByListId]);

  const taskPercentageSummary = useMemo(() => {
    const taskItems = mergeListAndTaskData;
    const taskItemsTotal = taskItems.reduce((a, b) => a + b.count, 0);
    if (taskItemsTotal === 0) return [];
    const result = [...taskItems].map((item) => ({
      name: item.title,
      count: item.count,
      value: Math.floor((item.count / taskItemsTotal) * 100),
    }));
    return result;
  }, [mergeListAndTaskData]);

  const initDashboardData = useCallback(async () => {
    if (mergeListAndTaskData.length > 0 && !isLoadingBoardLists) {
      let workload = [];
      const tasks = [];
      const overdueTasks = [];
      const dueSoonTasks = [];

      for (const list of mergeListAndTaskData) {
        const fetchTasks = await Promise.all(
          (list.tasks || []).map((task) =>
            services.cards.getDetail(task.public_id)
          )
        );

        const taskData = fetchTasks
          .map((res) => res?.data?.data)
          .filter(Boolean);

        tasks.push(...taskData);
      }

      for (const taskItem of tasks) {
        if (!taskItem) continue;

        workload = transformTasksToWorkloadData(tasks, taskItem.internal_id);

        const now = datetime.getNow();
        const isOverdue = datetime.isSameOrAfter(
          now.toISOString(),
          taskItem.due_date
        );
        const diff = datetime.getDiff(now.toISOString(), taskItem.due_date);

        if (isOverdue) {
          overdueTasks.push(taskItem);
        } else if (diff <= 3 && diff >= 1) {
          dueSoonTasks.push(taskItem);
        }
      }

      setWorkloadSummary(workload);
      setOverdueTasksSummary(overdueTasks);
      setDueSoonTasksSummary(dueSoonTasks);
      setTotalTaskSummary(tasks);
    }
  }, [mergeListAndTaskData, isLoadingBoardLists]);

  useEffect(() => {
    initDashboardData();
  }, [initDashboardData, mergeListAndTaskData, isLoadingBoardLists]);

  return {
    totalTaskSummary,
    workloadSumarry,
    overdueTasksSummary,
    dueSoonTasksSummary,
    taskPercentageSummary,
    mergeListAndTaskData,
    isLoadingBoardLists,
  };
};

export default useDashboardData;