import { useEffect, useState } from 'react';
import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import appColor from '@/theme/appColor';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { HttpClient } from '@/services/http-client';

const PaddingPage = () => {
  const title = '5-Minute Wait';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;

  const [timeLeft, setTimeLeft] = useState(300);
  const [isDone, setIsDone] = useState(false);

  const getIdentificationCard = async () => {
    const res = await http.get('UserIdentificationCard');
    if (Array.isArray(res) && res[0]?.status === 'Approved') {
      await router.push(`/view/billing/payment/${id}?refresh=true`);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsDone(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    getIdentificationCard();
    const interval = setInterval(() => {
      getIdentificationCard();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: appColor.background,
          py: 10,
          px: 2,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom>
          Waiting for 5mn
        </Typography>
        {!isDone ? (
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              color: appColor.primary,
              fontSize: '6rem'
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        ) : (
          <Typography variant="h4" color="success.main" sx={{ mt: 4 }}>
            Done!
          </Typography>
        )}
      </Box>
      <FooterPage />
    </>
  );
};

PaddingPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default PaddingPage;
