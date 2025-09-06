import Head from "next/head";
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
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Send, Schedule, CheckCircle, AccessTime } from "@mui/icons-material";
import { useState } from "react";
import { TextWiget } from "@/components/typographys";
import appColor from "@/theme/appColor";
import HeaderPage from "@/layouts/PageLayout/Header";
import { availability, contact, social } from "@/database/contact";
import FooterPage from "@/layouts/PageLayout/Fooder";

const ContactCard = styled(Card)(() => ({
  background: appColor.dark,
  backdropFilter: "blur(20px)",
  border: `1px solid ${appColor.dark}`,
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 25px 50px ${appColor.dark}`,
    border: `1px solid ${appColor.dark}`,
  },
}));

const SocialButton = styled(IconButton)(() => ({
  background: `${appColor.dark}`,
  color: appColor.white,
  margin: "8px",
  width: 56,
  height: 56,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px) scale(1.1)",
    boxShadow: `0 10px 25px ${appColor.black}`,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    background: appColor.black,
    color: appColor.white,
    borderRadius: "12px",
    "& fieldset": {
      borderColor: appColor.dark,
    },
    "&:hover fieldset": {
      borderColor: appColor.dark,
    },
    "&.Mui-focused fieldset": {
      borderColor: appColor.textpurple,
    },
  },
  "& .MuiInputLabel-root": {
    color: appColor.lightgray,
    "&.Mui-focused": {
      color: appColor.textpurple,
    },
  },
}));

const SubmitButton = styled(Button)(() => ({
  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
  color: "white",
  padding: "12px 40px",
  borderRadius: "25px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #5856eb, #7c3aed)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
  },
}));

function HomePage() {
  const title = "Contact Me";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          background: appColor.background,
          height: "100%",
          paddingTop: 4,
          paddingBottom: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <TextWiget
              bold
              size={20}
              sx={{
                color: appColor.textpurple,
                mb: 2,
              }}
            >
              Let's Work Together
            </TextWiget>
            <TextWiget
              size={15}
              sx={{
                color: appColor.lightgray,
                maxWidth: 600,
                margin: "0 auto",
                mb: 3,
              }}
            >
              Have a project in mind? I'd love to hear about it. Drop me a line
              and let's discuss how we can bring your ideas to life.
            </TextWiget>
            <Chip
              icon={<CheckCircle />}
              label="Available for new projects"
              sx={{
                background: `linear-gradient(45deg, ${appColor.green},${appColor.green1})`,
                color: appColor.white,
                fontWeight: 600,
                px: 2,
                py: 1,
              }}
            />
          </Box>

          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <ContactCard>
                <CardContent sx={{ p: 4 }}>
                  <TextWiget
                    bold
                    size={20}
                    sx={{
                      color: appColor.textwhite,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Send sx={{ color: "#6366f1" }} />
                    Send Message
                  </TextWiget>

                  {isSubmitted && (
                    <Alert
                      severity="success"
                      sx={{
                        mb: 3,
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      Thank you! Your message has been sent successfully. I'll
                      get back to you soon.
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
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
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          placeholder="Tell me about your project, timeline, and how I can help you..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SubmitButton
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? "Message Sent!" : "Send Message"}
                        </SubmitButton>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </ContactCard>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Quick Contact */}
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWiget
                      bold
                      size={20}
                      sx={{
                        color: appColor.textwhite,
                        mb: 3,
                        textAlign: "center",
                      }}
                    >
                      Quick Contact
                    </TextWiget>

                    {contact.map((method, index) => (
                      <Box
                        key={index}
                        component={method.action ? "a" : "div"}
                        href={method.action}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          mb: 2,
                          borderRadius: 2,
                          background: appColor.dark1,
                          border: `1px solid ${appColor.dark}`,
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: appColor.textgray,
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        {method.icon}
                        <Box>
                          <TextWiget bold sx={{ color: appColor.textwhite }}>
                            {method.title}
                          </TextWiget>
                          <TextWiget sx={{ color: appColor.lightgray }}>
                            {method.value}
                          </TextWiget>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </ContactCard>

                {/* Social Media */}
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWiget
                      bold
                      size={20}
                      sx={{
                        mb: 3,
                        textAlign: "center",
                      }}
                    >
                      Follow Me
                    </TextWiget>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {social.map((social, index) => (
                        <SocialButton
                          key={index}
                          onClick={() => window.open(social.url, "_blank")}
                          sx={{
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: `0 20px 40px ${appColor.white}`,
                            },
                          }}
                        >
                          {social.icon}
                        </SocialButton>
                      ))}
                    </Box>
                  </CardContent>
                </ContactCard>

                {/* Availability */}
                <ContactCard>
                  <CardContent sx={{ p: 3 }}>
                    <TextWiget
                      bold
                      size={20}
                      sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <AccessTime sx={{ color: appColor.textpurple }} />
                      Availability
                    </TextWiget>

                    {availability.map((slot, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <TextWiget bold>{slot.day}</TextWiget>
                        <TextWiget sx={{ color: appColor.lightgray }}>
                          {slot.time}
                        </TextWiget>
                        {index < availability.length - 1 && (
                          <Divider
                            sx={{ mt: 1, background: "rgba(255,255,255,0.1)" }}
                          />
                        )}
                      </Box>
                    ))}
                  </CardContent>
                </ContactCard>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Paper
              sx={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 3,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              <TextWiget
                bold
                size={15}
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Schedule sx={{ color: appColor.textpurple }} />
                Response Time
              </TextWiget>
              <TextWiget
                sx={{
                  color: appColor.lightgray,
                  lineHeight: 1.6,
                }}
              >
                I typically respond to all inquiries within 24 hours. For urgent
                matters, please don't hesitate to call or send a WhatsApp
                message.
              </TextWiget>
            </Paper>
          </Box>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
}

HomePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default HomePage;
