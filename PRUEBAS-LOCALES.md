# 🧪 Guía de Pruebas Locales

Esta guía te ayudará a probar el proyecto localmente antes de hacer deploy.

## 🚀 Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El sitio estará disponible en: `http://localhost:4321`

## ✅ Verificar Funcionalidades

### 1. Landing Page

- Abre: `http://localhost:4321`
- Verifica que todas las secciones se muestren correctamente
- Prueba la navegación (Header)
- Verifica que los enlaces funcionen

### 2. Formulario de Inscripción

- Ve a: `http://localhost:4321/asociate`
- Prueba el formulario:
  - ✅ Validación de campos requeridos
  - ✅ Validación de email
  - ✅ Envío del formulario
  - ✅ Mensaje de éxito/error

**Nota**: El formulario requiere la base de datos D1 configurada. Si aún no está configurada, verás un error. Esto es normal.

### 3. Blog

- Ve a: `http://localhost:4321/blog`
- Verifica que se muestre el post de ejemplo
- Haz clic en un post para ver el detalle
- Prueba la navegación "Volver al blog"

### 4. Documentos

- Ve a: `http://localhost:4321/documentos`
- Verifica que la página se muestre correctamente
- Los documentos reales deben estar en `public/documents/`

### 5. SEO

- Verifica sitemap: `http://localhost:4321/sitemap.xml`
- Verifica robots.txt: `http://localhost:4321/robots.txt`

## 🗄️ Probar Base de Datos Localmente

### Configurar Base de Datos Local

Para desarrollo local, puedes usar una base de datos D1 local:

```bash
# Aplicar migraciones a la base de datos local
pnpm db:local
```

### Ver Datos en la Base de Datos Local

```bash
# Consultar miembros
pnpm wrangler d1 execute astro6dm-db --local --command="SELECT * FROM members"

# Consultar vistas del blog
pnpm wrangler d1 execute astro6dm-db --local --command="SELECT * FROM blog_views"
```

## 🏗️ Probar Build

```bash
# Build del proyecto
pnpm build
```

Esto creará la carpeta `dist/` con los archivos compilados.

### Verificar Build

```bash
# Preview del build
pnpm preview
```

Esto iniciará un servidor local con el build de producción.

## 🐛 Solución de Problemas

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
pnpm install
```

### Error: "Database not found"

- Asegúrate de haber creado la base de datos D1
- Verifica que `wrangler.jsonc` tenga el `database_id` correcto
- Ejecuta las migraciones: `pnpm db:migrate`

### Error: "Port already in use"

- Cierra otros servidores que usen el puerto 4321
- O cambia el puerto en `astro.config.mjs`

### El formulario no funciona

- Verifica que la base de datos esté configurada
- Revisa la consola del navegador para errores
- Revisa los logs del servidor

## 📝 Checklist de Pruebas

Antes de hacer deploy, verifica:

- [ ] Landing page se carga correctamente
- [ ] Navegación funciona en todas las páginas
- [ ] Formulario de inscripción valida correctamente
- [ ] Formulario guarda datos en la base de datos
- [ ] Blog muestra posts correctamente
- [ ] Página de documentos se muestra
- [ ] Diseño responsive funciona en móvil
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en los logs del servidor
- [ ] Build se completa sin errores
- [ ] Preview funciona correctamente

## 🎯 Próximos Pasos

Una vez que todo funcione localmente:

1. Configurar Cloudflare (ver `CONFIGURAR-CLOUDFLARE.md`)
2. Hacer deploy de prueba
3. Probar en producción
4. Configurar dominio personalizado (opcional)
