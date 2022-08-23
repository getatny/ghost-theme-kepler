/* eslint-disable @next/next/no-img-element */
import GhostApi, { getPostContent } from "@/utils/ghost-api";

import { NextPage } from "next";
import { PostOrPage } from "@tryghost/content-api";
import { memo } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/post-page.module.scss";

interface PostOrPageProps {
  content: PostOrPage;
}

const Post: NextPage<PostOrPageProps> = memo(({ content }) => {
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
