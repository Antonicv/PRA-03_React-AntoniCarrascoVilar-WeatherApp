# Weather App

## Descripción General

Esta aplicación es un **Weather App** que permite a los usuarios:
- Consultar el clima actual y el pronóstico de cualquier ciudad.
- Visualizar un mapa interactivo para buscar ubicaciones.
- Cambiar entre diferentes idiomas (inglés, español y catalán).
- Alternar entre temas claro y oscuro.

La aplicación está desarrollada utilizando **React** y varias bibliotecas modernas para mejorar la experiencia del usuario.

---

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca principal para construir la interfaz de usuario.
- **React Router**: Para manejar la navegación entre páginas.
- **Material-UI (MUI)**: Para componentes estilizados y diseño responsivo.
- **React-Leaflet**: Para la integración del mapa interactivo.
- **i18next**: Para la internacionalización y traducción de la aplicación.

### API
- **OpenWeatherMap API**: Para obtener datos del clima actual y el pronóstico.
- **Nominatim API**: Para geocodificación y búsqueda de ubicaciones.

### Estilos
- **CSS**: Para personalizar estilos adicionales.
- **Material-UI Theme**: Para manejar temas claro y oscuro.

---

## Estructura del Proyecto

El proyecto está dividido en varios componentes y páginas:
- **App.jsx**: Componente principal que define la estructura de la aplicación y las rutas.
- **Weather.jsx**: Página para consultar el clima actual y el pronóstico.
- **Map.jsx**: Página que muestra un mapa interactivo.
- **Home.jsx**: Página principal con información general.
- **About.jsx**: Página con información sobre la aplicación.
- **themeContext.jsx**: Contexto para manejar el tema claro/oscuro.

---

## Explicación de los Hooks

### 1. **useState**
El hook `useState` se utiliza para manejar estados locales en los componentes. Ejemplo:

```jsx
const [city, setCity] = useState(""); // Estado para almacenar la ciudad ingresada.
```

- **`city`**: Es el valor actual del estado.
- **`setCity`**: Es la función que actualiza el estado.
- **Afecta**: El campo de entrada de texto donde el usuario escribe el nombre de la ciudad.

---

### 2. **useEffect**
El hook `useEffect` se utiliza para manejar efectos secundarios, como llamadas a APIs. Ejemplo:

```jsx
useEffect(() => {
  fetchWeatherData(); // Llama a la API para obtener datos del clima.
}, []); // Se ejecuta solo una vez al montar el componente.
```

- **Dependencias**: El array vacío `[]` asegura que el efecto se ejecute solo una vez.
- **Afecta**: La carga inicial de datos al renderizar el componente.

---

### 3. **useContext**
El hook `useContext` se utiliza para acceder al contexto global, como el tema claro/oscuro. Ejemplo:

```jsx
const { isDarkMode, toggleTheme } = useContext(ThemeContext);
```

- **`isDarkMode`**: Indica si el tema actual es oscuro.
- **`toggleTheme`**: Función para alternar entre temas.
- **Afecta**: El botón de cambio de tema en la barra de navegación.

---

### 4. **useTranslation**
El hook `useTranslation` se utiliza para manejar traducciones. Ejemplo:

```jsx
const { t } = useTranslation(['common', 'weather']);
```

- **`t`**: Función para obtener textos traducidos.
- **Namespaces**: `common` y `weather` agrupan las traducciones relacionadas.
- **Afecta**: Todos los textos visibles en la interfaz.

---

### 5. **useMap**
El hook `useMap` de React-Leaflet se utiliza para manipular el mapa. Ejemplo:

```jsx
const map = useMap();
map.flyTo([coords.lat, coords.lng], 13, { animate: true });
```

- **`map`**: Instancia del mapa.
- **Afecta**: La posición y el zoom del mapa interactivo.

---

## Props y su Impacto

### Ejemplo de Props en el Componente `Navigation`
```jsx
<FormControl variant="standard" sx={{ minWidth: 120, color: 'white' }}>
  <InputLabel id="language-select-label" sx={{ color: 'white' }}>
    {t('common:language')}
  </InputLabel>
  <Select
    labelId="language-select-label"
    value={i18n.language}
    onChange={changeLanguage}
    label={t('common:language')}
  >
    <MenuItem value="en">English</MenuItem>
    <MenuItem value="es">Español</MenuItem>
    <MenuItem value="ca">Català</MenuItem>
  </Select>
</FormControl>
```

- **`value`**: Prop que define el idioma seleccionado actualmente.
- **`onChange`**: Prop que maneja el cambio de idioma.
- **Afecta**: El selector de idioma en la barra de navegación.

---

## Cómo Funciona el Programa

1. **Inicio**:
   - La aplicación carga la página principal (`Home.jsx`) con información general.

2. **Consulta del Clima**:
   - El usuario ingresa el nombre de una ciudad en la página `Weather.jsx`.
   - Se realiza una llamada a la API de OpenWeatherMap para obtener datos del clima actual y el pronóstico.
   - Los datos se muestran en diferentes pestañas organizadas por categorías (condiciones atmosféricas, viento, precipitación, etc.).

3. **Mapa Interactivo**:
   - En la página `Map.jsx`, el usuario puede buscar una ciudad.
   - Se realiza una llamada a la API de Nominatim para obtener las coordenadas de la ciudad.
   - El mapa se centra en las coordenadas obtenidas.

4. **Internacionalización**:
   - El usuario puede cambiar el idioma desde el selector en la barra de navegación.
   - Todos los textos visibles se actualizan dinámicamente.

5. **Tema Claro/Oscuro**:
   - El usuario puede alternar entre temas utilizando el botón en la barra de navegación.
   - Los estilos de la aplicación cambian automáticamente.

---

## Cómo Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd weatherApp
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega tu clave de API de OpenWeatherMap:
     ```
     VITE_OPEN_WEATHER_API_KEY=TU_CLAVE_API
     ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre la aplicación en tu navegador en `http://localhost:3000`.

---

## Contribuciones

Si deseas contribuir al proyecto, por favor:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores.
3. Envía un pull request con tus cambios.

---

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.