import { FC, PropsWithChildren, memo, useEffect, useState } from "react";
import { audioPlayerContext, blogSettingsContext } from "@/utils/context";

import FooterComponent from "../footer";
import Head from "next/head";
import HeadComponent from "@/components/head";
import Script from "next/script";
import type { Settings } from "@tryghost/content-api";
import { getSettings } from "@/utils/ghost-api";
import styles from "./layout.module.scss";
import useMusic from "hooks/use-music";

interface LayoutComponentProps {
  pageKey: string;
}

const LayoutComponent: FC<PropsWithChildren<LayoutComponentProps>> = memo(
  ({ children }) => {
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [blogSettings, setBlogSettings] = useState<Settings>({});

    const musicPlayer = useMusic();

    useEffect(() => {
      (async () => {
        const blogSettings = await getSettings();
        setBlogSettings(blogSettings);
      })();
    }, []);

    return (
      <audioPlayerContext.Provider value={musicPlayer}>
        <blogSettingsContext.Provider value={blogSettings}>
          <Head>
            <title key="blog-title">{blogSettings?.title || "加载中..."}</title>
          </Head>

          <HeadComponent />

          <div className="flex pt-[116px] justify-center min-h-website">
            <div className="normal:w-website w-screen small:px-8 px-6">
              {children}
            </div>
          </div>

          <FooterComponent />
        </blogSettingsContext.Provider>
      </audioPlayerContext.Provider>
    );
  }
);

export default LayoutComponent;
