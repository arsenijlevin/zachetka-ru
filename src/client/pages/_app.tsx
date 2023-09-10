import "../styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/pop-ups/utility/ErrorBoundary";
import axios from "axios";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap the Component prop with ErrorBoundary component
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
