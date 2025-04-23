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
  MenuItem,
  TextField
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import SidebarLayout from '@/layouts/SidebarLayout';

function RoomAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [datasource, setDatasource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    placeId: '',
    adult: '',
    children: '',
    size: ''
  });

  useEffect(() => {
    if (id && id !== '0') {
      getItem(id);
    }
  }, [id]);

  const getItem = async (id: any) => {
    setLoading(true);
    const res = await http.get(`AdminRoom/${id}`);
    setFormData(res);
    setLoading(false);
  };

  const getplaces = async () => {
    setDatasource(null);
    const res = await http.get(`AdminPlace`);
    setDatasource(res.item);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (id && id !== '0') {
      const res = await http.put(`AdminRoom/${id}`, formData);
      console.log(res);
      await router.push(`/management/room/admin?refresh=true`);
    } else {
      await http.post(`AdminRoom`, formData);
      await router.push(`/management/room/admin?refresh=true`);
    }
    setLoading(false);
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

  useEffect(() => {
    getplaces();
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
                  onSubmit={submitForm}
                >
                  <TextField
                    required
                    select
                    label="Name Place"
                    name="placeId"
                    value={formData.placeId}
                    onChange={handleInput}
                  >
                    {datasource?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    fullWidth
                    label="Adult"
                    name="adult"
                    value={formData.adult}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Children"
                    name="children"
                    value={formData.children}
                    onChange={handleInput}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Size Room"
                    name="size"
                    value={formData.size}
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

RoomAdminFormManagement.getLayout = (page: React.ReactNode) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default RoomAdminFormManagement;
