import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material';
import { useRouter } from 'next/router';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import { ChangeEvent, useEffect, useState } from 'react';
import { datetimeDisplay } from '@/helpers/datetime';
import { getStatusColor } from '@/helpers';
import DialogWidget from '@/components/Dialog';

function RecentActivity() {
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);

  const handlePageChange = (_event: any, newPageNumber: number): void => {
    setPageNumber(newPageNumber);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPageSize(parseInt(event.target.value));
  };

  const getBooking = async () => {
    const res = await http.get(
      `AdminBooking?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    );

    setDatasource(res.item);
    setTotalItem(res.total);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminBooking/${id}`);
    getBooking();
  };

  const onStatusChange = async () => {
    if (selectedRoom && status) {
      await http.put(`AdminBooking/status/${selectedRoom.id}`, {
        status: status
      });
      setOpenDialog(false);
      getBooking();
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

  useEffect(() => {
    getBooking();
    const interval = setInterval(() => {
      getBooking();
    }, 1000);
    return () => clearInterval(interval);
  }, [pageNumber, pageSize, router.query.refresh]);

  return (
    <>
      <Card sx={{ height: '500px', overflow: 'auto' }}>
        <CardHeader title="Recently reserved" />
        <Box px={2} py={2} display="flex" alignItems="flex-start">
          <Divider />
          <Card style={{ position: 'relative' }}>
            {!datasource && (
              <LinearProgress style={{ position: 'absolute', width: '100%' }} />
            )}
            <Divider />
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell width={12} align="right">
                      No
                    </TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Bed</TableCell>
                    <TableCell>Adult</TableCell>
                    <TableCell>Children</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Room</TableCell>
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
                        <TableCell>{item.tel}</TableCell>
                        <TableCell>
                          {item.bed} {item.bed > 1 ? ' beds' : ' bed'}
                        </TableCell>
                        <TableCell>
                          {item.adult} {item.adult > 1 ? ' adults' : ' adult'}
                        </TableCell>
                        <TableCell>
                          {item.children}{' '}
                          {item.children > 1 ? ' childrens' : ' children'}
                        </TableCell>
                        <TableCell>{item.size} m²</TableCell>
                        <TableCell>{item.number.join(', ')}</TableCell>
                        <TableCell>{datetimeDisplay(item.checkIn)}</TableCell>
                        <TableCell>{datetimeDisplay(item.checkOut)}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            variant="outlined"
                          />
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
                              <DialogWidget
                                variant="delete"
                                message="Are you sure to delete this item?"
                                onConfirm={() => onConfirm(item.id)}
                              >
                                <IconButton color="error" size="small">
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </DialogWidget>
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
        </Box>
        <Divider />
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Reject">Reject</MenuItem>
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

export default RecentActivity;
