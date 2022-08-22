import GhostApi, { getPostContent } from "@/utils/ghost-api";

import { memo } from "react";

const Post = memo(() => {
  return null;
});

export const getStaticPaths = async () => {
  const posts = await GhostApi.posts.browse({
    limit: "all",
  });

  // Get the paths we want to create based on posts
  const paths = posts.map((post) => ({
    params: { postSlug: post.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const post = await getPostContent(context.params.postSlug);
  console.log("post content:", post);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, key: context.params.postSlug },
  };
};

export default Post;
