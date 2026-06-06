import { env } from 'cloudflare:workers';

export const getCloudflareEnv = (): Cloudflare.Env => env;

export const getResendApiKey = (): string | undefined =>
  getCloudflareEnv().RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;

export const getD1Database = (): D1Database | undefined => {
  try {
    return getCloudflareEnv().DB;
  } catch {
    return undefined;
  }
};

export const waitUntil = (locals: App.Locals, promise: Promise<unknown>): void => {
  if (locals.cfContext?.waitUntil) {
    locals.cfContext.waitUntil(promise);
    return;
  }

  void promise;
};
