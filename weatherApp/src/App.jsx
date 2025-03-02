import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next'; // Hook para traducciones
import Weather from './pages/Weather';
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Layout from './components/layout';
import './i18next'; // Importa la configuración de i18next
import "@fontsource/roboto"; 
import "@fontsource/roboto/400.css"; 
import "@fontsource/roboto/700.css"; 
import ReactCountryFlag from 'react-country-flag';
import 'leaflet/dist/leaflet.css';



function Navigation() {
  const { t, i18n } = useTranslation(); // Obtén las funciones de traducción
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Cambiar idioma
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  // Elementos del menú
  const menuItems = [
    { text: t('common:home'), path: '/' },
    { text: t('common:weather'), path: '/weather' },
    { text: t('common:map'), path: '/map' },
    { text: t('common:about'), path: '/about' },
  ];

  return (
    <>
      {/* Barra de navegación */}
      <AppBar position="static">
        <Toolbar>
          {/* Botón del menú hamburguesa */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título de la aplicación */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('common:welcome')}
          </Typography>

          {/* Selector de idioma */}
          <FormControl variant="standard" sx={{ minWidth: 120, color: 'white' }}>
            <InputLabel id="language-select-label" sx={{ color: 'white' }}>
              {t('common:language')}
            </InputLabel>
            <Select
              labelId="language-select-label"
              value={i18n.language}
              onChange={changeLanguage}
              label={t('common:language')}
              sx={{ color: 'white', '& .MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="en"> <ReactCountryFlag countryCode="GB" svg style={{ marginRight: 8 }} />English</MenuItem>
              <MenuItem value="es"> <ReactCountryFlag countryCode="ES" svg style={{ marginRight: 8 }} />Español</MenuItem>
              <MenuItem value="ca"><ReactCountryFlag countryCode="ES-CT" svg style={{ marginRight: 8 }} />Català</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Navigation />
        <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </Layout>
    </Router>
  );
}