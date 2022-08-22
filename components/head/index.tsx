import { FC, memo, useContext } from "react";

import { blogSettingsContext } from "@/utils/context";
import styles from "./index.module.scss";

const HeadComponent: FC = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {blogSettings.logo ? (
          <picture>
            <source srcSet={blogSettings.logo} type="image/png" />
            <img src={blogSettings.logo} alt="Logo" className={styles.logo} />
          </picture>
        ) : null}

        <div className="header-page-pagination"></div>
      </div>
    </header>
  );
});

export default HeadComponent;
