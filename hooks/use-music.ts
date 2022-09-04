import { useCallback, useEffect, useState } from "react";

export enum MusicStatus {
  stop,
  playing,
}

const useMusic = () => {
  const [status, setStatus] = useState<MusicStatus>(MusicStatus.stop);
  const [instance, setInstance] = useState<any>();
  const [resouce, setResource] = useState<string>();

  const _setResource = useCallback(
    (src: string) => {
      instance.src = src;
      setResource(src);
    },
    [instance]
  );

  const isCurrent = useCallback(
    (src: string) => {
      return resouce === src;
    },
    [resouce]
  );

  const play = useCallback(() => {
    instance.play();
    setStatus(MusicStatus.playing);
  }, [instance]);

  const pause = useCallback(() => {
    instance.pause();
    setStatus(MusicStatus.stop);
  }, [instance]);

  useEffect(() => {
    if (!instance) {
      const audio = new Audio();
      setInstance(audio);

      audio.onended = () => {
        console.log("音乐结束");
        setStatus(MusicStatus.stop);
      };
    }
  }, [instance]);

  return {
    status,
    setResource: _setResource,
    play,
    pause,
    isCurrent,
  };
};

export default useMusic;
