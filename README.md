# New Year's Timer 2026 🎉

Una página web moderna con cuenta regresiva para Año Nuevo que incluye:
- 🌍 Internacionalización automática (EN, ES, PT, FR)
- ⏰ Temporizador local personalizado para cada visitante
- 🗺️ Mapa mundial interactivo mostrando qué países ya están en 2026
- 💳 Sistema de deseos pagados con PayPal
- 🔒 Inputs sanitizados para prevenir XSS

---

## 🚀 Inicio Rápido

### Ejecutar Localmente

**IMPORTANTE:** No puedes simplemente abrir `index.html` haciendo doble clic. Necesitas ejecutar un servidor local para que el mapa mundial funcione correctamente.

**En Windows:**
```bash
# Opción 1: Doble clic en el archivo
start-server.bat

# Opción 2: Desde la terminal
python -m http.server 8000
```

**En Mac/Linux:**
```bash
# Opción 1: Ejecutar el script
./start-server.sh

# Opción 2: Desde la terminal
python3 -m http.server 8000
```

Luego abre tu navegador y ve a: **http://localhost:8000**

### ¿Por qué necesito un servidor?

El mapa mundial se carga desde un archivo externo (`BlankMap-World.svg`). Los navegadores bloquean la carga de archivos locales por seguridad (CORS). Un servidor local resuelve esto.

---

## ⚙️ Configuración

Antes de usar la aplicación en producción, necesitas configurar:

1. **PayPal** - Edita `config.js` y agrega tu Client ID
2. **Firebase** - Edita `config.js` y agrega tus credenciales
3. **Dominio** - Actualiza las URLs en `index.html` (meta tags)

Ver `config.js` para instrucciones detalladas.

---

## 📋 Configuración del Mapa Mundial SVG

Para que el mapa funcione correctamente, necesitas insertar un SVG de mapa del mundo en el archivo `index.html`. Aquí están las instrucciones completas:

### Paso 1: Obtener el SVG del Mapa

**Opción A: Wikimedia Commons (Recomendado)**

