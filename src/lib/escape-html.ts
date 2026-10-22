const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa texto escrito por el usuario antes de meterlo en el HTML de un correo.
 * Sin esto, un «nombre» con etiquetas o enlaces se enviaría tal cual desde
 * noreply@divermataro.org, firmado con el DKIM de la asociación.
 */
export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
