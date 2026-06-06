/// <reference types="@cloudflare/workers-types" />
/// <reference types="@astrojs/cloudflare/types.d.ts" />

declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    RESEND_API_KEY?: string;
    ENVIRONMENT?: string;
    NODE_VERSION?: string;
  }
}
