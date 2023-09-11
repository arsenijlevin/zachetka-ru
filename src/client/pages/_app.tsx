import "../styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/pop-ups/utility/ErrorBoundary";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Router from "next/router";
import { CSSProperties, useEffect, useState } from "react";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`;

const loadingSpinnerStyles: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ErrorBoundary>
      {loading ? (
        <>
          <Component {...pageProps} />
          <HashLoader
            color={"#1e90ff"}
            loading={loading}
            cssOverride={loadingSpinnerStyles}
            aria-label="Loading Spinner"
          />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ErrorBoundary>
  );
}
