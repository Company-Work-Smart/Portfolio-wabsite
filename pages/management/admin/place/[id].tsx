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
  LinearProgress
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import SidebarLayout from '@/layouts/SidebarLayout';
import { getBackRoute } from '@/helpers/route';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (id && id != '0') {
      getItem(id);
    }
  }, [id]);

  const getItem = async (id: any) => {
    setLoading(true);
    const res = await http.get(`AdminPlace/${id}`);
    setFormData(res);
    setLoading(false);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id && id !== '0') {
      await http.put(`AdminPlace/${id}`, formData);
      const path = getBackRoute(router);
      await router.push(`${path}?refresh=true`);
    } else {
      await http.post(`AdminPlace`, formData);
      const path = `/management/admin/place`;
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
                    <Button variant="contained" onClick={submitForm}>
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
                  onSubmit={submitForm}
                >
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
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
