import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { HttpClient } from '@/services/http-client';
import { Pagination } from '@/constant/gagination';
import SidebarLayout from '@/layouts/SidebarLayout';
import DialogWidget from '@/components/Dialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';

const UserSuperAdminManagement = () => {
  const title = 'User Management';
  const { showSnackbar } = useContext(SnackbarContext);
  const http = new HttpClient();
    const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState<string>('');

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPageSize(parseInt(event.target.value));
  };
  const theme = useTheme();

  const getUsers = async () => {
    const res = await http.get(`SuperAdmin/User`);
    setDatasource(res);
    setTotalItem(res.length);
  };

  const onRoleChange = async () => {
    if (selectedUser && newRole) {
      try {
        await http.put(`SuperAdmin/assign-role/${selectedUser.id}`, {
          Role: newRole
        });
        showSnackbar({ type: 'success', message: 'Successfully change roles' });
        setOpenDialog(false);
        getUsers();
      } catch (e) {
        showSnackbar({ type: 'success', message: `${e}` });
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
    getUsers();
  };

  useEffect(() => {
    getUsers();
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
                      <TableCell>Contact</TableCell>
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
                          <Tooltip title="Contact" arrow>
                            <IconButton
                              onClick={() =>
                                router.push(
                                  `/applications/superAdmin/messenger/${item.id}`
                                )
                              }
                              color="primary"
                              size="small"
                            >
                              <LocalPostOfficeIcon fontSize="small" />
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
                              <DialogWidget
                                variant="delete"
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
                              </DialogWidget>
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
    </>
  );
};

UserSuperAdminManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default UserSuperAdminManagement;
