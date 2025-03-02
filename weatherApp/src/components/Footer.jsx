
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Wheather App By:
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
         CIFO "La Violeta" |  Antoni Carrasco Vilar  <br />Desenvolupament d'Aplicacions amb Tecnologies Web
         
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;