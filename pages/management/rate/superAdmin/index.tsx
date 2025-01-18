import React, { useState, useEffect, ChangeEvent } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
  Box,
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
  Tooltip,
  Typography
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { datetimeDisplay } from '@/helpers/datetime';

function CarManagerManagement() {
  const title = 'Car Management';
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
      `SuperAdminCar?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.data);
    setTotalItem(res.totalItems);
  };

  const onDelete = async (id) => {
    await http.delete(`SuperAdminCar/${id}`);
    getItems();
  };

  const onRestore = async (id) => {
    await http.delete(`SuperAdminCar/Restore/${id}`);
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
                action={
                  <Box>
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
                      <TableCell>code</TableCell>
                      <TableCell>plate number</TableCell>
                      <TableCell>availability</TableCell>
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
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.code}</TableCell>
                          <TableCell>{item.platNo}</TableCell>
                          <TableCell>
                            <Typography
                              style={{
                                color: item.available ? 'green' : 'red',
                                fontWeight: 'bold'
                              }}
                            >
                              {item.available ? 'Available' : 'Unavailable'}
                            </Typography>
                          </TableCell>
                          <TableCell align="center"> {datetimeDisplay(item.createdAt)}</TableCell>
                          <TableCell align="center">{datetimeDisplay(item.updatedAt)}</TableCell>
                          <TableCell align="center">{datetimeDisplay(item.deletedAt)}</TableCell>
                          <TableCell align={'center'}>
                            {item.deletedAt == null &&
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
                            {item.deletedAt != null &&
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
}

CarManagerManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default CarManagerManagement;
