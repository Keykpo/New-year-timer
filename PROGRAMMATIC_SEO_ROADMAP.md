# Programmatic SEO Roadmap

**No hay datos reales de volumen de búsqueda en este proyecto.** Las prioridades son estimaciones editoriales (tamaño del país/idioma, interés estacional, competencia aparente) y están marcadas como tales. Cuando haya datos de Search Console (`node seo/gsc-report.js`) o de Keyword Planner, sustituye la columna "Prioridad (estimada)" por datos medidos.

## Criterios para publicar una página

Una página solo pasa de `draft` a `published` si:

1. Responde a una intención de búsqueda concreta que ninguna otra URL del sitio cubre (sin canibalización).
2. Aporta datos o contenido propios (no solo cambiar un nombre en una plantilla).
3. Todo lo que afirma es verificable; si no hay certeza sobre un dato (p. ej. una tradición), se omite.
4. Está disponible con calidad nativa en cada idioma en el que se publica.
5. Pasa `npm run seo:build` y `npm run seo:test` sin errores.

Si no cumple esto, no se publica: el `noindex` no sustituye a no crear la página.

## Mapa de keywords actual (implementado)

| Keyword principal | Secundarias | Intención | URL | Idioma | Tipo | Prioridad (estimada) |
|---|---|---|---|---|---|---|
| new year countdown 2027 | countdown to 2027, how long until new year | Transaccional (usar herramienta) | `/` | en | Herramienta | Muy alta |
| cuenta regresiva año nuevo 2027 | cuánto falta para año nuevo | Transaccional | `/es/` | es | Herramienta | Muy alta |
| which country celebrates new year first | new year time zones, new year around the world | Informacional | `/countdown/` | en | Hub | Alta |
| qué país recibe primero el año nuevo | año nuevo en el mundo, hora año nuevo por país | Informacional | `/es/cuenta-regresiva/` | es | Hub | Alta |
| new year countdown {country} | what time is new year in {country} | Long-tail | `/countdown/{country}/` | en | País | Alta–baja según país |
| cuenta regresiva año nuevo {país} | cuánto falta para año nuevo en {país}, a qué hora es año nuevo en {país} | Long-tail | `/es/cuenta-regresiva/{país}/` | es | País | Alta–baja según país |
| new year traditions / history / party | (15 artículos existentes) | Informacional | `/blog/…` | en | Artículo | Existente |

## Oportunidades de nuevas páginas

| # | Oportunidad | Keywords objetivo (ejemplos) | Tipo | Idiomas | Prioridad (estimada) | Dependencias | Esfuerzo |
|---|---|---|---|---|---|---|---|
| 1 | **Desplegar lo ya implementado antes de diciembre** | — | — | en, es | Crítica (estacional) | Rotar token, preview deploy | 1 h |
| 2 | Páginas de **ciudad** dentro de países con varios husos (Los Ángeles, Chicago, Sídney, Perth, Tijuana, Canarias…) | "new year countdown los angeles", "cuenta regresiva año nuevo tijuana" | Ciudad | en, es | Alta | Añadir tipo `city` a los datos (la zona ya existe) | 1–2 días |
| 3 | Versión **portuguesa** (home + hub + Brasil, Portugal, Angola, Mozambique…) | "contagem regressiva ano novo 2027", "quanto falta para o ano novo" | Idioma | pt | Alta | Redactor/revisor nativo | 2–3 días |
| 4 | Versión **francesa** | "compte à rebours nouvel an 2027", "combien de temps avant le nouvel an" | Idioma | fr | Media | Revisor nativo | 2–3 días |
| 5 | Publicar más países de `draft` con contenido propio (tradiciones verificadas) — p. ej. Bélgica, Suiza, Austria, Noruega, Dinamarca, Finlandia, Puerto Rico*, Kenia, Ghana, Marruecos, Arabia Saudí, Pakistán, Vietnam, Taiwán | "new year countdown {country}" | País | en, es | Media | Investigación de tradiciones | 1–2 h por país |
| 6 | **Comparaciones de huso** ("¿cuántas horas antes celebra España que México?") | "new year time difference us uk", "diferencia horaria año nuevo españa méxico" | Comparación | en, es | Media | Pares con demanda real (validar en GSC primero) | 1 día para el motor; solo pares con impresiones |
| 7 | **Retransmisiones / eventos**: dónde ver la bajada de la bola, las campanadas de la Puerta del Sol, los fuegos de Sídney, con hora local del espectador | "times square ball drop time", "a qué hora son las campanadas" | Evento | en, es | Media | Verificar horarios oficiales cada año | 1 día |
| 8 | **Año Nuevo Lunar / otros calendarios** (Año Nuevo chino, Rosh Hashaná, Nowruz, Songkran) con cuenta regresiva | "chinese new year 2027 countdown" | Evento | en, es | Media | Fechas verificadas por año | 1 día por evento |
| 9 | Traducir los artículos del blog con más impresiones al español | según GSC | Artículo | es | Media | Datos de GSC | 2–3 h por artículo |
| 10 | Cuentas regresivas genéricas (Navidad, fin de curso…) | "christmas countdown" | Herramienta | en, es | Baja (cambia el foco del sitio) | Decisión de producto | 2–3 días |

\* Puerto Rico y otros territorios no están en la lista de países; habría que añadirlos como entidades propias.

## Orden recomendado

1. Desplegar (oportunidad 1) y enviar el sitemap.
2. En diciembre, revisar en GSC qué páginas de país reciben impresiones y priorizar 2 (ciudades) solo para los países que ya muestran demanda.
3. Tras Año Nuevo: subir el año, revisar resultados y decidir 3/4 (nuevos idiomas) con los datos de la temporada.
4. 6–9 solo cuando haya datos que indiquen demanda; nunca generar combinaciones sin ella.
