import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  CardContent,
  CardMedia,
  IconButton,
  Collapse,
  useTheme,
  Stack
} from '@mui/material';
import { GitHub, Launch, Search, FilterList } from '@mui/icons-material';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { useState, useEffect, useMemo } from 'react';
import { TextWidget } from '@/components/Text';
import { ButtonWidget } from '@/components/Button';
import SearchWidget from '@/components/Search';
import { HttpClient } from '@/services/http-client';
import { datetimeDisplay } from '@/helpers/datetime';
import { ChipWidget } from '@/components/Chip';
import { CardWidget } from '@/components/Card';
import { SkeletonCard } from '@/components/Skeleton';

function ProjectPage() {
  const title = 'Project';
  const theme = useTheme();
  const http = new HttpClient();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortByPopular, setSortByPopular] = useState(false);

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

  const appTypes = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.application))],
    [projects]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = projects.filter((p) => {
      const matchSearch =
        !q ||
        p.projectName?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.technologies?.some((t: any) => t.language?.toLowerCase().includes(q));
      const matchFilter = activeFilter === 'All' || p.application === activeFilter;
      return matchSearch && matchFilter;
    });
    if (sortByPopular) result = [...result].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    return result;
  }, [projects, search, activeFilter, sortByPopular]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ background: theme.mode.background.default, py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <TextWidget bold size={22} sx={{ mb: 2 }}>
              My Projects
            </TextWidget>
            <TextWidget
              size={16}
              sx={{
                color: theme.mode.text.disabled,
                maxWidth: 600,
                mx: 'auto',
                mb: 3
              }}
            >
              A collection of my work spanning web development, mobile applications, and innovative
              digital solutions.
            </TextWidget>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ButtonWidget
              variant={sortByPopular ? 'contained' : 'outlined'}
              startIcon={<FilterList />}
              onClick={() => setSortByPopular(!sortByPopular)}
            >
              Popular
            </ButtonWidget>
            <SearchWidget radius="15px" onSearch={setSearch} />
            <ButtonWidget
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </ButtonWidget>
          </Box>

          <Collapse in={showFilters}>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, py: 3 }}
            >
              {appTypes.map((app, i) => (
                <ButtonWidget
                  key={i}
                  variant={activeFilter === app ? 'contained' : 'outlined'}
                  onClick={() => setActiveFilter(app)}
                >
                  {app}
                </ButtonWidget>
              ))}
            </Box>
          </Collapse>

          {loading ? (
            <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : filtered.length > 0 ? (
            <Grid container spacing={3} sx={{ pt: showFilters ? 0 : 3 }}>
              {filtered.map((p, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <CardWidget
                    radius="20px"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: `1px solid ${theme.mode.border[10]}`
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          background: p.image ? `url(${p.image}) center/cover` : 'none',
                          opacity: 0.15
                        }
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={2}>
                        <TextWidget bold size={15}>
                          {p.projectName}
                        </TextWidget>
                        <ChipWidget label={p.application} size="small" />
                        <TextWidget
                          sx={{ color: theme.mode.text.disabled, lineHeight: 1.7, minHeight: 60 }}
                        >
                          {p.description}
                        </TextWidget>
                        <Box>
                          <TextWidget sx={{ mb: 1, display: 'block' }}>Technologies:</TextWidget>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {p.technologies.map((tech: any, j: number) => (
                              <ChipWidget
                                key={j}
                                label={tech.language}
                                size="small"
                                sx={{ fontSize: '0.6rem' }}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            pt: 2,
                            mt: 'auto',
                            borderTop: `1px solid ${theme.palette.divider}`
                          }}
                        >
                          <TextWidget variant="caption" color="text.secondary">
                            {datetimeDisplay(p.createdAt)}
                          </TextWidget>
                          <Stack direction="row" spacing={1}>
                            {[
                              {
                                icon: <GitHub sx={{ color: theme.mode.text.default }} />,
                                href: p.link
                              },
                              {
                                icon: <Launch sx={{ color: theme.mode.text.default }} />,
                                href: p.status
                              }
                            ].map(({ icon, href }, k) => (
                              <IconButton
                                key={k}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{
                                  transition: 'all 0.3s ease',
                                  '&:hover': { transform: 'translateY(-3px)' }
                                }}
                              >
                                {icon}
                              </IconButton>
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </CardWidget>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 15, px: 4 }}>
              <Search sx={{ fontSize: 50, color: theme.mode.text.disabled, mb: 3 }} />
              <TextWidget bold>No projects found</TextWidget>
            </Box>
          )}
        </Container>
      </Box>
      <FooterPage />
    </>
  );
}

ProjectPage.getLayout = (page: any) => <HeaderPage>{page}</HeaderPage>;
export default ProjectPage;
