import { alpha, createTheme, lighten, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';

const Colors = {
  white: '#FFFFFF',
  black: '#000000',

  blue: '#0000FF',
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  green: '#008000',
  red: '#FF0000',
  yellow: '#FFFF00',

  secondary: '#f2e9e4',
  primary: '#c9ada7',
  success: '#40916c',
  warning: '#ffd60a',
  pending: '#ffbd00',
  error: '#e5383b',
  info: '#61a5c2'
};

// 🌞 Light Theme
const lightTheme = {
  background: '#FFFFFF',
  header: '#f1f1f1',
  sidebar: '#f8f8f8',
  surface: '#f8f8f8',

  textSecondary: '#333333',
  border: '#DCDCDC',
  accent: '#1E90FF',
  highlight: '#D3D3D3'
};

const colors = {
  gradients: {
    // white
    whiteblack: 'linear-gradient(135deg, #ffffff 0%, #000000 100%)',
    whiteblue: 'linear-gradient(135deg, #ffffff 0%, #0000FF 100%)',
    whiteorange: 'linear-gradient(135deg, #ffffff 0%, #FFA500 100%)',
    whitepurple: 'linear-gradient(135deg, #ffffff 0%, #800080 100%)',
    whitepink: 'linear-gradient(135deg, #ffffff 0%, #FFC0CB 100%)',
    whitegreen: 'linear-gradient(135deg, #ffffff 0%, #008000 100%)',
    whitered: 'linear-gradient(135deg, #ffffff 0%, #FF0000 100%)',
    whiteyellow: 'linear-gradient(135deg, #ffffff 0%, #FFFF00 100%)',

    // black
    blackwhite: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)',
    blackblue: 'linear-gradient(135deg, #000000 0%, #0000FF 100%)',
    blackorange: 'linear-gradient(135deg, #000000 0%, #FFA500 100%)',
    blackpurple: 'linear-gradient(135deg, #000000 0%, #800080 100%)',
    blackpink: 'linear-gradient(135deg, #000000 0%, #FFC0CB 100%)',
    blackgreen: 'linear-gradient(135deg, #000000 0%, #008000 100%)',
    blackred: 'linear-gradient(135deg, #000000 0%, #FF0000 100%)',
    blackyellow: 'linear-gradient(135deg, #000000 0%, #FFFF00 100%)',

    // blue
    bluewhite: 'linear-gradient(135deg, #0000FF 0%, #ffffff 100%)',
    blueblack: 'linear-gradient(135deg, #0000FF 0%, #000000 100%)',
    blueorange: 'linear-gradient(135deg, #0000FF 0%, #FFA500 100%)',
    bluepurple: 'linear-gradient(135deg, #0000FF 0%, #800080 100%)',
    bluepink: 'linear-gradient(135deg, #0000FF 0%, #FFC0CB 100%)',
    bluegreen: 'linear-gradient(135deg, #0000FF 0%, #008000 100%)',
    bluered: 'linear-gradient(135deg, #0000FF 0%, #FF0000 100%)',
    blueyellow: 'linear-gradient(135deg, #0000FF 0%, #FFFF00 100%)',

    // orange
    orangewhite: 'linear-gradient(135deg, #FFA500 0%, #ffffff 100%)',
    orangeblack: 'linear-gradient(135deg, #FFA500 0%, #000000 100%)',
    orangeblue: 'linear-gradient(135deg, #FFA500 0%, #0000FF 100%)',
    orangepurple: 'linear-gradient(135deg, #FFA500 0%, #800080 100%)',
    orangepink: 'linear-gradient(135deg, #FFA500 0%, #FFC0CB 100%)',
    orangegreen: 'linear-gradient(135deg, #FFA500 0%, #008000 100%)',
    orangered: 'linear-gradient(135deg, #FFA500 0%, #FF0000 100%)',
    orangeyellow: 'linear-gradient(135deg, #FFA500 0%, #FFFF00 100%)',

    // purple
    purplewhite: 'linear-gradient(135deg, #800080 0%, #ffffff 100%)',
    purpleblack: 'linear-gradient(135deg, #800080 0%, #000000 100%)',
    purpleblue: 'linear-gradient(135deg, #800080 0%, #0000FF 100%)',
    purpleorange: 'linear-gradient(135deg, #800080 0%, #FFA500 100%)',
    purplepink: 'linear-gradient(135deg, #800080 0%, #FFC0CB 100%)',
    purplegreen: 'linear-gradient(135deg, #800080 0%, #008000 100%)',
    purplered: 'linear-gradient(135deg, #800080 0%, #FF0000 100%)',
    purpleyellow: 'linear-gradient(135deg, #800080 0%, #FFFF00 100%)',

    // pink
    pinkwhite: 'linear-gradient(135deg, #FFC0CB 0%, #ffffff 100%)',
    pinkblack: 'linear-gradient(135deg, #FFC0CB 0%, #000000 100%)',
    pinkblue: 'linear-gradient(135deg, #FFC0CB 0%, #0000FF 100%)',
    pinkorange: 'linear-gradient(135deg, #FFC0CB 0%, #FFA500 100%)',
    pinkpurple: 'linear-gradient(135deg, #FFC0CB 0%, #800080 100%)',
    pinkgreen: 'linear-gradient(135deg, #FFC0CB 0%, #008000 100%)',
    pinkred: 'linear-gradient(135deg, #FFC0CB 0%, #FF0000 100%)',
    pinkyellow: 'linear-gradient(135deg, #FFC0CB 0%, #FFFF00 100%)',

    // green
    greenwhite: 'linear-gradient(135deg, #008000 0%, #ffffff 100%)',
    greenblack: 'linear-gradient(135deg, #008000 0%, #000000 100%)',
    greenblue: 'linear-gradient(135deg, #008000 0%, #0000FF 100%)',
    greenorange: 'linear-gradient(135deg, #008000 0%, #FFA500 100%)',
    greenpurple: 'linear-gradient(135deg, #008000 0%, #800080 100%)',
    greenpink: 'linear-gradient(135deg, #008000 0%, #FFC0CB 100%)',
    greenred: 'linear-gradient(135deg, #008000 0%, #FF0000 100%)',
    greenyellow: 'linear-gradient(135deg, #008000 0%, #FFFF00 100%)',

    // red
    redwhite: 'linear-gradient(135deg, #FF0000 0%, #ffffff 100%)',
    redblack: 'linear-gradient(135deg, #FF0000 0%, #000000 100%)',
    redblue: 'linear-gradient(135deg, #FF0000 0%, #0000FF 100%)',
    redorange: 'linear-gradient(135deg, #FF0000 0%, #FFA500 100%)',
    redpurple: 'linear-gradient(135deg, #FF0000 0%, #800080 100%)',
    redpink: 'linear-gradient(135deg, #FF0000 0%, #FFC0CB 100%)',
    redgreen: 'linear-gradient(135deg, #FF0000 0%, #008000 100%)',
    redyellow: 'linear-gradient(135deg, #FF0000 0%, #FFFF00 100%)',

    // yellow
    yellowwhite: 'linear-gradient(135deg, #FFFF00 0%, #ffffff 100%)',
    yellowblack: 'linear-gradient(135deg, #FFFF00 0%, #000000 100%)',
    yellowblue: 'linear-gradient(135deg, #FFFF00 0%, #0000FF 100%)',
    yelloworange: 'linear-gradient(135deg, #FFFF00 0%, #FFA500 100%)',
    yellowpurple: 'linear-gradient(135deg, #FFFF00 0%, #800080 100%)',
    yellowpink: 'linear-gradient(135deg, #FFFF00 0%, #FFC0CB 100%)',
    yellowgreen: 'linear-gradient(135deg, #FFFF00 0%, #008000 100%)',
    yellowred: 'linear-gradient(135deg, #FFFF00 0%, #FF0000 100%)'
  },
  shadows: {
    card: `0px 4px 8px ${alpha(Colors.black, 0.1)}`,
    info: `0px 4px 8px ${alpha(Colors.info, 0.1)}`,
    success: `0px 4px 8px ${alpha(Colors.success, 0.1)}`,
    pending: `0px 4px 8px ${alpha(Colors.pending, 0.1)}`,
    primary: `0px 4px 8px ${alpha(Colors.primary, 0.1)}`,
    warning: `0px 4px 8px ${alpha(Colors.warning, 0.1)}`,
    error: `0px 4px 8px ${alpha(Colors.error, 0.1)}`
  },
  layout: {
    general: {
      bodyBg: lightTheme.background
    },
    sidebar: {
      background: lightTheme.highlight,
      textColor: Colors.black,
      dividerBg: '#f2f5f9',
      menuItemColor: '#242E6F',
      menuItemColorActive: lightTheme.accent,
      menuItemBg: lightTheme.highlight,
      menuItemBgActive: '#f2f5f9',
      menuItemIconColor: lighten(Colors.black, 0.3),
      menuItemIconColorActive: lightTheme.accent,
      menuItemHeadingColor: darken(Colors.black, 0.3)
    },
    header: {
      background: lightTheme.header,
      boxShadow: lightTheme.highlight,
      textColor: Colors.black
    }
  },
  alpha: {
    white: {
      5: alpha(Colors.white, 0.02),
      10: alpha(Colors.white, 0.1),
      30: alpha(Colors.white, 0.3),
      50: alpha(Colors.white, 0.5),
      70: alpha(Colors.white, 0.7),
      100: Colors.white
    },
    black: {
      5: alpha(Colors.black, 0.02),
      10: alpha(Colors.black, 0.1),
      30: alpha(Colors.black, 0.3),
      50: alpha(Colors.black, 0.5),
      70: alpha(Colors.black, 0.7),
      100: Colors.black
    },
    blue: {
      5: alpha(Colors.blue, 0.02),
      10: alpha(Colors.blue, 0.1),
      30: alpha(Colors.blue, 0.3),
      50: alpha(Colors.blue, 0.5),
      70: alpha(Colors.blue, 0.7),
      100: Colors.blue
    },
    orange: {
      5: alpha(Colors.orange, 0.02),
      10: alpha(Colors.orange, 0.1),
      30: alpha(Colors.orange, 0.3),
      50: alpha(Colors.orange, 0.5),
      70: alpha(Colors.orange, 0.7),
      100: Colors.orange
    },
    purple: {
      5: alpha(Colors.purple, 0.02),
      10: alpha(Colors.purple, 0.1),
      30: alpha(Colors.purple, 0.3),
      50: alpha(Colors.purple, 0.5),
      70: alpha(Colors.purple, 0.7),
      100: Colors.purple
    },
    pink: {
      5: alpha(Colors.pink, 0.02),
      10: alpha(Colors.pink, 0.1),
      30: alpha(Colors.pink, 0.3),
      50: alpha(Colors.pink, 0.5),
      70: alpha(Colors.pink, 0.7),
      100: Colors.pink
    },
    green: {
      5: alpha(Colors.green, 0.02),
      10: alpha(Colors.green, 0.1),
      30: alpha(Colors.green, 0.3),
      50: alpha(Colors.green, 0.5),
      70: alpha(Colors.green, 0.7),
      100: Colors.green
    },
    red: {
      5: alpha(Colors.red, 0.02),
      10: alpha(Colors.red, 0.1),
      30: alpha(Colors.red, 0.3),
      50: alpha(Colors.red, 0.5),
      70: alpha(Colors.red, 0.7),
      100: Colors.red
    },
    yellow: {
      5: alpha(Colors.yellow, 0.02),
      10: alpha(Colors.yellow, 0.1),
      30: alpha(Colors.yellow, 0.3),
      50: alpha(Colors.yellow, 0.5),
      70: alpha(Colors.yellow, 0.7),
      100: Colors.yellow
    }
  },
  secondary: {
    lighter: lighten(Colors.secondary, 0.85),
    light: lighten(Colors.secondary, 0.25),
    main: Colors.secondary,
    dark: darken(Colors.secondary, 0.2)
  },
  primary: {
    lighter: lighten(Colors.primary, 0.85),
    light: lighten(Colors.primary, 0.3),
    main: Colors.primary,
    dark: darken(Colors.primary, 0.2)
  },
  success: {
    lighter: lighten(Colors.success, 0.85),
    light: lighten(Colors.success, 0.3),
    main: Colors.success,
    dark: darken(Colors.success, 0.2)
  },
  warning: {
    lighter: lighten(Colors.warning, 0.85),
    light: lighten(Colors.warning, 0.3),
    main: Colors.warning,
    dark: darken(Colors.warning, 0.2)
  },
  pending: {
    lighter: lighten(Colors.pending, 0.85),
    light: lighten(Colors.pending, 0.3),
    main: Colors.pending,
    dark: darken(Colors.pending, 0.2)
  },
  error: {
    lighter: lighten(Colors.error, 0.85),
    light: lighten(Colors.error, 0.3),
    main: Colors.error,
    dark: darken(Colors.error, 0.2)
  },
  info: {
    lighter: lighten(Colors.info, 0.85),
    light: lighten(Colors.info, 0.3),
    main: Colors.info,
    dark: darken(Colors.info, 0.2)
  }
};

