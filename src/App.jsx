import React, { useMemo, useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Login from './components/pages/Auth/Login';
import SignUp from './components/pages/Auth/SignUp';
import Dashboard from './components/pages/Dashboard';
import Projects from './components/pages/Projects';
import Settings from './components/pages/Settings';
import DetailProject from './components/pages/Projects/DetailProject';
import sidebarLoader from './components/layouts/SidebarLayout/SidebarLayout.loader';
import authLoader from './components/layouts/AuthLayout/AuthLayout.loader';
import SnackbarProvider from './components/ui/Snackbar';
import detailProjectLoader from './components/pages/Projects/DetailProject/DetailProject.loader';
import ColorModeContext from '@/contexts/ThemeContext';

const App = () => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('paletteMode') : null;
  const [mode, setMode] = useState(stored || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          try { localStorage.setItem('paletteMode', next); } catch (e) {}
          return next;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        typography: {
          fontFamily: ['Roboto', 'sans-serif'].join(','),
        },
      }),
    [mode]
  );

  const router = createBrowserRouter([
  {
    path: '/',
    loader: sidebarLoader,
    element: <Projects />,
  },
  {
    path: '/login',
    loader: authLoader,
    element: <Login />,
  },
  {
    path: '/signup',
    loader: authLoader,
    element: <SignUp />,
  },
  {
    path: '/projects',
    loader: sidebarLoader,
    children: [
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/projects/:id',
        loader: detailProjectLoader,
        element: <DetailProject />,
      },
    ],
  },
  {
    path: '/settings',
    loader: sidebarLoader,
    element: <Settings />,
  },
]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <CssBaseline />
            <RouterProvider router={router} />
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
