
# Setting Up IndexedDB in Jest Tests

When testing code that relies on IndexedDB in a Jest environment, you'll need to polyfill IndexedDB since Jest runs in Node.js, which doesn't natively support IndexedDB. Below are the steps to set up IndexedDB for Jest tests.

## Steps to Set Up IndexedDB in Jest

### 1. **Install Dependencies**

You'll need to install two dependencies:
- `core-js`: Polyfills modern JavaScript features.
- `fake-indexeddb`: Polyfills IndexedDB for testing purposes.

Run the following command to install them:

```bash
npm install core-js fake-indexeddb --save-dev
```

### 2. **Import in `test-setup.ts`**

In your Jest setup file (usually `test-setup.ts`), import both `core-js` and `fake-indexeddb/auto` to make sure that IndexedDB is available during your tests.

```ts
import 'core-js/stable';         // Polyfill for modern JavaScript features
import 'fake-indexeddb/auto';   // Polyfill for IndexedDB

// You can add other setup code here if needed
```

### 3. **Ensure Jest Config is Set Up Properly**

Make sure your Jest configuration (`jest.config.ts`) is set to use the `jsdom` environment, which simulates a browser environment that includes IndexedDB.

```ts
module.exports = {
  testEnvironment: 'jsdom',  // This ensures IndexedDB is available
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],  // Ensure this points to your setup file
  // Other Jest configurations can be added here
};
```

### 4. **Test the Setup**

Once you've set everything up, your Jest tests will have IndexedDB available, thanks to the `fake-indexeddb` polyfill. You can now test your IndexedDB-dependent code.

### Why Use These Libraries?

- **`core-js/stable`**: Polyfills modern JavaScript features like `Promise`, `Object.assign`, and more. This ensures compatibility with code that uses newer JavaScript features.
- **`fake-indexeddb/auto`**: Mocks IndexedDB, enabling tests that interact with IndexedDB to run in a Node.js environment.

### Conclusion

With the steps above, you will be able to test IndexedDB-related code in Jest, even though Jest runs in a Node.js environment that doesn't natively support IndexedDB. The combination of `core-js/stable` and `fake-indexeddb/auto` will allow you to run your tests seamlessly.
