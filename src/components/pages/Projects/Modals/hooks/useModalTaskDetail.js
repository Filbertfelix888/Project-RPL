import { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import useDetailProjectContext from '../../DetailProject/hooks/useDetailProjectContext';
import services from '@/services';
import dayjs from 'dayjs';
import datetime from '@/utils/datetime';
import { useForm } from 'react-hook-form';
import useModalTaskDetailContext from './useModalTaskDetailContext';

const useModalTaskDetail = () => {
  const [_, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);

  const [isShowConfirmDelete, setShowConfirmDelete] = useState(false);

  const detailProjectData = useLoaderData();
  const detailProjectContext = useDetailProjectContext();
  const modalTaskDetailContext = useModalTaskDetailContext();

  const { taskId, listId, taskDetailData, fetchTaskDetail } =
    modalTaskDetailContext;

  const formTask = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

      const dueDatePayload = (() => {
        const v = values.due_date;
        if (v == null) return taskDetailData.due_date;
        // Send as UTC midnight for the selected calendar date to avoid TZ shift.
        try {
          const dateOnly = dayjs(v).format('YYYY-MM-DD');
          return `${dateOnly}T00:00:00Z`;
        } catch (e) {
          return values.due_date ?? taskDetailData.due_date;
        }
      })();

    await services.cards.update(taskDetailData.public_id, {
      list_id: listId,
      title: values.title ?? taskDetailData.title,
      due_date: dueDatePayload,
      description: values.description ?? taskDetailData.description,
      position: taskDetailData.position,
    });
    await fetchTaskDetail(taskId);
    setLoading(false);
    setEditDescription(false);
    setEditTitle(false);
    setEditDueDate(false);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    await services.cards.remove(taskDetailData.public_id);
    handleClose();
  };

  const handleClose = async () => {
    setSearchParams({});
    setLoading(false);
    setShowConfirmDelete(false);
    await detailProjectContext.fetchBoardLists();
  };

  return {
    taskDetailData,
    isLoading,
    editDescription,
    editTitle,
    editDueDate,
    isShowConfirmDelete,

    setLoading,
    setEditDescription,
    setEditTitle,
    setEditDueDate,
    setShowConfirmDelete,

    detailProjectData,

    taskId,
    listId,

    formTask,

    onSubmit,
    handleDeleteTask,
    handleClose,
  };
};

export default useModalTaskDetail;
