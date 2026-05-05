import React from 'react';

import { Theme } from '@mui/material';
import { PureLightTheme } from './schemes/PureLightTheme';
import { PureDarkTheme } from './schemes/PureDarkTheme';

export const quarterColor = (str: string) => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const seed = str + quarter;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
};

export const themeColors = {
  white: '#FFFFFF',
  black: '#000000',
  blue: '#1976d2',
  orange: '#ed6c02',
  purple: '#7b1fa2',
  pink: '#c2185b',
  green: '#2e7d32',
  red: '#d32f2f',
  yellow: '#f9a825',

  secondary: '#f2e9e4',
  primary: '#c9ada7',
  success: '#40916c',
  pending: '#ffbd00',
  warning: '#ffd60a',
  info: '#61a5c2',
  error: '#e5383b',
};

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      gradients: {};
      shadows: {
        success: string;
        pending: string;
        warning: string;
        info: string;
        error: string;
        card: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        blue: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        orange: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        purple: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        pink: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        green: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        red: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        yellow: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
      };
      pending: {
        main: string;
        light: string;
        dark: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
      };
      info: {
        main: string;
        light: string;
        dark: string;
      };
    };
    general: {
      header: string;
      reactFrameworkColor: React.CSSProperties['color'];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      width: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
      dividerBg: React.CSSProperties['color'];
      menuItemColor: React.CSSProperties['color'];
      menuItemColorActive: React.CSSProperties['color'];
      menuItemBg: React.CSSProperties['color'];
      menuItemBgActive: React.CSSProperties['color'];
      menuItemIconColor: React.CSSProperties['color'];
      menuItemIconColorActive: React.CSSProperties['color'];
      menuItemHeadingColor: React.CSSProperties['color'];
    };
    header: {
      height: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
    };
    mode: {
      main: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      background: {
        default: string;
        surface: string;
        sidebar: string;
        header: string;
        body: string;
      };
      text: {
        default: string;
        disabled: string;
        success: string;
        pending: string;
        warning: string;
        error: string;
        info: string;
      };
      button: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      card: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      avatar: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      action: {
        hover: string;
        select: string;
      };
      border: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      shadow: {
         5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      }

    };
  }

  interface ThemeOptions {
    colors: {
      gradients: {};
      shadows: {
        success: string;
        pending: string;
        warning: string;
        info: string;
        error: string;
        card: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        blue: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        orange: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        purple: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        pink: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        green: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        red: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        yellow: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        light: string;
        main: string;
        dark: string;
      };
      success: {
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        light: string;
        main: string;
        dark: string;
      };
      pending: {
        light: string;
        main: string;
        dark: string;
      };
      error: {
        light: string;
        main: string;
        dark: string;
      };
      info: {
        light: string;
        main: string;
        dark: string;
      };
    };
    general: {
      reactFrameworkColor: React.CSSProperties['color'];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      width: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
      dividerBg: React.CSSProperties['color'];
      menuItemColor: React.CSSProperties['color'];
      menuItemColorActive: React.CSSProperties['color'];
      menuItemBg: React.CSSProperties['color'];
      menuItemBgActive: React.CSSProperties['color'];
      menuItemIconColor: React.CSSProperties['color'];
      menuItemIconColorActive: React.CSSProperties['color'];
      menuItemHeadingColor: React.CSSProperties['color'];
    };
    header: {
      height: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
    };
    mode: {
      main: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      background: {
        default: string;
        surface: string;
        sidebar: string;
        header: string;
        body: string;
      };
      text: {
        default: string;
        disabled: string;
        success: string;
        pending: string;
        warning: string;
        error: string;
        info: string;
      };
      button: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      card: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      avatar: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      action: {
        hover: string;
        select: string;
      };
      border: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
       shadow: {
         5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      }
    };
  }
}

const themeMap: { [key: string]: Theme } = {
  PureLightTheme,
  PureDarkTheme
};
