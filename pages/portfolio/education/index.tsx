import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  School,
  EmojiEvents,
  MenuBook,
  Language,
  CalendarToday,
  LocationOn,
  TrendingUp
} from '@mui/icons-material';
import HeaderPage from '@/layouts/PageLayout/Header';
import { certifications, courses, education, languages } from '@/database/education';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { themeColors } from '@/theme/base';
import { TextWidget } from '@/components/Text';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';

const EducationCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  backdropFilter: 'blur(20px)',
  borderRadius: '20px'
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.default,
  backdropFilter: 'blur(15px)',
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: '15px',
  padding: '24px'
}));

const SkillProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.mode.background.default,
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'
  }
}));

const CertificationChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(45deg, ${themeColors.green} , ${themeColors.green})`,
  color: theme.mode.text.default,
  fontWeight: 600,
  margin: '4px',
  '&:hover': {
    background: `linear-gradient(45deg, ${themeColors.green} , ${themeColors.green})`
  }
}));

function EducationPage() {
  const title = 'Education';
  const theme = useTheme();
  const http = new HttpClient();
  const [skill, setSkill] = useState<any[]>([]);

  const getSkill = async () => {
    const response = await http.get(`language/skill`);
    setSkill(response);
  };

  useEffect(() => {
    getSkill();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          background: theme.mode.background.default,
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <TextWidget bold size={22} sx={{ mb: 2 }}>
              Education & Qualifications
            </TextWidget>
            <TextWidget
              size={16}
              sx={{ color: theme.mode.text.disabled, maxWidth: 600, mx: 'auto', mb: 3 }}
            >
              My academic journey and professional development path
            </TextWidget>
          </Box>

          {/* Education Timeline */}
          <Box sx={{ mb: 8 }}>
            <TextWidget
              bold
              size={20}
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <School />
              Academic Background
            </TextWidget>

            <Timeline position="alternate">
              {education.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        background: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        padding: 1.5
                      }}
                    >
                      {item.icon}
                    </TimelineDot>
                    {index < education.length && (
                      <TimelineConnector
                        sx={{
                          background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                          width: 3
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <TimelineCard>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 2
                        }}
                      >
                        <Box>
                          <TextWidget bold size={15}>
                            {item.degree}
                          </TextWidget>
                          <TextWidget>{item.institution}</TextWidget>
                        </Box>
                        <Chip
                          label={`GPA: ${item.gpa}`}
                          sx={{
                            background: 'linear-gradient(45deg, #10b981, #059669)',
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday
                            sx={{
                              fontSize: 16
                            }}
                          />
                          <TextWidget>{item.period}</TextWidget>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn
                            sx={{
                              fontSize: 16
                            }}
                          />
                          <TextWidget>{item.location}</TextWidget>
                        </Box>
                      </Box>
                      <TextWidget
                        size={14}
                        sx={{
                          mb: 3,
                          lineHeight: 1.6
                        }}
                      >
                        {item.description}
                      </TextWidget>
                      <Box>
                        <TextWidget
                          bold
                          sx={{
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <EmojiEvents
                            sx={{
                              fontSize: 18,
                              color: theme.palette.warning.main
                            }}
                          />
                          Key Achievements:
                        </TextWidget>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {item.achievements.map((achievement, idx) => (
                            <Chip
                              key={idx}
                              label={achievement}
                              size="small"
                              sx={{
                                background: theme.palette.secondary.main,
                                color: theme.palette.primary.main
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
                    <TrendingUp />
                    Technical Skills
                  </TextWidget>

                  {skill.map((skill, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1
                        }}
                      >
                        <TextWidget>{skill.language}</TextWidget>
                        <TextWidget>{skill.level}</TextWidget>
                      </Box>

                      <SkillProgress variant="determinate" value={skill.level} />
                    </Box>
                  ))}
                </CardContent>
              </EducationCard>
            </Grid>

            {/* Languages */}
            <Grid item xs={12} md={6}>
              <EducationCard>
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
                    <Language />
                    Languages
                  </TextWidget>

                  {languages.map((language, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        background: theme.palette.secondary.main
                      }}
                    >
                      <TextWidget bold>{language.name}</TextWidget>
                      <Chip label={language.level} size="small" />
                    </Box>
                  ))}
                </CardContent>
              </EducationCard>
            </Grid>
          </Grid>

          {/* Certifications */}
          <Box sx={{ mb: 8 }}>
            <TextWidget
              bold
              size={20}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <EmojiEvents sx={{ color: theme.palette.warning.main }} />
              Professional Certifications
            </TextWidget>

            <EducationCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {certifications.map((cert, index) => (
                    <CertificationChip key={index} label={cert} />
                  ))}
                </Box>
              </CardContent>
            </EducationCard>
          </Box>

          {/* Relevant Courses */}
          <Box>
            <TextWidget
              bold
              size={20}
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <MenuBook />
              Relevant Coursework
            </TextWidget>

            <Grid container spacing={3}>
              {courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: theme.palette.secondary.main,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <TextWidget
                      size={14}
                      sx={{
                        color: theme.palette.text.primary,
                        textAlign: 'center'
                      }}
                    >
                      {course}
                    </TextWidget>
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

EducationPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default EducationPage;
