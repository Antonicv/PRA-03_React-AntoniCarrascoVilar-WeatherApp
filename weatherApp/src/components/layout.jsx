// Layout.jsx
import { Box, ThemeProvider } from '@mui/material';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from './themeContext.jsx';

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext); // Obtén el tema del contexto

  return (
    <ThemeProvider theme={theme}> {/* Aplica el tema */}
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