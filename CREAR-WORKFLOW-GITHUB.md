# Crear GitHub Actions Workflow Manualmente

GitHub está rechazando el workflow porque tu autenticación OAuth no tiene el scope `workflow`.

## Solución: Crear el workflow directamente en GitHub

### Paso 1: Ve a tu repositorio

Abre: https://github.com/Gusi-ui/dm-astro6

### Paso 2: Crea el workflow

1. Haz clic en la pestaña **"Actions"** (arriba del repositorio)
2. Si es la primera vez, verás un botón **"set up a workflow yourself"** - haz clic
3. Si ya tienes workflows, haz clic en **"New workflow"** → **"set up a workflow yourself"**

### Paso 3: Nombra el archivo

En el nombre del archivo, escribe: `deploy.yml`

### Paso 4: Copia este contenido

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist
```

### Paso 5: Guarda

Haz clic en **"Start commit"** → **"Commit new file"**

¡Listo! El workflow estará creado y funcionando.

## Alternativa: Cambiar autenticación (más complejo)

Si prefieres usar Git para el workflow, necesitas:

1. Crear un Personal Access Token con scope `workflow`:
   - Ve a: https://github.com/settings/tokens
   - Crea un nuevo token con permisos: `workflow`
   - Usa este token para autenticarte

2. O cambiar a SSH en lugar de HTTPS

Pero la forma más fácil es crear el workflow directamente en GitHub como se explica arriba.
