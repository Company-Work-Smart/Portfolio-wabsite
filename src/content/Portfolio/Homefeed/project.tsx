import { Box, CardContent, Chip, Container, Grid, useTheme } from '@mui/material';
import { CardWidget } from '@/components/Card';
import { TextWidget } from '@/components/Text';
import { useEffect, useState } from 'react';
import { HttpClient } from '@/services/http-client';
import { Code, Smartphone, Storage, Brush, SmartToy, TrendingUp } from '@mui/icons-material';
import { SkeletonAppCard, SkeletonProjectCard } from '@/components/Skeleton';

const IconApplication = (application: string) => {
  switch (application) {
    case 'Web Development':
      return <Code />;
    case 'Mobile App Development':
      return <Smartphone />;
    case 'UI/UX Design':
      return <Brush />;
    case 'Block Chain':
      return <Storage />;
    case 'Artificial Intelligence':
      return <SmartToy />;
    case 'Data Analysis':
      return <TrendingUp />;
    default:
      return <Code />;
  }
};

export const RecentProject = () => {
  const theme = useTheme();
  const http = new HttpClient();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getProject = async () => {
    try {
      setLoading(true);
      const res = await http.get('project');
      setProjects(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const uniqueApps = projects.filter(
    (p, i, self) => i === self.findIndex((x) => x.application === p.application)
  );

  return (
    <>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <TextWidget align="center" bold size={20} sx={{ mb: 6 }}>
            What I Do
          </TextWidget>
          <Grid container spacing={4}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <SkeletonAppCard />
                  </Grid>
                ))
              : uniqueApps.map((p, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <CardWidget
                      radius="20px"
                      sx={{
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 40px ${theme.mode.shadow[30]}`
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center', cursor: 'pointer' }}>
                        <Box sx={{ color: theme.mode.text.default, mb: 3 }}>
                          {IconApplication(p.application)}
                        </Box>
                        <TextWidget size={15} sx={{ mb: 2 }}>
                          {p.application}
                        </TextWidget>
                        <TextWidget sx={{ lineHeight: 1.6 }}>{p.description}</TextWidget>
                      </CardContent>
                    </CardWidget>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <TextWidget align="center" bold size={20} sx={{ mb: 6 }}>
            Recent Projects
          </TextWidget>
          <Grid container spacing={4}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <SkeletonProjectCard />
                  </Grid>
                ))
              : projects.map((item, i) => (
                  <Grid item key={i} xs={12} sm={6} md={4}>
                    <CardWidget
                      radius="20px"
                      sx={{
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 20px 40px ${theme.mode.shadow[30]}`
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, cursor: 'pointer' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                          }}
                        >
                          <TextWidget bold>{item.projectName}</TextWidget>
                          <Chip
                            label={item.status}
                            size="small"
                            sx={{
                              background:
                                item.status === 'Live'
                                  ? theme.colors.info.main
                                  : item.status === 'In Progress'
                                  ? theme.colors.warning.main
                                  : item.status === 'Soon'
                                  ? theme.colors.warning.main
                                  : theme.colors.success.main,
                              color: theme.mode.text.default,
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                        <TextWidget
                          sx={{ color: theme.mode.text.disabled, mb: 3, lineHeight: 1.6 }}
                        >
                          {item.description}
                        </TextWidget>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {item.technologies.map((tech: any, j: number) => (
                            <Chip
                              key={j}
                              label={tech.language}
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
                    </CardWidget>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RecentProject;
