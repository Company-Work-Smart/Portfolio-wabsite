import Head from 'next/head';
import { Box, Container, Grid, IconButton, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Email, Download, ArrowForward } from '@mui/icons-material';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { TextWidget } from '@/components/Text';
import { ButtonWidget } from '@/components/Button';
import { AvatarWidget } from '@/components/Avatar';
import RecentProject from '@/content/Portfolio/Homefeed/project';
import { SkillSection } from '@/content/Portfolio/Homefeed/skill';

function HomePage() {
  const theme = useTheme();
  const title = 'My Portfolio';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          backgroundColor: theme.mode.background.default,
          pt: 20
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid>
              <Box
                sx={{
                  color: theme.mode.text.default,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <TextWidget variant="h6" sx={{ mb: 2, letterSpacing: '0.1em' }}>
                  HELLO, I'M
                </TextWidget>
                <TextWidget
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                    background: theme.mode.text.default,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2
                  }}
                >
                  SENG VICHET Developer
                </TextWidget>
                <TextWidget variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 3 }}>
                  System Development
                </TextWidget>
                <TextWidget
                  size={15}
                  sx={{
                    color: theme.mode.text.disabled,
                    mb: 4,
                    lineHeight: 1.6,
                    maxWidth: 500
                  }}
                >
                  I create exceptional digital experiences through clean code and innovative design.
                  Let's build something amazing together.
                </TextWidget>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <ButtonWidget variant="contained" endIcon={<ArrowForward />}>
                    View My Work
                  </ButtonWidget>
                  <ButtonWidget variant="outlined" startIcon={<Download />}>
                    Download CV
                  </ButtonWidget>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {[GitHub, LinkedIn, Email].map((Icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        color: theme.mode.text.default,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 40px ${theme.mode.shadow[50]}`
                        }
                      }}
                    >
                      <Icon />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <AvatarWidget
                  src="/profile-image.jpg"
                  alt="Project"
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    border: `1px solid ${theme.mode.text.disabled}`,
                    boxShadow: `0 20px 60px ${theme.mode.shadow[50]}`
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        <SkillSection />
        <RecentProject />
        <Box sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <TextWidget bold size={20} sx={{ mb: 3 }}>
                Ready to Start Your Project?
              </TextWidget>
              <TextWidget sx={{ mb: 4 }}>
                Let's discuss how we can bring your ideas to life
              </TextWidget>
              <ButtonWidget radius="50px" variant="outlined">
                Get In Touch
              </ButtonWidget>
            </Box>
          </Container>
        </Box>
      </Box>
      <FooterPage />
    </>
  );
}

HomePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default HomePage;
