import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { styled } from "@mui/material/styles";
import {
  School,
  EmojiEvents,
  MenuBook,
  Language,
  CalendarToday,
  LocationOn,
  TrendingUp,
} from "@mui/icons-material";
import { TextWiget } from "@/components/typographys";
import appColor from "@/theme/appColor";
import HeaderPage from "@/layouts/PageLayout/Header";
import {
  certifications,
  courses,
  education,
  languages,
} from "@/database/education";
import { skills } from "@/database/skill";
import FooterPage from "@/layouts/PageLayout/Fooder";

const EducationCard = styled(Card)(() => ({
  background: appColor.black,
  backdropFilter: "blur(20px)",
  border: `1px solid ${appColor.black}`,
  borderRadius: "20px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 25px 50px ${appColor.black}`,
    border: `1px solid ${appColor.black}`,
  },
}));

const TimelineCard = styled(Paper)(() => ({
  background: appColor.black,
  backdropFilter: "blur(15px)",
  border: `1px solid ${appColor.black}`,
  borderRadius: "15px",
  padding: "24px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: appColor.dark,
    transform: "translateX(10px)",
  },
}));

const SkillProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: appColor.black,
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
  },
}));

const CertificationChip = styled(Chip)(() => ({
  background: `linear-gradient(45deg, ${appColor.green} , ${appColor.green1})`,
  color: appColor.white,
  fontWeight: 600,
  margin: "4px",
  "&:hover": {
    background: `linear-gradient(45deg, ${appColor.green} , ${appColor.green1})`,
  },
}));

function HomePage() {
  const title = "Portfolio - Education";

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
                mb: 2,
                color: appColor.textpurple,
              }}
            >
              Education & Qualifications
            </TextWiget>
            <TextWiget
            size={15}
              sx={{
                color: appColor.lightgray,
              }}
            >
              My academic journey and professional development path
            </TextWiget>
          </Box>

          {/* Education Timeline */}
          <Box sx={{ mb: 8 }}>
            <TextWiget
              bold
              size={20}
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <School sx={{ color: appColor.textpurple }} />
              Academic Background
            </TextWiget>

            <Timeline position="alternate">
              {education.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        background: appColor.white,
                        padding: 1.5,
                      }}
                    >
                      {item.icon}
                    </TimelineDot>
                    {index < education.length && (
                      <TimelineConnector
                        sx={{
                          background:
                            "linear-gradient(to bottom, #6366f1, #8b5cf6)",
                          width: 3,
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <TimelineCard>
                      {/* Header: Degree, Institution, GPA */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <TextWiget bold size={15}>
                            {item.degree}
                          </TextWiget>
                          <TextWiget sx={{ color: appColor.textpurple }}>
                            {item.institution}
                          </TextWiget>
                        </Box>
                        <Chip
                          label={`GPA: ${item.gpa}`}
                          sx={{
                            background:
                              "linear-gradient(45deg, #10b981, #059669)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      {/* Period & Location */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CalendarToday
                            sx={{
                              fontSize: 16,
                              color: appColor.lightgray,
                            }}
                          />
                          <TextWiget sx={{ color: appColor.lightgray }}>
                            {item.period}
                          </TextWiget>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationOn
                            sx={{
                              fontSize: 16,
                              color: appColor.lightgray,
                            }}
                          />
                          <TextWiget sx={{ color: appColor.lightgray }}>
                            {item.location}
                          </TextWiget>
                        </Box>
                      </Box>

                      {/* Description */}
                      <TextWiget
                        size={14}
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </TextWiget>

                      {/* Achievements */}
                      <Box>
                        <TextWiget
                          bold
                          sx={{
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <EmojiEvents
                            sx={{ fontSize: 18, color: appColor.orange }}
                          />
                          Key Achievements:
                        </TextWiget>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {item.achievements.map((achievement, idx) => (
                            <Chip
                              key={idx}
                              label={achievement}
                              size="small"
                              sx={{
                                background: "rgba(255,255,255,0.1)",
                                color: "white",
                                border: "1px solid rgba(255,255,255,0.2)",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </TimelineCard>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>

          {/* Skills & Certifications Grid */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {/* Technical Skills */}
            <Grid item xs={12} md={6}>
              <EducationCard>
                <CardContent sx={{ p: 4 }}>
                  <TextWiget
                    bold
                    size={20}
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <TrendingUp sx={{ color: appColor.textpurple }} />
                    Technical Skills
                  </TextWiget>

                  {skills.map((skill, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <TextWiget>{skill.name}</TextWiget>
                        <TextWiget sx={{ color: appColor.lightgray }}>
                          {skill.level}%
                        </TextWiget>
                      </Box>
                      <SkillProgress
                        variant="determinate"
                        value={skill.level}
                      />
                    </Box>
                  ))}
                </CardContent>
              </EducationCard>
            </Grid>

            {/* Languages */}
            <Grid item xs={12} md={6}>
              <EducationCard>
                <CardContent sx={{ p: 4 }}>
                  <TextWiget
                    bold
                    size={20}
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Language sx={{ color: appColor.textpurple }} />
                    Languages
                  </TextWiget>

                  {languages.map((language, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        background: appColor.dark,
                        border: `1px solid ${appColor.dark}`,
                      }}
                    >
                      <TextWiget bold>{language.name}</TextWiget>
                      <Chip
                        label={language.level}
                        size="small"
                        sx={{
                          background:
                            language.level === "Native"
                              ? appColor.live
                              : language.level === "Fluent"
                              ? appColor.textpurple
                              : language.level === "Intermediate"
                              ? appColor.inProgress
                              : appColor.textgray,
                          color: appColor.white,
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </EducationCard>
            </Grid>
          </Grid>

          {/* Certifications */}
          <Box sx={{ mb: 8 }}>
            <TextWiget
              bold
              size={20}
              sx={{
                color: appColor.white,
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <EmojiEvents sx={{ color: appColor.orange }} />
              Professional Certifications
            </TextWiget>

            <EducationCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {certifications.map((cert, index) => (
                    <CertificationChip key={index} label={cert} />
                  ))}
                </Box>
              </CardContent>
            </EducationCard>
          </Box>

          {/* Relevant Courses */}
          <Box>
            <TextWiget
              bold
              size={20}
              sx={{
                color: appColor.white,
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <MenuBook sx={{ color: appColor.icon }} />
              Relevant Coursework
            </TextWiget>

            <Grid container spacing={3}>
              {courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: appColor.dark,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: appColor.black,
                        transform: "translateY(-4px)",
                        boxShadow: `0 10px 30px ${appColor.black}`,
                      },
                    }}
                  >
                    <TextWiget
                      size={14}
                      sx={{
                        color: appColor.white,
                        textAlign: "center",
                      }}
                    >
                      {course}
                    </TextWiget>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
}

HomePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default HomePage;
