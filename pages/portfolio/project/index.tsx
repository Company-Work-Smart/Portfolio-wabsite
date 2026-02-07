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
  Avatar,
  IconButton,
  Fade,
  Zoom,
  alpha,
  InputBase,
  InputAdornment,
  useTheme
} from '@mui/material';
import {
  GitHub,
  Launch,
  Search,
  Clear,
  Web,
  MobileFriendly,
  Code,
  DesignServices
} from '@mui/icons-material';
import { TextWidget } from '@/components/typographys';
import HeaderPage from '@/layouts/PageLayout/Header';
import FooterPage from '@/layouts/PageLayout/Fooder';
import { useState, useEffect, useCallback } from 'react';
import { categories, projects } from '@/database/project';
import { HttpClient } from '@/services/http-client';

function ProjectPage() {
  const title = 'Portfolio - Projects';
  const http = new HttpClient();
  const theme = useTheme();
  const [datasource, setDatasource] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setSearchResults] = useState(projects.length);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      const res = await http.get('AnonymousProject');
      setDatasource(res || []);
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  // Filter projects whenever datasource, category, or search changes
  useEffect(() => {
    let filtered = datasource;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(query);
        const descriptionMatch = project.description
          .toLowerCase()
          .includes(query);
        const techMatch = project.technologies.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        const categoryMatch = project.category.toLowerCase().includes(query);

        return titleMatch || descriptionMatch || techMatch || categoryMatch;
      });
    }

    setFilteredProjects(filtered);
    setSearchResults(filtered.length);
  }, [datasource, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Web />;
      case 'Mobile Development':
        return <MobileFriendly />;
      case 'Data Science':
        return <Code />;
      case 'Design':
        return <DesignServices />;
      case 'Blockchain':
        return <Code />;
      default:
        return <Code />;
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Browse through my portfolio of projects with advanced search and filtering capabilities."
        />
      </Head>

      <Box
        sx={{
          background: theme.palette.background.default,
          minHeight: '100vh',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Fade in={isLoaded} timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <TextWidget bold size={20} sx={{ mb: 2 }}>
                My Projects
              </TextWidget>
              <TextWidget
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                A collection of my work spanning web development, mobile
                applications, and innovative digital solutions.
              </TextWidget>
            </Box>
          </Fade>

          <Fade in={isLoaded} timeout={900}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '800px' }}>
                <InputBase
                  placeholder="Search projects type ..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  sx={{
                    width: '100%',
                    color: theme.palette.text.primary,
                    borderRadius: 25,
                    px: 2,
                    py: 1.5,
                    border: `0.5px solid ${theme.palette.primary.main}`
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Search sx={{ color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  }
                  endAdornment={
                    searchQuery && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClearSearch}
                          sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': { color: theme.palette.text.primary }
                          }}
                        >
                          <Clear />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                />
              </Box>
            </Box>
          </Fade>

          {/* Filter Section */}
          <Fade in={isLoaded} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outlined"
                    onClick={() => handleCategoryChange(category)}
                    sx={{
                      borderRadius: 10,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      background:
                        selectedCategory === category
                          ? theme.palette.secondary.main
                          : theme.palette.secondary.main,
                      color:
                        selectedCategory === category
                          ? theme.palette.text.primary
                          : theme.palette.text.disabled,
                      '&:hover': {
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </Box>
            </Box>
          </Fade>

          {/* Projects Grid */}
          <Grid container spacing={4}>
            {filteredProjects.map((project, index) => (
              <Zoom in={isLoaded} timeout={500 + index * 100} key={project.id}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',                      
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(appColor.primary, 0.1)}`,
                      borderRadius: 3,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(
                          appColor.primary,
                          0.15
                        )}`,
                        border: `1px solid ${alpha(appColor.primary, 0.3)}`
                      },
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {project.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 2,
                          background: `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`,
                          color: theme.palette.text.primary,
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 'bold'
                        }}
                      >
                        Featured
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
                        background: `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `url(${project.image}) center/cover`,
                          opacity: 0.8
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          background: alpha(appColor.background, 0.9),
                          color: appColor.primary,
                          zIndex: 1
                        }}
                      >
                        {getCategoryIcon(project.category)}
                      </Avatar>
                    </CardMedia>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <TextWidget bold gutterBottom sx={{ mb: 1 }}>
                        {project.title}
                      </TextWidget>

                      <TextWidget
                        paragraph
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 2,
                          lineHeight: 1.6
                        }}
                      >
                        {project.description}
                      </TextWidget>

                      <Box sx={{ mb: 2 }}>
                        <TextWidget bold sx={{ mb: 1 }}>
                          Technologies:
                        </TextWidget>
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {project.technologies.map((tech, idx) => (
                            <Chip
                              key={idx}
                              label={tech}
                              size="small"
                              sx={{
                                background: theme.palette.text.secondary,
                                color: appColor.white,
                                border: `1px solid ${alpha(
                                  appColor.primary,
                                  0.2
                                )}`,
                                '&:hover': {
                                  background: alpha(appColor.primary, 0.2)
                                }
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto'
                        }}
                      >
                        <TextWidget>{project.date}</TextWidget>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: appColor.white,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: `0 10px 20px ${alpha(
                                  appColor.white,
                                  0.3
                                )}`
                              }
                            }}
                          >
                            <GitHub />
                          </IconButton>
                          <IconButton
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: theme.palette.text.secondary,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: `0 10px 20px ${alpha(
                                  theme.palette.text.secondary,
                                  0.3
                                )}`
                              }
                            }}
                          >
                            <Launch />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Zoom>
            ))}
          </Grid>

          {/* No Projects Found */}
          {filteredProjects.length === 0 && (
            <Fade in={true} timeout={500}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Box sx={{ mb: 3 }}>
                  <Search
                    sx={{
                      fontSize: 64,
                      color: theme.palette.text.secondary,
                      mb: 2
                    }}
                  />
                </Box>
                <TextWidget bold sx={{ mb: 2 }}>
                  No projects found
                </TextWidget>
                <TextWidget sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                  {searchQuery
                    ? `No projects match your search "${searchQuery}"`
                    : 'No projects found matching your criteria'}
                </TextWidget>
                {(searchQuery || selectedCategory !== 'All') && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    sx={{
                      borderRadius: 25,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      border: `1px solid ${appColor.primary}`,
                      color: appColor.primary,
                      '&:hover': { background: alpha(appColor.primary, 0.1) }
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>
            </Fade>
          )}
        </Container>
      </Box>

      <FooterPage />
    </>
  );
}

ProjectPage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default ProjectPage;
