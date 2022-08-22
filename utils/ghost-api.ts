import GhostContentApi from "@tryghost/content-api";

const GhostApi = new GhostContentApi({
  key: "04d85a23cdbd5d934d2f8042d5",
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

export default GhostApi;
