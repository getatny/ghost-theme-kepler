import "antd/lib/grid/style/index.css";

import { Col, Row } from "antd";
import type { Pagination, PostsOrPages } from "@tryghost/content-api";

import GhostApi from "../utils/ghost-api";
import type { NextPage } from "next";
import styles from "../styles/index-page.module.scss";

const Home: NextPage<{
  normalPosts: PostsOrPages;
  featuredPosts: PostsOrPages;
  pagination: Pagination;
}> = (props) => {
  const { normalPosts, featuredPosts, pagination } = props;

  return (
    <>
      <div className={styles.areaTitle}>Posts</div>

      <Row style={{ marginTop: 32 }}>
        {normalPosts.map((post) => (
          <Col span={8} key={post.slug}>
            {post.feature_image && (
              <picture>
                <source srcSet={post.feature_image} />
                <img
                  src={post.feature_image}
                  alt={post.title + " - 封面"}
                  className={styles.featureImg}
                />
              </picture>
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

export const getStaticProps = async () => {
  const normalPosts = await GhostApi.posts.browse({
    limit: 9,
    filter: "featured:false",
  });

  const featuredPosts = await GhostApi.posts.browse({
    limit: 4,
    filter: "featured:true",
  });

  const pagination = featuredPosts.meta.pagination;

  if (!normalPosts && !featuredPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { normalPosts, featuredPosts, pagination, key: "index" },
  };
};

export default Home;
