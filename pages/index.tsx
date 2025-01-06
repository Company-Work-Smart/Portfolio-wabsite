import { Box, Button, Card, Container, Grid, styled } from '@mui/material';
import React, { FormEvent, ReactElement, useContext, useEffect, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
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
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
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
  
        const role = `${response.role[0].toLowerCase()}${response.role.substring(1)}`;
        await router.push(`/dashboards/dashboard/${role}`);
      } else {
        showSnackbar({ type: 'error', message: 'Invalid login response from server' });
      }
    } catch (error) {
      showSnackbar({ type: 'error', message: 'An error occurred during login' });
    }
  };
  

  useEffect(() => {
  }, []);
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
                <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Live Preview
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

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
              >
                Sign In
              </Button>
            </form>
          </Grid>

        </Grid>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};