import { useState, useEffect, useContext } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Input,
  LinearProgress,
  Typography
} from '@mui/material';
import SidebarLayout from '@/layouts/SidebarLayout';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    roomId: '',
    images: null
  });

  useEffect(() => {
    if (id && id !== '0') {
      const roomId = Array.isArray(id) ? id[0] : id;
      setFormData((prevState) => ({
        ...prevState,
        roomId
      }));
    }
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prevState) => ({
        ...prevState,
        images: file
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      showSnackbar({
        type: 'error',
        message: 'Please select a valid image file.'
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prevState) => ({
        ...prevState,
        images: file
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      showSnackbar({
        type: 'error',
        message: 'Please drop a valid image file.'
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const submitForm = async () => {
    if (!formData.images || !formData.roomId.trim()) {
      showSnackbar({
        type: 'error',
        message: 'Room ID and image file are required.'
      });
      return;
    }

    console.log(formData.roomId);
    console.log(formData.images);

    const formPayload = new FormData();
    formPayload.append('RoomId', formData.roomId);
    formPayload.append('Images', formData.images);

    setLoading(true);
    try {
      await http.uploadFile('AdminImage', formPayload);
      showSnackbar({
        type: 'success',
        message: 'File uploaded successfully!'
      });
      setFormData({ roomId: '', images: null });
      setImagePreview(null);
    } catch (error) {
      showSnackbar({
        type: 'error',
        message: 'File upload failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                  {/* Drag-and-Drop Area */}
                  <Box
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    sx={{
                      border: `2px dashed ${isDragging ? '#4caf50' : '#ccc'}`,
                      backgroundColor: isDragging ? '#e8f5e9' : '#f9f9f9',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'border-color 0.3s, background-color 0.3s'
                    }}
                  >
                    <Typography>
                      Drag and drop an image here, or click to select a file
                    </Typography>
                    <Input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="images">
                      <Button variant="outlined" component="span">
                        Choose File
                      </Button>
                    </label>
                    {formData.images && (
                      <Typography mt={1}>{formData.images.name}</Typography>
                    )}
                  </Box>
                  {/* Image Preview */}
                  {imagePreview && (
                    <Box mt={2} textAlign="center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  )}
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
