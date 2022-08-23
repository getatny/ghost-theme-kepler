import "antd/lib/grid/style/index.css";

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
      <div className={styles.blockBind}>
        <div className={styles.areaTitle}>Posts</div>

        {tags && (
          <div className={styles.categoriesSwitcher}>
            <BlocksAndArrows theme="outline" strokeWidth={4} />

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

      <Row style={{ marginTop: 32 }} gutter={[24, 24]}>
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              className="ant-col ant-col-8"
              style={{ paddingLeft: 12, paddingRight: 12 }}
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
      </Row>
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
