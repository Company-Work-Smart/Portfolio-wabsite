import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Paper,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send, Schedule, CheckCircle, AccessTime } from '@mui/icons-material';
import { useState } from 'react';
import { TextWidget } from '@/components/typographys';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { availability, contact, social } from '@/database/contact';

// Styled Components
const ContactCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  transition: 'all 0.3s ease'
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: 8,
  width: 56,
  height: 56,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px) scale(1.1)'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: '12px'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: theme.palette.text.primary,
  color: theme.palette.background.default,
  padding: '12px 40px',
  borderRadius: '25px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.text.primary,
    transform: 'translateY(-2px)'
  }
}));

function ContactPage() {
  const title = 'Contact Me';
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {};

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          background: theme.palette.background.default,
          minHeight: '100vh',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <TextWidget bold size={22} sx={{ mb: 2 }}>
              Let's Work Together
            </TextWidget>
            <TextWidget
              size={16}
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                mb: 3
              }}
            >
              Have a project in mind? I'd love to hear about it. Drop me a line
              and let's discuss how we can bring your ideas to life.
            </TextWidget>
            <Chip
              icon={<CheckCircle />}
              label="Available for new projects"
              sx={{
                background: appColor.green,
                color: theme.palette.text.primary,
                fontWeight: 600,
                px: 2,
                py: 1
              }}
            />
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <ContactCard>
                <CardContent sx={{ p: 4 }}>
                  <TextWidget
                    bold
                    size={20}
                    sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    Send Message
                  </TextWidget>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          required
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInput}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              '& fieldset': {
                                borderColor: theme.palette.text.primary
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: '2px'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          required
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInput}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              '& fieldset': {
                                borderColor: theme.palette.text.primary
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: '2px'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          required
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInput}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              '& fieldset': {
                                borderColor: theme.palette.text.primary
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: '2px'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleInput}
                          required
                          placeholder="Tell me about your project, timeline, and how I can help you..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              '& fieldset': {
                                borderColor: theme.palette.text.primary
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: '2px'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <SubmitButton type="submit" startIcon={<Send />}>
                          Send Message
                        </SubmitButton>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </ContactCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWidget
                      bold
                      size={20}
                      sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      Quick Contact
                    </TextWidget>
                    {contact.map((method, index) => (
                      <Box
                        key={index}
                        component={method.action ? 'a' : 'div'}
                        href={method.action}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          textDecoration: 'none',
                          background: theme.palette.secondary.main,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: theme.palette.secondary.main
                          }
                        }}
                      >
                        {method.icon}
                        <Box>
                          <TextWidget bold>{method.title}</TextWidget>
                          <TextWidget>{method.value}</TextWidget>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </ContactCard>
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWidget
                      bold
                      size={20}
                      sx={{ mb: 3, textAlign: 'center' }}
                    >
                      Follow Me
                    </TextWidget>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      {social.map((socialItem, index) => (
                        <SocialButton
                          key={index}
                          onClick={() => window.open(socialItem.url, '_blank')}
                        >
                          {socialItem.icon}
                        </SocialButton>
                      ))}
                    </Box>
                  </CardContent>
                </ContactCard>

                {/* Availability */}
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWidget
                      bold
                      size={20}
                      sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <AccessTime />
                      Availability
                    </TextWidget>
                    {availability.map((slot, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <TextWidget bold>{slot.day}</TextWidget>
                        <TextWidget
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {slot.time}
                        </TextWidget>
                        {index < availability.length - 1 && (
                          <Divider
                            sx={{
                              mt: 1,
                              background: theme.palette.primary.main
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </CardContent>
                </ContactCard>
              </Box>
            </Grid>
          </Grid>

          {/* Response Time */}
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
                I typically respond to all inquiries within 24 hours. For urgent
                matters, please don't hesitate to call or send a WhatsApp
                message.
              </TextWidget>
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
