# 🌐 Configuración de Dominio Externo (Opción 1)

Esta guía te ayudará a configurar tu dominio personalizado manteniéndolo en tu proveedor actual (GoDaddy, Namecheap, Google Domains, etc.) y apuntándolo a Cloudflare Pages.

## 📋 Requisitos Previos

- ✅ Proyecto ya desplegado en Cloudflare Pages (o listo para desplegar)
- ✅ Dominio registrado en cualquier proveedor
- ✅ Acceso al panel de DNS de tu proveedor de dominio
- ✅ Cuenta de Cloudflare configurada

## 🚀 Pasos de Configuración

### Paso 1: Hacer el Primer Deploy (si aún no lo has hecho)

Si aún no has desplegado tu proyecto, hazlo ahora:

```bash
# Asegúrate de estar autenticado
pnpm wrangler login

# Hacer deploy
pnpm deploy:pages
```

O si prefieres usar GitHub Actions, simplemente haz push a la rama `main` y el workflow se ejecutará automáticamente.

### Paso 2: Obtener la URL de tu Proyecto en Cloudflare Pages

Después del deploy, Cloudflare te dará una URL temporal. Para encontrarla:

1. Ve a: https://dash.cloudflare.com/
2. En el menú lateral, haz clic en **"Workers & Pages"**
3. Busca tu proyecto `astro6dm` (o el nombre que hayas usado)
4. Haz clic en el proyecto
5. Verás la URL en formato: `https://astro6dm-XXXXX.pages.dev`

**Anota esta URL**, la necesitarás en el siguiente paso.

### Paso 3: Configurar el Dominio en Cloudflare Pages

1. En la página de tu proyecto en Cloudflare Pages, ve a la pestaña **"Custom domains"**
2. Haz clic en **"Set up a custom domain"**
3. Ingresa tu dominio (ej: `tudominio.com` o `www.tudominio.com`)
4. Cloudflare te mostrará las instrucciones de configuración DNS

**IMPORTANTE**: Cloudflare te dará un valor específico para el CNAME. Puede ser:

- `tu-proyecto.pages.dev` (directo)
- O un valor como `cname.cloudflare.com` (si Cloudflare lo requiere)

**Anota este valor**, lo necesitarás para configurar el DNS.

### Paso 4: Configurar DNS en tu Proveedor de Dominio

Ahora necesitas configurar los registros DNS en tu proveedor actual. Los pasos varían según el proveedor, pero el concepto es el mismo:

#### Para el dominio raíz (@) o subdominio www:

**Opción A: Si Cloudflare te dio un CNAME directo**

- **Tipo**: CNAME
- **Nombre/Host**: `@` (para dominio raíz) o `www` (para subdominio)
- **Valor/Destino**: `tu-proyecto.pages.dev` (el valor que Cloudflare te dio)
- **TTL**: 3600 (o el valor por defecto)

**Opción B: Si tu proveedor no permite CNAME en el dominio raíz (@)**
Algunos proveedores no permiten CNAME en el dominio raíz. En ese caso:

1. **Para el dominio raíz (@)**: Usa un registro **A** o **ALIAS**
   - **Tipo**: A o ALIAS
   - **Nombre**: `@`
   - **Valor**: Cloudflare te dará una IP (generalmente algo como `192.0.2.1`)
   - **TTL**: 3600

2. **Para www**: Usa CNAME
   - **Tipo**: CNAME
   - **Nombre**: `www`
   - **Valor**: `tu-proyecto.pages.dev`
   - **TTL**: 3600

#### Instrucciones por Proveedor Común:

**GoDaddy:**

1. Ve a tu panel → **DNS Management**
2. Haz clic en **"Add"** para añadir un nuevo registro
3. Selecciona el tipo (CNAME o A según corresponda)
4. Ingresa el nombre y valor
5. Guarda los cambios

**Namecheap:**

