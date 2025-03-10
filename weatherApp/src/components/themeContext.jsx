// Definir el context del tema i el proveïdor del tema

// Importa els components necessaris
import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// Defineix els temes clar i fosc
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2A3F5F', // Blau marí fosc
      light: '#3D5675', // Blau marí clar
      dark: '#1A2A40', // Blau marí molt fosc
    },
    secondary: {
      main: '#7A4F6B', // Borgonya suau
      light: '#8C637D', // Borgonya clar
      dark: '#683B56', // Borgonya fosc
    },
    background: {
      default: '#F8F9FA', // Blanc lleugerament càlid
      paper: '#E9ECEF', // Gris molt clar neutre
    },
    text: {
      primary: '#212529', // Negre suau
      secondary: '#495057', // Gris mitjà
    },
    divider: '#CED4DA', // Línies subtils
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6AB7C6', // Verd blavós suau
      light: '#8ECCD6',
      dark: '#4A9DAB',
    },
    secondary: {
      main: '#C77D8E', // Coral apagat (contrast elegant)
      light: '#D897A5',
      dark: '#B05D71',
    },
    background: {
      default: '#0A1929', // Blau nit profund
      paper: '#172B4D', // Blau fosc amb profunditat
    },
    text: {
      primary: '#E9ECEF', // Blanc càlid
      secondary: '#ADB5BD', // Gris mitjà clar
    },
    divider: '#2C3E5A', // Línies de contrast suau
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

// Crear el context del tema
export const ThemeContext = createContext();

// Proveïdor del tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Funció per canviar el tema
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Seleccionar el tema
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  // Renderitza el component
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};