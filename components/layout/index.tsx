import { FC, PropsWithChildren, memo, useEffect, useState } from "react";

import FooterComponent from "../footer";
import Head from "next/head";
import HeadComponent from "@/components/head";
import Script from "next/script";
import type { Settings } from "@tryghost/content-api";
import { blogSettingsContext } from "@/utils/context";
import { getSettings } from "@/utils/ghost-api";
import styles from "./layout.module.scss";

interface LayoutComponentProps {
  pageKey: string;
}

const LayoutComponent: FC<PropsWithChildren<LayoutComponentProps>> = memo(
  ({ children }) => {
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

        <div className="pt-[112px] flex justify-center min-h-website">
          <div className="w-website">{children}</div>
        </div>

        <FooterComponent />
      </blogSettingsContext.Provider>
    );
  }
);

export default LayoutComponent;
