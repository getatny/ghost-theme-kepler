import GhostApi, { getPageContent, getPostContent } from "@/utils/ghost-api";

import { memo } from "react";

const Post = memo(() => {
  return null;
});

export const getStaticPaths = async () => {
  const posts = await GhostApi.posts.browse({
    limit: "all",
  });
  const pages = await GhostApi.pages.browse({
    limit: "all",
  });

  // Get the paths we want to create based on posts
  const postPaths = posts.map((post) => ({
    params: { slug: post.slug, type: "posts" },
  }));

  const pagePaths = pages.map((page) => ({
    params: { slug: page.slug, type: "page" },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths: [...postPaths, ...pagePaths], fallback: false };
};

export const getStaticProps = async (context: any) => {
  const func = context.params.type === "post" ? getPostContent : getPageContent;
  const content = await func(context.params.slug);

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
