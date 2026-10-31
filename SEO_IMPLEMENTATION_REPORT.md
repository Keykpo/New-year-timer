# SEO Implementation Report — newyeartimers.com

Fecha: 30/10/2026 · Alcance: auditoría completa + implementación local (sin desplegar).

> ⚠️ **Acción urgente fuera del SEO:** `server.js` contenía un *access token* de producción de Mercado Pago escrito en el código, y ese fichero se servía públicamente en `https://newyeartimers.com/server.js` (verificado con HTTP 200). Además está en el historial de git. Ya lo quité del código y dejé de servir el fichero, pero **el token hay que revocarlo y regenerarlo en el panel de Mercado Pago**: cualquiera que lo copiara puede seguir usándolo.

---

## 1. Estado SEO inicial

| Aspecto | Estado encontrado |
|---|---|
| Tecnología | HTML/CSS/JS estático + funciones serverless en `/api` (Vercel, config v2 *legacy* con `builds`). Sin framework, sin CMS. Firebase como base de datos de deseos. Renderizado: HTML estático + JS en cliente |
| Páginas | Home, about, privacy, blog (índice + 15 artículos en inglés) |
| Idiomas | 16 traducciones **solo de la interfaz** en `script.js`, aplicadas en el cliente por geolocalización o `?lang=xx`. El contenido SEO solo existía en inglés |
| robots.txt / sitemap.xml | Existían en el repo pero **devolvían 404 en producción** (no estaban en `builds` de `vercel.json`) |
| Hreflang | 16 idiomas apuntando a `/?lang=xx`, que devuelven el mismo HTML en inglés con `lang="en"` y canonical a `/` → hreflang inválido |
| Structured data | `aggregateRating` 4.8/250 sin valoraciones reales detrás; FAQ y WebApplication describiendo un "mapa mundial interactivo" que no existe en la página |
| Contenido | Keyword stuffing (decenas de `<strong>` con variantes de "countdown"); promesas falsas (mapa en vivo, *embed*) |
| Imágenes sociales | `og-image.jpg` era un PNG de 1024×904 con extensión .jpg y metadatos que decían 1200×630 |
| Otros | `favicon.ico` y `apple-touch-icon.png` enlazados pero inexistentes (404); `www` sin redirigir al dominio raíz (sirve duplicado); CSS/JS con caché `immutable` de 1 año sin versionado (los usuarios pueden ver CSS/JS antiguos tras un deploy); `/blog` sin barra servía la página y rompía sus enlaces relativos |

## 2. Problemas encontrados (diagnóstico)

| # | Problema | Gravedad | Impacto | Solución | Archivos |
|---|---|---|---|---|---|
| 1 | Token de Mercado Pago expuesto públicamente | **Crítica (seguridad)** | Uso fraudulento de la cuenta | Quitar del código, dejar de servir `.js` no públicos, **rotar el token** | `server.js`, `vercel.json` |
| 2 | robots.txt y sitemap.xml en 404 | Crítica | Google no recibe el sitemap | Añadirlos a `builds` y rutas | `vercel.json` |
| 3 | Hreflang hacia URLs `?lang=` idénticas | Alta | Señales internacionales inválidas | Hreflang solo entre páginas realmente traducidas | `index.html`, `about.html` |
| 4 | `aggregateRating` sin respaldo | Alta | Riesgo de acción manual por datos estructurados engañosos | Eliminado | `index.html` |
| 5 | Contenido y schema prometen un mapa que no existe | Alta | Contenido engañoso, mala experiencia | Reescrito | `index.html` |
| 6 | Sin páginas que capten búsquedas por país / idioma | Alta (oportunidad) | Tráfico no captado | Motor programático + versión ES | `seo/` |
| 7 | Scripts de administración y backend servidos públicamente | Media | Exposición de lógica interna | Lista explícita de JS públicos | `vercel.json` |
| 8 | Keyword stuffing | Media | Señal de baja calidad | Reescritura natural | `seo/content/home.en.html` |
| 9 | Imagen OG con formato/dimensiones incorrectos | Media | Previsualizaciones rotas en redes | Convertida a JPEG real, meta corregida | `og-image.jpg`, `twitter-image.jpg` |
| 10 | Iconos enlazados inexistentes | Baja | 404 en cada visita | Enlaces eliminados | `*.html` |
| 11 | CSS/JS cacheados 1 año sin versión | Media (UX) | Usuarios con estilos/JS viejos tras desplegar | `max-age=0, must-revalidate` (revalida con ETag) | `vercel.json` |
| 12 | `www` sin redirección | Media | Contenido duplicado | Requiere configurarlo en el panel de Vercel (ver §16) | — |
| 13 | Privacy (noindex) incluida en el sitemap | Baja | Señal contradictoria | Excluida automáticamente | `sitemap.xml` |

