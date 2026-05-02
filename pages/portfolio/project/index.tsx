import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Paper,
  Collapse,
  useTheme,
  Stack
} from '@mui/material';
import { GitHub, Launch, Search, Clear, FilterList } from '@mui/icons-material';

import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { useState, useMemo } from 'react';
import { categories, projects } from '@/database/project';
import { TextWidget } from '@/components/Text';
import { ButtonWidget } from '@/components/Button';
import SearchWidget from '@/components/Search';

function ProjectPage() {
  const title = 'Portfolio - Projects';
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Enhanced filtering logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'Al  l') {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        sx={{
          background: theme.mode.background.default,
          py: 4
        }}
      >
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <TextWidget bold>My Projects</TextWidget>
            <TextWidget
              sx={{
                color: theme.mode.text.disabled,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.8,
                py: 2
              }}
            >
              A collection of my work spanning web development, mobile
              applications, and innovative digital solutions.
            </TextWidget>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <ButtonWidget
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </ButtonWidget>
            <Box>
              <SearchWidget radius="30px" onSearch={handleSearchChange} />
            </Box>
            <ButtonWidget
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide' : 'Show'} Clean
            </ButtonWidget>
          </Box>

          <Collapse in={showFilters}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 1.5,
                py: 3
              }}
            >
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <ButtonWidget
                    key={category}
                    variant={isSelected ? 'contained' : 'outlined'}
                    onClick={() => handleCategoryChange(category)}
                    sx={{
                      borderRadius: 2
                    }}
                  >
                    {category}
                  </ButtonWidget>
                );
              })}
            </Box>
          </Collapse>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProjects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {project.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          zIndex: 2,
                          background: `linear-gradient(135deg, #fbbf24, #f59e0b)`,
                          color: '#fff',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          boxShadow: '0 4px 12px #f59e0b44'
                        }}
                      >
                        ⭐ Featured
                      </Box>
                    )}

                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: project.image
                            ? `url(${project.image}) center/cover`
                            : 'none',
                          opacity: 0.15
                        }
                      }}
                    ></CardMedia>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={2}>
                        <TextWidget fontWeight={700}>
                          {project.title}
                        </TextWidget>
                        <Chip label={project.category} size="small" />

                        {/* Description */}
                        <TextWidget
                          variant="body2"
                          sx={{
                            color: theme.mode.text.disabled,
                            lineHeight: 1.7,
                            minHeight: 60
                          }}
                        >
                          {project.description}
                        </TextWidget>

                        {/* Technologies */}
                        <Box>
                          <TextWidget
                            variant="caption"
                            fontWeight={700}
                            sx={{ mb: 1, display: 'block' }}
                          >
                            Technologies:
                          </TextWidget>
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 0.75
                            }}
                          >
                            {project.technologies.map((tech, idx) => (
                              <Chip
                                key={idx}
                                label={tech}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 24,
                                  background: theme.mode.background.default,
                                  border: `1px solid ${theme.palette.divider}`,
                                  '&:hover': {
                                    background: theme.palette.action.hover
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* Footer */}
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
                            {project.date}
                          </TextWidget>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-3px)'
                                }
                              }}
                            >
                              <GitHub fontSize="small" />
                            </IconButton>
                            <IconButton
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-3px)'
                                }
                              }}
                            >
                              <Launch fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            /* No Projects Found */
            <Paper
              elevation={0}
              sx={{
                textAlign: 'center',
                py: 8,
                px: 4,
                borderRadius: 3,
                border: `2px dashed ${theme.palette.divider}`
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Search
                  sx={{
                    fontSize: 80,
                    color: theme.mode.text.disabled,
                    mb: 2
                  }}
                />
              </Box>
              <TextWidget variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                No projects found
              </TextWidget>
              <TextWidget variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {searchQuery
                  ? `No projects match your search "${searchQuery}"`
                  : `No projects found in ${selectedCategory}`}
              </TextWidget>
              <Button
                variant="contained"
                startIcon={<Clear />}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Clear All Filters
              </Button>
            </Paper>
          )}
        </Container>
      </Box>

      <FooterPage />
    </>
  );
}

ProjectPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;
export default ProjectPage;
