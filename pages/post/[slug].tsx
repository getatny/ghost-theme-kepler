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
            className="w-full h-40 small:h-80 mt-8 small:mt-12 rounded-lg overflow-hidden object-cover object-center shadow-sm"
            key={`feature-img-${content.slug}`}
            layoutId={`feature-img-${content.slug}`}
          />

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
        {content.title}
      </motion.div>

      <motion.div
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
                className="px-3 py-[6px] rounded bg-black/5 text-sm leading-none text-[#5c5c5c]"
                key={tag.id}
              >
                # {tag.name}
              </div>
            ))}
          </div>
        )}

        <div className="text-second">{formatDate(content.published_at!)}</div>
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
