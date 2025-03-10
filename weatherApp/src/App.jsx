// Codi del component App
// ------------------------------------------------------------
// Aquest component defineix l'estructura de l'aplicació i les rutes de navegació.

// Importa les llibreries necessàries
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Hook per a traduccions
import { useTranslation } from 'react-i18next'; 
// Importa els components de Material-UI  
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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// Importa les pàgines de l'aplicació
import Weather from './pages/Weather';
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Layout from './components/layout';
import ReactCountryFlag from 'react-country-flag';
// Importa la configuració de i18next
import './i18next'; 
import "@fontsource/roboto"; 
import "@fontsource/roboto/400.css"; 
import "@fontsource/roboto/700.css"; 
import 'leaflet/dist/leaflet.css';

// Importa el context del tema
import { ThemeContext } from './components/themeContext'; 

// Component de navegació
function Navigation() {
  const { t, i18n } = useTranslation(); // Obtén les funcions de traducció
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Obtén l'estat del tema i la funció per canviar-lo

  // Canviar idioma
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  // Elements del menú
  const menuItems = [
    { text: t('common:home'), path: '/' },
    { text: t('common:weather'), path: '/weather' },
    { text: t('common:map'), path: '/map' },
    { text: t('common:about'), path: '/about' },
  ];

  // Renderitza el component
  return (
    <>
      {/* Barra de navegació */}
      <AppBar position="static">
        <Toolbar>
          {/* Botó del menú hamburguesa */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Títol de l'aplicació */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('common:welcome')}
          </Typography>

          {/* Selector d'idioma */}
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

          {/* Botó per canviar el tema */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle theme"
            onClick={toggleTheme}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable */}
      <Drawer
        anchor="left"
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

// Component principal de l'aplicació
export default function App() {
  // Renderitza el component
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