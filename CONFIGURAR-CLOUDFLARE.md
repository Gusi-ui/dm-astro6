# 🔧 Guía de Configuración de Cloudflare

Esta guía te ayudará a configurar Cloudflare D1 Database y Workers para el proyecto.

## 📋 Requisitos Previos

1. Cuenta de Cloudflare (gratuita): https://dash.cloudflare.com/sign-up
2. Wrangler CLI instalado (ya está en devDependencies)

## 🚀 Pasos de Configuración

### Paso 1: Iniciar Sesión en Cloudflare

```bash
pnpm wrangler login
```

Esto abrirá tu navegador para autenticarte con Cloudflare.

### Paso 2: Crear Base de Datos D1

```bash
pnpm db:create
```

O manualmente:

```bash
pnpm wrangler d1 create astro6dm-db
```

**IMPORTANTE**: Copia el `database_id` que aparece en la salida. Se verá algo como:

```
✅ Successfully created DB 'astro6dm-db' in region EEUR
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via snapshots to R2.

[[d1_databases]]
binding = "DB"
database_name = "astro6dm-db"
database_id = "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  ← COPIA ESTE ID
```

### Paso 3: Actualizar wrangler.jsonc

1. Abre el archivo `wrangler.jsonc`
2. Busca la línea con `"database_id": "YOUR_DATABASE_ID"`
3. Reemplaza `YOUR_DATABASE_ID` con el ID que copiaste en el paso anterior

Ejemplo:

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "astro6dm-db",
      "database_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", // ← Tu ID aquí
    },
  ],
}
```

### Paso 4: Aplicar Migraciones

```bash
pnpm db:migrate
```

O manualmente:

```bash
pnpm wrangler d1 migrations apply astro6dm-db
```

Esto creará las tablas `members` y `blog_views` en tu base de datos.

### Paso 5: Obtener Account ID

1. Ve a: https://dash.cloudflare.com/
2. Selecciona cualquier dominio o ve directamente a Workers & Pages
3. En la barra lateral derecha, verás tu **Account ID**
4. Cópialo, lo necesitarás para GitHub Secrets

### Paso 6: Crear API Token

1. Ve a: https://dash.cloudflare.com/profile/api-tokens
2. Haz clic en **"Create Token"**
3. Usa el template **"Edit Cloudflare Workers"** (recomendado) o crea uno personalizado con estos permisos mínimos para `wrangler deploy`:
   - **Account**: `Workers Scripts:Edit`
   - **Account**: `Workers KV Storage:Edit` (binding SESSION del adapter)
   - **Account**: `D1:Edit` (base de datos astro6dm-db)
   - **Account**: `Account Settings:Read`
   - **User**: `User Details:Read` y `Memberships:Read`
   - **Zone**: `Workers Routes:Edit` (solo si enlazas dominio personalizado como divermataro.org)
4. En **Account Resources**, limita el token a tu cuenta de Cloudflare
5. Copia el token generado (solo se muestra una vez)

### Paso 7: Configurar GitHub Secrets

1. Ve a tu repositorio: https://github.com/Gusi-ui/dm-astro6
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **"New repository secret"**
4. Añade estos dos secrets:
   - **Nombre**: `CLOUDFLARE_API_TOKEN`
     **Valor**: El token que copiaste en el Paso 6

   - **Nombre**: `CLOUDFLARE_ACCOUNT_ID`
     **Valor**: El Account ID que copiaste en el Paso 5

## ✅ Verificar Configuración

### Probar Localmente

```bash
# Desarrollo con base de datos local
pnpm dev
```

El sitio estará en `http://localhost:4321`

### Probar Build

```bash
pnpm build
```

### Probar Deploy Manual

```bash
pnpm deploy
```

O:

```bash
pnpm build
pnpm wrangler deploy
```

## 🐛 Solución de Problemas

### Error: "database_id not found"

- Verifica que hayas actualizado `wrangler.jsonc` con el ID correcto
- Asegúrate de que el ID no tenga espacios ni caracteres extra

### Error: "Authentication required"

- Ejecuta `pnpm wrangler login` de nuevo
- Verifica que tu sesión de Cloudflare no haya expirado

### Error: "Migration failed"

- Verifica que la base de datos esté creada
- Asegúrate de que el `database_id` en `wrangler.jsonc` sea correcto
- Intenta ejecutar la migración de nuevo

