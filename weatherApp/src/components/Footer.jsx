// Footer.jsx
//componente Footer
// Este componente muestra el pie de página de la aplicación  con información sobre el autor y el curso.
// ----------------------------------------------------------------



// Importa los componentes necesarios de Material-UI

import { Box, Typography, Container, useTheme } from '@mui/material';

// Define el componente Footer
const Footer = () => {
  // Obtiene el tema actual
  const theme = useTheme();
  // Devuelve el pie de página
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
// Exporta el componente Footer
export default Footer;