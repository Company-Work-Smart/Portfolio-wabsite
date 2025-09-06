import Head from "next/head";
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
} from "@mui/material";
import {
  GitHub,
  Launch,
  Code,
  Web,
  DesignServices,
  MobileFriendly,
  Search,
  Clear,
} from "@mui/icons-material";
import { TextWiget } from "@/components/typographys";
import appColor from "@/theme/appColor";
import HeaderPage from "@/layouts/PageLayout/Header";
import { useState, useEffect, useCallback } from "react";
import { categories, projects } from "@/database/project";
import FooterPage from "@/layouts/PageLayout/Fooder";

function HomePage() {
  const title = "Portfolio - Projects";
  const [projectList] = useState(projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setSearchResults] = useState(projects.length);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getProject = async () => {
    let filtered = projectList;

    if (selectedCategory !== "All") {
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
  };

  useEffect(() => {
    getProject();
  }, [selectedCategory, searchQuery, projectList]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web Development":
        return <Web />;
      case "Mobile Development":
        return <MobileFriendly />;
      case "Data Science":
        return <Code />;
      case "Design":
        return <DesignServices />;
      case "Blockchain":
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
          background: appColor.background,
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header Section */}
          <Fade in={isLoaded} timeout={800}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <TextWiget
                bold
                size={20}
                sx={{
                  color: appColor.textpurple,
                  mb: 2,
                }}
              >
                My Projects
              </TextWiget>
              <TextWiget
                sx={{
                  color: appColor.lightgray,
                  maxWidth: 600,
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                A collection of my work spanning web development, mobile
                applications, and innovative digital solutions.
              </TextWiget>
            </Box>
          </Fade>

          {/* Advanced Search Section */}
          <Fade in={isLoaded} timeout={900}>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ width: "800px" }}>
                  <InputBase
                    placeholder="Search projects, technologies, or categories..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    sx={{
                      width: "100%",
                      color: appColor.textwhite,
                      background: alpha(appColor.primary, 0.1),
                      borderRadius: 25,
                      px: 2,
                      py: 1,
                      border: `1px solid ${alpha(appColor.primary, 0.2)}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${alpha(appColor.primary, 0.4)}`,
                      },
                      "&:focus-within": {
                        border: `1px solid ${appColor.primary}`,
                        boxShadow: `0 0 0 3px ${alpha(appColor.primary, 0.1)}`,
                      },
                      "& .MuiInputBase-input": {
                        padding: "8px 12px",
                        "&::placeholder": {
                          color: appColor.lightgray,
                        },
                      },
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Search sx={{ color: appColor.lightgray }} />
                      </InputAdornment>
                    }
                    endAdornment={
                      searchQuery && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClearSearch}
                            sx={{
                              color: appColor.lightgray,
                              "&:hover": {
                                color: appColor.textwhite,
                              },
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

              {searchQuery && (
                <Box sx={{ mb: 2 }}>
                  <TextWiget
                    sx={{
                      color: appColor.textpurple,
                      textAlign: "center",
                    }}
                  >
                    Search results for "{searchQuery}"
                  </TextWiget>
                </Box>
              )}
            </Box>
          </Fade>

          {/* Filter Section */}
          <Fade in={isLoaded} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "contained" : "outlined"
                    }
                    onClick={() => handleCategoryChange(category)}
                    sx={{
                      borderRadius: 25,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      background:
                        selectedCategory === category
                          ? `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`
                          : "transparent",
                      border: `1px solid ${alpha(appColor.primary, 0.3)}`,
                      color:
                        selectedCategory === category
                          ? appColor.textwhite
                          : appColor.primary,
                      "&:hover": {
                        background:
                          selectedCategory === category
                            ? `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`
                            : alpha(appColor.primary, 0.1),
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px ${alpha(appColor.primary, 0.2)}`,
                      },
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
                <Grid item xs={12} md={6} lg={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      background: `linear-gradient(135deg, ${alpha(
                        appColor.primary,
                        0.05
                      )} 0%, ${alpha(appColor.secondary, 0.05)} 100%)`,
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha(appColor.primary, 0.1)}`,
                      borderRadius: 3,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 20px 40px ${alpha(
                          appColor.primary,
                          0.15
                        )}`,
                        border: `1px solid ${alpha(appColor.primary, 0.3)}`,
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {project.featured && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          zIndex: 2,
                          background: `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`,
                          color: appColor.textwhite,
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        Featured
                      </Box>
                    )}

                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        background: `linear-gradient(45deg, ${appColor.primary}, ${appColor.secondary})`,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `url(${project.image}) center/cover`,
                          opacity: 0.8,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          background: alpha(appColor.background, 0.9),
                          color: appColor.primary,
                          zIndex: 1,
                        }}
                      >
                        {getCategoryIcon(project.category)}
                      </Avatar>
                    </CardMedia>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <TextWiget
                        bold
                        gutterBottom
                        sx={{
                          color: appColor.textwhite,
                          mb: 1,
                        }}
                      >
                        {project.title}
                      </TextWiget>

                      <TextWiget
                        paragraph
                        sx={{
                          color: appColor.lightgray,
                          mb: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        {project.description}
                      </TextWiget>

                      <Box sx={{ mb: 2 }}>
                        <TextWiget
                          bold
                          sx={{
                            color: appColor.textpurple,
                            mb: 1,
                          }}
                        >
                          Technologies:
                        </TextWiget>
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {project.technologies.map((tech, index) => (
                            <Chip
                              key={index}
                              label={tech}
                              size="small"
                              sx={{
                                background: appColor.textgray,
                                color: appColor.white,
                                border: `1px solid ${alpha(
                                  appColor.primary,
                                  0.2
                                )}`,
                                "&:hover": {
                                  background: alpha(appColor.primary, 0.2),
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                        }}
                      >
                        <TextWiget sx={{ color: appColor.lightgray }}>
                          {project.date}
                        </TextWiget>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: appColor.white,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: `0 10px 20px ${alpha(
                                  appColor.white,
                                  0.3
                                )}`,
                              },
                            }}
                          >
                            <GitHub />
                          </IconButton>
                          <IconButton
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: appColor.textpurple,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: `0 10px 20px ${alpha(
                                  appColor.textpurple,
                                  0.3
                                )}`,
                              },
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
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Box sx={{ mb: 3 }}>
                  <Search
                    sx={{
                      fontSize: 64,
                      color: appColor.lightgray,
                      mb: 2,
                    }}
                  />
                </Box>
                <TextWiget
                  bold
                  sx={{
                    color: appColor.textwhite,
                    mb: 2,
                  }}
                >
                  No projects found
                </TextWiget>
                <TextWiget sx={{ color: appColor.lightgray, mb: 3 }}>
                  {searchQuery
                    ? `No projects match your search "${searchQuery}"`
                    : "No projects found matching your criteria"}
                </TextWiget>
                {(searchQuery || selectedCategory !== "All") && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    sx={{
                      borderRadius: 25,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      border: `1px solid ${appColor.primary}`,
                      color: appColor.primary,
                      "&:hover": {
                        background: alpha(appColor.primary, 0.1),
                      },
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

HomePage.getLayout = (page) => <HeaderPage>{page}</HeaderPage>;

export default HomePage;
