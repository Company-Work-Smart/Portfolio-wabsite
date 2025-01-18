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
import { ChangeEvent, useEffect, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function AdminSuperAdminManagement() {
  const title = 'Admin Management';
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogBlock, setOpenDialogBlock] = useState(false);
  const [openDialogUnBlock, setOpenDialogUnBlock] = useState(false);
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
    setDatasource(null);
    const res = await http.get(`SuperAdmin/Admin`);
    setDatasource(res);
    setTotalItem(res.length);
  };

  const onRoleChange = async () => {
    if (selectedUser && newRole) {
      try {
        await http.put(`SuperAdmin/assign-role/${selectedUser.id}`, {
          Role: newRole
        });
        setOpenDialog(false);
        getAdmins();
      } catch (error) {
        console.error('Error assigning role:', error);
      }
    }
  };

  const onBlockChange = async () => {
    if (selectedUser) {
      try {
        await http.put(`SuperAdmin/block-user/${selectedUser.id}`,{});
        setOpenDialogBlock(false);
        getAdmins();
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    }
  };

  const onUnBlockChange = async () => {
    if (selectedUser) {
      try {
        await http.put(`SuperAdmin/unblock-user/${selectedUser.id}`,{});
        setOpenDialogUnBlock(false);
        getAdmins();
      } catch (error) {
        console.error('Error unblocking user:', error);
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

  const handleOpenDialogBlock = (user: any) => {
    setSelectedUser(user);
    setOpenDialogBlock(true);
  };

  const handleCloseDialogBlock = () => {
    setOpenDialogBlock(false);
    setSelectedUser(null);
  };

  const handleOpenDialogUnBlock = (user: any) => {
    setSelectedUser(user);
    setOpenDialogUnBlock(true);
  };

  const handleCloseDialogUnBlock = () => {
    setOpenDialogUnBlock(false);
    setSelectedUser(null);
  };

  const onConfirm = async (id) => {
    await http.delete(`SuperAdmin/${id}`);
    getAdmins();
  };

  useEffect(() => {
    getAdmins();
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
                        <TableCell>{item.role}</TableCell>
                        <TableCell>
                          <Tooltip title="Block User" arrow>
                            <IconButton
                              onClick={() => handleOpenDialogBlock(item)}
                              color="primary"
                              size="small"
                            >
                              <LockIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Unblock User" arrow>
                            <IconButton
                              onClick={() => handleOpenDialogUnBlock(item)}
                              color="primary"
                              size="small"
                            >
                              <LockOpenIcon fontSize="small" />
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

      {/* Dialog to block user */}
      <Dialog open={openDialogBlock} onClose={handleCloseDialogBlock}>
        <DialogTitle>Confirm Block</DialogTitle>
        <DialogContent>
          Are you sure you want to block user "{selectedUser?.username}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogBlock} color="primary">
            Cancel
          </Button>
          <Button onClick={onBlockChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to unblock user */}
      <Dialog open={openDialogUnBlock} onClose={handleCloseDialogUnBlock}>
        <DialogTitle>Confirm Unblock</DialogTitle>
        <DialogContent>
          Are you sure you want to unblock user "{selectedUser?.username}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogUnBlock} color="primary">
            Cancel
          </Button>
          <Button onClick={onUnBlockChange} color="primary">
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
