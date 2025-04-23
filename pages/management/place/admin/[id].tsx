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
  Select
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import SidebarLayout from '@/layouts/SidebarLayout';
import { getBackRoute } from '@/helpers/route';
import { provinces } from '@/helpers';
import { AppKey } from '@/constant/key';

function AdminAdminFormManagement() {
  const title = `Admin Form`;
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    userId: '',
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
      const path = `/management/place/admin`;
      await router.push(`${path}?refresh=true`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.userId !== '0') {
      setFormData((prev) => ({
        ...prev,
        userId: user?.userId
      }));
    }
  }, [user?.userId]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const userId = localStorage.getItem(AppKey.userId);
    if (userId) {
      setUser({ userId: userId });
    }
  }, []);

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
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    width: '100%',
                    justifyContent: 'space-between',
                    p: 2
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={submitForm}
                >
                  <TextField
                    required
                    fullWidth
                    sx={{ flex: 1, minWidth: 250 }}
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                  />

                  <TextField
                    required
                    fullWidth
                    sx={{ flex: 1, minWidth: 250 }}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInput}
                  />

                  <FormControl sx={{ flex: 1, minWidth: 250 }} required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInput}
                      label="Category"
                    >
                      {provinces.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
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

AdminAdminFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminAdminFormManagement;
