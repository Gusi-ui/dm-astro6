# DiverMapa en la web de la asociación: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** que la portada y el pie de divermataro.org lleven a DiverMapa, con una tarjeta del mapa en el
pie en lugar de Google Maps.

**Architecture:** las cuatro direcciones del mapa viven en `src/lib/divermapa.ts`, por idioma. `Hero.astro`
y `Footer.astro` las usan. Los textos nuevos van en `src/i18n/home.ts` (portada) y `src/i18n/ui.ts`
(pie). El dibujo es un SVG dentro del pie.

**Tech Stack:** Astro 7, Tailwind 3, Cloudflare Workers. El proyecto no tiene pruebas automáticas
propias: la prueba es un script de comprobación sobre el HTML generado, más axe con Playwright.

**Spec:** `docs/superpowers/specs/2026-11-21-mapa-accesible-en-la-web-design.md`

## Global Constraints

- Rama `feat/mapa-accesible-en-la-web` desde `develop`; PR a `develop`; el paso a `main` lo autoriza Gusi.
- Direcciones: mapa `https://mapa.divermataro.org` (ES) y `https://mapa.divermataro.org/ca` (CA); aportar `https://mapa.divermataro.org/avisar/sitio-nuevo` (ES) y `https://mapa.divermataro.org/ca/avisa/lloc-nou` (CA). Misma pestaña.
- Textos: «Descubre el Mapa Accesible» / «Descobreix el mapa accessible»; «Mapa accesible» / «Mapa accessible»; «Lugares de Mataró comprobados en persona: ¿podrás entrar? Míralo antes de ir.» / «Llocs de Mataró comprovats en persona: hi podràs entrar? Mira-ho abans d'anar-hi.»; «Abrir el mapa» / «Obre el mapa»; «Aporta un lugar» / «Aporta un lloc»; etiqueta «DiverMapa · beta».
- Texto ≥ 4,5:1 sobre su fondo; el dibujo es decorativo (`aria-hidden="true"`).
- Antes de cada commit: `pnpm exec eslint .`, `pnpm exec prettier --check .`, `pnpm check` (debe decir `Result (N files)` con 0 errores) y `pnpm build`.
- PATH: `~/.nvm/versions/node/v24.22.3/bin` (Node 24.22.3 y pnpm 12).

## Review Focus

1. La página en catalán: los dos enlaces y los textos en catalán, no en castellano → comprobación del script en `/ca`.
2. Lector de pantalla en el pie: los botones se entienden fuera de contexto («Abrir el mapa», no «Abrir») y el dibujo no se lee → axe y el script.
3. Restos de Google Maps (script, textos `footer.findUs/showMap/mapNotice/mapTitle`, la frase de privacidad) → el script busca `maps.google` y `Google Maps` en el HTML de `/`, `/ca`, `/privacidad` y `/ca/privacitat`.
4. Pie en móvil (390 px) y escritorio (1280 px): la tarjeta no desborda su columna → capturas.
5. Rendimiento: la tarjeta no añade imágenes ni scripts → el script comprueba que no hay `<script>` del pie con `map-facade`.

---

### Task 1: Portada y pie enlazan a DiverMapa

**Files:**

- Create: `src/lib/divermapa.ts`
- Modify: `src/components/sections/Hero.astro` (segundo botón), `src/i18n/home.ts` (`hero.work`)
- Modify: `src/components/sections/Footer.astro` (4.ª columna y `<script>` del mapa), `src/i18n/ui.ts`
- Modify: `src/components/legal/PrivacidadEs.astro`, `src/components/legal/PrivacidadCa.astro`
- Test (sin commit, en el scratchpad): `comprobar-mapa.mjs`

**Interfaces:**

- Produces: `DIVERMAPA_URL: Record<Lang, string>` y `DIVERMAPA_NEW_PLACE_URL: Record<Lang, string>` en `src/lib/divermapa.ts`, con los valores de Global Constraints.
- Produces (claves de `ui.ts`, ES y CA): `footer.mapHeading`, `footer.mapText`, `footer.mapOpen`, `footer.mapContribute`, `footer.mapBadge`. Se borran `footer.findUs`, `footer.showMap`, `footer.mapNotice` y `footer.mapTitle`.

