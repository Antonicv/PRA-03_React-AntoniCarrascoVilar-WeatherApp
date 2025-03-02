import { CreateTheme } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
        default: '#ffffff',
        paper: '#f5f5f5',
      },
      text: {
        primary: '#000000',
        secondary: '#757575',
      },
  },
});

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
    },
  });