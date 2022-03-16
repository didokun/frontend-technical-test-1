import * as nextRouter from 'next/router';
export const mockFetch = (elements: unknown) => window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(elements)})) as jest.Mock;

export function mockNextUseRouter(props: {
    route?: string;
    pathname?: string;
    query?: Record<string, unknown>;
    asPath?: string;
}) {
  const nextJsRouter = nextRouter;
  nextJsRouter.useRouter = jest.fn().mockImplementation(() => (props));
}