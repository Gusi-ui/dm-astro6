import type { APIRoute } from 'astro';
import { Database } from '../../lib/db/client';

// Función para enviar notificación por email
async function sendNotificationEmail(
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
      console.error('Error enviando email de notificación:', errorData);
    }
  } catch (error) {
    // No bloqueamos el registro si falla el email
    console.error('Error enviando notificación:', error);
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

    // Enviar notificación por email al administrador
    const RESEND_API_KEY =
      (locals.runtime?.env as Record<string, string>)?.RESEND_API_KEY ||
      import.meta.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const emailPromise = sendNotificationEmail(RESEND_API_KEY, {
        name,
        email,
        phone: phone || undefined,
        message: message || undefined,
      });

      // Usar waitUntil para que Cloudflare no cancele la promesa
      const ctx = locals.runtime?.ctx;
      if (ctx?.waitUntil) {
        ctx.waitUntil(emailPromise);
      } else {
        // Fallback: esperar el email si no hay waitUntil
        await emailPromise;
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
