const backgroundMusic = (content: string, extra: any) => {
  const musicReg =
    /<p>\[music:(?<musicLink>\S+)?\](?<musicName>\S+)?\[\/music\]<\/p>/g;
  let backgroundMusic = null;

  const extraParam = musicReg.exec(content);

  if (extraParam) {
    backgroundMusic = {
      link: extraParam.groups!.musicLink,
      name: extraParam.groups!.musicName,
    };
  }

  content = content.replace(musicReg, "");
  extra = {
    ...extra,
    backgroundMusic,
  };

  return {
    content,
    extra,
  };
};

const contentExtractorAndResolver = (content: string) => {
  let finalContent = content;
  let extra = {};

  const res = backgroundMusic(finalContent, extra);
  finalContent = res.content;
  extra = res.extra;

  return {
    html: finalContent,
    extra,
  };
};

export default contentExtractorAndResolver;
