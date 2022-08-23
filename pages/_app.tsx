import "@/styles/globals.css";

import { AnimatePresence, motion } from "framer-motion";

import type { AppProps } from "next/app";
import LayoutComponent from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <LayoutComponent pageKey={pageProps.key}>
        <Component {...pageProps} />
      </LayoutComponent>
    </AnimatePresence>
  );
}

export default MyApp;
