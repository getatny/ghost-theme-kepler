import "highlight.js/styles/atom-one-dark.css";

import { AnimatePresence, motion } from "framer-motion";
/* eslint-disable @next/next/no-img-element */
import GhostApi, { getPostContent } from "@/utils/ghost-api";
import { fadeInOutVariants, slideUpDownVariants } from "@/utils/motion-animate";
import { memo, useEffect } from "react";

import { NextPage } from "next";
import PageLoading from "@/components/page-loading";
import { PostOrPage } from "@tryghost/content-api";
import Toc from "tocbot";
import classNames from "classnames";
import { formatDate } from "@/utils/commons";
import hljs from "highlight.js";
import styles from "../../styles/post-page.module.scss";
import { useRouter } from "next/router";

interface PostOrPageProps {
  content: PostOrPage;
}

const Post: NextPage<PostOrPageProps> = memo(({ content }) => {
  const router = useRouter();

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

    // 保证页面进入时在顶部
    document.body.scroll({ top: 0 });
  }, []);

  useEffect(() => {
    // 代码高亮
    if (content.html?.indexOf("pre")) {
      document.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightBlock(block);
      });
    }
  }, [content]);

  return (
    <AnimatePresence>
      {router.isFallback ? (
        <PageLoading />
      ) : (
        <div key={`content-${content.slug}`} className="w-full">
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

          <div
            key={`content-title-${content.slug}`}
            className="mt-12 text-title font-semibold text-[28px]"
          >
            {content.title}
          </div>

          <motion.div
            className="flex justify-between mt-4 flex-wrap items-center"
            key={`content-info-${content.slug}`}
            variants={fadeInOutVariants}
            animate="fadeIn"
            initial="fadeOut"
          >
            {content.tags && content.tags.length > 0 && (
              <div className="flex items-center space-x-4 mb-4">
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

            <div className="text-second mb-4">
              {formatDate(content.published_at!)}
            </div>
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
      )}
    </AnimatePresence>
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
  return { paths: postPaths, fallback: true };
};

export const getStaticProps = async (context: any) => {
  let content;
  const slug = context.params.slug;

  try {
    content = await getPostContent(slug);
    console.log("generate post: ", slug, content);
  } catch (e) {
    console.error("generate post: ", slug, "failed");

    return {
      notFound: true,
    };
  }

  return {
    props: { content, key: slug },
  };
};

export default Post;
