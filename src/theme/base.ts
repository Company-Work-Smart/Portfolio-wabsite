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

  blue: '#0066cc',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  green: '#4ade80',
  red: '#FF0000',
  yellow: '#FFFF00',

  secondary: '#f2e9e4',
  primary: '#c9ada7',
  success: '#40916c',
  warning: '#ffd60a',
  pending: '#ffbd00',
  error: '#e5383b',
  info: '#61a5c2',

  terminal_success: '#4ade80',

  // == button == \\
  button: '#0066cc',
  hover_button: '#0052a3'


// == Noted == \\

};

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      gradients: {
        // white
        whiteblack: string;
        whiteblue: string;
        whiteorange: string;
        whitepurple: string;
        whitepink: string;
        whitegreen: string;
        whitered: string;
        whiteyellow: string;

        // black
        blackwhite: string;
        blackblue: string;
        blackorange: string;
        blackpurple: string;
        blackpink: string;
        blackgreen: string;
        blackred: string;
        blackyellow: string;

        // blue
        bluewhite: string;
        blueblack: string;
        blueorange: string;
        bluepurple: string;
        bluepink: string;
        bluegreen: string;
        bluered: string;
        blueyellow: string;

        // orange
        orangewhite: string;
        orangeblack: string;
        orangeblue: string;
        orangepurple: string;
        orangepink: string;
        orangegreen: string;
        orangered: string;
        orangeyellow: string;

        // purple
        purplewhite: string;
        purpleblack: string;
        purpleblue: string;
        purpleorange: string;
        purplepink: string;
        purplegreen: string;
        purplered: string;
        purpleyellow: string;

        // pink
        pinkwhite: string;
        pinkblack: string;
        pinkblue: string;
        pinkorange: string;
        pinkpurple: string;
        pinkgreen: string;
        pinkred: string;
        pinkyellow: string;

        // green
        greenwhite: string;
        greenblack: string;
        greenblue: string;
        greenorange: string;
        greenpurple: string;
        greenpink: string;
        greenred: string;
        greenyellow: string;

        // red
        redwhite: string;
        redblack: string;
        redblue: string;
        redorange: string;
        redpurple: string;
        redpink: string;
        redgreen: string;
        redyellow: string;

        // yellow
        yellowwhite: string;
        yellowblack: string;
        yellowblue: string;
        yelloworange: string;
        yellowpurple: string;
        yellowpink: string;
        yellowgreen: string;
        yellowred: string;
      };
      shadows: {
        card: string;
        info: string;
        success: string;
        pending: string;
        primary: string;
        warning: string;
        error: string;
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
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      pending: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
        light: string;
        main: string;
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
      // == Background == \\
      background: {
        default: string;
        surface: string;
        header: string;
        sidebar: string;
      };
      // == TextWidget == \\
      text: {
        default: string;
        disabled: string;
      };

      // == CardWidget == \\
      card: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      // == AvatarWidget == \\
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
      };
    };
  }

  interface ThemeOptions {
    colors: {
      gradients: {
        // white
        whiteblack: string;
        whiteblue: string;
        whiteorange: string;
        whitepurple: string;
        whitepink: string;
        whitegreen: string;
        whitered: string;
        whiteyellow: string;

        // black
        blackwhite: string;
        blackblue: string;
        blackorange: string;
        blackpurple: string;
        blackpink: string;
        blackgreen: string;
        blackred: string;
        blackyellow: string;

        // blue
        bluewhite: string;
        blueblack: string;
        blueorange: string;
        bluepurple: string;
        bluepink: string;
        bluegreen: string;
        bluered: string;
        blueyellow: string;

        // orange
        orangewhite: string;
        orangeblack: string;
        orangeblue: string;
        orangepurple: string;
        orangepink: string;
        orangegreen: string;
        orangered: string;
        orangeyellow: string;

        // purple
        purplewhite: string;
        purpleblack: string;
        purpleblue: string;
        purpleorange: string;
        purplepink: string;
        purplegreen: string;
        purplered: string;
        purpleyellow: string;

        // pink
        pinkwhite: string;
        pinkblack: string;
        pinkblue: string;
        pinkorange: string;
        pinkpurple: string;
        pinkgreen: string;
        pinkred: string;
        pinkyellow: string;

        // green
        greenwhite: string;
        greenblack: string;
        greenblue: string;
        greenorange: string;
        greenpurple: string;
        greenpink: string;
        greenred: string;
        greenyellow: string;

        // red
        redwhite: string;
        redblack: string;
        redblue: string;
        redorange: string;
        redpurple: string;
        redpink: string;
        redgreen: string;
        redyellow: string;

        // yellow
        yellowwhite: string;
        yellowblack: string;
        yellowblue: string;
        yelloworange: string;
        yellowpurple: string;
        yellowpink: string;
        yellowgreen: string;
        yellowred: string;
      };
      shadows: {
        card: string;
        info: string;
        success: string;
        pending: string;
        primary: string;
        warning: string;
        error: string;
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
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      pending: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
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
      // == Background == \\
      background: {
        default: string;
        surface: string;
        header: string;
        sidebar: string;
      };

      // == TextWidget == \\
      text: {
        default: string;
        disabled: string;
      };

      // == CardWidget == \\
      card: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };
      // == AvatarWidget == \\
      avatar: {
        5: string;
        10: string;
        30: string;
        50: string;
        70: string;
        100: string;
      };

      // == hover == \\
      action: {
        hover: string;
      };
    };
  }
}

const themeMap: { [key: string]: Theme } = {
  PureLightTheme,
  PureDarkTheme
};
