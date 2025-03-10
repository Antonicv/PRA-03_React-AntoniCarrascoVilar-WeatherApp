// Código del componente App
// // App.jsx
// // Componente principal de la aplicación
// // ------------------------------------------------------------
// // Este componente define la estructura de la aplicación y las rutas de navegación.



// Importa las librerías necesarias
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Hook para traducciones
import { useTranslation } from 'react-i18next'; 
// Importa los componentes de Material-UI  
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
// Importa las páginas de la aplicación
import Weather from './pages/Weather';
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Layout from './components/layout';
import ReactCountryFlag from 'react-country-flag';
// Importa la configuración de i18next
import './i18next'; 
import "@fontsource/roboto"; 
import "@fontsource/roboto/400.css"; 
import "@fontsource/roboto/700.css"; 
import 'leaflet/dist/leaflet.css';

// Importa el contexto del tema
import { ThemeContext } from './components/themeContext'; 

function Navigation() {
  const { t, i18n } = useTranslation(); // Obtén las funciones de traducción
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Obtén el estado del tema y la función para cambiarlo

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

          {/* Botón para cambiar el tema */}
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
// Componente principal de la aplicación
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