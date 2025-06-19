import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import appColor from '@/theme/appColor';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import PricingPlanCard, { AdvancedPlan, ProPlan, StarterPlan } from './pricing';
import { useEffect } from 'react';
import { HttpClient } from '@/services/http-client';

const BillingPage = () => {
  const title = 'Billing Page';
  const http = new HttpClient();

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
          py: 10
        }}
      >
        <Typography variant="h3" gutterBottom>
          Top up your plan and join our business network.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            py: 5,
            gap: 2,
            px: 2,
            textAlign: 'center',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 2 }}>
            <PricingPlanCard {...StarterPlan} />
            <PricingPlanCard {...ProPlan} />
            <PricingPlanCard {...AdvancedPlan} />
          </Box>
        </Box>
      </Box>
      <FooterPage />
    </>
  );
};
BillingPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default BillingPage;
