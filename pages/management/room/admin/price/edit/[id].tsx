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
import { useState, useEffect, FormEvent } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import SidebarLayout from '@/layouts/SidebarLayout';
function PriceFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Price Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    pricing: '',
    discount: '',
    taxes: ''
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
    const res = await http.get(`AdminPrice/${id}`);
    setFormData(res);
    setLoading(false);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (id && id !== '0') {
      await http.put(`AdminPrice/${id}`, formData);
      setLoading(false);
      const path = `/management/room/admin`;
      await router.push(`${path}?refresh=true`);
    } else {
      const path = `/management/room/admin`;
      await router.push(`${path}?refresh=true`);
    }
    setLoading(false);
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
                  sx={{ '& .MuiTextField-root': { m: 1, width: '45ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Taxes"
                    name="taxes"
                    value={formData.taxes}
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

PriceFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default PriceFormManagement;
