import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { Alert, alpha, Box, lighten, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import SidebarContent from './SidebarContent';
import TopBarContent from './Header';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { AppKey } from '@/constant/key';
import { useRouter } from 'next/router';

interface UserSidebarLayoutProps {
  id?: any;
  children?: ReactNode;
}

const UserSidebarLayoutChat: FC<UserSidebarLayoutProps> = ({id, children }) => {
  const router = useRouter();
  const theme = useTheme();
  const { snackbar, closeSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
    const accessToken = localStorage.getItem(AppKey.accessToken) ?? '';
    if (accessToken.length < 50) {
      router.push('/').finally();
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
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
        <TopBarContent id={id} />
        <SidebarContent />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">{children}</Box>
        </Box>
      </Box>
    </>
  );
};

UserSidebarLayoutChat.propTypes = {
  children: PropTypes.node,
  id: PropTypes.node
};

export default UserSidebarLayoutChat;
