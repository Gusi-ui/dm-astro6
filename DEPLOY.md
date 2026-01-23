# Guía de Deploy

## Configuración Inicial

### 1. Crear Base de Datos D1

```bash
pnpm wrangler d1 create astro6dm-db
```

Esto te dará un `database_id`. Actualiza `wrangler.jsonc` con este ID.

### 2. Aplicar Migraciones

```bash
pnpm wrangler d1 migrations apply astro6dm-db
```

### 3. Configurar Secrets de Cloudflare

Si necesitas variables de entorno:

```bash
pnpm wrangler secret put SECRET_NAME
```

### 4. Configurar GitHub Secrets

Para el deploy automático, añade estos secrets en GitHub:

- `CLOUDFLARE_API_TOKEN`: Tu API token de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID`: Tu Account ID de Cloudflare

Puedes obtenerlos en: https://dash.cloudflare.com/profile/api-tokens

### 5. Deploy Manual

```bash
pnpm build
pnpm wrangler deploy
```

### 6. Deploy Automático

El workflow de GitHub Actions se ejecutará automáticamente cuando hagas push a `main`.

## Notas

- Asegúrate de actualizar `astro.config.mjs` con tu dominio real
- Actualiza `public/robots.txt` con tu dominio
- Los documentos deben estar en `public/documents/`
- Las imágenes del blog deben estar en `public/images/blog/`
