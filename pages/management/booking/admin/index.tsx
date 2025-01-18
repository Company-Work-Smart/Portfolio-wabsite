'use client';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import {
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
  Snackbar,
  Alert,
  DialogTitle,
  MenuItem,
  TextField,
  DialogActions,
  DialogContent,
  Dialog,
  Button
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import { datetimeDisplay } from '@/helpers/datetime';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';

import ConfirmDialog from '@/components/ConfirmDialog';

function AdminManagement() {
  const title = 'Booking Management';
  const http = new HttpClient();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newDataCount, setNewDataCount] = useState(0);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const triggerBrowserNotification = (message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Items Available', {
        body: message,
        icon: '/icon.png'
      });
    }
  };

  const getItems = async () => {
    const res = await http.get(
      `AdminBooking?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );
    if (datasource && res.length > datasource.length) {
      const newItemsCount = res.length - datasource.length;
      setNewDataCount(newItemsCount);
      setOpenSnackbar(true);
      triggerBrowserNotification(`${newItemsCount} new items available!`);
    }
    setDatasource(res);
    setTotalItem(res.totalItems);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminBooking/${id}`);
    getItems();
  };

  const onStatusChange = async () => {
    if (selectedRoom && status) {
      await http.put(`AdminBooking/status/${selectedRoom.id}`, {
        status: status
      });
      setOpenDialog(false);
      getItems();
    }
  };

  const handleOpenDialog = (room: any) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
    setStatus('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    requestNotificationPermission();
    getItems();
  }, [pageNumber, pageSize]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: '100%' }}
        >
          {newDataCount} new {newDataCount > 1 ? 'items' : 'item'} available!
        </Alert>
      </Snackbar>
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
                      <TableCell>Type</TableCell>
                      <TableCell>Max Occupancy</TableCell>
                      <TableCell>checkIn</TableCell>
                      <TableCell>checkOut</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource?.map((item, index) => {
                      return (
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
                          <TableCell>{datetimeDisplay(item.checkIn)}</TableCell>
                          <TableCell>
                            {datetimeDisplay(item.checkOut)}
                          </TableCell>
                          <TableCell>
                            {item.status === 'Agreed' ? (
                              <CheckCircleIcon
                                color="primary"
                                style={{ marginLeft: '11px' }}
                              />
                            ) : item.status === 'Pending' ? (
                              <HourglassEmptyIcon
                                color="warning"
                                style={{ marginLeft: '11px' }}
                              />
                            ) : (
                              <CancelIcon
                                color="error"
                                style={{ marginLeft: '11px' }}
                              />
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <Tooltip title="Edit Status" arrow>
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
                                  <IconButton color="error" size="small">
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
              <Grid container p={2}>
                <Grid item xs={2}></Grid>
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

      {/* Dialog to assign role */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Role</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Agreed">Agreed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onStatusChange} color="primary">
            Assign Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AdminManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AdminManagement;
