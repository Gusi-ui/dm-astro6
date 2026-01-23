# Restaurar GitHub Actions Workflow

El workflow fue movido temporalmente fuera de `.github` para permitir el push inicial.

## Después del push exitoso

1. Crea la carpeta `.github/workflows/`:
```bash
mkdir -p .github/workflows
```

2. Restaura el workflow:
```bash
mv ../deploy.yml.backup .github/workflows/deploy.yml
```

3. Añade y haz commit:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for Cloudflare deploy"
git push
```

## O crea el workflow manualmente en GitHub

1. Ve a: https://github.com/Gusi-ui/dm-astro6
2. Clic en **Actions** → **set up a workflow yourself**
3. Nombra el archivo: `deploy.yml`
4. Copia este contenido:

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

5. Guarda el archivo
