const originalConsoleError = console.error;

console.error = function(...args) {
  if (args[0].includes('Warning: Using UNSAFE_componentWillMount in strict mode is not recommended')) {
    return;
  }
  originalConsoleError.apply(console, args);
};