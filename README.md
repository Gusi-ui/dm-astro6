# Asociación Diversidad Funcional - Mataró

Sitio web de la asociación de diversidad funcional en Mataró, construido con Astro 6 y desplegado en Cloudflare Workers.

## 🚀 Stack Tecnológico

- **Framework**: Astro 6 (beta)
- **Package Manager**: pnpm
- **Hosting**: Cloudflare Workers
- **Base de Datos**: Cloudflare D1 (SQLite serverless)
- **Estilos**: Tailwind CSS
- **Blog**: Astro Content Collections

## 📋 Requisitos Previos

- Node.js 22.12.0 o superior
- pnpm instalado globalmente (`npm install -g pnpm`)
- Cuenta de Cloudflare (gratuita)

## 🛠️ Instalación

1. Instalar dependencias:

```bash
pnpm install
```

2. Configurar base de datos D1:

```bash
pnpm wrangler d1 create astro6dm-db
```

3. Actualizar `wrangler.jsonc` con el `database_id` obtenido

4. Ejecutar migraciones:

```bash
pnpm wrangler d1 migrations apply astro6dm-db
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

## 🚢 Deploy

### Deploy manual:

```bash
pnpm wrangler deploy
```

### Deploy automático:

El proyecto está configurado con GitHub Actions para deploy automático en cada push a la rama `main`.

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

## 🌐 Recursos Gratuitos

- Cloudflare Workers: 100,000 requests/día
- Cloudflare D1: 5M lecturas, 100K escrituras, 5GB storage/día
- Cloudflare R2: 10GB storage, 1M operaciones/mes

## 📄 Licencia

Este proyecto es de código abierto y está disponible para la asociación.
