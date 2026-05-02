import Head from 'next/head';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  GitHub,
  LinkedIn,
  Email,  
  Download,
  ArrowForward
} from '@mui/icons-material';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { MySkill } from '@/database/skill';
import { services } from '@/database/service';
import { projects } from '@/database/project';
import { TextWidget } from '@/components/Text';
import { ButtonWidget } from '@/components/Button';

const GlassCard = styled(Card)(() => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
  }
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: '4px',
  padding: '8px',
  fontSize: '14px',
  fontWeight: 500,
  background: theme.colors.alpha.white[20],
  color: theme.mode.text.default,
  border: '1px solid rgba(255, 255, 255, 0.2)'
}));

function HomePage() {
  const theme = useTheme();
  const title = 'Portfolio - Full Stack Developer';

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
                <TextWidget
                  variant="h4"
                  sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 3 }}
                >
                  Full Stack Developer
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
                  I create exceptional digital experiences through clean code
                  and innovative design. Let's build something amazing together.
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
                  {[GitHub, LinkedIn, Email].map((Icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        color: theme.mode.text.default,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 40px ${theme.mode.text.default}`
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
                <Avatar
                  src="/profile-image.jpg"
                  alt="Profile"
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    border: `2px solid ${theme.mode.text.disabled}`,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ py: 8, background: 'rgba(255,255,255,0.02)' }}>
          <Container maxWidth="lg">
            <TextWidget
              bold
              size={20}
              align="center"
              sx={{
                mb: 6
              }}
            >
              Skills & Technologies
            </TextWidget>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1
              }}
            >
              {MySkill.map((skill, index) => (
                <SkillChip key={index} label={skill} />
              ))}
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <TextWidget
              align="center"
              bold
              size={20}
              sx={{
                mb: 6
              }}
            >
              What I Do
            </TextWidget>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <GlassCard>
                    <CardContent
                      sx={{ p: 4, textAlign: 'center', cursor: 'pointer' }}
                    >
                      <Box
                        sx={{
                          color: theme.mode.text.default,
                          mb: 3
                        }}
                      >
                        {service.icon}
                      </Box>
                      <TextWidget
                        bold
                        sx={{
                          mb: 2
                        }}
                      >
                        {service.title}
                      </TextWidget>
                      <TextWidget
                        variant="body1"
                        sx={{
                          lineHeight: 1.6
                        }}
                      >
                        {service.description}
                      </TextWidget>
                    </CardContent>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <TextWidget
              align="center"
              bold
              size={20}
              sx={{
                mb: 6
              }}
            >
              Recent Projects
            </TextWidget>
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <GlassCard>
                    <CardContent sx={{ p: 4, cursor: 'pointer' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 2
                        }}
                      >
                        <TextWidget bold>{project.title}</TextWidget>
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            background:
                              project.status === 'Live'
                                ? theme.colors.info.main
                                : project.status === 'In Progress'
                                ? theme.colors.warning.main
                                : project.status === 'Soon'
                                ? theme.colors.warning.main
                                : theme.colors.success.main,
                            color: theme.mode.text.default,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>
                      <TextWidget
                        sx={{
                          color: theme.mode.text.disabled,
                          mb: 3,
                          lineHeight: 1.6
                        }}
                      >
                        {project.description}
                      </TextWidget>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                          mb: 3
                        }}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              background: theme.colors.alpha.white[20],
                              color: theme.mode.text.default,
                              fontSize: '12px',
                              border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

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
