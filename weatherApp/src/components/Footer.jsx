// Footer.jsx
import { Box, Typography, Container, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

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

export default Footer;