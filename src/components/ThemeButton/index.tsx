import { useContext, useEffect, useState } from 'react';
import { Box,useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '@/theme/ThemeProvider';

const ThemeButton = () => {
  const setThemeName = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState('PureLightTheme');

  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'PureLightTheme';
    setCurrentTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      currentTheme === 'PureLightTheme' ? 'PureDarkTheme' : 'PureLightTheme';

    setThemeName(newTheme);
    setCurrentTheme(newTheme);
  };
  const theme = useTheme();

  return (
    <Box
      sx={{
        color:
          currentTheme === 'PureLightTheme'
            ? theme.palette.text.primary
            : theme.palette.text.primary,
        '&:hover': {
          color:
            currentTheme === 'PureLightTheme'
              ? theme.palette.warning.dark
              : theme.palette.primary.dark
        },
        cursor: 'pointer'
      }}
      onClick={toggleTheme}
      color="inherit"
    >
      {currentTheme === 'PureLightTheme' ? <Brightness7 /> : <Brightness4 />}
    </Box>
  );
};

export default ThemeButton;
