/* eslint-disable @next/next/no-img-element */
import { FC, memo, useMemo } from "react";
import { formatDate, getRandomGradientColor, urlFormat } from "@/utils/commons";

import { PostOrPage } from "@tryghost/content-api";
import { motion } from "framer-motion";
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
    <motion.div
      className="cursor-pointer "
      onClick={() => router.push(urlFormat("post", postInfo.slug))}
      layout
    >
      {postInfo.feature_image ? (
        <motion.img
          src={postInfo.feature_image}
          alt={postInfo.title + " - 封面"}
          className={styles.featureImgBlock}
          key={`feature-img-${postInfo.slug}`}
          layoutId={`feature-img-${postInfo.slug}`}
        />
      ) : (
        <motion.div
          className={styles.featureImgBlock}
          style={{ background: bgColor }}
        >
          <div className={styles.noFeatureImgBlockText}>
            {[...postInfo.title?.slice(0, 4)!].map((word, index) => (
              <span key={`${word}${index}`}>{word}</span>
            ))}
          </div>
        </motion.div>
      )}

      <div
        className="text-text px-2 h-12 w-full block text-base mt-4"
        key={`content-title-${postInfo.slug}`}
      >
        {postInfo.title}
      </div>
      <div className="text-text px-2 text-sm mt-2">
        {formatDate(postInfo.published_at!)}
      </div>
    </motion.div>
  );
});

export default PostCard;
