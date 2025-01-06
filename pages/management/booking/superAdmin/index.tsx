'use client';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Avatar,
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
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { datetimeDisplay } from '@/helpers/datetime';

function StaffSuperAdminManagement() {
  const title = 'Staff Management';
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  const getItems = async () => {
    setDatasource(null);
    const res = await http.get(
      `SuperAdminStaff?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.data);
    setTotalItem(res.totalItems);
  };


  const onDelete = async (id) => {
    await http.delete(`SuperAdminStaff/${id}`);
    getItems();
  };

  const onRestore = async (id) => {
    await http.delete(`SuperAdminStaff/Restore/${id}`);
    getItems();
  };

  useEffect(() => {
    getItems();
  }, [pageNumber, pageSize]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
                title={title}
              />
              <Divider />
              <TableContainer style={{ height: 'calc(100vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell width={12} align="center">
                        No
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Hospital</TableCell>
                      <TableCell width={120}>Created At</TableCell>
                      <TableCell width={120}>Updated At</TableCell>
                      <TableCell width={120}>Deleted At</TableCell>
                      <TableCell width={100} align={'center'}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => {
                      return (
                        <TableRow hover key={item.id}>
                          <TableCell align='center'>
                            <strong>{pageNumber * pageSize + index + 1}</strong>
                          </TableCell>
                          <TableCell>
                            <Grid container spacing={1} alignItems={'center'}>
                              <Grid item>
                                <Avatar variant="rounded" alt={item.namename} src={item.username} />
                              </Grid>
                              <Grid item>
                                <strong>{item.username ?? '-'}</strong>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell>{item.email ?? '-'}</TableCell>
                          <TableCell>{item.phone ?? '-'}</TableCell>
                          <TableCell>{item.hospital ?? '-'}</TableCell>
                          <TableCell align="center"> {datetimeDisplay(item.createdAt)}</TableCell>
                          <TableCell align="center">{datetimeDisplay(item.updatedAt)}</TableCell>
                          <TableCell align="center">{datetimeDisplay(item.deletedAt)}</TableCell>
                          <TableCell align={'center'}>
                            { item.deletedAt == null &&
                              <Tooltip title="Delete Item" arrow>
                                <span>
                                  <ConfirmDialog
                                    message="Are you sure to delete this item?"
                                    onConfirm={() => onDelete(item.id)}
                                  >
                                    <IconButton
                                      color="warning"
                                      size="small"
                                    >
                                      <DeleteTwoToneIcon fontSize="small" />
                                    </IconButton>
                                  </ConfirmDialog>
                                </span>
                              </Tooltip>
                            }
                            { item.deletedAt != null &&
                              <Tooltip title="Restore" arrow>
                                <span>
                                  <ConfirmDialog
                                    message="Are you sure to restore this item?"
                                    onConfirm={() => onRestore(item.id)}
                                  >
                                    <IconButton
                                      color="info"
                                      size="small"
                                    >
                                      <RestoreFromTrashIcon fontSize="small" />
                                    </IconButton>
                                  </ConfirmDialog>
                                </span>
                              </Tooltip>
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container p={2}>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={10}>
                  <TablePagination
                    component="div"
                    count={totalItem}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={pageNumber}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={Pagination.pageSizeOptions}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

StaffSuperAdminManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default StaffSuperAdminManagement;
