// Layout.jsx
// Este componente define la estructura de la aplicación y se encarga de aplicar el tema y los estilos globales.
// ----------------------------------------------------------------


// Importa los componentes necesarios de Material-UI

import { Box, ThemeProvider, GlobalStyles } from '@mui/material';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from './themeContext.jsx';

// Define el componente Layout
const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  // Devuelve la estructura de la aplicación
  return (
    <ThemeProvider theme={theme}>
      {/* Estilos globales para el body */}
      <GlobalStyles
        styles={{
          body: {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            // margin: 0, 
          }
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, width: '100%', maxWidth: 'none ! important'}}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
// Exporta el componente Layout
export default Layout;