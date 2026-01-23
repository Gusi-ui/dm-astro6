/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DB: D1Database;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
      };
    };
  }
}
