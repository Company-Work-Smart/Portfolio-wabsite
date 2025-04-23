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
import SidebarLayout from '@/layouts/SidebarLayout';

function AvailableManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Available Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    roomId: '',
    item: ''
  });

  useEffect(() => {
    if (id) {
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

  const submitForm = async () => {
    setLoading(true);
    if (formData.roomId) {
      await http.post(`AdminAmenities`, formData);
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
                  <TextField
                    required
                    fullWidth
                    label="Item"
                    name="item"
                    value={formData.item}
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

AvailableManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AvailableManagement;
