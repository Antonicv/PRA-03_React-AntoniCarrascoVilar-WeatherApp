//Definir el contexto del tema y el proveedor del tema

//imports:

import React, { createContext, useState, useMemo} from 'react';
import { createTheme } from '@mui/material/styles';

// Definir los temas claro y oscuro
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2A3F5F', // Azul marino oscuro 
      light: '#3D5675',// Azul marino claro
      dark: '#1A2A40',// Azul marino oscuro
    },
    secondary: {
      main: '#7A4F6B', // Borgoña suave 
      light: '#8C637D', // Borgoña claro
      dark: '#683B56', // Borgoña oscuro
    },
    background: {
      default: '#F8F9FA', // Blanco ligeramente cálido
      paper: '#E9ECEF',   // Gris muy claro neutro
    },
    text: {
      primary: '#212529',  // Negro suave
      secondary: '#495057', // Gris medio
    },
    divider: '#CED4DA',    // Líneas sutiles
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6AB7C6', // Verde azulado suave 
      light: '#8ECCD6',
      dark: '#4A9DAB',
    },
    secondary: {
      main: '#C77D8E', // Coral apagado (contraste elegante)
      light: '#D897A5',
      dark: '#B05D71',
    },
    background: {
      default: '#0A1929',  // Azul noche profundo
      paper: '#172B4D',    // Azul oscuro con profundidad
    },
    text: {
      primary: '#E9ECEF',   // Blanco cálido
      secondary: '#ADB5BD', // Gris medio claro
    },
    divider: '#2C3E5A',    // Líneas de contraste suave
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});
// Crear el contexto del tema
export const ThemeContext = createContext();

// Proveedor del tema
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  // Cambiar el tema
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  // Seleccionar el tema
  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  // Aplicar el tema
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};