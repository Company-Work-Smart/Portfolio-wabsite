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
  LinearProgress,
  Typography
} from '@mui/material';
import SidebarLayout from '@/layouts/SidebarLayout';

function ImageManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;

  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    roomId: '',
    images: [] as File[]
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validImages = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );

      if (validImages.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...validImages]
        }));

        const previews = validImages.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Please select valid image files.'
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files) {
      const validImages = Array.from(files).filter((file) =>
        file.type.startsWith('image/')
      );

      if (validImages.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...validImages]
        }));

        const previews = validImages.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Please drop valid image files.'
        });
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const submitForm = async () => {
    if (!formData.images.length || !formData.roomId.trim()) {
      showSnackbar({
        type: 'error',
        message: 'Room ID and at least one image file are required.'
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('RoomId', formData.roomId);

    formData.images.forEach((image) => {
      formPayload.append('Images', image);
    });

    setLoading(true);
    await http.postuploadFile('AdminImage', formPayload);

    showSnackbar({
      type: 'success',
      message: 'File uploaded successfully!'
    });
    setFormData({ roomId: '', images: [] });
    setImagePreviews([]);
    await router.push(`/management/room/admin?refresh=true`);
    setLoading(false);
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
                      Drag and drop images here, or click to select files
                    </Typography>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      multiple
                    />
                    <label htmlFor="images">
                      <Button variant="outlined" component="span">
                        Choose Files
                      </Button>
                    </label>
                    {formData.images.length > 0 && (
                      <Typography mt={1}>
                        {formData.images.map((file) => file.name).join(', ')}
                      </Typography>
                    )}
                  </Box>
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <Grid container spacing={2} mt={2}>
                      {imagePreviews.map((preview, index) => (
                        <Grid item xs={4} key={index}>
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: '8px'
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
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

ImageManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ImageManagement;
