// pyodideLoader.ts
import { Pyodide } from '@/types/pyodide'; // Adjust the import path accordingly

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $loadScript: (url: string) => Promise<void>;
    }
}

export async function loadPyodide($loadScript: (url: string) => Promise<void>): Promise<Pyodide> {
    try {
        await $loadScript('https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js');
        const pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.0/full/'
        });
        console.log('Pyodide is ready');
        return pyodide
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        throw error;
    }
}
