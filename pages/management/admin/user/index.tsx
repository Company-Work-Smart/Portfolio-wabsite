'use client';
import { useState } from 'react';
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
  useTheme
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Pagination } from '@/constant/gagination';
import SidebarLayout from '@/layouts/SidebarLayout';
import DialogWidget from '@/components/Dialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useRouter } from 'next/router';

const UserSuperAdminManagement = () => {
  const title = 'User Management';
  const theme = useTheme();
  const router = useRouter();
  const [datasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem] = useState<number>(0);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  return (
    <>
      <Grid item sx={{ p: 3 }}>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card style={{ position: 'relative' }}>
              {!datasource && <LinearProgress style={{ position: 'absolute', width: '100%' }} />}
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
                                router.push(`/applications/superAdmin/messenger/${item.id}`)
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
                            <IconButton color="primary" size="small">
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Item" arrow>
                            <span>
                              <DialogWidget
                                variant="delete"
                                message="Are you sure to delete this item?"
                              >
                                <IconButton
                                  sx={{
                                    '&:hover': {
                                      background: theme.colors.error.light
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
    </>
  );
};

UserSuperAdminManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserSuperAdminManagement;
