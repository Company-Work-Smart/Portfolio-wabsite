import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  Button
} from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/Logo';
import Scrollbar from '@/components/Scrollbar';
import LogoutIcon from '@mui/icons-material/Logout';
import router from 'next/router';
import { themeColors } from '@/theme/base';
import { TextWidget } from '@/components/Text';
import DialogWidget from '@/components/Dialog';
import { MyApp } from '@/constant/my-app';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.white[70]};
        position: relative;
        z-index: 7;
        height: 100%;
`
);

function Sidebar() {
  const theme = useTheme();
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  const onSignOut = async () => {
    localStorage.removeItem(MyApp.UserInfo().userId);
    localStorage.removeItem(MyApp.UserInfo().username);
    localStorage.removeItem(MyApp.UserInfo().role);
    localStorage.removeItem(MyApp.UserInfo().accessToken);
    await router.push('/');
  };

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'flex'
          },
          flexDirection: 'column',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow: theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <TextWidget bold size={20}>
              Portfolio
            </TextWidget>
          </Box>
          <Divider
            sx={{
              mb: 2,
              mx: 2,
              background: theme.colors.alpha.white[10]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <DialogWidget variant="delete" message="Are you sure to Sign Out?" onConfirm={onSignOut}>
          <Box
            sx={{
              borderTop: `1px solid ${theme.colors.alpha.white[10]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              fullWidth
              startIcon={<LogoutIcon />}
              sx={{
                color: themeColors.red
              }}
            >
              Sign Out
            </Button>
          </Box>
        </DialogWidget>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.white[10]
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
