import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { nombre, email, asunto, mensaje } = data;

    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
      return new Response(JSON.stringify({ error: 'Todos los campos son obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'El formato del email no es válido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obtener API key de Resend desde variables de entorno
    const RESEND_API_KEY =
      (locals.runtime?.env as Record<string, string>)?.RESEND_API_KEY ||
      import.meta.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY no configurada');
      return new Response(JSON.stringify({ error: 'Error de configuración del servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Mapear asuntos a texto legible
    const asuntoTexto: Record<string, string> = {
      informacion: 'Información general',
      asociarse: 'Quiero asociarme',
      denuncia: 'Denuncia de barrera de accesibilidad',
      colaborar: 'Quiero colaborar',
      otro: 'Otro',
    };

    // Enviar email con Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DiverMataró Web <noreply@divermataro.org>',
        to: ['info@divermataro.org'],
        reply_to: email,
        subject: `[Web] ${asuntoTexto[asunto] || asunto} - ${nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0ea5e9, #c026d3); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo mensaje de contacto</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0 0 15px;"><strong>Nombre:</strong> ${nombre}</p>
              <p style="margin: 0 0 15px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 0 0 15px;"><strong>Asunto:</strong> ${asuntoTexto[asunto] || asunto}</p>
              <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0 0 10px;"><strong>Mensaje:</strong></p>
                <p style="margin: 0; white-space: pre-wrap;">${mensaje}</p>
              </div>
              <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
                Este mensaje fue enviado desde el formulario de contacto de la web de DiverMataró.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Resend:', errorData);
      return new Response(
        JSON.stringify({ error: 'Error al enviar el mensaje. Inténtalo de nuevo.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
