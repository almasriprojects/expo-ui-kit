// Pre-polyfill globals that expo's winter runtime tries to lazy-load
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = function(val) { return JSON.parse(JSON.stringify(val)); };
}
if (typeof globalThis.__ExpoImportMetaRegistry === 'undefined') {
  globalThis.__ExpoImportMetaRegistry = new Map();
}
