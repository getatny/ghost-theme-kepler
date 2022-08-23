import GhostApi, { getPageContent, getPostContent } from "@/utils/ghost-api";

import { NextPage } from "next";
import { PostOrPage } from "@tryghost/content-api";
import { memo } from "react";

interface PostOrPageProps {
  content: PostOrPage;
}

const Page: NextPage<PostOrPageProps> = memo(({ content }) => {
  return null;
});

export const getStaticPaths = async () => {
  const pages = await GhostApi.pages.browse({
    limit: "all",
  });

  const pagePaths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  // { fallback: false } means posts not found should 404.
  return { paths: pagePaths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const content = await getPageContent(context.params.slug);

  if (!content) {
    return {
      notFound: true,
    };
  }

  return {
    props: { content, key: context.params.slug },
  };
};

export default Page;