export const PureLightTheme = createTheme({
  colors: {
    gradients: {
      // white
      whiteblack: colors.gradients.whiteblack,
      whiteblue: colors.gradients.whiteblue,
      whiteorange: colors.gradients.whiteorange,
      whitepurple: colors.gradients.whitepurple,
      whitepink: colors.gradients.whitepink,
      whitegreen: colors.gradients.whitegreen,
      whitered: colors.gradients.whitered,
      whiteyellow: colors.gradients.whiteyellow,

      // black
      blackwhite: colors.gradients.blackwhite,
      blackblue: colors.gradients.blackblue,
      blackorange: colors.gradients.blackorange,
      blackpurple: colors.gradients.blackpurple,
      blackpink: colors.gradients.blackpink,
      blackgreen: colors.gradients.blackgreen,
      blackred: colors.gradients.blackred,
      blackyellow: colors.gradients.blackyellow,

      // blue
      bluewhite: colors.gradients.bluewhite,
      blueblack: colors.gradients.blueblack,
      blueorange: colors.gradients.blueorange,
      bluepurple: colors.gradients.bluepurple,
      bluepink: colors.gradients.bluepink,
      bluegreen: colors.gradients.bluegreen,
      bluered: colors.gradients.bluered,
      blueyellow: colors.gradients.blueyellow,

      // orange
      orangewhite: colors.gradients.orangewhite,
      orangeblack: colors.gradients.orangeblack,
      orangeblue: colors.gradients.orangeblue,
      orangepurple: colors.gradients.orangepurple,
      orangepink: colors.gradients.orangepink,
      orangegreen: colors.gradients.orangegreen,
      orangered: colors.gradients.orangered,
      orangeyellow: colors.gradients.orangeyellow,

      // purple
      purplewhite: colors.gradients.purplewhite,
      purpleblack: colors.gradients.purpleblack,
      purpleblue: colors.gradients.purpleblue,
      purpleorange: colors.gradients.purpleorange,
      purplepink: colors.gradients.purplepink,
      purplegreen: colors.gradients.purplegreen,
      purplered: colors.gradients.purplered,
      purpleyellow: colors.gradients.purpleyellow,

      // pink
      pinkwhite: colors.gradients.pinkwhite,
      pinkblack: colors.gradients.pinkblack,
      pinkblue: colors.gradients.pinkblue,
      pinkorange: colors.gradients.pinkorange,
      pinkpurple: colors.gradients.pinkpurple,
      pinkgreen: colors.gradients.pinkgreen,
      pinkred: colors.gradients.pinkred,
      pinkyellow: colors.gradients.pinkyellow,

      // green
      greenwhite: colors.gradients.greenwhite,
      greenblack: colors.gradients.greenblack,
      greenblue: colors.gradients.greenblue,
      greenorange: colors.gradients.greenorange,
      greenpurple: colors.gradients.greenpurple,
      greenpink: colors.gradients.greenpink,
      greenred: colors.gradients.greenred,
      greenyellow: colors.gradients.greenyellow,

      // red
      redwhite: colors.gradients.redwhite,
      redblack: colors.gradients.redblack,
      redblue: colors.gradients.redblue,
      redorange: colors.gradients.redorange,
      redpurple: colors.gradients.redpurple,
      redpink: colors.gradients.redpink,
      redgreen: colors.gradients.redgreen,
      redyellow: colors.gradients.redyellow,

      // yellow
      yellowwhite: colors.gradients.yellowwhite,
      yellowblack: colors.gradients.yellowblack,
      yellowblue: colors.gradients.yellowblue,
      yelloworange: colors.gradients.yelloworange,
      yellowpurple: colors.gradients.yellowpurple,
      yellowpink: colors.gradients.yellowpink,
      yellowgreen: colors.gradients.yellowgreen,
      yellowred: colors.gradients.yellowred
    },
    shadows: {
      card: colors.shadows.card,
      info: colors.shadows.info,
      success: colors.shadows.success,
      pending: colors.shadows.pending,
      primary: colors.shadows.primary,
      warning: colors.shadows.warning,
      error: colors.shadows.error
    },
    alpha: {
      white: {
        5: alpha(Colors.white, 0.02),
        10: alpha(Colors.white, 0.1),
        30: alpha(Colors.white, 0.3),
        50: alpha(Colors.white, 0.5),
        70: alpha(Colors.white, 0.7),
        100: Colors.white
      },
      black: {
        5: alpha(Colors.black, 0.02),
        10: alpha(Colors.black, 0.1),
        30: alpha(Colors.black, 0.3),
        50: alpha(Colors.black, 0.5),
        70: alpha(Colors.black, 0.7),
        100: Colors.black
      },
      blue: {
        5: alpha(Colors.blue, 0.02),
        10: alpha(Colors.blue, 0.1),
        30: alpha(Colors.blue, 0.3),
        50: alpha(Colors.blue, 0.5),
        70: alpha(Colors.blue, 0.7),
        100: Colors.blue
      },
      orange: {
        5: alpha(Colors.orange, 0.02),
        10: alpha(Colors.orange, 0.1),
        30: alpha(Colors.orange, 0.3),
        50: alpha(Colors.orange, 0.5),
        70: alpha(Colors.orange, 0.7),
        100: Colors.orange
      },
      purple: {
        5: alpha(Colors.purple, 0.02),
        10: alpha(Colors.purple, 0.1),
        30: alpha(Colors.purple, 0.3),
        50: alpha(Colors.purple, 0.5),
        70: alpha(Colors.purple, 0.7),
        100: Colors.purple
      },
      pink: {
        5: alpha(Colors.pink, 0.02),
        10: alpha(Colors.pink, 0.1),
        30: alpha(Colors.pink, 0.3),
        50: alpha(Colors.pink, 0.5),
        70: alpha(Colors.pink, 0.7),
        100: Colors.pink
      },
      green: {
        5: alpha(Colors.green, 0.02),
        10: alpha(Colors.green, 0.1),
        30: alpha(Colors.green, 0.3),
        50: alpha(Colors.green, 0.5),
        70: alpha(Colors.green, 0.7),
        100: Colors.green
      },
      red: {
        5: alpha(Colors.red, 0.02),
        10: alpha(Colors.red, 0.1),
        30: alpha(Colors.red, 0.3),
        50: alpha(Colors.red, 0.5),
        70: alpha(Colors.red, 0.7),
        100: Colors.red
      },
      yellow: {
        5: alpha(Colors.yellow, 0.02),
        10: alpha(Colors.yellow, 0.1),
        30: alpha(Colors.yellow, 0.3),
        50: alpha(Colors.yellow, 0.5),
        70: alpha(Colors.yellow, 0.7),
        100: Colors.yellow
      }
    },
    secondary: {
      lighter: alpha(Colors.secondary, 0.1),
      light: lighten(Colors.secondary, 0.3),
      main: Colors.secondary,
      dark: darken(Colors.secondary, 0.2)
    },
    primary: {
      lighter: alpha(Colors.primary, 0.1),
      light: lighten(Colors.primary, 0.3),
      main: Colors.primary,
      dark: darken(Colors.primary, 0.2)
    },
    success: {
      lighter: alpha(Colors.success, 0.1),
      light: lighten(Colors.success, 0.3),
      main: Colors.success,
      dark: darken(Colors.success, 0.2)
    },
    warning: {
      lighter: alpha(Colors.warning, 0.1),
      light: lighten(Colors.warning, 0.3),
      main: Colors.warning,
      dark: darken(Colors.warning, 0.2)
    },
    pending: {
      lighter: alpha(Colors.pending, 0.1),
      light: lighten(Colors.pending, 0.3),
      main: Colors.pending,
      dark: darken(Colors.pending, 0.2)
    },
    error: {
      lighter: alpha(Colors.error, 0.1),
      light: lighten(Colors.error, 0.3),
      main: Colors.error,
      dark: darken(Colors.error, 0.2)
    },
    info: {
      lighter: alpha(Colors.info, 0.1),
      light: lighten(Colors.info, 0.3),
      main: Colors.info,
      dark: darken(Colors.info, 0.2)
    }
  },
  general: {
    reactFrameworkColor: '#00D8FF',
    borderRadiusSm: '6px',
    borderRadius: '10px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px'
  },
  sidebar: {
    width: '280px',
    background: colors.layout.sidebar.background,
    boxShadow:
      '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)',
    textColor: colors.layout.sidebar.textColor,
    dividerBg: colors.layout.sidebar.dividerBg,
    menuItemColor: colors.layout.sidebar.menuItemColor,
    menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
    menuItemBg: colors.layout.sidebar.menuItemBg,
    menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
    menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
    menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
    menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor
  },
  header: {
    height: '80px',
    background: colors.layout.header.background,
    boxShadow:
      '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)',
    textColor: colors.layout.header.textColor
  },
  mode: {
    main: {
      5: alpha(Colors.white, 0.02),
      10: alpha(Colors.white, 0.1),
      30: alpha(Colors.white, 0.3),
      50: alpha(Colors.white, 0.5),
      70: alpha(Colors.white, 0.7),
      100: Colors.white
    },
    // == Background == \\
    background: {
      default: lightTheme.background,
      surface: lightTheme.surface,
      header: lightTheme.header,
      sidebar: lightTheme.sidebar
    },
    // == TextWidget == \\
    text: {
      default: colors.alpha.black[100],
      disabled: colors.alpha.black[50]
    },

    // == CardWidget == \\
    card: {
      5: alpha(Colors.black, 0.02),
      10: alpha(Colors.black, 0.1),
      30: alpha(Colors.black, 0.3),
      50: alpha(Colors.black, 0.5),
      70: alpha(Colors.black, 0.7),
      100: Colors.black
    },
    // == AvatarWidget == \\
    avatar: {
      5: alpha(Colors.black, 0.02),
      10: alpha(Colors.black, 0.1),
      30: alpha(Colors.black, 0.3),
      50: alpha(Colors.black, 0.5),
      70: alpha(Colors.black, 0.7),
      100: Colors.black
    },
    action: {
      hover: colors.alpha.black[10],
      select: colors.alpha.black[10]
    },

    border: {
      5: alpha(Colors.black, 0.02),
      10: alpha(Colors.black, 0.1),
      30: alpha(Colors.black, 0.3),
      50: alpha(Colors.black, 0.5),
      70: alpha(Colors.black, 0.7),
      100: Colors.black
    }
  },
  spacing: 9,
  palette: {
    common: {
      black: colors.alpha.black[100],
      white: colors.alpha.white[100]
    },
    mode: 'light',
    primary: {
      light: colors.primary.light,
      main: colors.alpha.black[10],
      dark: colors.primary.dark
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: colors.alpha.white[100]
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: colors.alpha.white[100]
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: colors.alpha.white[100]
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: colors.alpha.white[100]
    },
    text: {
      primary: colors.alpha.black[100],
      secondary: colors.alpha.black[70],
      disabled: colors.alpha.black[50]
    },
    background: {
      paper: lightTheme.surface,
      default: lightTheme.background
    },
    action: {
      active: colors.alpha.black[100],
      hover: lightTheme.highlight,
      hoverOpacity: 0.1,
      selected: colors.alpha.black[10],
      selectedOpacity: 0.1,
      disabled: colors.alpha.black[50],
      disabledBackground: colors.alpha.black[5],
      disabledOpacity: 0.38,
      focus: colors.alpha.black[10],
      focusOpacity: 0.05,
      activatedOpacity: 0.12
    },
    tonalOffset: 0.5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1840
    }
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darken(lightTheme.highlight, 0.4), 0.2),
          backdropFilter: 'blur(2px)',

          '&.MuiBackdrop-invisible': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(2px)'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          marginLeft: 8,
          marginRight: 8,
          fontWeight: 'bold'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          width: '100%',
          height: '100%'
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          flex: 1
        },
        '#__next': {
          width: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        },
        html: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased'
        },
        '.child-popover .MuiPaper-root .MuiList-root': {
          flexDirection: 'column'
        },
        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          background: colors.primary.lighter
        },
        '#nprogress .spinner-icon': {
          borderTopColor: colors.primary.lighter,
          borderLeftColor: colors.primary.lighter
        },
        '#nprogress .peg': {
          boxShadow:
            '0 0 15px ' +
            colors.primary.lighter +
            ', 0 0 8px' +
            colors.primary.light
        },
        ':root': {
          '--swiper-theme-color': colors.primary.main
        },
        code: {
          background: colors.info.lighter,
          color: colors.info.dark,
          borderRadius: 4,
          padding: 4
        },
        '@keyframes pulse': {
          '0%': {
            transform: 'scale(.75)'
          },
          '20%': {
            transform: 'scale(1.1)'
          },
          '40%': {
            transform: 'scale(.75)'
          },
          '60%': {
            transform: 'scale(1.05)'
          },
          '80%': {
            transform: 'scale(.75)'
          },
          '100%': {
            transform: 'scale(.75)'
          }
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(2.8)',
            opacity: 0
          }
        },
        '@keyframes float': {
          '0%': {
            transform: 'translate(0%, 0%)'
          },
          '100%': {
            transform: 'translate(3%, 3%)'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: colors.alpha.black[50]
        },
        icon: {
          top: 'calc(50% - 14px)'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined': {
            paddingRight: 6
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.alpha.black[50]
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main
          }
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        colorPrimary: {
          fontWeight: 'bold',
          lineHeight: '40px',
          fontSize: 13,
          background: colors.alpha.black[5],
          color: colors.alpha.black[70]
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          marginTop: -5,
          marginBottom: -5
        },
        title: {
          fontSize: 15
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          borderRadius: '50px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorSecondary: {
          background: colors.alpha.black[5],
          color: colors.alpha.black[100],

          '&:hover': {
            background: colors.alpha.black[10]
          }
        },
        deleteIcon: {
          color: colors.error.light,

          '&:hover': {
            color: colors.error.main
          }
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

          '&.Mui-expanded': {
            margin: 0
          },
          '&::before': {
            display: 'none'
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 'bold'
        },
        colorDefault: {
          background: colors.alpha.black[30],
          color: colors.alpha.white[100]
        }
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          alignItems: 'center'
        },
        avatar: {
          background: colors.alpha.black[10],
          fontSize: 13,
          color: colors.alpha.black[70],
          fontWeight: 'bold',

          '&:first-of-type': {
            border: 0,
            background: 'transparent'
          }
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        alignItemsFlexStart: {
          marginTop: 0
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          fontSize: 13,
          fontWeight: 'bold',
          transition: 'all .2s'
        },
        textPrimary: {
          '&.Mui-selected': {
            boxShadow: colors.shadows.primary
          },
          '&.MuiButtonBase-root:hover': {
            background: colors.alpha.black[5]
          },
          '&.Mui-selected.MuiButtonBase-root:hover': {
            background: colors.primary.main
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          paddingLeft: 16,
          paddingRight: 16,

          '.MuiSvgIcon-root': {
            transition: 'all .2s'
          }
        },
        endIcon: {
          marginRight: -8
        },
        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.alpha.white[100],
          border: '1px solid ' + colors.alpha.black[30]
        },
        outlinedSecondary: {
          backgroundColor: colors.alpha.white[100],

          '&:hover, &.MuiSelected': {
            backgroundColor: colors.alpha.black[5],
            color: colors.alpha.black[100]
          }
        },
        sizeSmall: {
          padding: '6px 16px',
          lineHeight: 1.5
        },
        sizeMedium: {
          padding: '8px 20px'
        },
        sizeLarge: {
          padding: '11px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    },
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: colors.primary.main,
          background: colors.alpha.white[100],
          transition: 'all .2s',

          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            color: colors.alpha.white[100],
            background: colors.primary.main
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,

          '& .MuiTouchRipple-root': {
            borderRadius: 8
          }
        },
        sizeSmall: {
          padding: 4
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            opacity: 0.3
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: colors.alpha.black[10],
          border: 0,
          height: 1
        },
        vertical: {
          height: 'auto',
          width: 1,

          '&.MuiDivider-flexItem.MuiDivider-fullWidth': {
            height: 'auto'
          },
          '&.MuiDivider-absolute.MuiDivider-fullWidth': {
            height: '100%'
          }
        },
        withChildren: {
          '&:before, &:after': {
            border: 0
          }
        },
        wrapper: {
          background: colors.alpha.white[100],
          fontWeight: 'bold',
          height: 24,
          lineHeight: '24px',
          marginTop: -12,
          color: 'inherit',
          textTransform: 'uppercase'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 0
        },
        elevation0: {
          boxShadow: 'none'
        },
        elevation: {
          boxShadow: colors.shadows.info
        },
        elevation2: {
          boxShadow: colors.shadows.info
        },
        elevation24: {
          boxShadow: colors.shadows.info
        },
        outlined: {
          boxShadow: colors.shadows.info
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 6
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel': {
            transform: 'none'
          },
          '& .MuiSlider-valueLabel': {
            borderRadius: 6,
            background: colors.alpha.black[100],
            color: colors.alpha.white[100]
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,

          '& .MuiListItem-button': {
            transition: 'all .2s',

            '& > .MuiSvgIcon-root': {
              minWidth: 34
            },

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            }
          },
          '& .MuiListItem-root.MuiButtonBase-root.Mui-selected': {
            backgroundColor: alpha(colors.primary.lighter, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root:active': {
            backgroundColor: alpha(colors.primary.lighter, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root .MuiTouchRipple-root': {
            opacity: 0.2
          }
        },
        padding: {
          padding: '12px',

          '& .MuiListItem-button': {
            borderRadius: 6,
            margin: '1px 0'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: 38,
          minHeight: 38,
          overflow: 'visible'
        },
        indicator: {
          height: 38,
          minHeight: 38,
          borderRadius: 6,
          border: '1px solid ' + colors.primary.dark,
          boxShadow: '0px 2px 10px ' + colors.primary.light
        },
        scrollableX: {
          overflow: 'visible !important'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          height: 38,
          minHeight: 38,
          borderRadius: 6,
          transition: 'color .2s',
          textTransform: 'capitalize',

          '&.MuiButtonBase-root': {
            minWidth: 'auto',
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 4
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: colors.alpha.white[100],
            zIndex: 5
          },
          '&:hover': {
            color: colors.alpha.black[100]
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12
        },
        list: {
          padding: 12,

          '& .MuiMenuItem-root.MuiButtonBase-root': {
            fontSize: 14,
            marginTop: 1,
            marginBottom: 1,
            transition: 'all .2s',
            color: colors.alpha.black[70],

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            },

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: colors.alpha.black[100],
              background: alpha(colors.primary.lighter, 0.4)
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: 'transparent',
          transition: 'all .2s',

          '&:hover, &:active, &.active, &.Mui-selected': {
            color: colors.alpha.black[100],
            background: alpha(colors.primary.lighter, 0.4)
          },
          '&.Mui-selected:hover': {
            background: alpha(colors.primary.lighter, 0.4)
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.MuiButtonBase-root': {
            color: colors.secondary.main,

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: colors.alpha.black[100],
              background: lighten(colors.primary.lighter, 0.5)
            }
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          margin: 1
        },
        root: {
          '.MuiAutocomplete-inputRoot.MuiOutlinedInput-root .MuiAutocomplete-endAdornment':
            {
              right: 14
            }
        },
        clearIndicator: {
          background: colors.error.lighter,
          color: colors.error.main,
          marginRight: 8,

          '&:hover': {
            background: colors.error.lighter,
            color: colors.error.dark
          }
        },
        popupIndicator: {
          color: colors.alpha.black[50],

          '&:hover': {
            background: colors.primary.lighter,
            color: colors.primary.main
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          '& .MuiIconButton-root': {
            padding: 8
          }
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '0 !important',
          padding: '0 !important'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          background: colors.alpha.black[5]
        },
        root: {
          transition: 'background-color .2s',

          '&.MuiTableRow-hover:hover': {
            backgroundColor: colors.alpha.black[5]
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: colors.alpha.black[10],
          fontSize: 14
        },
        head: {
          textTransform: 'uppercase',
          fontSize: 13,
          fontWeight: 'bold',
          color: colors.alpha.black[70]
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          lineHeight: 1.5,
          fontSize: 14
        },
        standardInfo: {
          color: colors.info.main
        },
        action: {
          color: colors.alpha.black[70]
        }
      }
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          margin: 0,
          zIndex: 5,
          position: 'absolute',
          top: '50%',
          marginTop: -6,
          left: -6
        },
        outlined: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        },
        outlinedPrimary: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          position: 'absolute',
          height: '100%',
          top: 0,
          borderRadius: 50,
          backgroundColor: colors.alpha.black[10]
        }
      }
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: '8px 0',

          '&:before': {
            display: 'none'
          }
        },
        missingOppositeContent: {
          '&:before': {
            display: 'none'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(colors.alpha.black['100'], 0.95),
          padding: '8px 16px',
          fontSize: 13
        },
        arrow: {
          color: alpha(colors.alpha.black['100'], 0.95)
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 33,
          overflow: 'visible',

          '& .MuiButtonBase-root': {
            position: 'absolute',
            padding: 6,
            transition:
              'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '& .MuiIconButton-root': {
            borderRadius: 100
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            opacity: 0.3
          }
        },
        thumb: {
          border: '1px solid ' + colors.alpha.black[30],
          boxShadow:
            '0px 9px 14px ' +
            colors.alpha.black[10] +
            ', 0px 2px 2px ' +
            colors.alpha.black[10]
        },
        track: {
          backgroundColor: colors.alpha.black[5],
          border: '1px solid ' + colors.alpha.black[10],
          boxShadow: 'inset 0px 1px 1px ' + colors.alpha.black[10],
          opacity: 1
        },
        colorPrimary: {
          '& .MuiSwitch-thumb': {
            backgroundColor: colors.alpha.white[100]
          },

          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: colors.primary.main
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingTop: 20,
          paddingBottom: 20,
          background: colors.alpha.black[5]
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.MuiStepIcon-completed': {
            color: colors.success.main
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'div',
          h4: 'div',
          h5: 'div',
          h6: 'div',
          subtitle1: 'div',
          subtitle2: 'div',
          body1: 'div',
          body2: 'div'
        }
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: 4
        },
        paragraph: {
          fontSize: 17,
          lineHeight: 1.7
        }
      }
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: {
      fontWeight: 700,
      fontSize: 35
    },
    h2: {
      fontWeight: 700,
      fontSize: 30
    },
    h3: {
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.4,
      color: colors.alpha.black[100]
    },
    h4: {
      fontWeight: 700,
      fontSize: 16
    },
    h5: {
      fontWeight: 700,
      fontSize: 14
    },
    h6: {
      fontSize: 15
    },
    body1: {
      fontSize: 14
    },
    body2: {
      fontSize: 14
    },
    button: {
      fontWeight: 600
    },
    caption: {
      fontSize: 13,
      textTransform: 'uppercase',
      color: colors.alpha.black[50]
    },
    subtitle1: {
      fontSize: 14,
      color: colors.alpha.black[70]
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 15,
      color: colors.alpha.black[70]
    },
    overline: {
      fontSize: 13,
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none'
  ]
});
