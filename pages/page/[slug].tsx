import { AnimatePresence, motion } from "framer-motion";
/* eslint-disable @next/next/no-img-element */
import GhostApi, { getPageContent, getPostContent } from "@/utils/ghost-api";
import { PauseOne, Performance } from "@icon-park/react";
import { fadeInOutVariants, slideUpDownVariants } from "@/utils/motion-animate";
import { memo, useCallback, useContext, useEffect, useMemo } from "react";

import { MusicStatus } from "hooks/use-music";
import { NextPage } from "next";
import PageLoading from "@/components/page-loading";
import { PostOrPage } from "@tryghost/content-api";
import Script from "next/script";
import { audioPlayerContext } from "@/utils/context";
import classNames from "classnames";
import contentExtractorAndResolver from "@/utils/content-resolver";
import { formatDate } from "@/utils/commons";
import styles from "../../styles/post-page.module.scss";
import { useRouter } from "next/router";

interface PostOrPageProps {
  content: PostOrPage;
}

const Page: NextPage<PostOrPageProps> = memo(({ content }) => {
  const router = useRouter();

  const { setResource, play, status, pause } = useContext(audioPlayerContext);

  const { html, extra: extraParams }: { html: string; extra: any } =
    useMemo(() => {
      return content.html
        ? contentExtractorAndResolver(content.html)
        : {
            html: "",
            extra: {},
          };
    }, [content]);

  const playBackgroundMusic = useCallback(() => {
    if (status === MusicStatus.stop) {
      setResource(extraParams.backgroundMusic.link);
      play();
    } else {
      pause();
    }
  }, [extraParams, setResource, play, status, pause]);

  useEffect(() => {
    (window as any).pangu.spacingElementByClassName("post-content");
  }, []);

  return (
    <AnimatePresence>
      {router.isFallback ? (
        <PageLoading />
      ) : (
        <div key={`content-${content.slug}`}>
          {content.feature_image && (
            <>
              <motion.img
                src={content.feature_image}
                alt="封面"
                className="w-full h-40 hidden small:block small:h-80 mt-8 small:mt-12 rounded-lg overflow-hidden object-cover object-center shadow-sm"
                key={`feature-img-${content.slug}`}
                layoutId={`feature-img-${content.slug}`}
              />

              <div className="block small:hidden h-40 w-full mt-8" />

              <motion.div
                className="w-screen h-[480px] absolute top-0 left-0 -z-[1] after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-gradient-to-t after:from-white after:via-[rgba(255,255,255,0.83)_21.96%] after:backdrop-blur-sm"
                key={`feature-img-bg-${content.slug}`}
              >
                <img
                  src={content.feature_image}
                  alt="封面背景"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </>
          )}

          <motion.div
            key={`content-title-${content.slug}`}
            layoutId={`content-title-${content.slug}`}
            className="mt-12 text-title font-semibold text-[28px]"
          >
            {extraParams.backgroundMusic && (
              <div
                className="absolute text-base text-second px-3 py-2 rounded-sm bg-black/5 -top-4 -translate-y-full flex font-normal items-center space-x-2 leading-none cursor-pointer"
                onClick={playBackgroundMusic}
              >
                {status === MusicStatus.stop ? (
                  <Performance
                    theme="outline"
                    strokeWidth={4}
                    className="text-lg"
                  />
                ) : (
                  <PauseOne
                    theme="outline"
                    strokeWidth={4}
                    className="text-lg"
                  />
                )}
                <span>{extraParams.backgroundMusic.name}</span>
              </div>
            )}
            {content.title}
          </motion.div>

          {/* <motion.div
          className="flex justify-between mt-4"
          key={`content-info-${content.slug}`}
          variants={fadeInOutVariants}
          animate="fadeIn"
          initial="fadeOut"
        >
          {content.tags && content.tags.length > 0 && (
            <div className="flex items-center">
              {content.tags?.map((tag) => (
                <div
                  className="px-3 py-[6px] rounded bg-black/5 text-sm leading-none"
                  key={tag.id}
                >
                  # {tag.name}
                </div>
              ))}
            </div>
          )}
  
          <div className="text-second">{formatDate(content.published_at!)}</div>
        </motion.div> */}

          <motion.div
            className={classNames(styles.contentStyle, "post-content")}
            dangerouslySetInnerHTML={{ __html: html }}
            key={`content-${content.slug}`}
            variants={slideUpDownVariants}
            initial="slideOut"
            animate="slideIn"
            transition={{ bounce: false }}
          />
        </div>
      )}
    </AnimatePresence>
  );
});

export const getStaticPaths = async () => {
  const pages = await GhostApi.pages.browse({
    limit: "all",
  });

  const pagePaths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths: pagePaths, fallback: true };
};

export const getStaticProps = async (context: any) => {
  let content;

  try {
    content = await getPageContent(context.params.slug);
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: { content, key: context.params.slug },
  };
};

export default Page;
