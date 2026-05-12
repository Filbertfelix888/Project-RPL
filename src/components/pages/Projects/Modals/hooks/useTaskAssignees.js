import { useForm } from 'react-hook-form';
import useModalTaskDetailContext from './useModalTaskDetailContext';
import { useState } from 'react';
import services from '@/services';

const useTaskAssignees = () => {
  const { fetchTaskDetail, membersData, taskDetailData } =
    useModalTaskDetailContext();

  const formTaskAssignees = useForm({
    defaultValues: {
      members: [],
    },
  });

  const [isLoading, setLoading] = useState(false);
  const [showFormAssigness, setShowFormAssignees] = useState(false);

const onSubmitTaskAssignees = async (values) => {
  try {
    console.log("TASK DETAIL:", taskDetailData);
    console.log("PUBLIC ID:", taskDetailData?.public_id);
    console.log("VALUES:", values);
    console.log("MEMBERS:", values.members);

    if (!taskDetailData?.public_id) {
      console.error("public_id tidak ditemukan");
      return;
    }

    setLoading(true);

    await services.cards.addAssignees(
      taskDetailData.public_id,
      values.members
    );

    await fetchTaskDetail(taskDetailData.public_id);

  } catch (error) {
    console.error("ERROR ASSIGNEE:", error);
  } finally {
    setLoading(false);
  }
};

  return {
    isLoading,
    membersData,
    formTaskAssignees,
    onSubmitTaskAssignees,
    taskDetailData,
    showFormAssigness,
    setShowFormAssignees,
  };
};

export default useTaskAssignees;
