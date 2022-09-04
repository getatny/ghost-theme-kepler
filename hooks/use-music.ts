import { useCallback, useEffect, useState } from "react";

export enum MusicStatus {
  stop,
  playing,
}

const useMusic = () => {
  const [status, setStatus] = useState<MusicStatus>(MusicStatus.stop);
  const [instance, setInstance] = useState<any>();

  const setResource = useCallback(
    (src: string) => {
      instance.src = src;
    },
    [instance]
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
    setResource,
    play,
    pause,
  };
};

export default useMusic;
