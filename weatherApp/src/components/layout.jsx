// Layout.jsx
import { Box, ThemeProvider, GlobalStyles } from '@mui/material';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from './themeContext.jsx';

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

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
          
        }}
      >
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;