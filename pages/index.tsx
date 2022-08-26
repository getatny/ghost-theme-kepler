import { AnimatePresence, m, motion } from "framer-motion";
import { Col, Row } from "antd";
import GhostApi, { getTags } from "../utils/ghost-api";
import type {
  Pagination,
  PostOrPage,
  PostsOrPages,
  Tags,
} from "@tryghost/content-api";
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
}> = ({ normalPosts, featuredPosts, pagination, tags }) => {
  const [allPosts, setAllPosts] = useState<PostsOrPages>(normalPosts);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const extendTags = useMemo(() => {
    return tags
      ? [
          {
            id: "all",
            slug: "all",
            name: "All",
          },
          ...tags,
        ]
      : undefined;
  }, [tags]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) =>
      selectedTag === "all"
        ? true
        : (post.tags?.findIndex((tag) => tag.slug === selectedTag) ?? -1) > -1
    );
  }, [allPosts, selectedTag]);

  return (
    <>
      <div className="relative">
        <div className="text-lg leading-none relative font-semibold inline-block z-[1] after:content-[''] after:w-full after:h-1 after:absolute after:bottom-0 after:left-0 after:bg-main after:-z-[1] after:rounded-[1]">
          Posts
        </div>

        {extendTags && (
          <div className="absolute top-1/2 right-0 small:right-1/2 small:translate-x-1/2 -translate-y-1/2 text-sm text-second flex items-center">
            <BlocksAndArrows
              theme="outline"
              strokeWidth={4}
              className="flex text-main mr-3"
            />

            {extendTags.map((tag) => (
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

      <div className="grid gap-6 mt-8 small:grid-cols-2 normal:grid-cols-3">
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
