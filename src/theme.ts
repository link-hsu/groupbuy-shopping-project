export const tokens = {
    grey: {
      100: "#f0f0f3",
      200: "#e1e2e7",
      300: "#d1d3da",
      400: "#c2c5ce",
      500: "#b3b6c2",
      600: "#8f929b",
      700: "#6b6d74",
      800: "#48494e",
      900: "#242427",
    },
    primary: {
      // light green
      100: "#d0fcf4",
      200: "#a0f9e9",
      300: "#71f5de",
      400: "#97B879",
      500: "#6FBE66",
      600: "#31AF35",
      700: "#0b8f78",
      800: "#076050",
      900: "#043028",
    },
    secondary: {
      // yellow
      100: "#fcf0dd",
      200: "#fae1bb",
      300: "#f7d299",
      400: "#f5c377",
      500: "#F7E0C4",
      600: "#c29044",
      700: "#916c33",
      800: "#614822",
      900: "#302411",
    },
    tertiary: {
      // purple
      500: "#8884d8",
    },
    background: {
      paper: "#FFFFFF",
      default: "#1A1A1A",
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[400],
        mellow: tokens.primary[600],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        paper: tokens.background.paper,
        default: tokens.background.default,
      },
    },
    typography: {
      fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        // color: tokens.grey[200],
      },
      h4: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 600,
        // color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 400,
        // color: tokens.grey[500],
      },
      h6: {
        fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        fontSize: 10,
        // color: tokens.grey[700],
      },
    },
  };
  