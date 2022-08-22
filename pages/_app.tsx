import "../styles/globals.css";

import type { AppProps } from "next/app";
import LayoutComponent from "../components/layout";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <motion.div>
        <Component {...pageProps} />
      </motion.div>
    </LayoutComponent>
  );
}

export default MyApp;
