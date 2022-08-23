import { FC, memo, useMemo } from "react";
import { formatDate, getRandomGradientColor } from "@/utils/commons";

import { PostOrPage } from "@tryghost/content-api";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

interface PostCardProps {
  postInfo: PostOrPage;
}

const PostCard: FC<PostCardProps> = memo(({ postInfo }) => {
  const router = useRouter();

  const bgColor = useMemo(() => {
    return getRandomGradientColor();
  }, []);

  return (
    <div
      className={styles.postItem}
      onClick={() => router.push(postInfo.slug)}
    >
      {postInfo.feature_image ? (
        <picture>
          <source srcSet={postInfo.feature_image} />
          <img
            src={postInfo.feature_image}
            alt={postInfo.title + " - 封面"}
            className={styles.featureImgBlock}
          />
        </picture>
      ) : (
        <div className={styles.featureImgBlock} style={{ background: bgColor }}>
          <div className={styles.noFeatureImgBlockText}>
            {[...postInfo.title?.slice(0, 4)!].map((word, index) => (
              <span key={`${word}${index}`}>{word}</span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.postTitle}>{postInfo.title}</div>
      <div className={styles.time}>
        {formatDate(postInfo.published_at || "")}
      </div>
    </div>
  );
});

export default PostCard;
