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
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import SidebarLayout from '@/layouts/SidebarLayout';

function AdminAdminFormManagement() {
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const title = `Admin Form`;
  const [datasource, setDatasource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    placeId: '',
    videos: [] as File[],
    description: ''
  });

  const getplaces = async () => {
    setDatasource(null);
    const res = await http.get(`AdminPlace`);
    setDatasource(res.item);
  };

  useEffect(() => {
    getplaces();
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validVideos = Array.from(files).filter((file) =>
        file.type.startsWith('video/')
      );

      if (validVideos.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          videos: [...prevState.videos, ...validVideos]
        }));

        const previews = validVideos.map((file) => URL.createObjectURL(file));
        setVideoPreviews((prevPreviews) => [...prevPreviews, ...previews]);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Please select valid video files.'
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
      const validVideos = Array.from(files).filter((file) =>
        file.type.startsWith('video/')
      );

      if (validVideos.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          videos: [...prevState.videos, ...validVideos]
        }));

        const previews = validVideos.map((file) => URL.createObjectURL(file));
        setVideoPreviews((prevPreviews) => [...prevPreviews, ...previews]);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Please drop valid video files.'
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
    if (!formData.videos.length || !formData.placeId.trim()) {
      showSnackbar({
        type: 'error',
        message: 'Place ID and at least one Video file are required.'
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('PlaceId', formData.placeId);
    formData.videos.forEach((video) => {
      formPayload.append('Videos', video);
    });
    formPayload.append('Description', formData.description);

    setLoading(true);
    const res = await http.postuploadFile('AdminVideo', formPayload);
    console.log(res);

    showSnackbar({
      type: 'success',
      message: 'File uploaded successfully!'
    });
    setFormData({ placeId: '', videos: [], description: '' });
    setVideoPreviews([]);
    await router.push(`/feature/video/admin?refresh=true`);
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
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TextField
                      required
                      select
                      label="Name Place"
                      name="placeId"
                      value={formData.placeId}
                      onChange={handleInput}
                      sx={{ width: '50%' }}
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
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInput}
                      sx={{ width: '50%' }}
                    />
                  </Box>

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
                    {formData.videos.length > 0 && (
                      <Typography mt={1}>
                        {formData.videos.map((file) => file.name).join(', ')}
                      </Typography>
                    )}
                  </Box>
                  {/* Videos Previews */}
                  {videoPreviews.length > 0 && (
                    <Grid container spacing={2} mt={2}>
                      {videoPreviews.map((preview, index) => (
                        <Grid item xs={12} key={index}>
                          <video
                            controls
                            autoPlay
                            muted
                            playsInline
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: '8px'
                            }}
                          >
                            <source
                              src={preview}
                              type="video/mp4"
                            />
                          </video>
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

AdminAdminFormManagement.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AdminAdminFormManagement;
