# 🚀 Configuración de Mercado Pago

Sigue estos pasos para configurar Mercado Pago en tu proyecto.

---

## 📋 Paso 1: Obtener credenciales de Mercado Pago

1. **Ve a:** https://www.mercadopago.com.ar/developers/panel/app
2. **Inicia sesión** con tu cuenta de Mercado Pago
3. **Crea una aplicación:**
   - Click en "Crear aplicación"
   - Nombre: "New Year Timer" (o el que prefieras)
   - Integración: "Checkout Pro"
4. **Ve a "Credenciales"**
5. **Copia las credenciales de TEST:**
   - **Public Key** → Para el frontend (config.js)
   - **Access Token** → Para el backend (server.js)

---

## 📝 Paso 2: Configurar las credenciales

### Frontend (`config.js`)

Reemplaza en `config.js`:

```javascript
const MERCADOPAGO_CONFIG = {
    publicKey: 'TEST-xxxxx-xxxxx-xxxxx-xxxxx', // ← Pega tu Public Key aquí
    mode: 'test',
    country: 'ar'
};
```

### Backend (`server.js`)

Opción A - Editar el archivo:
```javascript
const MERCADOPAGO_ACCESS_TOKEN = 'TEST-xxxxx-xxxxx-xxxxx-xxxxx'; // ← Línea 18
```

Opción B - Variable de entorno (recomendado):
```bash
set MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxx-xxxxx-xxxxx-xxxxx
```

---

## 💻 Paso 3: Instalar dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- `express` - Servidor web
- `mercadopago` - SDK de Mercado Pago
- `cors` - Para permitir requests del frontend
- `firebase-admin` - Para guardar deseos automáticamente

---

## 🎯 Paso 4: Iniciar el servidor

En la terminal, ejecuta:

```bash
npm start
```

Deberías ver:
```
========================================
🚀 Server running on http://localhost:3000
========================================
```

---

## 🌐 Paso 5: Exponer el servidor con ngrok (para webhooks)

Mercado Pago necesita enviarte notificaciones cuando se completa un pago. Para esto en localhost, usa **ngrok**:

1. **Descarga ngrok:** https://ngrok.com/download
2. **Extrae el archivo** y ábrelo
3. **Ejecuta:**
   ```bash
   ngrok http 3000
   ```
4. **Copia la URL** que aparece (ejemplo: `https://xxxx-xx-xx-xxx-xxx.ngrok-free.app`)
5. **Actualiza `server.js` línea 51:**
   ```javascript
   notification_url: `https://xxxx-xx-xx-xxx-xxx.ngrok-free.app/api/webhooks`
   ```
6. **Reinicia el servidor** (Ctrl+C y `npm start`)

---

## 🧪 Paso 6: Probar el pago

### Usuarios de prueba de Mercado Pago:

Para probar pagos en modo TEST, necesitas crear usuarios de prueba:

1. **Ve a:** https://www.mercadopago.com.ar/developers/panel/test-users
2. **Crea 2 usuarios:**
   - Vendedor (seller) - El que recibe el pago
   - Comprador (buyer) - El que paga

3. **Usa las credenciales del COMPRADOR** para hacer la prueba de pago

### Tarjetas de prueba:

**APRO** - Pago aprobado:
```
Número: 5031 7557 3453 0604
CVV: 123
Fecha: 11/25
Nombre: APRO
```

**OTHE** - Rechazado por error:
```
Número: 5031 4332 1540 6351
CVV: 123
Fecha: 11/25
Nombre: OTHE
```

Más tarjetas: https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards

---

## ✅ Paso 7: Verificar que funciona

1. **Abre tu sitio:** http://localhost:8000
2. **Haz clic en un slot vacío**
3. **Completa el formulario**
4. **Haz clic en "Pagar con Mercado Pago"**
5. **Deberías ser redirigido** al checkout de Mercado Pago
6. **Completa el pago** con una tarjeta de prueba
7. **Verifica** que vuelvas a tu sitio

---

## 🔔 Paso 8: Configurar webhooks (automático)

Para que los deseos se guarden automáticamente en Firebase cuando se complete un pago:

1. **Descarga tu Service Account de Firebase:**
   - Ve a: https://console.firebase.google.com/
   - Project Settings > Service Accounts
   - Click "Generate new private key"
   - Guarda el archivo como `firebase-service-account.json` en la raíz del proyecto

2. **Descomenta el código** en `server.js` líneas 85-106

3. **Reinicia el servidor**

---

## 🚀 Paso 9: Pasar a producción

Cuando estés listo para cobrar de verdad:

1. **Completa la información de tu cuenta** en Mercado Pago
2. **Activa las credenciales de PRODUCCIÓN**
3. **Reemplaza las credenciales TEST por PRODUCTION:**
   - En `config.js`: Usa el Public Key de producción
   - En `server.js`: Usa el Access Token de producción
4. **Cambia `mode` en `config.js`:**
   ```javascript
   mode: 'production'
   ```
5. **Actualiza las URLs** de `back_urls` en `server.js` con tu dominio real
6. **Despliega el servidor** en Heroku/Railway/Render/etc
7. **Actualiza `notification_url`** con tu dominio real

---

## ❓ Troubleshooting

### Error: "Server not running"
- Asegúrate de ejecutar `npm start` en la terminal
- Verifica que el puerto 3000 esté disponible

### Error: "Missing Access Token"
- Verifica que hayas configurado el Access Token en `server.js`
- Asegúrate de usar el Access Token de TEST (empieza con TEST-)

### No recibo webhooks
- Verifica que ngrok esté corriendo
- Verifica que la URL en `notification_url` esté actualizada
- Revisa los logs del servidor con `console.log`

### El pago funciona pero no se guarda en Firebase
- Verifica que el webhook esté recibiendo notificaciones
- Descomenta el código de Firebase en `server.js`
- Verifica que `firebase-service-account.json` esté en la raíz

---

## 📚 Recursos útiles

- **Documentación oficial:** https://www.mercadopago.com.ar/developers/es/docs
- **Checkout Pro:** https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/landing
- **Webhooks:** https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications/webhooks
- **Tarjetas de prueba:** https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards

---

## 💡 Tips

- **Modo test:** Siempre prueba primero con credenciales TEST
- **Logs:** Revisa la consola del servidor para ver qué está pasando
- **Webhooks:** Los webhooks pueden tardar algunos segundos en llegar
- **Soporte:** Si tienes problemas, revisa el dashboard de Mercado Pago en "Integraciones"

---

¡Listo! Si tienes dudas, revisa la documentación oficial o pregúntame. 🚀
