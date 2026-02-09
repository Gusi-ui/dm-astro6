import type { APIRoute } from 'astro';
import { Database } from '../../lib/db/client';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/DRlG1gYTC596ta62wY3uas';

// Función para enviar notificación por email al administrador
async function sendAdminNotificationEmail(
  apiKey: string,
  memberData: { name: string; email: string; phone?: string; message?: string }
) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DiverMataró Web <noreply@divermataro.org>',
        to: ['info@divermataro.org'],
        subject: `🎉 Nuevo miembro: ${memberData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #22c55e, #0ea5e9); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎉 ¡Nuevo miembro!</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Una nueva persona se ha unido a DiverMataró:
              </p>

              <div style="background: white; border-radius: 8px; padding: 20px; border-left: 4px solid #22c55e;">
                <p style="margin: 0 0 10px;"><strong>Nombre:</strong> ${memberData.name}</p>
                <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${memberData.email}">${memberData.email}</a></p>
                ${memberData.phone ? `<p style="margin: 0 0 10px;"><strong>Teléfono:</strong> <a href="https://wa.me/${memberData.phone.replace(/\D/g, '')}">${memberData.phone}</a></p>` : ''}
                ${memberData.message ? `<p style="margin: 15px 0 0;"><strong>Mensaje:</strong></p><p style="margin: 5px 0 0; white-space: pre-wrap; color: #6b7280;">${memberData.message}</p>` : ''}
              </div>

              <p style="margin-top: 25px; font-size: 14px; color: #6b7280;">
                Recuerda contactar a esta persona por WhatsApp para darle la bienvenida.
              </p>

              <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
                Este email fue enviado automáticamente desde el formulario de asociación de la web.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error enviando email de notificación al admin:', errorData);
    }
  } catch (error) {
    console.error('Error enviando notificación al admin:', error);
  }
}

// Función para enviar email de bienvenida al nuevo miembro
async function sendWelcomeEmail(apiKey: string, memberData: { name: string; email: string }) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DiverMataró <noreply@divermataro.org>',
        to: [memberData.email],
        reply_to: 'info@divermataro.org',
        subject: `¡Bienvenid@ a DiverMataró, ${memberData.name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0ea5e9, #d946ef); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 26px;">¡Bienvenid@ a DiverMataró!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Asociación Diversidad Funcional Mataró</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Hola <strong>${memberData.name}</strong>,
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                ¡Gracias por unirte a nuestra asociación! Tu solicitud ha sido recibida correctamente y nuestro equipo la revisará en breve.
              </p>

              <div style="background: #25D366; border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0;">
                <p style="color: white; margin: 0 0 15px; font-size: 16px; font-weight: bold;">
                  Únete a nuestro grupo de WhatsApp
                </p>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px; font-size: 14px;">
                  Mantente al día de todas las actividades, noticias y novedades de la asociación.
                </p>
                <a href="${WHATSAPP_GROUP_URL}" target="_blank" style="display: inline-block; background: white; color: #25D366; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                  Unirme al grupo
                </a>
              </div>

              <div style="background: white; border-radius: 8px; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
                <p style="margin: 0 0 8px; font-size: 14px; font-weight: bold; color: #374151;">Próximos pasos:</p>
                <ol style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
                  <li>Revisaremos tu solicitud</li>
                  <li>Te contactaremos por WhatsApp para darte la bienvenida</li>
                  <li>¡Empieza a participar en nuestras actividades!</li>
                </ol>
              </div>

              <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                Si tienes cualquier duda, puedes responder directamente a este email o contactarnos en
                <a href="mailto:info@divermataro.org" style="color: #0ea5e9;">info@divermataro.org</a>.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
                Asociación Diversidad Funcional Mataró<br />
                Este email fue enviado porque te registraste en nuestra web.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error enviando email de bienvenida:', errorData);
    }
  } catch (error) {
    console.error('Error enviando email de bienvenida:', error);
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const db = locals.runtime?.env?.DB;

    if (!db) {
      return new Response(
        JSON.stringify({ success: false, error: 'Error de configuración del servidor' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const phone = formData.get('phone')?.toString();
    const message = formData.get('message')?.toString();

    // Validación básica
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ success: false, error: 'El nombre debe tener al menos 2 caracteres' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ success: false, error: 'Email inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message && message.length > 500) {
      return new Response(
        JSON.stringify({ success: false, error: 'El mensaje no puede exceder 500 caracteres' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const database = new Database(db);

    // Verificar si el email ya existe
    const existing = await database.getMemberByEmail(email);
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: 'Este email ya está registrado' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear nuevo miembro
    await database.createMember({
      name,
      email,
      phone: phone || undefined,
      message: message || undefined,
    });

    // Enviar emails: notificación al admin + bienvenida al usuario
    const RESEND_API_KEY =
      (locals.runtime?.env as Record<string, string>)?.RESEND_API_KEY ||
      import.meta.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const emailPromises = Promise.all([
        sendAdminNotificationEmail(RESEND_API_KEY, {
          name,
          email,
          phone: phone || undefined,
          message: message || undefined,
        }),
        sendWelcomeEmail(RESEND_API_KEY, { name, email }),
      ]);

      // Usar waitUntil para que Cloudflare no cancele las promesas
      const ctx = locals.runtime?.ctx;
      if (ctx?.waitUntil) {
        ctx.waitUntil(emailPromises);
      } else {
        // Fallback: esperar los emails si no hay waitUntil
        await emailPromises;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Gracias por unirte! Te contactaremos pronto por WhatsApp.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al procesar inscripción:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al procesar tu solicitud. Por favor, intenta de nuevo.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