## 3. Problemas corregidos

1–11 corregidos en local. El 12 requiere una acción manual en Vercel.

## 4. Arquitectura SEO implementada

```
/                         Home EN (countdown)            ←hreflang→  /es/
/countdown/               Hub EN: hora de Año Nuevo por huso horario   ←→  /es/cuenta-regresiva/
/countdown/{pais}/        53 páginas de país EN                       ←→  /es/cuenta-regresiva/{pais}/
/blog/ + 15 artículos     EN (sin cambios de contenido)
/about.html               EN
```

- Un generador (`seo/build.js`, sin dependencias) produce todas las páginas a partir de datos estructurados y plantillas, y **se niega a escribir** si falla alguna validación. Documentación en [`seo/README.md`](seo/README.md).
- `index.html` sigue siendo el fichero que se edita a mano; el generador solo reescribe regiones marcadas (meta, JSON-LD, bloque de contenido, pie).
- Canonical absoluto y autorreferente en cada página y cada idioma; URLs con barra final y redirección 308 de la versión sin barra.

## 5. Idiomas soportados

| Idioma | Indexable | Contenido |
|---|---|---|
| Inglés (`en`, x-default) | Sí | Completo |
| Español (`es`) | Sí | Completo: home + hub + 53 países, escrito en español neutro (no traducción literal) |
| pt, fr, de, it, ru, zh, ja, ar, hi, ko, nl, pl, sv, tr | No | Solo la interfaz, vía `?lang=xx` (sin cambios para el usuario). No se exponen en hreflang porque no tienen contenido propio |

## 6. Estrategia internacional

- **Subcarpetas por idioma** (`/es/`) en el mismo dominio: hereda la autoridad del dominio y es lo más simple sobre Vercel estático.
- **Idioma ≠ país**: `/es/` está dirigido al idioma, no a España; el contenido es neutro y las ciudades de referencia son de España y Latinoamérica.
- Slugs localizados (`/es/cuenta-regresiva/estados-unidos/`), `lang`, `og:locale` + `og:locale:alternate`, formatos de fecha/hora localizados (`Intl`), breadcrumbs y FAQ traducidos.
- Se eligió español primero por: volumen de hispanohablantes, que el sitio ya tiene a Latinoamérica como mercado de pago (Mercado Pago) y que podía escribirse con calidad nativa. Portugués y francés son los siguientes candidatos (ver roadmap); no se añadieron para no publicar traducciones sin revisión.

## 7. Sistema de Programmatic SEO

- **Fuente de datos:** `seo/data/countries.js` — 196 países con estado (`published` / `draft` / `archived`), prioridad, slugs EN/ES, zonas IANA y tradiciones (solo hechos verificables; vacías si no hay certeza).
- **Valor diferencial de cada página:** datos reales calculados para el año objetivo con los datos ICU de Node: hora UTC de la medianoche, todos los husos horarios del país, horario de verano el 31 de diciembre, posición en el orden mundial, países que celebran justo antes/después y a la vez, hora local en 10 ciudades en ese momento, y cuenta regresiva en vivo hacia esa medianoche exacta.
- **Control de calidad:** solo se generan páginas `published`; los `draft` solo alimentan tablas y listas. Validaciones de slugs, títulos y descripciones únicos, canonical, hreflang recíproco, JSON-LD y enlaces.
- **Enlazado interno automático:** hub → todos los países; país → hub, países vecinos/mismo huso (si están publicados), artículos del blog que mencionan el país (detectados automáticamente), home; blog y about → hub; home → hub y versión ES.

