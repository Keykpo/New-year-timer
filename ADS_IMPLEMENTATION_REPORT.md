# Ads Implementation Report — newyeartimers.com

Fecha: 30/10/2026 · Rama: `ads/adsense-optimization` (basada en `seo/international-programmatic`) · Sin desplegar.

## 1. Auditoría inicial

### Estado de la web
| Página | Antes |
|---|---|
| Home | 14 bloques manuales de AdSense + Auto Ads, varios apilados (dos seguidos tras la cuenta regresiva, dos seguidos antes del pie), uno metido entre las flechas del carrusel de deseos (riesgo de clics accidentales), un 728×90 encima del H1 y un anuncio fijo inferior propio de 320×50 en móvil. Además, ExoClick: respaldo en cada bloque, slider de vídeo, "mensaje instantáneo" en móvil, intersticial a pantalla completa al intentar salir y notificaciones push. Monetag: tag de notificaciones push |
| Blog (16 páginas) | **Sin AdSense** (ni siquiera el script). Solo ExoClick y código muerto de Adsterra |
| About | 2 bloques con el mismo slot + respaldo de ExoClick |
| Barras laterales | Se pedían a AdSense aunque estuvieran ocultas (pantallas < 1840 px) |

### Estado de AdSense (consultado en la cuenta, solo lectura)
- `newyeartimers.com`: **aprobado ("Listo")**, ads.txt **autorizado**.
- Ingresos históricos de la cuenta: USD 16,60, casi todos en diciembre de 2025 y enero de 2026 (temporada alta).
- La consulta de informes se detuvo a petición tuya; no se analizaron países, dispositivos ni bloques. No se cambió ninguna configuración de la cuenta.

## 2. Estrategia

Menos bloques y mejor colocados: anuncios donde el usuario ya está leyendo, nunca encima del contenido principal ni pegados a botones, y AdSense en las páginas que más texto tienen (blog y páginas de país), que antes no tenían.

### Mapa de ubicaciones
| ID | Plantilla | Posición | Formato | Dispositivo | Slot |
|---|---|---|---|---|---|
| HOME_SIDE_LEFT / RIGHT | Home EN/ES | Barras laterales fijas fuera del contenido | 300×600 | Escritorio ≥ 1840 px | 1486507879 / 1451380053 |
| HOME_AFTER_COUNTDOWN | Home | Tras la cuenta regresiva y el botón | Responsive | Todos | 6547262869 |
| HOME_AFTER_WISHES | Home | Tras el muro de deseos | Responsive | Todos | 4120410073 |
| HOME_CONTENT_1 | Home | Tras "New Year around the world" | In-article | Todos | 2663060381 |
| HOME_CONTENT_2 | Home | Antes del FAQ | In-article | Todos | 7408810597 |
| HOME_MULTIPLEX | Home | Antes del pie | Multiplex | Todos | 7172814982 |
| ARTICLE_INTRO | Artículos del blog | Tras la introducción, antes del primer H2 | Responsive | Todos | 2968493398 |
| ARTICLE_MIDDLE | Artículos | Antes del H2 central | In-article | Todos | 2575094426 |
| ARTICLE_END | Artículos | Al terminar el artículo | Responsive | Todos | 4028430170 |
| ARTICLE_MULTIPLEX | Artículos | Tras "Related Articles" | Multiplex | Todos | 7172814982 |
| BLOG_INDEX_END | Índice del blog | Tras la cuadrícula de artículos | Responsive | Todos | 6885376420 |
| COUNTRY_AFTER_COUNTDOWN | Países + hub (EN/ES) | Tras la cuenta regresiva / la intro | Responsive | Todos | 7090526020 |
| COUNTRY_MIDDLE | Países + hub | Tras la segunda sección | In-article | Todos | 2575094426 |
| COUNTRY_MULTIPLEX | Países + hub | Antes del CTA final | Multiplex | Todos | 7172814982 |

Eliminados: bloque encima del H1, bloque apilado tras la cuenta regresiva, bloque entre las flechas del carrusel, bloque a mitad del FAQ y al final del FAQ, bloque apilado antes del pie, anuncio fijo propio en móvil, los dos bloques de About.

Se reutilizan los bloques de anuncios que ya existen en la cuenta; un mismo slot no se repite nunca dentro de una página.

## 3. Implementación

