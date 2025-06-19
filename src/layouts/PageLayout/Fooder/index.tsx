import React from 'react';
import { AppBar, Typography, Box, Grid, Container } from '@mui/material';
import appColor from '@/theme/appColor';
import { useRouter } from 'next/router';
import { MyApp } from '@/constant/my-app';

function FooterPage() {
  const router = useRouter();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: appColor.backgroundLight,
        boxShadow: 'none'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          paddingY: 4
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,

                color: 'black'
              }}
            >
              Support
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Coronavirus (COVID-19)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Manage your trips
            </Typography>
            <Typography
              onClick={() => router.push(`/view/support`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Contact Customer Service
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,

                color: 'black'
              }}
            >
              Discover
            </Typography>
            <Typography
              onClick={() => router.push(`/view/place`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Seasonal and holiday deals
            </Typography>
            <Typography
              onClick={() => router.push(`/view/billing`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              JabJit Booking for Business
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: 'black'
              }}
            >
              Terms and settings
            </Typography>
            <Typography
              onClick={() => router.push(`/view/privacy-policy`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              onClick={() => router.push(`/view/terms-and-conditions`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Terms and conditions
            </Typography>
            <Typography
              onClick={() => router.push(`/view/cookie-policy`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Cookie Policy
            </Typography>
            <Typography
              onClick={() => router.push(`/view/code-of-conduct`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Code of Conduct
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,

                color: 'black'
              }}
            >
              Partners
            </Typography>
            <Typography
              onClick={() => router.push(`https://archtist-studio.xyz`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Extranet login
            </Typography>
            <Typography
              onClick={() => router.push(`https://archtist-studio.xyz`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Partner help
            </Typography>
            <Typography
              onClick={() => router.push(`https://archtist-studio.xyz`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              List your property
            </Typography>
            <Typography
              onClick={() => router.push(`https://archtist-studio.xyz`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Become an affiliate
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 1,

                color: 'black'
              }}
            >
              About
            </Typography>
            <Typography
              onClick={() => router.push(`https://archtist-studio.xyz`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              About {MyApp.domain}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              How we work
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Press centre
            </Typography>
            <Typography
              onClick={() => router.push(`/view/billing`)}
              variant="body2"
              sx={{
                mb: 0.5,
                cursor: 'pointer',

                color: 'black'
              }}
            >
              Corporate contact
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          background: appColor.black,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img
            src="/static/cambodia.png"
            alt="Flag"
            style={{ width: '24px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            KHR
          </Typography>
        </Box>
        <Typography variant="body2">© 2025 JabJit Booking</Typography>
      </Box>
    </AppBar>
  );
}

export default FooterPage;
