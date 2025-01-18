import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  styled
} from '@mui/material';
import React, {
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState
} from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import { TypographyH1 } from '@/components/typographys';
import TextField from '@mui/material/TextField';
import { HttpClient } from '@/services/http-client';
import { AppKey } from '@/constant/key';
import { useRouter } from 'next/router';
import { SnackbarContext } from '@/contexts/SnackbarContext';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { showSnackbar } = useContext(SnackbarContext);
  const router = useRouter();
  const httpClient = new HttpClient();
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [contactUs, setContactUs] = useState({
    username: '',
    email: '',
    description: ''
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };
  const handleInputContactUs = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setContactUs((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await httpClient.post(`AnonymousAuth/Login`, formData);
      if (typeof response === 'string') {
        showSnackbar({ type: 'error', message: response });
        return;
      }

      if (response.accessToken) {
        localStorage.setItem(AppKey.accessToken, response.accessToken);
        localStorage.setItem(AppKey.refreshToken, response.refreshToken);
        localStorage.setItem(AppKey.role, response.role);
        localStorage.setItem(AppKey.username, response.username);

        showSnackbar({ type: 'success', message: 'Successfully logged in!' });

        const role = `${response.role[0].toLowerCase()}${response.role.substring(
          1
        )}`;
        await router.push(`/dashboards/dashboard/${role}`);
      } else {
        showSnackbar({
          type: 'error',
          message: 'Invalid login response from server'
        });
      }
    } catch (error) {
      showSnackbar({
        type: 'error',
        message: 'An error occurred during login'
      });
    }
  };

  const submitFormContactUs = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await httpClient.post('AnonymousContactMe', contactUs);
      showSnackbar({
        type: 'success',
        message: 'Your message has been sent successfully!'
      });
      setContactUs({ username: '', email: '', description: '' });
      setDialogOpen(false);
    } catch (error) {
      showSnackbar({
        type: 'error',
        message:
          'An error occurred while sending your message. Please try again.'
      });
    }
  };

  useEffect(() => {}, []);
  return (
    <OverviewWrapper>
      <Head>
        <title>Reservation System</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button variant="contained" sx={{ ml: 2 }} onClick={openDialog}>
                  Contact Support
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Grid
          spacing={{ xs: 6, md: 10 }}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item xs={6} mx="auto">
            <form onSubmit={submitForm}>
              <TypographyH1 mb={8} variant="h1">
                Reservation System
              </TypographyH1>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Username"
                  name="username"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Password"
                  name="password"
                  onChange={handleInput}
                />
              </Grid>

              <Button type="submit" fullWidth size="large" variant="contained">
                Sign In
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Us Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Contact Us</DialogTitle>
        <form onSubmit={submitFormContactUs}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="contact-username"
                  label="Your Name"
                  name="username"
                  value={contactUs.username}
                  onChange={handleInputContactUs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="contact-email"
                  label="Your Email"
                  name="email"
                  type="email"
                  value={contactUs.email}
                  onChange={handleInputContactUs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="contact-description"
                  label="Your Message"
                  name="description"
                  multiline
                  rows={4}
                  value={contactUs.description}
                  onChange={handleInputContactUs}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
