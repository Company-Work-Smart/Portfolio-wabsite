import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import { AppKey } from '@/constant/key';
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CardHeader,
  Avatar,
  Card,
  Button,
  useTheme,
  Box,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { HttpClient } from '@/services/http-client';
import UpdateIcon from '@mui/icons-material/Update';
import { SnackbarContext } from '@/contexts/SnackbarContext';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

interface UserBoxProps {
  userId?: string | null;
  username?: string | null;
  role?: string | null;
}

function PopularTags() {
  const { showSnackbar } = useContext(SnackbarContext);
  const theme = useTheme();
  const router = useRouter();
  const http = new HttpClient();
  const [user, setUser] = useState<UserBoxProps>({});
  const [datasource, setDatasource] = useState<any>(null);
  const [formData, setFormData] = useState({ tel: '' });
  const [openDialogChange, setOpenDialogChange] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const getUser = async () => {
    const res = await http.get(`Users/${user.userId}`);
    setDatasource(res);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    await http.put(`Users/tel-profile/${user.userId}`, formData);
    const res = await http.get(`Users/${user.userId}`);
    console.log(res);
    setDatasource(res);
    setOpenDialog(false);
  };

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setChangePassword((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const submitChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    await http.post('Users/ChangePassword', changePassword);
    setOpenDialogChange(false);
    showSnackbar({
      type: 'success',
      message: 'Password changed successfully!'
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem(AppKey.userId);
    const username = localStorage.getItem(AppKey.username);
    const role = localStorage.getItem(AppKey.role);

    setUser({
      userId: userId,
      username: username,
      role: role
    });
  }, []);

  useEffect(() => {
    if (user.userId) getUser();
  }, [user]);

  const onSignOut = async () => {
    localStorage.removeItem(AppKey.userId);
    localStorage.removeItem(AppKey.username);
    localStorage.removeItem(AppKey.role);
    localStorage.removeItem(AppKey.accessToken);
    localStorage.removeItem(AppKey.refreshToken);
    await router.push('/');
  };
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleDialogOpenChange = () => setOpenDialogChange(true);
  const handleDialogCloseChange = () => setOpenDialogChange(false);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="About Me" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary={`Username: ${datasource?.username}`} />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary={`Email: ${datasource?.email}`} />
        </ListItem>
        <Divider />
        {datasource?.tel?.length ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <ListItem
                sx={{
                  color: theme.colors.primary.main,
                  '&:hover': { color: theme.colors.primary.dark }
                }}
                button
              >
                <ListItemText primary={`Tel: ${datasource?.tel}`} />
              </ListItem>
              <Typography
                onClick={handleDialogOpen}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <UpdateIcon sx={{ marginRight: 1 }} />
              </Typography>
            </Box>
          </>
        ) : (
          <ListItem
            sx={{
              color: `${theme.colors.primary.main}`,
              '&:hover': { color: `${theme.colors.primary.dark}` }
            }}
            button
            onClick={handleDialogOpen}
          >
            <ListItemText primary="Add Telephone Number" />
          </ListItem>
        )}
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={handleDialogOpenChange}
        >
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />
        <CardHeader title="Groups" />
        <Divider />
        <ListItem button onClick={() => router.push(`/applications/user/messenger`)}>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                background: theme.colors.info.main,
                color: theme.palette.info.contrastText
              }}
            >
              MG
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: theme.colors.alpha.black[100]
            }}
            primary="Messenger"
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                background: theme.colors.alpha.black[100],
                color: theme.colors.alpha.white[100]
              }}
            >
              D
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
              color: theme.colors.alpha.black[100]
            }}
            primary="Writer’s Digest Daily"
          />
        </ListItem>
        <Divider />
        <ConfirmDialog
          message="Are you sure to Sign Out?"
          onConfirm={onSignOut}
        >
          <Button color="primary" fullWidth>
            Sign Out
          </Button>
        </ConfirmDialog>
      </ListWrapper>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Telephone Number</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Telephone"
            type="text"
            fullWidth
            value={formData.tel}
            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitForm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password */}
      <Dialog open={openDialogChange} onClose={handleDialogCloseChange}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Old Password"
            name="oldPassword"
            fullWidth
            value={changePassword.oldPassword}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            name="newPassword"
            fullWidth
            value={changePassword.newPassword}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseChange} color="primary">
            Cancel
          </Button>
          <Button onClick={submitChangePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default PopularTags;
