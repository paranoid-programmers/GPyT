export const pyodideWorker = new Worker("/pyodideWorker.js");

const callbacks: Record<number, Function> = {};

pyodideWorker.onmessage = (event) => {
  const { id, results } = event.data;
  const onSuccess = callbacks[id];
  delete callbacks[id];
  onSuccess(results);
};

const runPython = (() => {
  let id = 0; // identify a Promise
  return (script: string, context?: any): Promise<string> => {
    // the id could be generated more carefully
    id = (id + 1) % Number.MAX_SAFE_INTEGER;
    return new Promise((onSuccess) => {
      callbacks[id] = onSuccess;
      pyodideWorker.postMessage({
        ...context,
        python: script,
        id,
      });
    });
  };
})();

export { runPython };
