import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, LinearProgress } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { getBackRoute } from '@/helpers/route';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const title = `Admin Form`;
  const { id } = router.query;
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: '',
    hospitalId: ''
  });
  useEffect(() => {
    if (!id) return;
    getHospitals();
    if (id != '0') {
      getItem(id);
    }
  }, [id]);


  const getHospitals = async () => {
    const res = await http.get('SuperAdminAdmin');
    setHospitals(res);
  };

  const getItem = async (id: any) => {
    setLoading(true);
    const res = await http.get(`SuperAdminAdmin/${id}`);
    setFormData(res);
    setLoading(false);
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = () => {
    if (id != '0') {
      save();
      return;
    }
    add();
  };


  const save = async () => {
    setLoading(true);
    await http.put(`SuperAdminAdmin/${id}`, formData);
    setLoading(false);
    const path = getBackRoute(router);
    await router.push(`${path}?refresh=true`);
  };

  const add = async () => {
    setLoading(true);
    await http.post(`SuperAdminAdmin`, formData);
    setLoading(false);
    const path = getBackRoute(router);
    await router.push(`${path}?refresh=true`);
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
                    <Button variant="contained" onClick={onSubmit}>
                      {id == '0' ? 'Add' : 'Save'}
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
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    select
                    label="Hospital"
                    name="hospitalId"
                    value={formData.hospitalId}
                    onChange={handleChange}
                  >
                    <MenuItem>
                      None
                    </MenuItem>
                    {hospitals.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
