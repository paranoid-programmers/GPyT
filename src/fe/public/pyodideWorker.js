console.log("Worker started");

importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js");

console.log("Pyodide downloaded");

function prepPythonCode(python) {
  return `
globals().clear()
from io import StringIO
import sys

_old_stdout = sys.stdout
sys.stdout = StringIO()

${python}

sys.stdout.seek(0)
output = sys.stdout.read()
sys.stdout = _old_stdout
output
`;
}

async function loadPyodideAndPackages() {
  self.pyodide = await loadPyodide();
  console.log("Pyodide loaded");
  await self.pyodide.loadPackage(["numpy", "pytz"]);
  console.log("Pyodide packages loaded");
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  console.log("hey");
  console.log(JSON.stringify(event));
  // make sure loading is done
  await pyodideReadyPromise;
  // Don't bother yet with this line, suppose our API is built in such a way:
  let { id, python, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    python = prepPythonCode(python);
    console.log(python);
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);
    self.postMessage({ results, id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};
