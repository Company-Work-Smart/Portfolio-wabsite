import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import FooterPage from '@/layouts/PageLayout/Fooder';
import HeaderPage from '@/layouts/PageLayout/Header';
import { useRouter } from 'next/router';
import appColor from '@/theme/appColor';

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          background: appColor.background,
          textAlign: 'center'
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
                width: 150,
                borderRadius: 20,
                background: appColor.pink,
                height: 40
              }}
            >
              Cookie Policy
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
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left'
            }}
          >
            INTRODUCTION
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            Dribbble Holdings Limited (the “Dribbble Group”) is comprised of
            several companies, which together provide tools to help the world's
            designers to create, develop and promote their talents (each a
            “Service” and collectively, the “Services”). The companies within
            the Dribbble Group each act as the data controller for personal data
            processed in respect of their Services (each a “Group Company” and
            together the “Group Companies”) and referred to as “our,” “we,” or
            “us” below. The data controllers for each Service are:
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            We know that you care about how your information is used and shared.
            This Privacy Policy provides details of the way in which the Group
            Companies process personal data in line with their obligations under
            relevant data protection law, including the European Union’s General
            Data Protection Regulation (the “GDPR”), the California Consumer
            Privacy Act (the “CCPA”), and other applicable laws (collectively,
            “Data Protection Law”).
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            This Privacy Policy explains what information of yours will be
            collected by the Group Companies when you use our Services, how the
            information will be used, and how you can control the collection,
            correction and/or deletion of information. Note that certain third
            parties may be able to identify you across sites and services and
            over time using the information they process, however, any such
            processing not done at the direction of us is outside the scope of
            this Privacy Policy. We are not responsible for the privacy
            policies, content or security of any linked third party websites or
            services. We recommend that you check the privacy and security
            policies of each and every website and service that you visit.
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            INFORMATION WE PROCESS.
          </Typography>

          <Typography
            sx={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            The types of information we process depends on how you use our
            Services. Many of our Services require users to set up an account,
            which involves the collection and processing of your name and email
            address. Other Services may require the collection of additional
            information. For example, Dribbble helps to connect its community of
            designers with people and companies in need of their skills. In
            order to do so, Dribbble collects payments data and other
            information required to comply with relevant legal obligations.
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              display: 'flex',
              justifyContent: 'start',
              textAlign: 'left',
              pt: 2
            }}
          >
            The following table explains the types of information we collect and
            how we collect it. These categories of data may collectively be
            referred to as “Your Information”.
          </Typography>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
};

PrivacyPolicy.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default PrivacyPolicy;
