import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Typography,
  Button,
  Box,
} from '@mui/material';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { HttpClient } from '@/services/http-client';
import appColor from '@/theme/appColor';
import RoomPage from '../src/content/Widgets/Homepage/Room';
import ProvincePage from '../src/content/Widgets/Homepage/Province';
import ListTime from '@/content/Widgets/Homepage/ListTime';
import { useRouter } from 'next/router';

function HomePage() {
  const title = 'HomePage';
  const http = new HttpClient();
  const router = useRouter();
  const [datasource, setDatasource] = useState([]);
  const unique = new Set();

  const getPlace = async () => {
    const res = await http.get(`AnonymousPlace`);
    setDatasource(res);
  };

  const handleProvince = (id: string) => {
    router.push(`/view/place/${id}`);
  };

  useEffect(() => {
    getPlace();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 5, sm: 10 },
          backgroundColor: appColor.background
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: '1.2rem', sm: '2rem' }, fontWeight: 700 }}
        >
          Discover the Best Booking <br />
          Experiences in Cambodia and Beyond.
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          paragraph
          sx={{
            fontSize: { xs: '0.8rem', sm: '1rem' },
            maxWidth: 700,
            mx: 'auto',
            px:2
          }}
        >
          Explore your trip with the most talented and accomplished reservation
          experts, ready to assist with all your booking needs.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            mt: 4,
            px: { xs: 2, sm: 5 },
            gap: 2
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Popular
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
              width: '100%'
            }}
          >
            {datasource?.slice(0, 7)?.map((place, index) => {
              if (unique.has(place?.category)) return null;
              unique.add(place?.category);
              return (
                <Button
                  key={index}
                  sx={{
                    color: appColor.textgray,
                    borderRadius: '10px',
                    mx: 1,
                    width: 'auto'
                  }}
                  onClick={() => handleProvince(place.id)}
                >
                  <Typography variant="h6" gutterBottom>
                    {place.category}
                  </Typography>
                </Button>
              );
            })}
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: '10px',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Filters
          </Button>
        </Box>

        <ProvincePage />
        <RoomPage />
        <ListTime />
      </Box>
      <FooterPage />
    </>
  );
}

HomePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default HomePage;
