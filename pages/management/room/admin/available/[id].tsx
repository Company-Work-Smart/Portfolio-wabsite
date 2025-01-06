'use client';

import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import SidebarLayout from '@/layouts/SidebarLayout';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    roomId: '',
    checkIn: '',
    checkOut: '',
    status: ''
  });

  useEffect(() => {
    if (id && id != '0') {
      const roomId = Array.isArray(id) ? id[0] : id;
      setFormData((prevState) => ({
        ...prevState,
        roomId
      }));
    }
  }, [id]);

  const handleInput = (e: any) => {
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

  const submitForm = async () => {
    setLoading(true);
    if (formData.roomId) {
      await http.post(`AdminAvailable`, formData);
      setLoading(false);
      const path = `/management/room/admin`;
      await router.push(`${path}?refresh=true`);
    }
  };

  return (
    <>
      <Head>
        <title>
          {title} {id}
        </title>
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
              {loading && (
                <LinearProgress
                  style={{ position: 'absolute', width: '100%' }}
                />
              )}
              <CardHeader
                action={
                  <Box>
                    <Button
                      variant="contained"
                      onClick={submitForm}
                      disabled={loading}
                    >
                      {id === '0' ? 'Post' : 'Save'}
                    </Button>
                  </Box>
                }
                title={title}
              />
              <Divider />
              <CardContent>
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
                      onChange={(newValue) =>
                        handleDateChange(newValue, 'checkIn')
                      }
                      renderInput={(params) => (
                        <TextField {...params} required fullWidth />
                      )}
                    />
                    <DesktopDatePicker
                      label="CheckOut"
                      inputFormat="YYYY-MM-DD"
                      value={dayjs(formData.checkOut)}
                      onChange={(newValue) =>
                        handleDateChange(newValue, 'checkOut')
                      }
                      renderInput={(params) => (
                        <TextField {...params} required fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    required
                    fullWidth
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleInput}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

AdminAdminFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminAdminFormManagement;
