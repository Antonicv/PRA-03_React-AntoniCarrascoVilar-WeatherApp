// Layout.jsx
// Aquest component defineix l'estructura de l'aplicació i s'encarrega d'aplicar el tema i els estils globals.
// ----------------------------------------------------------------

// Importa els components necessaris de Material-UI
import { Box, ThemeProvider, GlobalStyles } from '@mui/material';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from './themeContext.jsx';

// Defineix el component Layout
const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext); // Utilitza el context del tema

  // Renderitza el component
  return (
    <ThemeProvider theme={theme}>
      {/* Estils globals per al body */}
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

// Exporta el component Layout
export default Layout;