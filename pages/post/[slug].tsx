/* eslint-disable @next/next/no-img-element */
import GhostApi, { getPostContent } from "@/utils/ghost-api";
import { fadeInOutVariants, slideUpDownVariants } from "@/utils/motion-animate";
import { memo, useEffect } from "react";

import { NextPage } from "next";
import { PostOrPage } from "@tryghost/content-api";
import Script from "next/script";
import Toc from "tocbot";
import classNames from "classnames";
import { formatDate } from "@/utils/commons";
import { motion } from "framer-motion";
import styles from "../../styles/post-page.module.scss";

interface PostOrPageProps {
  content: PostOrPage;
}

const Post: NextPage<PostOrPageProps> = memo(({ content }) => {
  useEffect(() => {
    // 初始化盘古之白
    (window as any).pangu?.spacingElementByClassName("post-content");

    // 初始化 Toc 插件
    Toc.init({
      // Where to render the table of contents.
      tocSelector: ".post-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".post-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
      headingsOffset: 112,
      scrollSmoothOffset: -112,
    });
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

      <motion.div
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
      </motion.div>

      <motion.div
        className={classNames(styles.contentStyle, "post-content")}
        dangerouslySetInnerHTML={{ __html: content.html! }}
        key={`content-${content.slug}`}
        variants={slideUpDownVariants}
        initial="slideOut"
        animate="slideIn"
        transition={{ bounce: false }}
      />

      <div className="post-toc"></div>
    </div>
  );
});

export const getStaticPaths = async () => {
  const posts = await GhostApi.posts.browse({
    limit: "all",
  });

  // Get the paths we want to create based on posts
  const postPaths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths: postPaths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const content = await getPostContent(context.params.slug);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: { content, key: context.params.slug },
  };
};

export default Post;
