import Head from "next/head";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  GitHub,
  LinkedIn,
  Email,
  Download,
  ArrowForward,
} from "@mui/icons-material";

import appColor from "@/theme/appColor";
import HeaderPage from "@/layouts/PageLayout/Header";
import FooterPage from "@/layouts/PageLayout/Fooder";
import { TextWiget } from "@/components/typographys";
import { MySkill } from "@/database/skill";
import { services } from "@/database/service";
import { projects } from "@/database/project";

const GlassCard = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
}));

const AnimatedButton = styled(Button)(() => ({
  borderRadius: "50px",
  padding: "12px 30px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
}));

const SkillChip = styled(Chip)(() => ({
  margin: "4px",
  padding: "8px",
  fontSize: "14px",
  fontWeight: 500,
  background: "rgba(255, 255, 255, 0.1)",
  color: appColor.white,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
  },
}));

function HomePage() {
  const title = "Portfolio - Full Stack Developer";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box sx={{ background: appColor.background, height: "100%", pt: 20 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{ color: appColor.white, position: "relative", zIndex: 1 }}
              >
                <TextWiget variant="h6" sx={{ mb: 2, letterSpacing: "0.1em" }}>
                  HELLO, I'M
                </TextWiget>
                <TextWiget
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 700,
                    mb: 2,
                    background: "linear-gradient(45deg, #fff, #f0f0f0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                  }}
                >
                  SENG VICHET Developer
                </TextWiget>
                <TextWiget
                  variant="h4"
                  sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, mb: 3 }}
                >
                  Full Stack Developer
                </TextWiget>
                <TextWiget
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    mb: 4,
                    lineHeight: 1.6,
                    maxWidth: 500,
                  }}
                >
                  I create exceptional digital experiences through clean code
                  and innovative design. Let's build something amazing together.
                </TextWiget>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <AnimatedButton
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: appColor.white,
                      color: appColor.primary,
                      "&:hover": { background: appColor.white },
                    }}
                  >
                    View My Work
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{
                      borderColor: appColor.white,
                      color: appColor.white,
                      "&:hover": { background: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    Download CV
                  </AnimatedButton>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {[GitHub, LinkedIn, Email].map((Icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        color: appColor.white,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: `0 20px 40px ${appColor.white}`,
                        },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  src="/profile-image.jpg"
                  alt="Profile"
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    border: `4px solid ${appColor.textgray}`,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{ py: 8, background: "rgba(255,255,255,0.02)" }}>
          <Container maxWidth="lg">
            <TextWiget
              align="center"
              sx={{
                mb: 6,
                color: appColor.white,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Skills & Technologies
            </TextWiget>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
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
            <TextWiget
              align="center"
              sx={{
                mb: 6,
                color: appColor.white,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              What I Do
            </TextWiget>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <GlassCard>
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Box sx={{ mb: 3 }}>{service.icon}</Box>
                      <TextWiget
                        variant="h5"
                        sx={{ mb: 2, color: appColor.white, fontWeight: 600 }}
                      >
                        {service.title}
                      </TextWiget>
                      <TextWiget
                        variant="body1"
                        sx={{ color: appColor.lightgray, lineHeight: 1.6 }}
                      >
                        {service.description}
                      </TextWiget>
                    </CardContent>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <TextWiget
              align="center"
              sx={{
                mb: 6,
                color: appColor.white,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              Recent Projects
            </TextWiget>
            <Grid container spacing={4}>
              {projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <GlassCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <TextWiget bold>{project.title}</TextWiget>
                        <Chip
                          label={project.status}
                          size="small"
                          sx={{
                            background:
                              project.status === "Live"
                                ? appColor.live
                                : project.status === "In Progress"
                                ? appColor.inProgress
                                : appColor.completed,
                            color: appColor.white,
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <TextWiget
                        sx={{
                          color: appColor.lightgray,
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {project.description}
                      </TextWiget>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 3,
                        }}
                      >
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              background: appColor.textgray,
                              color: appColor.white,
                              fontSize: "12px",
                            }}
                          />
                        ))}
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowForward />}
                        sx={{
                          color: appColor.white,
                          borderColor: appColor.textgray,
                          "&:hover": {
                            borderColor: appColor.white,
                            background: appColor.textgray,
                          },
                        }}
                      >
                        View Project
                      </Button>
                    </CardContent>
                  </GlassCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: "center" }}>
              <TextWiget sx={{ mb: 3, fontSize: 20, fontWeight: 700 }}>
                Ready to Start Your Project?
              </TextWiget>
              <TextWiget sx={{ mb: 4, color: appColor.lightgray }}>
                Let's discuss how we can bring your ideas to life
              </TextWiget>
              <AnimatedButton
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  color: appColor.white,
                  px: 4,
                  py: 2,
                }}
              >
                Get In Touch
              </AnimatedButton>
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
