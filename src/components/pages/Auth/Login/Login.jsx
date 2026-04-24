import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import AuthLayout from '@/components/layouts/AuthLayout';
import TextField from '@/components/ui/Forms/TextField';
import services from '@/services';
import session from '@/utils/session';

const loginFormSchema = Yup.object({
  email: Yup.string()
    .email('Format email tidak valid')
    .required('Email harus di isi'),
  password: Yup.string().required('Password harus di isi'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const response = await services.auth.login(formValues);
      session.setSession(response.data.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      // optional: show user-facing message here
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
            maxWidth: '100%',
          }}
        >
          <Typography
            variant="h5"
            component={'h1'}
            align="center"
            marginBottom={2}
          >
            Masuk
          </Typography>
          <Stack
            flexDirection={'column'}
            gap={1}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <Button
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
            >
              Masuk ke akun Anda
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() => navigate('/signup')}
              fullWidth
            >
              Daftar baru
            </Button>
          </Stack>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Login;
