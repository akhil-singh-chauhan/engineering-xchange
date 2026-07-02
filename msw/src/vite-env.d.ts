/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MSW: string;
  readonly VITE_MSW_SCENARIO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
