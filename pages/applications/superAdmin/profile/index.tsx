import Head from 'next/head';
import Footer from '@/components/Footer';
import { Grid, Container } from '@mui/material';
import ProfileCover from '@/content/Management/SuperAdmin/details/ProfileCover';
import RecentActivity from '@/content/Management/SuperAdmin/details/RecentActivity';
import MyCards from '@/content/Management/SuperAdmin/details/MyCards';
import PopularTags from '@/content/Management/SuperAdmin/details/PopularTags';

function ManagementUserProfile() {
  return (
    <>
      <Head>
        <title>User Details - Profile</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
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
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
