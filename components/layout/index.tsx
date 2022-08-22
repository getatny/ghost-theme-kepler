import { FC, PropsWithChildren, memo, useEffect, useState } from "react";

import Head from "next/head";
import HeadComponent from "@/components/head";
import type { Settings } from "@tryghost/content-api";
import { blogSettingsContext } from "@/utils/context";
import { getSettings } from "@/utils/ghost-api";
import styles from "./layout.module.scss";

const LayoutComponent: FC<PropsWithChildren> = memo(({ children }) => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [blogSettings, setBlogSettings] = useState<Settings>({});

  useEffect(() => {
    (async () => {
      const blogSettings = await getSettings();
      setBlogSettings(blogSettings);
    })();
  }, []);

  return (
    <blogSettingsContext.Provider value={blogSettings}>
      <Head>
        <title key="blog-title">{blogSettings?.title || "加载中..."}</title>
      </Head>

      <HeadComponent />

      <div className={styles.mainWrapper}>
        <div className={styles.content}>{children}</div>
      </div>
    </blogSettingsContext.Provider>
  );
});

export default LayoutComponent;
