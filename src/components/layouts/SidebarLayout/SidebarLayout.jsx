import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import Navbar from './Navbar';
// import Sidebar from './Sidebar';

const SidebarLayout = ({ children, pageTitle = '', breadcrumbs = [] }) => {
  const navigate = useNavigate();

  const renderBreadcrumbs = () => {
    return breadcrumbs.map((breadcrumb, index) => {
      if (index === breadcrumbs.length - 1) {
        return (
          <Typography key={index} sx={{ color: 'text.primary' }}>
            {breadcrumb.label}
          </Typography>
        );
      }
      return (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate(breadcrumb.href);
          }}
        >
          {breadcrumb.label}
        </Link>
      );
    });
  };
  return (
    <>
      <Navbar />
      {/* Sidebar dinonaktifkan sesuai permintaan pengguna */}
      {/* <Sidebar /> */}
      <Box
        component={'main'}
        sx={{
          maxWidth: 2000,
          margin: '4rem auto 0',
          paddingTop: 3,
          px: 3,
          paddingBottom: 6,
          flexGrow: 1,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          {renderBreadcrumbs()}
        </Breadcrumbs>
        {pageTitle && (
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {pageTitle}
            </Typography>
          </Box>
        )}
        {children}
      </Box>
    </>
  );
};

export default SidebarLayout;
