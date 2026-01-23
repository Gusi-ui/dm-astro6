# 🚀 Resumen Rápido: Configurar Cloudflare

## Pasos Rápidos

### 1. Login en Cloudflare

```bash
pnpm wrangler login
```

### 2. Crear Base de Datos

```bash
pnpm db:create
```

**Copia el `database_id` que aparece**

### 3. Actualizar wrangler.jsonc

Abre `wrangler.jsonc` y reemplaza `YOUR_DATABASE_ID` con el ID que copiaste.

### 4. Aplicar Migraciones

```bash
pnpm db:migrate
```

### 5. Configurar GitHub Secrets

En GitHub → Settings → Secrets → Actions, añade:

- `CLOUDFLARE_API_TOKEN` (crear en: https://dash.cloudflare.com/profile/api-tokens)
- `CLOUDFLARE_ACCOUNT_ID` (copiar de: https://dash.cloudflare.com/)

## 📚 Documentación Completa

- **Configuración detallada**: Ver `CONFIGURAR-CLOUDFLARE.md`
- **Pruebas locales**: Ver `PRUEBAS-LOCALES.md`
- **Deploy**: Ver `DEPLOY.md`

## ✅ Verificar

```bash
# Probar localmente
pnpm dev

# Probar build
pnpm build

# Deploy manual
pnpm deploy
```

## 🎉 Listo!

Una vez configurado, cada push a `main` desplegará automáticamente vía GitHub Actions.
