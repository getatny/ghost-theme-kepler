import GhostContentApi from "@tryghost/content-api";
import LocalConfig from "../.env.local.json";

const GhostApi = new GhostContentApi({
  key: LocalConfig.key,
  url: LocalConfig.url,
  version: LocalConfig.version as any,
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
