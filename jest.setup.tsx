import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/recommendations',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  // Using a simple img tag for tests
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => {
  const React = require('react') as typeof import('react');
  const omitMotionProps = <P extends Record<string, unknown>>(props: P) => {
    const {
      initial,
      animate,
      exit,
      whileHover,
      whileTap,
      transition,
      variants,
      layout,
      layoutId,
      drag,
      dragConstraints,
      dragElastic,
      dragMomentum,
      ...rest
    } = props as Record<string, unknown>;
    return rest as P;
  };

  return {
    motion: {
      div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
        ({ children, ...props }, ref) => {
          const safeProps = omitMotionProps(props);
          return (
            <div ref={ref} {...safeProps}>
              {children}
            </div>
          );
        },
      ),
      button: React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
        ({ children, ...props }, ref) => {
          const safeProps = omitMotionProps(props);
          return (
            <button ref={ref} {...safeProps}>
              {children}
            </button>
          );
        },
      ),
      span: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
        ({ children, ...props }, ref) => {
          const safeProps = omitMotionProps(props);
          return (
            <span ref={ref} {...safeProps}>
              {children}
            </span>
          );
        },
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAnimation: () => ({
      start: jest.fn(),
    }),
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  observe: IntersectionObserver['observe'] = jest.fn();
  unobserve: IntersectionObserver['unobserve'] = jest.fn();
  disconnect: IntersectionObserver['disconnect'] = jest.fn();
  takeRecords: IntersectionObserver['takeRecords'] = () => [];
}

// @ts-expect-error - assigning to global for test environment
global.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  observe: ResizeObserver['observe'] = jest.fn();
  unobserve: ResizeObserver['unobserve'] = jest.fn();
  disconnect: ResizeObserver['disconnect'] = jest.fn();
}

// @ts-expect-error - assigning to global for test environment
global.ResizeObserver = MockResizeObserver;

// Mock fetch
// @ts-expect-error - assigning to global for test environment
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

