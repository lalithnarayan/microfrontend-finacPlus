// import '@testing-library/jest-dom/vitest'

// // import { server } from '../mocks/server'
// import { beforeAll, afterEach, afterAll } from 'vitest'

// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// afterEach(() => server.resetHandlers())

// afterAll(() => server.close())

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});