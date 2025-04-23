import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
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
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useRouter } from 'next/router';
import { renderStars } from '@/content/Widgets/Favorite/rating';

function RoomAdminManagement() {
  const title = 'Rate Management';
  const http = new HttpClient();
  const router = useRouter();
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

  const getRates = async () => {
    setDatasource(null);
    const res = await http.get(
      `AdminRate?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res);
    setTotalItem(res.length);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminRate/${id}`);
    getRates();
  };

  useEffect(() => {
    getRates();
  }, [pageNumber, pageSize, router.query.refresh]);

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
                    <Button href="admin/0" variant="contained">
                      Post
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <TableContainer style={{ height: 'calc(100vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Bed</TableCell>
                      <TableCell>Max Occupancy</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => (
                      <TableRow hover key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>
                          {item.type} {item.type > 1 ? 'Beds' : 'Bed'}
                        </TableCell>
                        <TableCell>
                          {item.maxOccupancy}{' '}
                          {item.maxOccupancy > 1 ? 'Adults' : 'Adult'}
                        </TableCell>
                        <TableCell>
                          <div>{renderStars(item.rating)}</div>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Delete Item" arrow>
                            <span>
                              <ConfirmDialog
                                message="Are you sure to delete this item?"
                                onConfirm={() => onConfirm(item.id)}
                              >
                                <IconButton color="error" size="small">
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
    </>
  );
}

RoomAdminManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default RoomAdminManagement;
