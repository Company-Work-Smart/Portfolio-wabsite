import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import appColor from '@/theme/appColor';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { MyApp } from '@/constant/my-app';
import { useRouter } from 'next/router';
import PaymentIcon from '@mui/icons-material/Payment';

const priceMap: { [key: string]: string } = {
  '68fe533d-33dd-43f5-be8a-17fcd68bd4b7_$12': 'pri_01jpccwp6xqq7328yvx5qa7jks',
  '56d983fc-0ca4-46cf-8458-c40f10471e4f_$100': 'pri_01jpcaypxzr93d9gy0e4qq91yd',
  '32ae3cbd-fac8-4d23-ba97-d3f325ee559d_$290': 'pri_01jpccyy5vwwv67brn713qq8pd'
};

const VerifyCardPage = () => {
  const title = 'VerifyCard Page';
  const http = new HttpClient();
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useContext(SnackbarContext);
  const [paddle, setPaddle] = useState<Paddle>();
  const [idPrice, setIdPrice] = useState<string | null>(null);

  const normalizedId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: MyApp.tokenPayment
    })
      .then((paddleInstance) => setPaddle(paddleInstance))
      .catch((e) =>
        showSnackbar({
          type: 'error',
          message: `Paddle Init Error: ${e}`
        })
      );
  }, [showSnackbar]);

  const handleCheckout = (priceId: string) => {
    if (!paddle)
      return showSnackbar({
        type: 'warning',
        message: `Paddle not initialized`
      });

    paddle.Checkout.open({
      items: [
        {
          priceId,
          quantity: 1
        }
      ],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: `${MyApp.urldomain}/view/billing/${idPrice}`
      }
    });
  };

  useEffect(() => {
    const priceId = priceMap[normalizedId];
    if (priceId) {
      setIdPrice(priceId);
    }
  }, [normalizedId]);

  const get = async () => {
    await http.get(`UserPlace`);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box
        sx={{
          backgroundColor: appColor.background,
          textAlign: 'center',
          py: 10,
          px: 2
        }}
      >
        <Typography variant="h3" gutterBottom>
          Top-up Plan for Business Network
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Unlock premium features, advanced tools, and dedicated support with
          ax`` one-time purchase or subscription plan that fits your needs.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<PaymentIcon />}
          sx={{ px: 4, py: 1.5, borderRadius: '30px' }}
          onClick={() => handleCheckout(idPrice)}
        >
          Pay Now
        </Button>
      </Box>
      <FooterPage />
    </>
  );
};

VerifyCardPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default VerifyCardPage;
