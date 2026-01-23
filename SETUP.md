# Guía de Configuración del Proyecto

## ✅ Pasos Completados

- [x] Estructura del proyecto creada
- [x] Dependencias instaladas
- [x] Configuración de Astro 6 + Cloudflare
- [x] Landing page implementada
- [x] Formulario de inscripción
- [x] Blog con Content Collections
- [x] Sistema de documentos
- [x] CI/CD con GitHub Actions

## 📋 Próximos Pasos

### 1. Configurar Git y GitHub

Ejecuta el script de configuración:

```bash
./setup-git.sh
```

O manualmente:

```bash
git init
git remote add origin https://github.com/Gusi-ui/dm-astro6.git
git add .
git commit -m "Initial commit: Proyecto Astro 6 + Cloudflare"
git branch -M main
git push -u origin main
```

### 2. Configurar Cloudflare D1 Database

1. **Crear la base de datos:**

```bash
pnpm wrangler d1 create astro6dm-db
```

2. **Copiar el `database_id` que te devuelve y actualizar `wrangler.jsonc`:**
   - Abre `wrangler.jsonc`
   - Reemplaza `YOUR_DATABASE_ID` con el ID real

3. **Aplicar las migraciones:**

```bash
pnpm wrangler d1 migrations apply astro6dm-db
```

### 3. Configurar Cloudflare Workers

1. **Iniciar sesión en Cloudflare:**

```bash
pnpm wrangler login
```

2. **Obtener tu Account ID:**
   - Ve a https://dash.cloudflare.com/
   - Copia tu Account ID del dashboard

3. **Crear un API Token:**
   - Ve a https://dash.cloudflare.com/profile/api-tokens
   - Crea un token con permisos de:
     - Account: Cloudflare Pages:Edit
     - Account: Workers Scripts:Edit
     - Zone: Zone:Read

### 4. Configurar GitHub Secrets

En tu repositorio de GitHub, ve a Settings > Secrets and variables > Actions y añade:

- `CLOUDFLARE_API_TOKEN`: Tu API token de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: Tu Account ID de Cloudflare

### 5. Actualizar Configuración del Dominio

1. **En `astro.config.mjs`:**
   - Actualiza `site: 'https://tudominio.com'` con tu dominio real

2. **En `public/robots.txt`:**
   - Actualiza la URL del sitemap con tu dominio

### 6. Probar Localmente

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

### 7. Deploy

**Deploy manual:**

```bash
pnpm build
pnpm wrangler deploy
```

**Deploy automático:**

- Haz push a la rama `main` y GitHub Actions desplegará automáticamente

## 📝 Notas Importantes

- Los documentos deben estar en `public/documents/`
- Las imágenes del blog deben estar en `public/images/blog/`
- El formulario de inscripción guarda los datos en Cloudflare D1
- El blog usa Content Collections (archivos `.md` en `src/content/blog/`)

## 🐛 Solución de Problemas

### Error: "database_id not found"

- Asegúrate de haber creado la base de datos D1 y actualizado `wrangler.jsonc`

### Error: "API token invalid"

- Verifica que el token tenga los permisos correctos
- Regenera el token si es necesario

### Error en el build

- Verifica que todas las dependencias estén instaladas: `pnpm install`
- Revisa los logs de error para más detalles
