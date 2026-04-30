import { useMemo, useState } from "react";
import useDetailProjectContext from "./useDetailProjectContext";

const useDashboardData = () => {
    const [totalTaskSummary, setTotalTaskSummary] = useState([]);
    const [workloadSumarry, setWorkloadSummary] = useState([]);
    const [overdueTasksSummary, setOverdueTasksSummary] = useState([]);
    const [dueSoonTasksSummary, setdueSoonTasksSummary] = useState([]);

    const {isLoadingBoardLists, boardListData, getTaskItemsByListId} = useDetailProjectContext();

    const mergeListAndTaskData = useMemo(() => {
        const taskItems = boardListData.map((item) => {
            const {title, public_id}= item;
            const tasks = getTaskItemsByListId(public_id);
            return{
                ...item,
                title,
                tasks,
                count: tasks.length,
            }
        });

        return taskItems;
    },[boardListData]);

    const taskPercentageSummary = useMemo(() => {
        const taskItems = mergeListAndTaskData;
        const taskItemsTotal = taskItems.reduce((a, b) => {return a + b.count}, 0);
        const result = [...taskItems].map((item) => ({
            name: item.title,
            count: item.count,
            value: Math.floor((item.count / taskItemsTotal) * 100)
        }))
    }, [mergeListAndTaskData]);

    return {}
}

export default useDashboardData;