import { AnimatePresence, motion } from "framer-motion";
import { Col, Row } from "antd";
import GhostApi, { getTags } from "../utils/ghost-api";
import type { Pagination, PostsOrPages, Tags } from "@tryghost/content-api";
import { useMemo, useState } from "react";

import { BlocksAndArrows } from "@icon-park/react";
import type { NextPage } from "next";
import PostCard from "@/components/post-card";
import { bouceInOutVariants } from "@/utils/motion-animate";
import classNames from "classnames";
import styles from "../styles/index.module.scss";

const Home: NextPage<{
  normalPosts: PostsOrPages;
  featuredPosts: PostsOrPages;
  pagination: Pagination;
  tags: Tags;
}> = (props) => {
  const { normalPosts, featuredPosts, pagination, tags } = props;
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    return normalPosts.filter((post) =>
      selectedTag === "all"
        ? true
        : post.tags &&
          post.tags.findIndex((tag) => tag.slug === selectedTag) > -1
    );
  }, [normalPosts, selectedTag]);

  return (
    <>
      <div className="relative">
        <div className="text-lg leading-none relative font-semibold inline-block z-[1] after:content-[''] after:w-full after:h-1 after:absolute after:bottom-0 after:left-0 after:bg-main after:-z-[1] after:rounded-[1]">
          Posts
        </div>

        {tags && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-second flex items-center">
            <BlocksAndArrows
              theme="outline"
              strokeWidth={4}
              className="flex text-main mr-3"
            />

            <div
              className={classNames(
                styles.tag,
                selectedTag === "all" && styles.active
              )}
              onClick={() => setSelectedTag("all")}
            >
              All
            </div>

            {tags.map((tag) => (
              <div
                className={classNames(
                  styles.tag,
                  selectedTag === tag.slug && styles.active
                )}
                onClick={() => setSelectedTag(tag.slug)}
                key={tag.id}
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={bouceInOutVariants}
              initial="bounceOut"
              animate="bounceIn"
              exit="bounceOut"
            >
              <PostCard postInfo={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const normalPosts = await GhostApi.posts.browse({
    limit: 9,
    include: ["tags"],
    filter: "featured:false",
  });

  const featuredPosts = await GhostApi.posts.browse({
    limit: 4,
    filter: "featured:true",
  });

  const pagination = featuredPosts.meta.pagination;

  const tags = await getTags();

  if (!normalPosts && !featuredPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { normalPosts, featuredPosts, pagination, tags, key: "index" },
  };
};

export default Home;
