# Motor SEO (`seo/`)

Generador estático sin dependencias. Crea las páginas localizadas, las páginas programáticas por país, el sitemap y valida el resultado antes de escribir nada.

```bash
npm run seo:build   # genera páginas + sitemap.xml y valida (si hay errores, no escribe nada)
npm run seo:check   # solo valida (dry run)
npm run seo:test    # emula vercel.json: sitemap, enlaces internos, redirecciones, ficheros privados
node seo/gsc-report.js Pages.csv [Pages-anterior.csv]   # informe a partir de exportaciones de Search Console
```

Después de generar, se hace commit de los ficheros generados (Vercel sirve ficheros estáticos; no hay paso de build en el despliegue).

## Estructura

| Fichero | Función |
|---|---|
| `config.js` | Dominio, año objetivo, idiomas publicados y patrones de URL, ciudades de referencia |
| `data/countries.js` | Base de datos de países: estado (`published`/`draft`/`archived`), prioridad, slugs, husos horarios, tradiciones verificadas |
| `locales/en.js`, `locales/es.js` | Plantillas de texto de cada tipo de página (país, hub, home) |
| `content/home.{en,es}.html` | Bloque de contenido SEO de la home. El FAQPage JSON-LD se extrae de las preguntas visibles |
| `lib/time.js` | Cálculo de medianoche, diferencia UTC y horario de verano con los datos ICU de Node |
| `build.js` | Generador + validaciones |
| `manifest.json` | Hash y `lastmod` de cada URL: el `lastmod` solo cambia cuando cambia el contenido |
| `test-routes.js` | Comprobación offline de `vercel.json` |

## Qué se genera

- `index.html`: solo se reescriben las regiones entre `<!-- SEO:…:START -->` y `<!-- SEO:…:END -->` (meta, JSON-LD, bloque de contenido y enlaces del pie). El resto del fichero se edita a mano como siempre.
- `es/index.html`: copia de `index.html` con las regiones en español, `lang="es"`, `data-page-lang="es"` (impide que `script.js` re-traduzca la UI según la geolocalización), los textos de UI de `script.js` pre-renderizados y las rutas convertidas en absolutas. **No se edita a mano.**
- `countdown/` y `es/cuenta-regresiva/`: hub + una página por país publicado.
- `sitemap.xml`.

## Tareas habituales

**Publicar un país nuevo**: muévelo de `drafts` a `published` en `data/countries.js` con nombres, slugs y zonas (la primera zona es la de la cuenta regresiva). Añade `traditions` solo con hechos verificados. Ejecuta `npm run seo:build && npm run seo:test`.

**Despublicar**: cambia `status` a `draft` (o `archived`). El build borra sus carpetas y lo saca del sitemap. Si la URL ya tenía tráfico, añade una redirección 308 en `vercel.json` hacia el hub.

**Cambio de año (después del 1 de enero)**: sube `year` en `config.js` y ejecuta el build. Los textos, horas UTC, días de la semana y fechas se recalculan solos. Ojo: `script.js` ya cuenta automáticamente hacia el año siguiente, pero los textos fijos de `index.html` fuera de las regiones (p. ej. el subtítulo "countdown to 2027" en las traducciones de `script.js`) hay que actualizarlos a mano.

**Añadir un idioma**: añade la entrada en `config.languages`, crea `locales/<lang>.js` y `content/home.<lang>.html` con contenido revisado por un hablante nativo, y añade los slugs y nombres en todos los países publicados. No añadas un idioma a `config.languages` sin contenido completo: el hreflang solo debe apuntar a páginas realmente traducidas.

## Validaciones del build (bloquean la escritura)

Slugs duplicados, zonas horarias inválidas, campos obligatorios, títulos/descripciones duplicados, exactamente un `<h1>`, canonical autorreferente, hreflang presente y recíproco, JSON-LD válido y enlaces internos rotos. Avisos (no bloquean): títulos de más de 70 caracteres y descripciones fuera de 70–165.