### Error en GitHub Actions

- Verifica que los secrets estén configurados correctamente
- Asegúrate de que el API token tenga los permisos correctos
- Revisa los logs de GitHub Actions para más detalles

## 📚 Recursos

- [Documentación Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Documentación Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Documentación Astro + Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)

## 🌐 Configuración de Dominio Personalizado

### ¿Necesito tener el dominio en Cloudflare?

**Respuesta corta: NO, no es necesario.** Puedes mantener tu dominio en cualquier proveedor (GoDaddy, Namecheap, Google Domains, etc.) y simplemente configurar los registros DNS para apuntar a Cloudflare Pages.

### Opción 1: Dominio en otro proveedor (Recomendado para empezar)

Si ya tienes tu dominio registrado en otro proveedor, puedes usarlo sin transferirlo a Cloudflare.

**📖 Guía completa paso a paso**: Ver [`CONFIGURAR-DOMINIO-EXTERNO.md`](./CONFIGURAR-DOMINIO-EXTERNO.md)

**Resumen rápido:**

1. **Hacer el primer deploy** (si aún no lo has hecho)
2. **Obtener la URL de tu proyecto** en Cloudflare Pages (formato: `tu-proyecto.pages.dev`)
3. **Configurar DNS en tu proveedor** con un registro CNAME apuntando a la URL de Pages
4. **Configurar el dominio en Cloudflare Pages** → Custom domains
5. **Esperar la propagación DNS** (15 minutos - 2 horas)
6. **Actualizar `astro.config.mjs`** con tu dominio

**Ventajas:**

- ✅ No necesitas transferir el dominio
- ✅ Mantienes el control en tu proveedor actual
- ✅ Funciona perfectamente con Cloudflare Pages
- ✅ SSL/TLS automático y gratuito

**Limitaciones:**

- ⚠️ No tendrás acceso a todas las características avanzadas de Cloudflare (CDN completo, WAF, etc.)
- ⚠️ Algunas optimizaciones pueden estar limitadas

### Opción 2: Dominio manejado por Cloudflare (Recomendado para producción)

Si quieres aprovechar todas las características de Cloudflare, puedes transferir tu dominio o añadirlo a Cloudflare:

1. **Añadir dominio a Cloudflare:**
   - Ve a Cloudflare Dashboard → **Add a Site**
   - Ingresa tu dominio
   - Cloudflare escaneará tus registros DNS actuales
   - Sigue el proceso de verificación

2. **Cambiar nameservers:**
   - Cloudflare te dará nameservers (ej: `alice.ns.cloudflare.com`)
   - Ve a tu proveedor de dominio y cambia los nameservers a los de Cloudflare
   - Esto puede tardar hasta 24 horas en propagarse

3. **Configurar dominio en Pages:**
   - Una vez que el dominio esté activo en Cloudflare
   - Ve a Pages → Tu proyecto → **Custom domains**
   - Añade tu dominio personalizado

4. **Ventajas:**
   - ✅ Acceso completo a CDN global de Cloudflare
   - ✅ Protección DDoS y WAF (Web Application Firewall)
   - ✅ Optimizaciones automáticas (compresión, minificación, etc.)
   - ✅ SSL/TLS automático y gratuito
   - ✅ Analytics y estadísticas avanzadas
   - ✅ Mejor rendimiento global

5. **Consideraciones:**
   - ⚠️ Necesitas cambiar los nameservers (puede tardar en propagarse)
   - ⚠️ Si tienes otros servicios (email, subdominios), necesitarás configurarlos en Cloudflare

### Recomendación

- **Para desarrollo/pruebas**: Usa la Opción 1 (dominio externo con CNAME)
- **Para producción**: Considera la Opción 2 (dominio en Cloudflare) para mejor rendimiento y seguridad

### Actualizar configuración en el proyecto

Una vez configurado tu dominio, actualiza `astro.config.mjs`:

```javascript
export default defineConfig({
  // ... otras configuraciones
  site: 'https://tudominio.com', // ← Actualiza con tu dominio real
});
```

## 🎉 Siguiente Paso

Una vez configurado Cloudflare, puedes:

1. Probar el formulario de inscripción localmente
2. Hacer deploy manual para probar
3. Configurar el dominio personalizado (ver sección arriba)
4. El deploy automático funcionará con cada push a `main`
