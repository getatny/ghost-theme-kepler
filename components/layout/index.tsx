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

        <div className="flex flex-col h-screen overflow-hidden">
          <div>
            <HeadComponent />
          </div>

          <div className="flex-1 overflow-y-auto" id="main-content">
            <div className="flex pt-12 justify-center min-h-website">
              <div className="normal:w-website w-screen small:px-8 px-6">
                {children}
              </div>
            </div>

            <FooterComponent />
          </div>
        </div>
      </blogSettingsContext.Provider>
    );
  }
);

export default LayoutComponent;
