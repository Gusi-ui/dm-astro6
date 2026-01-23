# Instrucciones para hacer Push a GitHub

## Problema
GitHub está rechazando el push del workflow porque requiere permisos adicionales.

## Solución Temporal

He movido temporalmente el workflow. Ahora puedes hacer push:

```bash
git add .
git commit -m "Initial commit: Proyecto Astro 6 + Cloudflare"
git push -u origin main
```

## Después del Push

Una vez que el push funcione, puedes restaurar el workflow:

```bash
# Restaurar el workflow
mv .github/workflows/deploy.yml.bak .github/workflows/deploy.yml

# Añadirlo y hacer commit
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

## Alternativa: Añadir el Workflow Manualmente

Si el push sigue fallando, puedes:

1. Hacer push sin el workflow (ya está movido)
2. Ir a GitHub → tu repositorio → Actions
3. Crear el workflow manualmente copiando el contenido de `.github/workflows/deploy.yml.bak`

## Configurar Permisos de GitHub

Para evitar este problema en el futuro:

1. Ve a GitHub → Settings → Developer settings → Personal access tokens
2. Crea un nuevo token con el scope `workflow`
3. O usa SSH en lugar de HTTPS para el remoto
