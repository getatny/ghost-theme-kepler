import GhostContentApi from "@tryghost/content-api";

const GhostApi = new GhostContentApi({
  key: "4f01ea0e961248ab496eaeaf03",
  url: "http://localhost:2368",
  version: "v5.0",
});

export const getSettings = async () => {
  return await GhostApi.settings.browse();
};

export const getPostContent = async (slug: string) => {
  return await GhostApi.posts.read(
    {
      slug,
    },
    {
      include: ["tags"],
    }
  );
};

export const getPageContent = async (slug: string) => {
  return await GhostApi.pages.read(
    {
      slug,
    },
    {
      include: ["tags"],
    }
  );
};

export const getTags = async () => {
  return await GhostApi.tags.browse({
    include: "count.posts",
    filter: "visibility:public",
    order: "count.posts DESC",
  });
};

export default GhostApi;
