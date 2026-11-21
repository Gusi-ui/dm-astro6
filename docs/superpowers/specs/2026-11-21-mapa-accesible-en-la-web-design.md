# DiverMapa en la web de la asociación (21/11/2026)

## Por qué

Gusi quiere que quien entre en divermataro.org vea que la asociación tiene un mapa accesible
(https://mapa.divermataro.org) y se anime a colaborar aportando lugares. El mapa ya enlaza a la web
desde su pie; falta el camino de vuelta. En el menú de escritorio no cabe otro apartado, así que se
aprovechan dos sitios que ya existen.

## Objetivos

- Portada: el botón secundario del hero lleva al mapa.
- Pie: el bloque «Encuéntranos» (Google Maps de Mataró) pasa a ser una tarjeta del mapa accesible,
  con un botón para abrirlo y otro para aportar un lugar.

## Fuera de alcance

- El menú superior: no se añade ningún apartado.
- El artículo del blog «Presentamos DiverMapa»: pieza aparte, después.
- Datos en vivo (número de lugares): se descartó por ahora; hoy solo hay 10 de 192 comprobados.
- Incrustar el mapa de verdad: el mapa lo prohíbe (`frame-ancestors 'none'`) y pesaría ~500 KB en cada
  página.

## Lo que no puede pasar

- Perder la puntuación de rendimiento y accesibilidad de la auditoría (100 en accesibilidad).
- Textos con menos de 4,5:1 de contraste sobre el fondo oscuro del pie.

## Enfoques considerados (pie)

1. **Tarjeta con imagen del mapa (elegido).** Ligera, sin servicios de terceros.
   - Dentro de esta opción se compararon una captura real (con crédito de OpenStreetMap y casi todo
     «?» sin comprobar) y un **dibujo del mapa**. Gusi eligió el dibujo: no envejece con los datos.
2. El mapa de verdad dentro del pie: descartado (seguridad del mapa y peso).
3. Tarjeta con cifras en vivo: aplazado.

## Diseño

**Direcciones del mapa** (una constante por idioma, junto a las demás utilidades de idioma):

|                  | Castellano                                      | Catalán                                        |
| ---------------- | ----------------------------------------------- | ---------------------------------------------- |
| Mapa             | https://mapa.divermataro.org                    | https://mapa.divermataro.org/ca                |
| Aportar un lugar | https://mapa.divermataro.org/avisar/sitio-nuevo | https://mapa.divermataro.org/ca/avisa/lloc-nou |

Se abren en la misma pestaña, como el enlace del mapa a la web (decisión de Claude).

**Portada (`Hero.astro`):** el segundo botón («Conoce Nuestro Trabajo», que iba al blog) pasa a
«Descubre el Mapa Accesible» / «Descobreix el mapa accessible» y enlaza al mapa. Mismo aspecto y misma
flecha. «Únete a Nosotros» no cambia.

**Pie (`Footer.astro`, 4.ª columna):**

- Título «Mapa accesible» / «Mapa accessible», con el mismo punto de color que hoy.
- Tarjeta: dibujo del mapa en SVG dentro del componente (decorativo, `aria-hidden`), con calles, el mar,
  tres marcadores azules con la marca de «comprobado» en naranja y uno naranja con «+»; etiqueta
  «DiverMapa · beta».
- Texto: «Lugares de Mataró comprobados en persona: ¿podrás entrar? Míralo antes de ir.» /
  «Llocs de Mataró comprovats en persona: hi podràs entrar? Mira-ho abans d'anar-hi.»
- Botones: «Abrir el mapa» (azul) / «Obre el mapa», y «Aporta un lugar» (naranja) / «Aporta un lloc».
  Texto blanco: 5,1:1 sobre #0274af y 5,2:1 sobre #c2410c.
- Se quitan el mapa de Google, su script y sus textos (`footer.findUs`, `footer.showMap`,
  `footer.mapNotice`, `footer.mapTitle`). «Mataró, Barcelona» sigue en la columna de contacto.

**Privacidad:** la política (ES y CA) deja de mencionar «un mapa de Google Maps» y nombra el mapa
accesible de la asociación como enlace. El texto en catalán lo revisa el socio, como siempre.

## Lo que queda para quien lo construya

- El dibujo exacto del SVG, partiendo del boceto aprobado.
- Comprobar en local: build, axe sin errores en la portada (ES y CA) y una captura del pie a 390 y a
  1280 px; las cuatro direcciones del mapa responden 200.
