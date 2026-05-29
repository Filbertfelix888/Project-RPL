import { Box, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Book } from '@mui/icons-material';
import { useNavigate } from 'react-router';
// import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      component={'aside'}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        flexGrow: 0,
        flexShrink: 0,
        borderRight: (t) => `1px solid ${t.palette.divider}`,
        zIndex: 1000,
        paddingTop: '4rem', // Adjust for fixed navbar height
        background: (t) => t.palette.background.paper,
        width: 200,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {/* SidebarMenu dikomentari; hanya tampilkan link 'Daftar Proyek' */}
      {/* <SidebarMenu /> */}

      <MenuList>
        <MenuItem onClick={() => navigate('/projects')}>
          <ListItemIcon>
            <Book fontSize="small" />
          </ListItemIcon>
          <ListItemText>Daftar Proyek</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default Sidebar;
