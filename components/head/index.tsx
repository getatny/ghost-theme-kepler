import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useCallback, useContext } from "react";

import Link from "next/link";
import { blogSettingsContext } from "@/utils/context";
import classNames from "classnames";
import { fadeInOutVariants } from "@/utils/motion-animate";
import styles from "./index.module.scss";
import { urlFormat } from "@/utils/commons";
import { useRouter } from "next/router";

const HeadComponent: FC = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  const router = useRouter();

  const checkIfRouterActive = useCallback(
    (targetRouter: string) => {
      const reg = new RegExp(`^/?(post|page)?${targetRouter}?$`);
      return reg.test(router.asPath);
    },
    [router]
  );

  return (
    <motion.header className={styles.header} key="header">
      <div className={styles.content}>
        {blogSettings.logo ? (
          <picture onClick={() => router.push("/")}>
            <source srcSet={blogSettings.logo} type="image/png" />
            <img src={blogSettings.logo} alt="Logo" className={styles.logo} />
          </picture>
        ) : null}

        <div className={styles.navigation}>
          {blogSettings.navigation?.map((nav) => (
            <motion.div
              className={classNames(
                styles.navigationItem,
                checkIfRouterActive(nav.url) && styles.routerActive
              )}
              key={nav.url}
              layout
            >
              <Link href={urlFormat("page", nav.url)}>{nav.label}</Link>

              <AnimatePresence>
                {checkIfRouterActive(nav.url) && (
                  <motion.div
                    className={styles.routerActiveDot}
                    variants={fadeInOutVariants}
                    initial="fadeOut"
                    animate="fadeIn"
                    exit="fadeOut"
                    key="router-active-dot"
                    layoutId="router-active-dot"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.header>
  );
});

export default HeadComponent;
