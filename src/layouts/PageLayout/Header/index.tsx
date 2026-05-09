import { FC, ReactNode, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { MyApp, UserBoxProps } from '@/constant/my-app';
import ThemeButton from '@/components/ThemeButton';
import { TextWidget } from '@/components/Text';
import { ButtonWidget } from '@/components/Button';

interface HeaderLayoutProps {
  children?: ReactNode;
}

const navItems = [
  { label: 'Home', path: '/portfolio/homefeed' },
  { label: 'Project', path: '/portfolio/project' },
  { label: 'Education', path: '/portfolio/education' },
  { label: 'Contact Me', path: '/portfolio/contact' }
];

const HeaderPage: FC<HeaderLayoutProps> = ({ children }) => {
  const router = useRouter();
  const logo = 'SENGVICHET';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<UserBoxProps>({});

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(MyApp.UserInfo().userId),
      username: localStorage.getItem(MyApp.UserInfo().username),
      role: localStorage.getItem(MyApp.UserInfo().role)
    });
  }, []);

  useEffect(() => {
    if (router.pathname === '/') {
      setActiveLabel(logo);
    } else {
      const match = navItems.find((item) => router.pathname.startsWith(item.path));
      setActiveLabel(match ? match.label : null);
    }
  }, [router.pathname]);

  const handleClick = (item: typeof navItems[0]) => {
    router.push(item.path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: theme.mode.background.header,
          boxShadow: 'none',
          px: { xs: 2, sm: 4, md: 5 },
          py: 2,
          zIndex: 1100
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TextWidget
            sx={{
              color: activeLabel === logo ? theme.mode.text.default : theme.mode.text.disabled,
              cursor: 'pointer',
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                color: theme.mode.text.default,
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => router.push('/')}
          >
            {logo.toUpperCase()}
          </TextWidget>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 6 }}>
              {navItems.map((item) => (
                <TextWidget
                  key={item.label}
                  sx={{
                    color:
                      activeLabel === item.label
                        ? theme.palette.text.primary
                        : theme.palette.text.disabled,
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.text.primary,
                      transform: 'scale(1.05)'
                    }
                  }}
                  onClick={() => handleClick(item)}
                >
                  {item.label.toUpperCase()}
                </TextWidget>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ pr: 2 }}>
              <ThemeButton />
            </Box>
            {!user?.username ? (
              <ButtonWidget variant="contained" href={'/auth/login'}>
                Login
              </ButtonWidget>
            ) : (
              <TextWidget
                onClick={() => router.push('/applications/user/profile')}
                sx={{ cursor: 'pointer' }}
              >
                {user?.username.toUpperCase()}
              </TextWidget>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: theme.mode.text.default }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.mode.background.default,
            width: 240,
            px: 2,
            pt: 4
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: theme.mode.text.default }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem disablePadding key={item.label}>
              <ListItemButton onClick={() => handleClick(item)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color:
                        activeLabel === item.label
                          ? theme.mode.text.default
                          : theme.mode.text.disabled
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {children}
    </>
  );
};

export default HeaderPage;