## 8. Tipos de páginas generadas

| Plantilla | Tipo | Schema |
|---|---|---|
| Home (EN/ES) | Herramienta | Organization, WebSite, WebApplication, FAQPage (extraído de las preguntas visibles) |
| Hub por país (EN/ES) | Colección / informacional ("qué país recibe primero el Año Nuevo") | CollectionPage, BreadcrumbList, FAQPage |
| País (EN/ES) | Long-tail transaccional-informacional ("countdown new year {país}", "cuánto falta para año nuevo en {país}") | WebPage, BreadcrumbList, FAQPage |

Nota: desde 2023 Google solo muestra resultados enriquecidos de FAQ para sitios gubernamentales y de salud. El FAQPage se mantiene porque es válido, refleja contenido visible y lo usan otros buscadores, pero no hay que esperar rich results de FAQ en Google.

## 9. Cantidad real de páginas creadas

- 110 páginas generadas: 55 EN + 55 ES (1 home ES nueva + home EN regenerada, 2 hubs, 106 de país).
- Sitemap: **127 URLs** (110 + about + índice del blog + 15 artículos). 143 países quedan en `draft` (no generados).

## 10. URLs de ejemplo

- https://newyeartimers.com/countdown/
- https://newyeartimers.com/countdown/united-states/
- https://newyeartimers.com/countdown/kiribati/
- https://newyeartimers.com/es/
- https://newyeartimers.com/es/cuenta-regresiva/
- https://newyeartimers.com/es/cuenta-regresiva/mexico/
- https://newyeartimers.com/es/cuenta-regresiva/espana/

(No existirán hasta que se despliegue.)

## 11. Sitemap

Generado automáticamente, con `xhtml:link` hreflang en las páginas con versión ES, excluye páginas `noindex` (privacy) y `lastmod` real: se guarda un hash por URL en `seo/manifest.json` y la fecha solo cambia cuando cambia el contenido (para páginas existentes se usó la fecha del último commit). 127 URLs, sin necesidad de sitemap index (el límite es 50 000).

## 12. Structured data

Eliminado: `aggregateRating` sin respaldo, `keywords` dentro del schema, precio de 1 USD presentado como precio de la app. Añadido: `@graph` con Organization/WebSite enlazados por `@id`, FAQPage generado desde el contenido visible, BreadcrumbList en todas las páginas generadas. Todo el JSON-LD se valida (parseo) en cada build. **Pendiente:** pasar 2–3 URLs por el Rich Results Test de Google tras el despliegue.

## 13. Mejoras de rendimiento

- Imágenes sociales: 288 KB → 47 KB cada una (JPEG real).
- Eliminados dos 404 por petición (iconos inexistentes).
- Caché de CSS/JS corregida (evita servir versiones viejas; las imágenes mantienen caché de 1 año).
- Páginas nuevas ligeras: CSS compartido del blog + 3 KB de CSS + 1,5 KB de JS, sin dependencias, sin desplazamiento de diseño en la cuenta regresiva (cifras con ancho fijo).
- **No tocado (decisión tuya, afecta a ingresos):** la home carga AdSense, ExoClick, Monetag, PayPal, Firebase y ~12 espacios publicitarios; es el principal lastre de LCP/INP/CLS. Ver §15.

## 14. Resultados de los tests

