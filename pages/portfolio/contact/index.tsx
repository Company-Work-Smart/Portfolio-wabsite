import Head from 'next/head';
import { Box, Container, Grid, Card, Paper, Chip, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Schedule, CheckCircle } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { themeColors } from '@/theme/base';
import { TextWidget } from '@/components/Text';
import SendMessage from '@/content/Portfolio/Contact/message';
import Information from '@/content/Portfolio/Contact/information';

function ContactPage() {
  const title = 'Contact Me';
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const SkeletonCard = () => (
    <Card sx={{ borderRadius: '20px', p: 4 }}>
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3 }} />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 2, borderRadius: '10px' }} />
      ))}
      <Skeleton
        variant="rectangular"
        height={48}
        width="40%"
        sx={{ mx: 'auto', borderRadius: '25px' }}
      />
    </Card>
  );

  const SkeletonInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {[1, 2, 3].map((i) => (
        <Card key={i} sx={{ borderRadius: '20px', p: 3 }}>
          <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
          {[1, 2, 3].map((j) => (
            <Skeleton
              key={j}
              variant="rectangular"
              height={60}
              sx={{ mb: 1, borderRadius: '12px' }}
            />
          ))}
        </Card>
      ))}
    </Box>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ background: theme.mode.background.default, py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width={300} height={44} sx={{ mx: 'auto', mb: 2 }} />
                <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto', mb: 2 }} />
                <Skeleton
                  variant="rounded"
                  width={220}
                  height={32}
                  sx={{ mx: 'auto', borderRadius: 4 }}
                />
              </>
            ) : (
              <>
                <TextWidget bold size={22} sx={{ mb: 2 }}>
                  Let's Work Together
                </TextWidget>
                <TextWidget
                  size={16}
                  sx={{ color: theme.mode.text.disabled, maxWidth: 600, mx: 'auto', mb: 3 }}
                >
                  Have a project in mind? I'd love to hear about it. Drop me a line and let's
                  discuss how we can bring your ideas to life.
                </TextWidget>
                <Chip
                  icon={<CheckCircle />}
                  label="Available for new projects"
                  sx={{
                    background: themeColors.green,
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    px: 2,
                    py: 1
                  }}
                />
              </>
            )}
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              {loading ? <SkeletonCard /> : <SendMessage />}
            </Grid>

            <Grid item xs={12} md={6}>
              {loading ? <SkeletonInfo /> : <Information />}
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Paper
              sx={{
                background: theme.palette.background.default,
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                p: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              {loading ? (
                <>
                  <Skeleton variant="text" width={200} height={28} sx={{ mx: 'auto', mb: 2 }} />
                  <Skeleton variant="text" width={400} height={48} sx={{ mx: 'auto' }} />
                </>
              ) : (
                <>
                  <TextWidget
                    bold
                    size={16}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Schedule /> Response Time
                  </TextWidget>
                  <TextWidget sx={{ lineHeight: 1.6 }}>
                    I typically respond to all inquiries within 24 hours. For urgent matters, please
                    don't hesitate to call or send a WhatsApp message.
                  </TextWidget>
                </>
              )}
            </Paper>
          </Box>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
}

ContactPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default ContactPage;
