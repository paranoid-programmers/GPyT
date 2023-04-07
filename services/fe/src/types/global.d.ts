import { Pyodide } from "@/types/pyodide";

declare global {
    interface Window {
        loadPyodide: (options: { indexURL: string }) => Promise<void>;
        pyodide: Pyodide;
    }
}
