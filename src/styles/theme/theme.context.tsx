// ThemeProvider.tsx
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  useColorScheme,
  type Theme as MuiTheme,
} from "@mui/material";

interface ThemeContextType {
  updateTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  updateTheme: () => {},
});

interface ThemeProviderProps {
  initialTheme: "light" | "dark";
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme,
  children,
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    setMode(initialTheme);
  }

  const updateTheme = () => {
    setMode(theme === "dark" ? "light" : "dark");
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const muiTheme: MuiTheme = createTheme({
    palette: {
      mode: theme,
      //   primary: {
      //     light: "#63a4ff",
      //     main: "#1976d2",
      //     dark: "#004ba0",
      //     contrastText: "#fafafa",
      //   },
      //   secondary: {
      //     light: "#ff4081",
      //     main: "#f50057",
      //     dark: "#c51162",
      //     contrastText: "#fafafa",
      //   },
      //   error: {
      //     light: "#e57373",
      //     main: "#f44336",
      //     dark: "#d32f2f",
      //     contrastText: "#fafafa",
      //   },
      //   warning: {
      //     light: "#ffb74d",
      //     main: "#ff9800",
      //     dark: "#f57c00",
      //     contrastText: "rgba(26,26,26,0.87)",
      //   },
      //   info: {
      //     light: "#64b5f6",
      //     main: "#2196f3",
      //     dark: "#1976d2",
      //     contrastText: "#fafafa",
      //   },
      //   success: {
      //     light: "#81c784",
      //     main: "#4caf50",
      //     dark: "#388e3c",
      //     contrastText: "rgba(26,26,26,0.87)",
      //   },
      //   background: {
      //     default: "#f5f5f5",
      //     paper: "#fafafa",
      //   },
      //   text: {
      //     primary: "rgba(26,26,26,0.87)",
      //     secondary: "rgba(26,26,26,0.6)",
      //     disabled: "rgba(26,26,26,0.38)",
      //   },
      //   divider: "rgba(26,26,26,0.12)",
      // },
      // typography: {
      //   fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      //   fontSize: 14,
      //   fontWeightLight: 300,
      //   fontWeightRegular: 400,
      //   fontWeightMedium: 500,
      //   h1: { fontSize: "6rem", fontWeight: 300, lineHeight: 1.167 },
      //   h2: { fontSize: "3.75rem", fontWeight: 300, lineHeight: 1.2 },
      //   h3: { fontSize: "3rem", fontWeight: 400, lineHeight: 1.167 },
      //   h4: { fontSize: "2.125rem", fontWeight: 400, lineHeight: 1.235 },
      //   h5: { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.334 },
      //   h6: { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.6 },
      //   subtitle1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.75 },
      //   subtitle2: {
      //     fontSize: "0.875rem",
      //     fontWeight: 500,
      //     lineHeight: 1.57,
      //   },
      //   body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 },
      //   body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.43 },
      //   button: { textTransform: "none", fontWeight: 500 },
      //   caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66 },
      //   overline: {
      //     fontSize: "0.75rem",
      //     fontWeight: 400,
      //     lineHeight: 2.66,
      //     textTransform: "uppercase",
      //   },
      // },
      // shape: {
      //   borderRadius: 8,
      // },
      // spacing: 8,
      // breakpoints: {
      //   values: {
      //     xs: 0,
      //     sm: 600,
      //     md: 960,
      //     lg: 1280,
      //     xl: 1920,
      //   },
      // },
      // transitions: {
      //   duration: {
      //     shortest: 150,
      //     shorter: 200,
      //     short: 250,
      //     standard: 300,
      //     complex: 375,
      //     enteringScreen: 225,
      //     leavingScreen: 195,
      //   },
      // },
      // zIndex: {
      //   mobileStepper: 1000,
      //   speedDial: 1050,
      //   appBar: 1100,
      //   drawer: 1200,
      //   modal: 1300,
      //   snackbar: 1400,
      //   tooltip: 1500,
      // },
      // components: {
      //   MuiButton: {
      //     defaultProps: {
      //       disableElevation: true,
      //       variant: "contained",
      //     },
      //     styleOverrides: {
      //       root: {
      //         borderRadius: 8,
      //       },
      //     },
      //   },
      //   MuiAppBar: {
      //     styleOverrides: {
      //       root: {
      //         boxShadow: "none",
      //       },
      //     },
      //   },
      //   MuiPaper: {
      //     styleOverrides: {
      //       root: {
      //         backgroundImage: "none",
      //       },
      //     },
      //   },
      //   MuiCard: {
      //     styleOverrides: {
      //       root: {
      //         borderRadius: 12,
      //         boxShadow: "0px 4px 6px rgba(26, 26, 26, 0.1)",
      //       },
      //     },
      //   },
    },
  });

  return (
    <ThemeContext.Provider value={{ updateTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};
