import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Paper, Stack, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AuthLayout from '@/components/layouts/AuthLayout';
import Dialog from '@/components/ui/Dialog';
import TextField from '@/components/ui/Forms/TextField';
import services from '@/services';

const signUpSchema = Yup.object({
  name: Yup.string().required('Nama harus di isi'),
  email: Yup.string()
    .required('Email harus di isi')
    .email('Format email tidak valid'),
  password: Yup.string().required('Password harus di isi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi password harus di isi')
    .oneOf(
      [Yup.ref('password'), null],
      'Konfirmasi password harus sama dengan password',
    ),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: '',
    message: '',
  });
  const [dialogActions, setDialogActions] = useState([]);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      await services.auth.signUP(formValues);
      navigate('/login');
    } catch (error) {
      setOpenDialog(true);
      setDialogMessage({
        title: 'Oops...',
        message: error?.response?.data?.message ?? 'Silahkan coba lagi.',
      });
      setDialogActions([
        {
          label: 'Okay',
          onClick() {
            setOpenDialog(false);
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          sx={{
            padding: 2,
            width: 500,
          }}
        >
          <Typography
            variant="h5"
            component={'h1'}
            align="center"
            marginBottom={2}
          >
            Daftar Baru
          </Typography>
          <Stack
            flexDirection={'column'}
            gap={1}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id={'name'}
              label={'Nama'}
              control={control}
              name="name"
            />
            <TextField
              id={'email'}
              label={'Email'}
              control={control}
              name="email"
            />
            <TextField
              id={'password'}
              label={'Password'}
              control={control}
              name="password"
              secureText
            />
            <TextField
              id={'confirmPassword'}
              label={'Konfirmasi Password'}
              control={control}
              name="confirmPassword"
              secureText
            />
            <Button
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
            >
              Buat akun baru
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() => navigate('/login')}
              fullWidth
            >
              Sudah punya akun? Login sekarang
            </Button>
          </Stack>
        </Paper>
      </Box>
      <Dialog open={openDialog} actions={dialogActions} {...dialogMessage} />
    </AuthLayout>
  );
};

export default SignUp;
