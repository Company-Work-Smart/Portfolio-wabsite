import HeaderPage from '@/layouts/PageLayout/Header';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { FormEvent, useContext, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import appColor from '@/theme/appColor';

const SupportPage = () => {
  const title = 'Support Page';
  const http = new HttpClient();
  const { showSnackbar } = useContext(SnackbarContext);
  const [contactUs, setContactUs] = useState({
    username: '',
    email: '',
    description: ''
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setContactUs((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const submitFormContactUs = async (e: FormEvent) => {
    e.preventDefault();
    await http.post('AnonymousContactMe', contactUs);
    showSnackbar({
      type: 'success',
      message: 'Your message has been sent successfully!'
    });
    setContactUs({ username: '', email: '', description: '' });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          height: '100%',
          backgroundColor: appColor.background
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontSize: { xs: '1.2rem', sm: '2rem' },
            textAlign: 'center',
            py: { xs: 5, sm: 10 }
          }}
        >
          Contact Customer Service
        </Typography>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <form
            onSubmit={submitFormContactUs}
            style={{ width: '100%', maxWidth: 600 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Name"
                  name="username"
                  value={contactUs.username}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Email"
                  name="email"
                  type="email"
                  value={contactUs.email}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Message"
                  name="description"
                  multiline
                  rows={4}
                  value={contactUs.description}
                  onChange={handleInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, width: '100%' }}
            >
              Send Message
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

SupportPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default SupportPage;
