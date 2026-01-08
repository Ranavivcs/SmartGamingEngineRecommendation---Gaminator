import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

// Custom render function that can include providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => {
  return render(ui, { ...options });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

// Helper to wait for async state updates
export const waitForStateUpdate = () => new Promise((resolve) => setTimeout(resolve, 0));

// Helper to simulate delay for debounced operations
export const waitForDebounce = (ms: number = 1100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper to create a mock fetch response
export const createMockFetchResponse = <T,>(data: T, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  });
};

// Helper to mock a failed fetch
export const createMockFetchError = (message: string, status = 500) => {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve({ error: message }),
  });
};

// Helper to find element by test id with custom text
export const getByTestIdWithText = (container: HTMLElement, testId: string, text: string) => {
  const elements = container.querySelectorAll(`[data-testid="${testId}"]`);
  return Array.from(elements).find((el) => el.textContent?.includes(text));
};
