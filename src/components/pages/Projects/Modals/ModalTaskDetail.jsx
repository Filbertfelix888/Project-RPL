import Modal from '@/components/ui/Modal';
import useModalTaskDetail from './hooks/useModalTaskDetail';
import { Box, Button, colors, Stack, Typography } from '@mui/material';
import TextField from '@/components/ui/Forms/TextField';
import datetime from '@/utils/datetime';
import DatePicker from '@/components/ui/Forms/DatePicker';
import dayjs from 'dayjs';
import { Delete } from '@mui/icons-material';
import ModalTaskDetailProvider from './ModalTaskDetailContext';

const ModalTaskDetail = () => {
  return(
    <ModalTaskDetailProvider>
      <ModalTaskDetail />
    </ModalTaskDetailProvider>
  )
}

export default ModalTaskDetail;
