# Asociación Diversidad Funcional - Mataró

Sitio web de la asociación de diversidad funcional en Mataró, construido con Astro 7 y desplegado en Cloudflare Workers, en castellano y catalán.

## 🚀 Stack Tecnológico

- **Framework**: Astro 7 (con `@astrojs/cloudflare`)
- **Package Manager**: pnpm 12
- **Hosting**: Cloudflare Workers
- **Base de Datos**: Cloudflare D1 (SQLite serverless)
- **Estilos**: Tailwind CSS 3
- **Blog**: Astro Content Collections (`src/content/blog/` en castellano y `content-ca/blog/` en catalán)
- **Imágenes del blog**: Cloudinary

## 📋 Requisitos Previos

- Node.js 24 LTS (la versión exacta está en `.nvmrc`)
- pnpm 12 (`npm install -g pnpm@12`)
- Acceso a la cuenta de Cloudflare de la asociación (para desplegar a mano o usar la base D1 remota)

## 🛠️ Instalación

1. Instalar dependencias:

```bash
pnpm install
```

2. Copiar las variables locales (`.env` y `.dev.vars` no se suben al repositorio):

```bash
cp .env.example .env
cp .dev.vars.example .dev.vars
```

3. Crear las tablas en la base D1 local (la base remota ya existe y está en `wrangler.jsonc`):

```bash
pnpm db:local
```

## 🏃 Desarrollo

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:4321`

## 🏗️ Build

```bash
pnpm build
```

## 🌿 Flujo de trabajo con ramas

- **`main`** es producción: cada push despliega automáticamente a Cloudflare Workers.
  No se trabaja directamente sobre ella.
- **`develop`** es la rama de integración. Todo el trabajo entra aquí primero.
- Las ramas de trabajo (`feat/…`, `fix/…`, `chore/…`) salen de `develop` y vuelven
  a `develop` mediante Pull Request.
- Cuando `develop` está comprobada y estable, se abre un PR de `develop` a `main`
  para pasar a producción. Tras el despliegue, `develop` se realinea con `main`
  sola: el workflow «Sincronizar develop» abre y fusiona el back-merge.

El workflow de sincronización usa el secreto `SYNC_TOKEN` (un token de acceso
personal con permiso de escritura sobre contenido y pull requests). Con él, el
PR de sincronización lo abre una cuenta de persona y GitHub ejecuta su CI con
normalidad. Sin ese secreto el workflow sigue funcionando, pero el PR lo abre
`github-actions[bot]` y GitHub deja su ejecución del CI esperando aprobación
manual, que acaba registrada como fallida en el panel de Actions.

- Renovate abre sus PRs contra `develop`, agrupando las actualizaciones menores y
  de parche en un único PR para que los lockfiles no se pisen entre sí.

Ambas ramas están protegidas en GitHub, también para los administradores:

- No se puede hacer push directo ni force-push: todo entra por Pull Request.
- No se pueden borrar.
- El check `Verify` del CI tiene que estar en verde, y la rama al día con su base,
  antes de poder fusionar.
- No se exigen aprobaciones, para que un único desarrollador pueda fusionar su
  propio PR una vez el CI ha pasado.

Para un arreglo urgente hay que desactivar la regla a mano en
_Settings → Branches_ y volver a activarla después.

Cada Pull Request (y cada push a `develop`) ejecuta el workflow de CI, que
comprueba instalación con lockfile fijo, lint, formato, tipos y build. Lo mismo
se puede ejecutar en local antes de subir nada:

```bash
pnpm install --frozen-lockfile
pnpm astro sync
pnpm exec eslint .
pnpm exec prettier --check .
pnpm check
pnpm build
```

## 🚢 Deploy

### Deploy manual:

```bash
pnpm wrangler deploy
```

### Deploy automático:

El proyecto está configurado con GitHub Actions para deploy automático en cada push a la rama `main`,
es decir, al fusionar `develop` en `main`.

## 🖼️ Fotos nuevas del blog

1. Guardar el original en `public/images/blog/`.
2. Usar `/images/blog/x.jpg` en el `.md` (las fotos sueltas, en HTML con
   `sizes="(max-width: 768px) 100vw, 896px"`, no con la sintaxis `![]()` de Markdown).
3. Ejecutar `pnpm upload:blog-images <slug>` (necesita la clave de Cloudinary en `.env`).
4. Borrar el archivo local: la foto se sirve desde Cloudinary.

## 📁 Estructura del Proyecto

```
/
├── public/
│   ├── documents/     # Documentos descargables
│   └── images/        # Imágenes estáticas
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── content/       # Content collections (blog)
│   ├── layouts/       # Layouts de página
│   ├── lib/           # Utilidades y cliente DB
│   ├── pages/         # Páginas y rutas
│   └── styles/        # Estilos globales
└── wrangler.jsonc     # Configuración Cloudflare
```

## 📝 Características

- ✅ Landing page atractiva y accesible
- ✅ Formulario de inscripción
- ✅ Blog con Content Collections
- ✅ Sistema de documentos descargables
- ✅ Diseño responsive y accesible (WCAG 2.1)
- ✅ SEO optimizado

## 📄 Licencia

Este proyecto es de código abierto y está disponible para la asociación.
