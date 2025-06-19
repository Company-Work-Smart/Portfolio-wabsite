import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import { Box, Button, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { UserBoxProps } from '@/constant/my-app';
import { AppKey } from '@/constant/key';

const VerifyPlacePage = () => {
  const title = 'VerifyPlace Page';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useContext(SnackbarContext);
  const [user, setUser] = useState<UserBoxProps>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    images: [] as File[]
  });

  const getIdentificationCard = async () => {
    const res = await http.get('UserIdentificationCard');
    if (
      Array.isArray(res) &&
      res[0]?.status === 'Approved' ||
      res[0]?.status === 'Pending'
    ) {
      await router.push(`/view/billing/pending/${id}?refresh=true`);
    }
  };

  useEffect(() => {
    if (user.userId && user.userId !== '0') {
      const userId = Array.isArray(user.userId) ? user.userId[0] : user.userId;
      setFormData((prevState) => ({
        ...prevState,
        userId
      }));
    }
  }, [user.userId]);

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
    if (!formData.images.length || !formData.userId.trim()) {
      showSnackbar({
        type: 'error',
        message: 'User ID and at least one identification file are required.'
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append('UserId', formData.userId);

    formData.images.forEach((image) => {
      formPayload.append('Images', image);
    });

    try {
      setLoading(true);

      const res = await http.postuploadFile(
        'UserIdentificationCard',
        formPayload
      );
      if (res.message === 'success') {
        showSnackbar({
          type: 'success',
          message: 'File uploaded successfully!'
        });

        setFormData({ userId: '', images: [] });
        setImagePreviews([]);
        await router.push(`/view/billing/pending/${id}?refresh=true`);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Upload failed. Please try again.'
        });
      }
    } catch (e) {
      showSnackbar({
        type: 'error',
        message: 'Something went wrong during upload.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdentificationCard();
    const interval = setInterval(() => {
      getIdentificationCard();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setUser({
      userId: localStorage.getItem(AppKey.userId),
      username: localStorage.getItem(AppKey.username),
      role: localStorage.getItem(AppKey.role)
    });
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: '#f5f7fa',
          textAlign: 'center',
          py: 10
        }}
      >
        <Typography variant="h3" gutterBottom>
          Request Identification Card
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Upload clear images of your Identification Card.
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mx: 'auto', maxWidth: 600 }}
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
              borderRadius: '8px',
              transition: 'border-color 0.3s, background-color 0.3s',
              cursor: 'pointer'
            }}
          >
            {imagePreviews.length ? (
              <>
                {imagePreviews.length > 0 && (
                  <Box>
                    <Typography gutterBottom>
                      Preview of Uploaded Identification Card.
                    </Typography>
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
                  </Box>
                )}
              </>
            ) : (
              <>
                {' '}
                <Typography>
                  Drag and drop identification here, or click to select files
                </Typography>
              </>
            )}
            <Box
              display="flex"
              gap={2}
              mt={3}
              justifyContent="center"
              alignItems="center"
            >
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
                accept="image/*"
              />
              <label htmlFor="images">
                <Button variant="outlined" component="span">
                  Choose Files
                </Button>
              </label>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={loading}
              >
                Submit
              </Button>
            </Box>
          </Box>
          {formData.images.length > 0 && (
            <Typography mt={2}>
              {formData.images.map((file) => file.name).join(', ')}
            </Typography>
          )}
        </Box>
      </Box>
      <FooterPage />
    </>
  );
};
VerifyPlacePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default VerifyPlacePage;
