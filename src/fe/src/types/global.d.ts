import { Pyodide, CreatePyodideOptions } from '@/types/pyodide'

declare global {
  interface Window {
    loadPyodide: (options?: CreatePyodideOptions) => Promise<Pyodide>
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loadScript: (url: string) => Promise<void>
  }
}
