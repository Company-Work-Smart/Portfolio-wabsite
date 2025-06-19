import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CardMedia
} from '@mui/material';
import { useRouter } from 'next/router';
import { authRedirect } from '@/helpers';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import appColor from '@/theme/appColor';
import PropTypes from 'prop-types';
import { UserBoxProps } from '@/constant/my-app';
import { AppKey } from '@/constant/key';
import { HttpClient } from '@/services/http-client';

interface HeaderLayoutProps {
  children?: ReactNode;
}

const navItems = [
  { label: 'Explore', path: '/view/explore' },
  { label: 'Place', path: '/view/place' },
  { label: 'Find', path: '/view/find' },
  { label: 'Favorite', path: '/view/favorite' },
  { label: 'Location', path: '/view/location' },
  { label: 'Messenger', path: '/applications/user/messenger' }
];

const HeaderPage: FC<HeaderLayoutProps> = ({ children }) => {
  const http = new HttpClient();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [datasource, setDatasource] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserBoxProps>({});

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasToken(!!token);
  }, []);

  const handleGetStart = () => {
    authRedirect(router);
  };

  const getUser = async () => {
    const res = await http.get(`Users/${user.userId}`);
    setDatasource(res);
  };

  const toggleSidebar = (open: boolean) => () => {
    setSidebarOpen(open);
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username),
      role: localStorage.getItem(AppKey.role)
    });
  }, []);

  useEffect(() => {
    if (user.userId) {
      getUser();
    }
  }, [user]);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: appColor.background,
          boxShadow: 'none',
          px: 2,
          top: 0,
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={toggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Nav Items */}
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            <Box sx={{ ml: 3, display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  variant="body1"
                  sx={{
                    color: 'black',
                    cursor: 'pointer',
                    transition:
                      'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                    '&:hover': { color: 'black', transform: 'scale(1.05)' }
                  }}
                  onClick={() => router.push(item.path)}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'cursive',
              color: 'black',
              fontWeight: 'bold',
              m: 1,
              pr: 24,
              fontSize: 30,
              cursor: 'pointer',
              display: { xs: 'none', sm: 'none', md: 'block' }
            }}
            onClick={() => router.push('/')}
          >
            JabJit Booking
          </Typography>

          {/* User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!hasToken ? (
              <>
                <Button
                  sx={{
                    color: 'black',
                    textTransform: 'none',
                    display: { xs: 'none', md: 'block' }
                  }}
                  onClick={() => router.push('/auth/register')}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    borderRadius: '20px',
                    display: { xs: 'none', md: 'block' }
                  }}
                  onClick={() => router.push('/auth/login')}
                >
                  Log in
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '10px',
                    m: 1
                  }}
                  onClick={handleGetStart}
                >
                  Get Started
                </Button>
                <CardMedia
                  onClick={() => router.push(`/applications/user/profile`)}
                  component="img"
                  sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '40px',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  image={datasource?.photo || '/static/user-modified.png'}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'cursive',
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => {
                router.push('/');
                setSidebarOpen(false);
              }}
            >
              JabJit Booking
            </Typography>
            <IconButton onClick={toggleSidebar(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  router.push(item.path);
                  setSidebarOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {children}
    </>
  );
};

HeaderPage.propTypes = {
  children: PropTypes.node
};

export default HeaderPage;
