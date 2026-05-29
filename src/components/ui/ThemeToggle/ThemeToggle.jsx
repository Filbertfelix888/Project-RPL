import React, { useContext } from 'react';
import { IconButton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ColorModeContext from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      aria-label="toggle theme"
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        bgcolor: isDark ? 'grey.800' : 'grey.100',
        color: isDark ? '#fff' : '#111',
        boxShadow: 1,
        mr: 1,
        '&:hover': {
          bgcolor: isDark ? 'grey.700' : 'grey.200',
        },
      }}
    >
      {isDark ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
    </IconButton>
  );
};

export default ThemeToggle;
