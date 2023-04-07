export interface Pyodide {
    runPython(code: string): any;
    runPythonAsync(code: string): Promise<any>;
    loadPackage(packageName: string | string[]): Promise<void>;
    // Add other relevant Pyodide methods and properties you may use.
}

export interface CreatePyodideOptions {
    indexURL: string;
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
}

export function createPyodide(options: CreatePyodideOptions): Promise<Pyodide>;
