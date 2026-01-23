# ✅ Checklist: Configuración de Dominio Externo

Usa este checklist para asegurarte de completar todos los pasos correctamente.

## 📋 Antes de Empezar

- [ ] Tienes un dominio registrado en un proveedor (GoDaddy, Namecheap, etc.)
- [ ] Tienes acceso al panel de DNS de tu proveedor
- [ ] Tienes una cuenta de Cloudflare configurada
- [ ] Has completado la configuración básica de Cloudflare (ver `CONFIGURAR-CLOUDFLARE.md`)

## 🚀 Pasos de Configuración

### Paso 1: Deploy Inicial
- [ ] Has hecho login en Cloudflare: `pnpm wrangler login`
- [ ] Has desplegado el proyecto: `pnpm deploy:pages`
- [ ] O has hecho push a `main` y el workflow de GitHub Actions se ejecutó correctamente

### Paso 2: Obtener URL del Proyecto
- [ ] Has ido a: https://dash.cloudflare.com/ → Workers & Pages
- [ ] Has encontrado tu proyecto `astro6dm`
- [ ] Has anotado la URL: `https://____________________.pages.dev`

### Paso 3: Configurar Dominio en Cloudflare Pages
- [ ] Has ido a tu proyecto → pestaña "Custom domains"
- [ ] Has hecho clic en "Set up a custom domain"
- [ ] Has ingresado tu dominio: `____________________`
- [ ] Has anotado el valor que Cloudflare te dio para el DNS: `____________________`

### Paso 4: Configurar DNS en tu Proveedor
- [ ] Has accedido al panel de DNS de tu proveedor
- [ ] Has añadido el registro DNS (CNAME o A según corresponda):
  - Tipo: `____________________`
  - Nombre/Host: `____________________` (ej: `@` o `www`)
  - Valor/Destino: `____________________`
  - TTL: `3600` (o por defecto)
- [ ] Has guardado los cambios

### Paso 5: Verificar Propagación DNS
- [ ] Has esperado al menos 15 minutos
- [ ] Has verificado en https://dnschecker.org/ que el DNS se ha propagado
- [ ] O has verificado con: `dig tudominio.com` o `nslookup tudominio.com`

### Paso 6: Verificar en Cloudflare
- [ ] Has vuelto a Cloudflare Pages → Custom domains
- [ ] El dominio muestra un check verde ✅ (verificado)
- [ ] El SSL/TLS está activo (candado verde)

### Paso 7: Actualizar Configuración del Proyecto
- [ ] Has actualizado `astro.config.mjs` con tu dominio:
  ```javascript
  site: 'https://____________________'
  ```
- [ ] Has guardado el archivo

### Paso 8: Verificación Final
- [ ] Has abierto `https://tudominio.com` en el navegador
- [ ] El sitio carga correctamente
- [ ] Muestra el candado verde 🔒 (SSL activo)
- [ ] Si configuraste `www`, también funciona: `https://www.tudominio.com`

## 🎉 ¡Completado!

- [ ] Todo funciona correctamente
- [ ] Has probado que el sitio se actualiza con nuevos deploys

## 📝 Notas

**Mi dominio:** `____________________`

**URL de Cloudflare Pages:** `https://____________________.pages.dev`

**Proveedor de dominio:** `____________________` (ej: GoDaddy, Namecheap)

**Valor DNS configurado:** `____________________`

**Fecha de configuración:** `____________________`

---

**¿Necesitas ayuda?** Consulta la guía completa en [`CONFIGURAR-DOMINIO-EXTERNO.md`](./CONFIGURAR-DOMINIO-EXTERNO.md)
