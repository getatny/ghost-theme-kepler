import { FC, memo, useCallback, useContext } from "react";

import Link from "next/link";
import { blogSettingsContext } from "@/utils/context";
import classNames from "classnames";
import styles from "./index.module.scss";

const HeadComponent: FC = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  const checkIfRouterActive = useCallback((router: string) => {
    const currentRouter = window.location.pathname;

    return currentRouter === router;
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {blogSettings.logo ? (
          <picture>
            <source srcSet={blogSettings.logo} type="image/png" />
            <img src={blogSettings.logo} alt="Logo" className={styles.logo} />
          </picture>
        ) : null}

        <div className={styles.navigation}>
          {blogSettings.navigation?.map((nav) => (
            <div
              className={classNames(
                styles.navigationItem,
                checkIfRouterActive(nav.url) && styles.routerActive
              )}
              key={nav.url}
            >
              <Link href={nav.url}>{nav.label}</Link>

              {checkIfRouterActive(nav.url) && (
                <div className={styles.routerActiveDot} />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
});

export default HeadComponent;
