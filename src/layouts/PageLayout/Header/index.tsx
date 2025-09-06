import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import appColor from "@/theme/appColor";
import { TextWiget } from "@/components/typographys";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface HeaderLayoutProps {
  children?: ReactNode;
}

const navItems = [
  { label: "Home", path: "/portfolio/homefeed" },
  { label: "Project", path: "/portfolio/project" },
  { label: "Education", path: "/portfolio/education" },
  { label: "Contact Me", path: "/portfolio/contact" },
];

const HeaderPage: FC<HeaderLayoutProps> = ({ children }) => {
  const router = useRouter();
  const logo = "SENGVICHET";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    if (router.pathname === "/") {
      setActiveLabel(logo);
    } else {
      const match = navItems.find((item) =>
        router.pathname.startsWith(item.path)
      );
      setActiveLabel(match ? match.label : null);
    }
  }, [router.pathname]);

  const handleClick = (item: typeof navItems[0]) => {
    router.push(item.path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: appColor.background,
          boxShadow: "none",
          px: { xs: 2, sm: 4, md: 5 },
          py: 2,
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextWiget
            sx={{
              color:
                activeLabel === logo ? appColor.textwhite : appColor.textgray,
              cursor: "pointer",
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                color: appColor.textwhite,
                transform: "scale(1.05)",
              },
            }}
            onClick={() => router.push("/")}
          >
            {logo.toUpperCase()}
          </TextWiget>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 6 }}>
              {navItems.map((item) => (
                <TextWiget
                  key={item.label}
                  sx={{
                    color:
                      activeLabel === item.label
                        ? appColor.textwhite
                        : appColor.lightgray,
                    cursor: "pointer",
                    "&:hover": {
                      color: appColor.textwhite,
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleClick(item)}
                >
                  {item.label.toUpperCase()}
                </TextWiget>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextWiget
              onClick={() => setIsDarkMode((prev) => !prev)}
              sx={{ cursor: "pointer", pt:0.5 }}
            >
              {isDarkMode ? (
                <DarkModeIcon sx={{ fontSize: 20, color: appColor.yellow }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 20, color: appColor.yellow }} />
              )}
            </TextWiget>
            <TextWiget
              sx={{ pb: 0.5, pl: 0.5, pt: 0.5,cursor: "pointer" }}
              onClick={() =>
                setLanguage((prev) => (prev === "EN" ? "KH" : "EN"))
              }
            >
              {language === "EN" ? "🇺🇸 EN" : "🇰🇭 KH"}
            </TextWiget>
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: appColor.textwhite }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: appColor.background,
            width: 240,
            px: 2,
            pt: 4,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: appColor.textwhite }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem disablePadding key={item.label}>
              <ListItemButton onClick={() => handleClick(item)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color:
                        activeLabel === item.label
                          ? appColor.textwhite
                          : appColor.lightgray,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {children}
    </>
  );
};

export default HeaderPage;
