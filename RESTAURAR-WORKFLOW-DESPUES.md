# Restaurar Workflow Después del Push

El workflow fue movido temporalmente para permitir el push.

## Después del Push Exitoso

### Opción 1: Restaurar desde el archivo local

```bash
# Restaurar el workflow
mv .github/workflows/deploy.yml.backup .github/workflows/deploy.yml

# Añadir y commit
git add .github/workflows/deploy.yml
git commit -m "Add workflow (creado manualmente en GitHub)"
git push
```

**Nota**: Si el push falla de nuevo, usa la Opción 2.

### Opción 2: Crear/Actualizar manualmente en GitHub (Recomendado)

1. Ve a: https://github.com/Gusi-ui/dm-astro6
2. Ve a la pestaña **Actions**
3. Si el workflow ya existe, haz clic en él
4. Haz clic en el icono de **"..."** (tres puntos) → **"Edit workflow"**
5. O crea uno nuevo: **"New workflow"** → **"set up a workflow yourself"**
6. Copia el contenido de `.github/workflows/deploy.yml.backup`
7. Guarda el archivo

El workflow funcionará igual, pero estará creado/actualizado desde la interfaz web de GitHub, que no tiene restricciones de OAuth.

## ¿Por qué pasa esto?

GitHub requiere permisos especiales (`workflow` scope) para crear/actualizar workflows mediante OAuth. Al hacerlo desde la interfaz web, GitHub lo acepta sin problemas.
