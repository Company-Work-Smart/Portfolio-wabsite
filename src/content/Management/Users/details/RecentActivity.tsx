import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Chip
} from '@mui/material';

import { FormEvent, useContext, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { datetimeDisplay } from '@/helpers/datetime';
import appColor from '@/theme/appColor';
import ConfirmDialog from '@/components/ConfirmDialog';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useRouter } from 'next/router';
import { getStatusColor } from '@/helpers';

function RecentActivity() {
  const { showSnackbar } = useContext(SnackbarContext);
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState<any[]>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    number: ''
  });

  const getBookings = async () => {
    const res = await http.get(`UserBooking`);
    setDatasource(res.item || []);
  };

  const onConfirm = async (id: string) => {
    await http.delete(`UserBooking/${id}`);
    getBookings();
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    if (newValue) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue.format('YYYY-MM-DD')
      }));
    }
  };

  const handleDialogOpen = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    await http.put(`UserBooking/${selectedId}`, formData);
    showSnackbar({ type: 'success', message: 'Booking successfully!' });
    setOpenDialog(false);
    await router.push(`/applications/user/profile?refresh=true`);
  };

  useEffect(() => {
    getBookings();
    const interval = setInterval(() => {
      getBookings();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ height: '500px', overflow: 'auto' }}>
      <CardHeader title="Recently reserved" />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <Divider />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Adult</TableCell>
                <TableCell>Children</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Room</TableCell>
                <TableCell align="right">Reserved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasource && datasource.length > 0 ? (
                datasource.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.room.adult} adult</TableCell>
                    <TableCell>{item.room.children} children</TableCell>
                    <TableCell>{item.room.size} m²</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Booking" arrow>
                        <IconButton
                          onClick={() => handleDialogOpen(item.id)}
                          color="primary"
                          size="small"
                        >
                          <Typography sx={{ cursor: 'pointer' }}>
                            Rebooking
                          </Typography>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No recent bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <Divider />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasource && datasource.length > 0 ? (
                datasource.map((item, index) => (
                  <TableRow key={index}>
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
                      <Tooltip title="Cancel Booking" arrow>
                        <span>
                          <ConfirmDialog
                            message="Are you sure you want to cancel the reservation?"
                            onConfirm={() => onConfirm(item.id)}
                          >
                            <Typography
                              sx={{
                                cursor: 'pointer',
                                color: appColor.red,
                                fontWeight: 'bold'
                              }}
                            >
                              Cancel
                            </Typography>
                          </ConfirmDialog>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No recent bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            Reserve Now
          </Typography>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '45ch' } }}
            noValidate
            autoComplete="off"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="CheckIn"
                inputFormat="YYYY-MM-DD"
                value={dayjs(formData.checkIn)}
                onChange={(newValue) => handleDateChange(newValue, 'checkIn')}
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
              />
              <DesktopDatePicker
                label="CheckOut"
                inputFormat="YYYY-MM-DD"
                value={dayjs(formData.checkOut)}
                onChange={(newValue) => handleDateChange(newValue, 'checkOut')}
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Number Room"
              name="number"
              value={formData.number}
              onChange={handleInput}
            />
          </Box>
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Booking Now
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default RecentActivity;
