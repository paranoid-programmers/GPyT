import { Pyodide, CreatePyodideOptions } from "@/types/pyodide";

declare global {
    interface Window {
        loadPyodide: (options: CreatePyodideOptions) => Promise<Pyodide>;
    }
}
