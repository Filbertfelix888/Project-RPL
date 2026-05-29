import { AccountCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Dropdown from '../../../ui/Dropdown';
import ThemeToggle from '@/components/ui/ThemeToggle/ThemeToggle';

import logo from '@/assets/PM_Logo.png';

import session from '@/utils/session';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const sessionData = session.getSession();
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingY: 0.5,
        paddingX: 1,
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        background: (t) => t.palette.background.paper,
        color: (t) => t.palette.text.primary,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
      }}
    >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Box component="img" src={logo} alt="logo" sx={{ width: 36, height: 36, mr: 1 }} />
          <Typography variant="h3" sx={{
            fontWeight: 500,
            fontFamily: 'Calibri'
          }}
          >
            PROJECT MANAGEMENT
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ThemeToggle />
          <Dropdown
          icon={<AccountCircle />}
          options={[
            {
              label: sessionData?.user?.name,
              onClick() {
                console.log('handle navigate to profile');
              },
            },
            {
              label: 'Logout',
              onClick() {
                session.clearSession();
                navigate('/login');
              },
            },
          ]}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
