export function setupMockLocalStorage() {
  let store: Record<string, string> = {};
  const mockStorage = {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = String(value);
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    get length(): number {
      return Object.keys(store).length;
    },
    key: (i: number): string | null => Object.keys(store)[i] ?? null
  };

  Object.defineProperty(globalThis, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true
  });

  return mockStorage;
}
