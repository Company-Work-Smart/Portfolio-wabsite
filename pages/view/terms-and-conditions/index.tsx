import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import { useRouter } from 'next/router';
import appColor from '@/theme/appColor';
import { MyData } from '@/hook/data/data2';

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          background: appColor.background,
          textAlign: 'center',
          pb: 4
        }}
      >
        <Box
          sx={{
            background: appColor.backgroundLight,
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 60
          }}
        >
          {[
            'Terms and Conditions',
            'Privacy Policy',
            'Cookie Policy',
            'Code of Conduct'
          ].map((item) => (
            <Typography
              key={item}
              variant="h6"
              sx={{
                alignItems: 'center',
                color: 'black',
                cursor: 'pointer',
                transition:
                  'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                '&:hover': { color: 'black', transform: 'scale(1.05)' }
              }}
              onClick={() =>
                router.push(`/view/${item.toLowerCase().replace(/ /g, '-')}`)
              }
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Container sx={{ pt: '80px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                borderRadius: 20,
                background: appColor.pink,
                height: 40
              }}
            >
              Terms and Conditions
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pt: 5,
              pb: 4,
              textAlign: 'center',
              px: 3
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontSize: { xs: '1.2rem', sm: '2rem' }, fontWeight: 700 }}
            >
              Our Commitment to Protecting Your Privacy
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              paragraph
              sx={{
                fontSize: { xs: '0.8rem', sm: '1.1rem' },
                mx: 'auto',
                px: 2
              }}
            >
              Learn more about how JabJit collects and uses data and your rights
              as a JabJit user.
            </Typography>
          </Box>
          {MyData.map((item, index) => (
            <>
              <Typography
                key={index}
                variant="h4"
                gutterBottom
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'left',
                  pt: 5
                }}
              >
                {item.title.toUpperCase()}
              </Typography>
              <Typography
                key={index}
                sx={{
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'start',
                  textAlign: 'left',
                  pt: 1
                }}
              >
                {item.description}
              </Typography>
            </>
          ))}
        </Container>
      </Box>
      <FooterPage />
    </>
  );
};

PrivacyPolicy.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default PrivacyPolicy;
