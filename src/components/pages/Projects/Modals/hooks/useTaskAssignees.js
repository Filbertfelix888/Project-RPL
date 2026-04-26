import { useForm } from 'react-hook-form';
import useModalTaskDetailContext from './useModalTaskDetailContext';
import { useState } from 'react';
import services from '@/services';

const useTaskAssignees = () => {
  const { fetchTaskDetail, taksId, membersData, taskDetailData } =
    useModalTaskDetailContext();

  const formTaskAssignees = useForm({
    defaultValues: {
      members: [],
    },
  });

  const [isLoading, setLoading] = useState(false);
  const [showFormAssigness, setShowFormAssignees] = useState(false);

  const onSubmitTaskAssignees = async (values) => {
    setLoading(true);
    await services.cards.addAssignees(taskDetailData.public_id, values.members);
    await fetchTaskDetail(taksId);
    setLoading(false);
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
