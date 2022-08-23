import { memo, useContext } from "react";

import { blogSettingsContext } from "@/utils/context";
import styles from "./index.module.scss";

const FooterComponent = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <picture>
          <source srcSet={blogSettings.logo} type="image/png" />
          <img src={blogSettings.logo} alt="Logo" className={styles.logo} />
        </picture>
      </div>

      <div className={styles.blogDescription}>{blogSettings.description}</div>
      <div className={styles.extraInfos}>2022 ©️ Matthew Wang</div>
    </footer>
  );
});

export default FooterComponent;
