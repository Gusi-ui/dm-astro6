/**
 * Textos que devuelven las API de los formularios y correo de bienvenida a los
 * socios, en el idioma de la página desde la que se envió el formulario. Los
 * avisos internos a info@divermataro.org siguen en castellano. El catalán es un
 * borrador pendiente de revisión por un socio.
 */

import type { Lang } from './index';

/** Idioma que envía el formulario; cualquier otro valor cuenta como castellano */
export function parseFormLang(value: unknown): Lang {
  return value === 'ca' ? 'ca' : 'es';
}

export const formLangNames: Record<Lang, string> = { es: 'Castellano', ca: 'Català' };

export const forms = {
  es: {
    'contact.required': 'Todos los campos son obligatorios',
    'contact.tooLong': 'El nombre o el mensaje son demasiado largos',
    'contact.invalidEmail': 'El formato del email no es válido',
    'contact.sendError': 'Error al enviar el mensaje. Inténtalo de nuevo.',
    'contact.success': 'Mensaje enviado correctamente',

    'join.nameLength': 'El nombre debe tener entre 2 y 100 caracteres',
    'join.invalidEmail': 'Email inválido',
    'join.messageTooLong': 'El mensaje no puede exceder 500 caracteres',
    'join.emailExists': 'Este email ya está registrado',
    'join.processError': 'Error al procesar tu solicitud. Por favor, intenta de nuevo.',
    'join.success': '¡Gracias por unirte! Te contactaremos pronto por WhatsApp.',

    serverConfig: 'Error de configuración del servidor',
    internalError: 'Error interno del servidor',

    'welcome.subject': '¡Bienvenid@ a DiverMataró, {name}!',
    'welcome.title': '¡Bienvenid@ a DiverMataró!',
    'welcome.org': 'Asociación Diversidad Funcional Mataró',
    'welcome.hello': 'Hola',
    'welcome.thanks':
      '¡Gracias por unirte a nuestra asociación! Tu solicitud ha sido recibida correctamente y nuestro equipo la revisará en breve.',
    'welcome.groupTitle': 'Únete a nuestro grupo de WhatsApp',
    'welcome.groupText':
      'Mantente al día de todas las actividades, noticias y novedades de la asociación.',
    'welcome.groupButton': 'Unirme al grupo',
    'welcome.nextSteps': 'Próximos pasos:',
    'welcome.step1': 'Revisaremos tu solicitud',
    'welcome.step2': 'Te contactaremos por WhatsApp para darte la bienvenida',
    'welcome.step3': '¡Empieza a participar en nuestras actividades!',
    'welcome.questions':
      'Si tienes cualquier duda, puedes responder directamente a este email o contactarnos en',
    'welcome.footer': 'Este email fue enviado porque te registraste en nuestra web.',
  },
  ca: {
    'contact.required': 'Tots els camps són obligatoris',
    'contact.tooLong': 'El nom o el missatge són massa llargs',
    'contact.invalidEmail': 'El format del correu electrònic no és vàlid',
    'contact.sendError': 'No s’ha pogut enviar el missatge. Torna-ho a provar.',
    'contact.success': 'Missatge enviat correctament',

    'join.nameLength': 'El nom ha de tenir entre 2 i 100 caràcters',
    'join.invalidEmail': 'El correu electrònic no és vàlid',
    'join.messageTooLong': 'El missatge no pot superar els 500 caràcters',
    'join.emailExists': 'Aquest correu electrònic ja està registrat',
    'join.processError': 'No s’ha pogut processar la teva sol·licitud. Torna-ho a provar.',
    'join.success': 'Gràcies per unir-te! Et contactarem aviat per WhatsApp.',

    serverConfig: 'Error de configuració del servidor',
    internalError: 'Error intern del servidor',

    'welcome.subject': 'Et donem la benvinguda a DiverMataró, {name}!',
    'welcome.title': 'Et donem la benvinguda a DiverMataró!',
    'welcome.org': 'Associació Diversitat Funcional Mataró',
    'welcome.hello': 'Hola',
    'welcome.thanks':
      'Gràcies per unir-te a la nostra associació! Hem rebut correctament la teva sol·licitud i el nostre equip la revisarà aviat.',
    'welcome.groupTitle': 'Uneix-te al nostre grup de WhatsApp',
    'welcome.groupText':
      'Estigues al dia de totes les activitats, notícies i novetats de l’associació.',
    'welcome.groupButton': 'Uneix-me al grup',
    'welcome.nextSteps': 'Propers passos:',
    'welcome.step1': 'Revisarem la teva sol·licitud',
    'welcome.step2': 'Et contactarem per WhatsApp per donar-te la benvinguda',
    'welcome.step3': 'Comença a participar en les nostres activitats!',
    'welcome.questions':
      'Si tens qualsevol dubte, pots respondre directament aquest correu o escriure’ns a',
    'welcome.footer': 'Has rebut aquest correu perquè t’has registrat al nostre web.',
  },
} as const;
