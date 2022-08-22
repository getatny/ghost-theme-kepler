import { AnimatePresence, motion } from "framer-motion";

import type { AppProps } from "next/app";
import LayoutComponent from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={pageProps.key}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </LayoutComponent>
  );
}

export default MyApp;