**Componentes nuevos**
- `ads.js`: registro central de ubicaciones (`PLACEMENTS`). Para desactivar una ubicación en todo el sitio: `enabled: false`. Crea el `<ins>` de AdSense en cada `<div class="ad-slot" data-ad="ID">`, carga en diferido (*lazy load*: pide el anuncio unos 600 px antes de que entre en pantalla), no pide anuncios para huecos ocultos ni por debajo del ancho mínimo, e ignora un ID repetido en la misma página.
- `ads.css`: espacio reservado por formato (evita CLS), etiqueta "Advertisement"/"Publicidad", y colapsa los huecos desactivados o que Google no llenó.

**Ficheros modificados**
- `index.html`: huecos nuevos; eliminado todo ExoClick y Monetag; quitado el snippet antiguo `enable_page_level_ads` (los Auto Ads se controlan desde la cuenta con el script que ya está en `<head>`); Speed Insights corregido (la importación estaba rota).
- `blog/*.html` (16): script de AdSense en `<head>`, 4 huecos por artículo (1 en el índice); eliminados ExoClick y el código muerto de Adsterra.
- `about.html`: eliminados los bloques manuales y ExoClick (sigue cargando el script, así que los Auto Ads pueden actuar si están activados).
- `seo/build.js`, `seo/content/home.*.html`: las páginas generadas (home ES, hubs y 106 páginas de país) usan los huecos nuevos.
- `script.js`: el "deseo gratis" ya no pide permiso de notificaciones (ese permiso solo servía para suscribir al usuario a la red push de Monetag); textos actualizados en los 16 idiomas.
- Eliminados `sw.js` (Monetag) y `worker.js` (push de ExoClick). Al dar 404, los navegadores dan de baja esos service workers en los usuarios ya suscritos.
- `vercel.json`, `seo/test-routes.js`: publicación de `ads.js` y comprobación de que `sw.js`/`worker.js` ya no se sirven.

`style.css` no se tocó (tiene cambios tuyos pendientes).

## 4. Verificación

| Prueba | Resultado |
|---|---|
| Restos de ExoClick / Monetag / Adsterra en HTML y JS | 0 |
| Script de AdSense por página | Exactamente 1 en todas |
| Carga diferida (Chrome real, scroll) | Los huecos se piden al acercarse; 1 `<ins>` y 1 `push` por hueco |
| Barras laterales | Se piden a 1920 px; no se piden a 390 px |
| Móvil 390 px | Sin scroll horizontal en home EN/ES, blog, índice del blog, país, hub y about |
| Consola | Sin errores nuevos; el error de Speed Insights desapareció. Siguen 2 mensajes ya existentes (`Video element not found`, Firebase sin inicializar en localhost) |
| `npm run seo:build` / `npm run seo:test` | OK (127 URLs del sitemap; 4 715 enlaces y recursos) |

**No verificado:** que se sirvan anuncios reales. AdSense no llena anuncios en `localhost`, así que solo se comprobó que los huecos hacen la petición correctamente. Hay que comprobarlo tras el despliegue.

## 5. Recomendaciones

1. **En la cuenta de AdSense (lo decides tú):** Anuncios → por sitio → `newyeartimers.com` → revisar Auto Ads. Recomiendo activar solo los **anchor** (sustituyen al anuncio fijo propio que quité) y dejar **desactivados** los anuncios en página (in-page), para que no se sumen a los bloques manuales. Los vignette en móvil dan buenos ingresos en un sitio de una sola visita como este, pero interrumpen la navegación; si los activas, prueba unas semanas y compara.
2. Crear bloques de anuncios dedicados para el blog y las páginas de país (hoy reutilizan los de la home), para ver los ingresos por ubicación en los informes.
3. Medir tras el despliegue: RPM de página, visibilidad (Active View) por bloque, CLS en PageSpeed Insights y Search Console (Core Web Vitals).
4. Experimento sugerido: desactivar `HOME_AFTER_WISHES` (`enabled: false` en `ads.js`) durante una semana de tráfico alto y comparar el RPM de página.

## 6. Potencial de monetización

No se calcula: los informes se dejaron de revisar a petición tuya, y el único dato disponible (USD 2–4 de RPM de página en diciembre–enero, para toda la cuenta) es demasiado escaso para proyectar escenarios con rigor.
