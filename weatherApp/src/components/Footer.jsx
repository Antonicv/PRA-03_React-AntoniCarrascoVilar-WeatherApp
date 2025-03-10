// Footer.jsx
// Aquest component mostra el peu de pàgina de l'aplicació amb informació sobre l'autor i el curs.
// ----------------------------------------------------------------

// Importa els components necessaris de Material-UI
import { Box, Typography, Container, useTheme } from '@mui/material';

// Defineix el component Footer
const Footer = () => {
  const theme = useTheme(); // Obtén el tema actual

  // Renderitza el component
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Weather App By:
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          CIFO "La Violeta" | Antoni Carrasco Vilar <br />Desenvolupament d'Aplicacions amb Tecnologies Web
        </Typography>
      </Container>
    </Box>
  );
};

// Exporta el component Footer
export default Footer;