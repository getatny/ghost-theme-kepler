/* eslint-disable @next/next/no-img-element */
import GhostApi, { getPageContent, getPostContent } from "@/utils/ghost-api";
import { fadeInOutVariants, slideUpDownVariants } from "@/utils/motion-animate";
import { memo, useEffect } from "react";

import { NextPage } from "next";
import { PostOrPage } from "@tryghost/content-api";
import Script from "next/script";
import classNames from "classnames";
import { formatDate } from "@/utils/commons";
import { motion } from "framer-motion";
import styles from "../../styles/post-page.module.scss";

interface PostOrPageProps {
  content: PostOrPage;
}

const Page: NextPage<PostOrPageProps> = memo(({ content }) => {
  useEffect(() => {
    (window as any).pangu.spacingElementByClassName("post-content");
  }, []);

  return (
    <div key={`content-${content.slug}`}>
      {content.feature_image && (
        <>
          <motion.img
            src={content.feature_image}
            alt="封面"
            className={styles.featureImg}
            key={`feature-img-${content.slug}`}
            layoutId={`feature-img-${content.slug}`}
          />

          <motion.div
            className={styles.featureImgBg}
            key={`feature-img-bg-${content.slug}`}
          >
            <img src={content.feature_image} alt="封面背景" />
          </motion.div>
        </>
      )}

      <motion.div
        key={`content-title-${content.slug}`}
        layoutId={`content-title-${content.slug}`}
        className={styles.title}
      >
        {content.title}
      </motion.div>

      {/* <motion.div
        className={styles.contentInfo}
        key={`content-info-${content.slug}`}
        variants={fadeInOutVariants}
        animate="fadeIn"
        initial="fadeOut"
      >
        {content.tags && content.tags.length > 0 && (
          <div className={styles.tags}>
            {content.tags?.map((tag) => (
              <div className={styles.tag} key={tag.id}>
                # {tag.name}
              </div>
            ))}
          </div>
        )}

        <div className={styles.time}>{formatDate(content.published_at!)}</div>
      </motion.div> */}

      <motion.div
        className={classNames(styles.contentStyle, "post-content")}
        dangerouslySetInnerHTML={{ __html: content.html! }}
        key={`content-${content.slug}`}
        variants={slideUpDownVariants}
        initial="slideOut"
        animate="slideIn"
        transition={{ bounce: false }}
      />
    </div>
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
  return { paths: pagePaths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const content = await getPageContent(context.params.slug);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: { content, key: context.params.slug },
  };
};

export default Page;
