import { FC, ReactNode, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box } from '@mui/material';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';
import { MyApp } from '@/constant/my-app';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { snackbar, closeSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
    const accessToken = localStorage.getItem(MyApp.UserInfo().accessToken) ?? '';
    if (accessToken.length > 50) {
      const roleStr = localStorage.getItem(MyApp.UserInfo().role) ?? '';
      const role = `${roleStr[0].toLowerCase()}${roleStr.substring(1)}`;
      if (role == 'user') {
        router.push(`/`).finally();
      } else {
        router.push(`/dashboards/dashboard/${role}`).finally();
      }
    }
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%'
      }}
    >
      {snackbar && (
        <Alert
          style={{
            position: 'fixed',
            zIndex: 9999,
            margin: 12,
            marginLeft: '50%',
            transform: 'translate(-50%, 0)'
          }}
          severity={snackbar.type}
          onClose={closeSnackbar}
        >
          {snackbar.message}
        </Alert>
      )}
      {children}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
