import Head from 'next/head';
import Footer from '@/components/Footer';
import { Grid, Container, useTheme } from '@mui/material';
import ProfileCover from '@/content/Management/Users/details/ProfileCover';
import RecentActivity from '@/content/Management/Users/details/RecentActivity';
import MyCards from '@/content/Management/Users/details/MyCards';

function UserProfile() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>User Details - Profile</title>
      </Head>
      <Container
        sx={{ mt: 3, color: theme.palette.background.default }}
        maxWidth="lg"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <ProfileCover />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <MyCards />
          </Grid>         
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default UserProfile;
