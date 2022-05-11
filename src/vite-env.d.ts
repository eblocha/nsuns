/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PICO_ACCESS_KEY?: string;
  readonly VITE_JARVIS_PPN_B64?: string;
  readonly VITE_RHINO_B64?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
