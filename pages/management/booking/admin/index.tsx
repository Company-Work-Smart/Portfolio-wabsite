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
  DialogTitle,
  MenuItem,
  TextField,
  DialogActions,
  DialogContent,
  Dialog,
  Button,
  Chip,
  InputAdornment,
  FormControl
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { ChangeEvent, useEffect, useState } from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Pagination } from '@/constant/gagination';
import { HttpClient } from '@/services/http-client';
import { datetimeDisplay } from '@/helpers/datetime';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import ConfirmDialog from '@/components/ConfirmDialog';
import { useRouter } from 'next/router';
import { getStatusColor } from '@/helpers';
// import { useNotification } from '@/helpers/notification';

function AdminManagement() {
  const title = 'Booking Management';
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(Pagination.pageSize);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [assignedNumbers, setAssignedNumbers] = useState<string[]>([]);
  // const { sendNotification } = useNotification();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchName, setSearchName] = useState('');

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
    // sendNotification(
    //   'New room booking',
    //   `A user has just booked a room. Please review the booking details.`,
    //   'feature/payment/admin/makepayment'
    // );
  };

  const onConfirm = async (id: string) => {
    await http.delete(`AdminBooking/${id}`);
    getBooking();
  };

  const onStatusChange = async () => {
    if (selectedRoom && status && assignedNumbers.length > 0) {
      await http.put(`AdminBooking/status/${selectedRoom.id}`, {
        number: assignedNumbers,
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
      <Head>
        <title>{title}</title>
      </Head>
      <Grid item sx={{ p: 3 }}>
        <FormControl
          variant="outlined"
          sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}
        >
          <TextField
            placeholder="Search username..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
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
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Type Bed</TableCell>
                      <TableCell>Adult</TableCell>
                      <TableCell>Children</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Number Room</TableCell>
                      <TableCell>checkIn</TableCell>
                      <TableCell>checkOut</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Chat</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasource
                      ?.filter(
                        (item) =>
                          !searchName.trim() ||
                          item.username
                            .toLowerCase()
                            .includes(searchName.toLowerCase())
                      )
                      .map((item, index) => {
                        return (
                          <TableRow hover key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.tel}</TableCell>
                            <TableCell>
                              {item.bed} {item.bed > 1 ? ' beds' : ' bed'}
                            </TableCell>
                            <TableCell>
                              {item.adult}
                              {item.adult > 1 ? ' adults' : ' adult'}
                            </TableCell>
                            <TableCell>
                              {item.children}
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
                            <TableCell>
                              <Tooltip title="Messager" arrow>
                                <IconButton
                                  onClick={() =>
                                    router.push(
                                      `/applications/admin/messenger/${item.userId}`
                                    )
                                  }
                                  color="primary"
                                  size="small"
                                >
                                  <ContactPhoneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
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
        <DialogTitle>Assign Status</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Number Room"
            name="number"
            type="text"
            placeholder="Enter room numbers e.g. 001 002 003"
            onChange={(e) => {
              const value = e.target.value;
              const numbers = value
                .split(/[\s,]+/)
                .map((n) => n.trim())
                .filter((n) => n !== '');
              setAssignedNumbers(numbers);
            }}
          />

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

AdminManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AdminManagement;
