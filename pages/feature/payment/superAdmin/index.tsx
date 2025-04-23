import { useState, useEffect } from 'react';
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
  TableRow,
  TablePagination,
  Tooltip,
  useTheme,
  Chip
} from '@mui/material';
import { HttpClient } from '@/services/http-client';
import { Pagination } from '@/constant/gagination';
import SidebarLayout from '@/layouts/SidebarLayout';
import ConfirmDialog from '@/components/ConfirmDialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { getStatusColor } from '@/helpers';

const BillingManagement = () => {
  const title = 'Billing Page';
  const http = new HttpClient();
  const unique = new Set();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPageSize(parseInt(event.target.value));
  };
  const theme = useTheme();

  const getPayment = async () => {
    const res = await http.get(
      `SuperAdminPayment?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    setDatasource(res.item);
    setTotalItem(res.total);
  };

  const onConfirm = async (id) => {
    await http.delete(`SuperAdminPayment/${id}`);
    getPayment();
  };

  useEffect(() => {
    getPayment();
    const interval = setInterval(() => {
      getPayment();
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
              <CardHeader title={title} />
              <Divider />
              <TableContainer style={{ height: 'calc(100vh - 298px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell width={12} align="right">
                        No
                      </TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Currency</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => {
                      if (unique.has(item?.username)) return null;
                      unique.add(item?.username);
                      return (
                        <TableRow hover key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.username}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>{item.currency}</TableCell>
                          <TableCell>
                            <Chip
                              label={item.status}
                              color={getStatusColor(item.status)}
                              variant="outlined"
                            />
                          </TableCell>

                          <TableCell align="right">
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
};

BillingManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default BillingManagement;
