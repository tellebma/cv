/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_MATOMO_URL: string;
  readonly PUBLIC_MATOMO_SITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