- [ ] **Step 1: Script de comprobación**

`comprobar-mapa.mjs <base>` pide `/`, `/ca`, `/privacidad` y `/ca/privacitat` a `<base>` y falla si:

- en `/` no hay `<a href="https://mapa.divermataro.org">` con «Descubre el Mapa Accesible», ni `<a href="https://mapa.divermataro.org/avisar/sitio-nuevo">` con «Aporta un lugar», ni «Abrir el mapa» con la dirección del mapa;
- en `/ca` no hay lo mismo con `https://mapa.divermataro.org/ca`, `https://mapa.divermataro.org/ca/avisa/lloc-nou`, «Descobreix el mapa accessible», «Obre el mapa» y «Aporta un lloc»;
- alguna de las cuatro páginas contiene `maps.google`, `map-facade` o `Google Maps`.

- [ ] **Step 2: Ejecutarlo contra el build actual y ver que falla**

Run: `pnpm build && pnpm exec wrangler dev --port 4400 --local` (en segundo plano) y `node comprobar-mapa.mjs http://localhost:4400`.
Expected: FAIL (no hay enlaces al mapa; hay `maps.google`).

- [ ] **Step 3: Implementar**

- `src/lib/divermapa.ts` con las dos constantes.
- `Hero.astro`: el segundo botón usa `DIVERMAPA_URL[lang]` y `hero.work` pasa a los textos de Global Constraints; el resto del botón no cambia. Actualizar el comentario de `home.ts` si lo hay.
- `Footer.astro`, 4.ª columna: título `footer.mapHeading` (mismo punto de color); tarjeta `rounded-xl border border-white/10 bg-white/5` con el SVG del boceto aprobado (calles, mar, tres marcadores azules con «comprobado» naranja y uno naranja con «+»), la etiqueta `footer.mapBadge`, el texto `footer.mapText` (`text-white/90`) y dos enlaces apilados de ancho completo: `footer.mapOpen` (degradado `from-primary-600 to-primary-800`, texto blanco) a `DIVERMAPA_URL[lang]`, y `footer.mapContribute` (`bg-orange-700`, texto blanco) a `DIVERMAPA_NEW_PLACE_URL[lang]`, con `min-h-11`. Borrar el `<script>` de `map-facade`.
- `ui.ts`: claves nuevas y borradas (bloque Interfaces), en ES y CA.
- Privacidad ES: «…WhatsApp) y un mapa de Google Maps. Al acceder…» → «…WhatsApp) y al mapa accesible de la asociación (mapa.divermataro.org). Al acceder…». CA: el mismo cambio («…WhatsApp) i al mapa accessible de l’associació (mapa.divermataro.org). Quan accedeixes…»).

- [ ] **Step 4: Volver a ejecutar el script**

Run: `pnpm build`, reiniciar `wrangler dev` y `node comprobar-mapa.mjs http://localhost:4400`. Expected: PASS.

- [ ] **Step 5: axe y capturas**

Con `@axe-core/playwright` (el de `/Volumes/APFS/Aproyectos/Accesible/node_modules`), WCAG 2.2 AA en `/` y `/ca`: 0 violaciones. Capturas del pie a 390 y 1280 px y del hero a 390 px; revisarlas.

- [ ] **Step 6: Comprobaciones del repositorio y commit**

Run: las cuatro de Global Constraints → todo en verde. Commit `feat: la portada y el pie enlazan al mapa accesible (DiverMapa)` con el spec y este plan.

### Task 2: PR

- [ ] **Step 1:** push de la rama y PR a `develop` con las capturas y el aviso de que el texto en catalán de la política de privacidad y del pie lo revisa el socio. Fusionar en `develop` cuando el CI esté en verde; preparar `develop` → `main` y esperar el visto bueno de Gusi.
