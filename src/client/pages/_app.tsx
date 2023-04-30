import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from '../components/utility/ErrorBoundary';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap the Component prop with ErrorBoundary component
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