1. Ve a **Domain List** → Selecciona tu dominio → **Advanced DNS**
2. Haz clic en **"Add New Record"**
3. Selecciona el tipo y completa los campos
4. Guarda con el icono de check ✓

**Google Domains:**

1. Ve a **DNS** → **Custom records**
2. Haz clic en **"Add custom record"**
3. Selecciona el tipo y completa los campos
4. Guarda

**Cloudflare (si tienes el dominio aquí pero quieres usar Pages):**

1. Ve a tu dominio → **DNS** → **Records**
2. Añade el registro CNAME o A según corresponda
3. Guarda

### Paso 5: Esperar la Propagación DNS

Los cambios DNS pueden tardar desde unos minutos hasta 24 horas en propagarse. Generalmente toma entre 15 minutos y 2 horas.

Puedes verificar la propagación usando:

- https://dnschecker.org/
- O desde la terminal: `dig tudominio.com` o `nslookup tudominio.com`

### Paso 6: Verificar en Cloudflare Pages

1. Vuelve a Cloudflare Pages → Tu proyecto → **Custom domains**
2. Cloudflare verificará automáticamente la configuración DNS
3. Cuando esté listo, verás un check verde ✅ junto a tu dominio
4. El SSL/TLS se configurará automáticamente (puede tardar unos minutos)

### Paso 7: Actualizar la Configuración del Proyecto

Una vez que el dominio esté funcionando, actualiza `astro.config.mjs`:

```javascript
export default defineConfig({
  // ... otras configuraciones
  site: 'https://tudominio.com', // ← Reemplaza con tu dominio real
});
```

## ✅ Verificación Final

1. **Verifica que el sitio carga correctamente:**

   ```bash
   curl -I https://tudominio.com
   ```

   Deberías ver un código de estado `200 OK`

2. **Verifica el SSL:**
   - Abre `https://tudominio.com` en tu navegador
   - Deberías ver el candado verde 🔒 (SSL automático de Cloudflare)

3. **Verifica ambos dominios (si configuraste ambos):**
   - `https://tudominio.com`
   - `https://www.tudominio.com`

## 🐛 Solución de Problemas

### El dominio no se verifica en Cloudflare

**Problema**: Cloudflare muestra error de verificación DNS

**Solución**:

- Verifica que el registro DNS esté configurado correctamente
- Espera más tiempo (hasta 24 horas)
- Asegúrate de que el valor del CNAME/A sea exactamente el que Cloudflare te indicó
- Verifica que no haya otros registros conflictivos (ej: otro CNAME o A para el mismo nombre)

### El sitio no carga después de la verificación

**Problema**: El dominio está verificado pero el sitio no carga

**Solución**:

- Verifica que el proyecto esté desplegado correctamente en Cloudflare Pages
- Revisa los logs en Cloudflare Pages → Deployments
- Asegúrate de que `astro.config.mjs` tenga el `site` configurado correctamente

### Error de SSL

**Problema**: El sitio carga pero muestra error de certificado

**Solución**:

- Espera unos minutos, Cloudflare configura el SSL automáticamente
- Si después de 1 hora sigue sin funcionar, verifica que el DNS esté apuntando correctamente
- Asegúrate de que no haya problemas con la verificación del dominio

### CNAME no permitido en dominio raíz

**Problema**: Tu proveedor no permite CNAME en `@`

**Solución**:

- Usa un registro A o ALIAS en su lugar
- Cloudflare te dará una IP específica para usar
- O configura solo `www` con CNAME y redirige el dominio raíz a www

## 📚 Recursos Adicionales

- [Documentación Cloudflare Pages - Custom Domains](https://developers.cloudflare.com/pages/platform/custom-domains/)
- [Verificación de DNS](https://dnschecker.org/)

## 🎉 ¡Listo!

Una vez configurado, tu sitio estará disponible en tu dominio personalizado. Cada nuevo deploy a `main` se actualizará automáticamente en tu dominio.
