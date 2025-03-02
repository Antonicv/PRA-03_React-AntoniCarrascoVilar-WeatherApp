import React from 'react';
import { useTranslation } from 'react-i18next'; // Hook para traducciones
import { Container, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import WeatherIcon from '@mui/icons-material/WbSunny'; // Icono de clima
import MapIcon from '@mui/icons-material/Map'; // Icono de mapa

export default function Home() {
  const { t } = useTranslation(['common', 'home']); // Usa los namespaces 'common' y 'home'

  return (
    <Container>
      {/* Título y Descripción */}
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h2" gutterBottom>
          {t('home:title')}
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          {t('home:subtitle')}
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {t('home:description')}
        </Typography>
      </Box>

      {/* Características Destacadas */}
      <Grid container spacing={4} sx={{ my: 4 }}>
        {/* Clima */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <WeatherIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {t('home:feature_weather')}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {t('home:feature_weather_description')}
              </Typography>
              <Button variant="contained" color="primary" href="/weather">
                {t('home:cta_weather')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <MapIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                {t('home:feature_map')}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {t('home:feature_map_description')}
              </Typography>
              <Button variant="contained" color="primary" href="/map">
                {t('home:cta_map')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}