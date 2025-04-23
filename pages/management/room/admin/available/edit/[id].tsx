'use client';

import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useState, useEffect, FormEvent } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import SidebarLayout from '@/layouts/SidebarLayout';
function AvailableFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Available Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    status: ''
  });

  useEffect(() => {
    if (id && id != '0') {
      const placeId = Array.isArray(id) ? id[0] : id;
      setFormData((prevState) => ({
        ...prevState,
        placeId
      }));
      getItem(id);
    }
  }, [id]);

  const getItem = async (id: any) => {
    setLoading(true);
    const res = await http.get(`AdminAvailable/${id}`);
    setFormData(res);
    setLoading(false);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (id && id !== '0') {
      await http.put(`AdminAvailable/${id}`, formData);
      setLoading(false);
      const path = `/management/room/admin`;
      await router.push(`${path}?refresh=true`);
    } else {
      const path = `/management/room/admin`;
      await router.push(`${path}?refresh=true`);
    }
    setLoading(false);
  };

  const handleDateChange = (newValue: Dayjs | null, name: string) => {
    if (newValue) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: newValue.format('YYYY-MM-DD')
      }));
    }
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
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
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'space-between',
                    '& .MuiTextField-root, & .MuiFormControl-root': {
                      flex: '1 1 250px',
                      minWidth: '200px'
                    }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Check-In"
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
                      label="Check-Out"
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

                  <FormControl required fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInput}
                      label="Status"
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Unavailable">Unavailable</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

AvailableFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AvailableFormManagement;