| Prueba | Resultado |
|---|---|
| `npm run seo:build` (validaciones de datos y salida) | OK: 0 errores, 0 avisos |
| `npm run seo:test` (emulación de `vercel.json`) | OK: 127 URLs del sitemap → 200; 129 páginas HTML y 4 463 enlaces/recursos internos resuelven; redirecciones `/blog`, `/es`, `/countdown`, `/countdown/japan` → 308 con barra; `server.js`, scripts de administración, `package.json`, fuentes `seo/` y backups → 404 |
| Render real en Chrome (servidor local) | Página de país, hub ES y home ES correctos; cuenta regresiva y conversión a hora local funcionando; la home ES detecta `es` aunque la geolocalización diga otra cosa |
| Móvil (390 px) | Sin scroll horizontal en home EN/ES, hub, páginas de país, blog y about |
| Consola JS | Sin errores nuevos. Los 3 errores presentes ya existían en la home original (ver §15) |
| `gsc-report.js` | Probado con un CSV sintético (no hay datos reales de GSC en el entorno) |

**No verificado:** el comportamiento real del router de Vercel (el test lo emula, no lo sustituye) y Core Web Vitals reales. Recomendado: desplegar primero como *preview* y comprobarlo.

## 15. Problemas pendientes

1. **Rotar el token de Mercado Pago** (ver aviso inicial).
2. `www.newyeartimers.com` devuelve 200: configurar en Vercel → Domains la redirección 308 a `newyeartimers.com`.
3. Vercel Speed Insights roto en la home: `does not provide an export named 'injectSpeedInsights'` (preexistente). Sustituir por `<script defer src="/_vercel/speed-insights/script.js"></script>` o el snippet actual de Vercel.
4. Los pagos de Mercado Pago vuelven siempre a `/index.html` (inglés); los usuarios de `/es/` vuelven a la versión inglesa (la UI se traduce igualmente por geolocalización).
5. Densidad publicitaria en la home: muchos anuncios por encima y dentro del contenido. Es el mayor riesgo para Core Web Vitals y para la "page experience". Recomiendo medirlo con PageSpeed Insights tras el despliegue y decidir.
6. El H1 de la home ("Time Until Your New Year") no contiene "countdown" ni "2027". No lo cambié porque es texto de marca/UI traducido a 16 idiomas; sugerencia: "New Year 2027 Countdown".
7. Ficheros pesados sin uso que se despliegan igualmente (`background-video.mp4` 7 MB, `pasandolemouse.png`, `corona.png`…): no afectan a la carga, pero se pueden sacar del repo.
8. `SEO_CHECKLIST.md` describe el estado anterior y ya no es fiable.
9. Hay dos ficheros sin seguimiento en git que no son míos (`js.txt.txt`, `nul`); no los he tocado.
10. Tras el 1 de enero hay que subir `year` en `seo/config.js` y regenerar (ver `seo/README.md`).

## 16. Integraciones que necesitan credenciales o acciones manuales

| Herramienta | Estado | Acción necesaria |
|---|---|---|
| Google Analytics 4 | Instalado (`G-DDQQ66PTTN`) en todas las páginas, incluidas las nuevas | Nada |
| Google Search Console | Verificado por meta tag y fichero HTML (ambos se mantienen) | Enviar `https://newyeartimers.com/sitemap.xml`; inspeccionar y solicitar indexación de `/es/`, `/countdown/` y `/es/cuenta-regresiva/` |
| Bing Webmaster Tools | No configurado | Importar el sitio desde Search Console (1 clic) y enviar el sitemap |
| Seguimiento | `seo/gsc-report.js` lee exportaciones CSV de GSC: totales, URLs sin impresiones, por sección/idioma, ganadores y perdedores entre dos periodos | Para automatizarlo por API haría falta una cuenta de servicio de Google con acceso a la propiedad |
| Vercel | — | Redirección `www` (ver §15) y comprobar un *preview deploy* |

## 17. Próximas oportunidades de crecimiento

Ver [`PROGRAMMATIC_SEO_ROADMAP.md`](PROGRAMMATIC_SEO_ROADMAP.md). Lo más urgente es estacional: quedan ~2 meses para Nochevieja, el pico de demanda de todas estas búsquedas. Cuanto antes se desplieguen y se indexen las páginas, más tráfico captarán este año.
