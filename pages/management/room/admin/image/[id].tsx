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
  Typography
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import SidebarLayout from '@/layouts/SidebarLayout';
import { HttpClient } from '@/services/http-client';
import { SnackbarContext } from '@/contexts/SnackbarContext';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    roomId: '',
    images: null as File | null
  });

  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    if (id && id !== '0') {
      const roomId = Array.isArray(id) ? id[0] : id;
      setFormData((prevState) => ({
        ...prevState,
        roomId
      }));
    }
  }, [id]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      images: file
    }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      images: file
    }));
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const submitForm = async () => {
    if (!formData.images) {
      showSnackbar({
        type: 'error',
        message: 'Please select an image to upload'
      });
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('roomId', formData.roomId);
    formDataToSend.append('images', formData.images);

    
    await http.post('AdminImage', formDataToSend);
    console.log(formDataToSend.append('roomId', formData.roomId));
    setLoading(false);
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
                  <Box
                    sx={{
                      border: `2px dashed ${
                        formData.images
                          ? 'green'
                          : dragging
                          ? 'blue'
                          : '#cccccc'
                      }`,
                      borderRadius: 2,
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Typography variant="body1">
                      {formData.images
                        ? `File: ${formData.images.name}`
                        : 'Drag & drop an image here or click to select'}
                    </Typography>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                      accept="image/*"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="contained"
                        component="span"
                        sx={{ mt: 2 }}
                      >
                        Choose File
                      </Button>
                    </label>
                  </Box>
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
