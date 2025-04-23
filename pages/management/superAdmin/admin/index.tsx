import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  useTheme
} from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';

function AdminSuperAdminManagement() {
  const title = 'Admin Management';
  const { showSnackbar } = useContext(SnackbarContext);
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState<string>('');

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  const theme = useTheme();

  const getAdmins = async () => {
    try {
      const res = await http.get(`SuperAdmin/Admin`);
      setDatasource(res);
      setTotalItem(res.length);
    } catch (e) {
      router.push(`/view/support`);
    }
  };

  const onRoleChange = async () => {
    if (selectedUser && newRole) {
      try {
        await http.put(`SuperAdmin/assign-role/${selectedUser.id}`, {
          Role: newRole
        });
        showSnackbar({ type: 'success', message: 'Successfully change roles' });
        setOpenDialog(false);
        getAdmins();
      } catch (e) {
        showSnackbar({ type: 'error', message: `${e}` });
      }
    }
  };

  const handleOpenBlockDialog = (user: any, blocking: boolean) => {
    setSelectedUser(user);
    setIsBlocking(blocking);
    setBlockDialogOpen(true);
  };

  const handleCloseBlockDialog = () => {
    setBlockDialogOpen(false);
    setSelectedUser(null);
  };

  const onToggleBlock = async () => {
    if (selectedUser) {
      try {
        const endpoint = isBlocking
          ? `SuperAdmin/block-user/${selectedUser.id}`
          : `SuperAdmin/unblock-user/${selectedUser.id}`;
        var res = await http.put(endpoint, {});
        console.log(res);

        setDatasource((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? { ...user, isBlocked: isBlocking }
              : user
          )
        );

        setBlockDialogOpen(false);
      } catch (e) {
        showSnackbar({ type: 'error', message: `${e}` });
      }
    }
  };

  const handleOpenDialog = (user: any) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setNewRole('');
  };

  const onConfirm = async (id) => {
    await http.delete(`SuperAdmin/${id}`);
    getAdmins();
  };

  useEffect(() => {
    getAdmins();
    const interval = setInterval(() => {
      getAdmins();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber, pageSize]);

  return (
    <>
      <Grid item sx={{ p: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader
                action={
                  <Box>
                    <Button variant="contained">Add</Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <TableContainer style={{ height: 'calc(100vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell width={12} align="right">
                        No
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => (
                      <TableRow hover key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          <Tooltip
                            title={
                              item.isBlocked ? 'Block User' : 'Unblock User'
                            }
                            arrow
                          >
                            <IconButton
                              onClick={() =>
                                handleOpenBlockDialog(item, !item.isBlocked)
                              }
                              color="primary"
                              size="small"
                            >
                              {item.isBlocked ? (
                                <LockIcon fontSize="small" />
                              ) : (
                                <LockOpenIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit Role" arrow>
                            <IconButton
                              onClick={() => handleOpenDialog(item)}
                              color="primary"
                              size="small"
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Item" arrow>
                            <span>
                              <ConfirmDialog
                                message="Are you sure to delete this item?"
                                onConfirm={() => onConfirm(item.id)}
                              >
                                <IconButton
                                  sx={{
                                    '&:hover': {
                                      background: theme.colors.error.lighter
                                    },
                                    color: theme.palette.error.main
                                  }}
                                  color="inherit"
                                  size="small"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </ConfirmDialog>
                            </span>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={totalItem}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={pageNumber}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={Pagination.pageSizeOptions}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog to assign role */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Role</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onRoleChange} color="primary">
            Assign Role
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={blockDialogOpen} onClose={handleCloseBlockDialog}>
        <DialogTitle>
          {isBlocking ? 'Confirm Block' : 'Confirm Unblock'}
        </DialogTitle>
        <DialogContent>
          Are you sure you want to {isBlocking ? 'block' : 'unblock'} user "
          {selectedUser?.username}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBlockDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onToggleBlock} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AdminSuperAdminManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminSuperAdminManagement;
