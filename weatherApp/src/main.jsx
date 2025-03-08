// main.jsx
// Archivo principal de la aplicación
// ------------------------------------------------------------
// Este archivo es el punto de entrada de la aplicación y renderiza el componente principal.

// Importa los módulos necesarios
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './components/themeContext.jsx'; // Asegúrate de usar la ruta correcta
// Renderiza la aplicación 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);