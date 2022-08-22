import { FC, PropsWithChildren, memo, useEffect, useState } from "react";

import Head from "next/head";
import HeadComponent from "@/components/head";
import type { Settings } from "@tryghost/content-api";
import { blogSettingsContext } from "@/utils/context";
import { getSettings } from "@/utils/ghost-api";

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

      {children}
    </blogSettingsContext.Provider>
  );
});

export default LayoutComponent;
