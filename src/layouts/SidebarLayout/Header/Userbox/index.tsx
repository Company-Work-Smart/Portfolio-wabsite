import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import { HttpClient } from '@/services/http-client';
import { MyApp } from '@/constant/my-app';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

interface UserBoxProps {
  userId?: string;
  username?: string;
  role?: string;
}

function HeaderUserbox() {
  const [user, setUser] = useState<UserBoxProps>();
  const http = new HttpClient();
  const [admin, setAdmin] = useState<any>(null);
  const [superAdmin, setSuperAdmin] = useState<any>(null);
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const getUser = async () => {
    if (user?.role.toLowerCase() == 'admin') {
      const res = await http.get(`AdminAdmin/${user?.userId}`);
      setAdmin(res);
    } else if (user?.role.toLowerCase() == 'superadmin') {
      const res = await http.get(`SuperAdmin/${user?.userId}`);
      setSuperAdmin(res);
    }
  };

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(MyApp.UserInfo().userId),
      username: localStorage.getItem(MyApp.UserInfo().username),
      role: localStorage.getItem(MyApp.UserInfo().role)
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {admin ? (
          <>
            <CardMedia
              component="img"
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '40px',
                aspectRatio: '1',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              image={admin?.photo || '/static/user-modified.png'}
            />
          </>
        ) : superAdmin ? (
          <>
            <CardMedia
              component="img"
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '40px',
                aspectRatio: '1',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              image={superAdmin?.photo || '/static/user-modified.png'}
            />
          </>
        ) : null}

        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.username.toUpperCase()}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user?.role?.toUpperCase()}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.username}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user?.role?.toUpperCase()}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          {user?.role?.toLowerCase() === 'admin' ? (
            <>
              <NextLink href="/applications/admin/profile" passHref>
                <ListItem button>
                  <AccountBoxTwoToneIcon fontSize="small" />
                  <ListItemText primary="My Profile" />
                </ListItem>
              </NextLink>
            </>
          ) : user?.role?.toLowerCase() === 'superadmin' ? (
            <>
              <NextLink href="/applications/superAdmin/profile" passHref>
                <ListItem button>
                  <AccountBoxTwoToneIcon fontSize="small" />
                  <ListItemText primary="My Profile" />
                </ListItem>
              </NextLink>
            </>
          ) : null}
          {user?.role?.toLowerCase() === 'admin' ? (
            <>
              <NextLink href="/applications/admin/messenger" passHref>
                <ListItem button>
                  <InboxTwoToneIcon fontSize="small" />
                  <ListItemText primary="Messenger" />
                </ListItem>
              </NextLink>
            </>
          ) : user?.role?.toLowerCase() === 'superadmin' ? (
            <>
              <NextLink href="/applications/superAdmin/messenger" passHref>
                <ListItem button>
                  <InboxTwoToneIcon fontSize="small" />
                  <ListItemText primary="Messenger" />
                </ListItem>
              </NextLink>
            </>
          ) : null}
        </List>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