1. Visita: [BlankMap-World.svg en Wikimedia](https://commons.wikimedia.org/wiki/File:BlankMap-World.svg)
2. Haz clic en "Download" y selecciona el archivo SVG
3. Abre el archivo SVG con un editor de texto (VS Code, Sublime Text, Notepad++, etc.)

**Opción B: Simplemaps**

1. Visita: [simplemaps.com/resources/svg-world](https://simplemaps.com/resources/svg-world)
2. Descarga el mapa gratuito SVG
3. Abre el archivo con un editor de texto

**Opción C: Buscar en Google**

Busca: "world map svg iso codes" o "world map svg free download"

### Paso 2: Preparar el SVG (IMPORTANTE)

El mapa SVG **DEBE** tener códigos ISO como IDs para cada país. Ejemplo:

```xml
<svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
    <path id="US" d="M123,456 L789,123..." />
    <path id="FR" d="M456,789 L123,456..." />
    <path id="AU" d="M890,500 L920,540..." />
    <path id="BR" d="M340,470 L380,530..." />
    <!-- más países... -->
</svg>
```

**Códigos ISO Soportados:**

| Código | País | Código | País | Código | País |
|--------|------|--------|------|--------|------|
| US | Estados Unidos | FR | Francia | JP | Japón |
| CA | Canadá | DE | Alemania | CN | China |
| MX | México | IT | Italia | IN | India |
| BR | Brasil | ES | España | AU | Australia |
| AR | Argentina | PT | Portugal | NZ | Nueva Zelanda |
| CL | Chile | GB | Reino Unido | KR | Corea del Sur |
| PE | Perú | IE | Irlanda | TH | Tailandia |
| CO | Colombia | NL | Países Bajos | VN | Vietnam |
| VE | Venezuela | BE | Bélgica | PH | Filipinas |
| EC | Ecuador | CH | Suiza | MY | Malasia |
| RU | Rusia | AT | Austria | SG | Singapur |
| TR | Turquía | SE | Suecia | ID | Indonesia |
| EG | Egipto | NO | Noruega | PK | Pakistán |
| ZA | Sudáfrica | DK | Dinamarca | BD | Bangladesh |
| NG | Nigeria | FI | Finlandia | SA | Arabia Saudita |
| KE | Kenia | PL | Polonia | AE | UAE |
| MA | Marruecos | CZ | República Checa | IL | Israel |
| GH | Ghana | GR | Grecia | IQ | Iraq |

**Ver lista completa en `script.js` línea 156-331**

### Paso 3: Editar IDs si es necesario

Si tu SVG no tiene códigos ISO como IDs, necesitas editarlos manualmente:

**Buscar y reemplazar en tu editor:**
- Encuentra: `<path id="United_States"`
- Reemplaza con: `<path id="US"`

O si los países están dentro de grupos `<g>`:
```xml
<g id="countries">
    <path id="US" d="..." />
    <path id="FR" d="..." />
</g>
```

### Paso 4: Insertar el SVG en index.html

1. Abre `index.html`
2. Busca la sección con el comentario: `<!-- PASTE YOUR WORLD MAP SVG HERE -->`
3. Pega tu SVG **COMPLETO** dentro del div con `id="world-map"`

**Ejemplo:**

```html
<div id="world-map">
    <!-- PEGA AQUÍ TODO TU SVG -->
    <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
        <path id="US" d="M123,456..."/>
        <path id="FR" d="M456,789..."/>
        <!-- ... resto de países ... -->
    </svg>
</div>
```

### Paso 5: Verificar que Funcione

1. Abre `index.html` en tu navegador
2. Abre la consola del navegador (F12)
3. Deberías ver un mensaje: `"Updated X countries on the map"`
4. Pasa el mouse sobre los países para ver tooltips con información de zona horaria
5. Los países en verde ya están en 2026, los azules aún esperan

---

## 🔧 Personalización Avanzada

### Agregar Zonas Horarias Específicas por Región

Si quieres manejar múltiples zonas horarias para un mismo país (ej: USA con PST, MST, CST, EST), sigue estos pasos:

1. **En tu SVG:** Divide el país en regiones con IDs específicos:
```xml
<path id="US-EST" d="..." />  <!-- Costa Este -->
<path id="US-CST" d="..." />  <!-- Centro -->
<path id="US-MST" d="..." />  <!-- Montaña -->
<path id="US-PST" d="..." />  <!-- Pacífico -->
```

2. **El script ya incluye estas regiones:**
```javascript
"US-EST": { name: "US Eastern", offset: -5 },
"US-CST": { name: "US Central", offset: -6 },
"US-MST": { name: "US Mountain", offset: -7 },
"US-PST": { name: "US Pacific", offset: -8 },
```

### Agregar Más Países

Si tu mapa tiene un país que no está en la lista, agrégalo en `script.js`:

```javascript
const countryTimezones = {
    // ... países existentes ...
    "XX": { name: "Nuevo País", offset: 0 },  // Reemplaza XX con el código ISO
};
```

### Cambiar Colores

Edita `style.css` líneas 345-353:

```css
.celebrating {
    fill: #10b981 !important;  /* Verde para países en 2026 */
}

.waiting {
    fill: #3b82f6 !important;  /* Azul para países esperando */
}
```

### Agregar Más Idiomas

Edita `script.js` línea 5-50 para agregar traducciones:

```javascript
const translations = {
    // ... idiomas existentes ...
    de: {  // Alemán
        mainTitle: "Zeit bis zu Ihrem Neujahr",
        subtitle: "Ihr persönlicher Countdown bis 2026",
        // ... más traducciones
    }
};
```

---

## 🌐 Recursos Útiles

- **Códigos ISO de países:** [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
- **Zonas horarias mundiales:** [timeanddate.com/time/map](https://www.timeanddate.com/time/map/)
- **Validador SVG:** [validator.w3.org](https://validator.w3.org/)
- **Editor SVG online:** [svgomg.net](https://svgomg.net/)

---

## ❓ Solución de Problemas

### El mapa no se muestra

1. **Verifica en la consola del navegador (F12)** si hay errores
2. Asegúrate de que el SVG esté dentro de `<div id="world-map">`
3. Verifica que tu SVG tenga un atributo `viewBox`

### Los países no cambian de color

1. Verifica que los `<path>` tengan atributos `id` con códigos ISO válidos
2. Abre la consola y busca el mensaje "Updated X countries"
3. Si dice "0 countries", tus paths no tienen IDs

### Los tooltips no funcionan

1. Asegúrate de que el JavaScript se cargue correctamente
2. Verifica que no haya errores en la consola del navegador

### El mapa es muy grande o muy pequeño

Ajusta en `style.css` línea 323:
```css
#world-map svg {
    max-height: 500px;  /* Cambia este valor */
}
```

---

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo y modificarlo como quieras.

---

## 🎊 ¡Feliz Año Nuevo!

Si tienes preguntas o encuentras problemas, abre un issue en GitHub.
