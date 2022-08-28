/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { Left, Right } from "@icon-park/react";

import { PostOrPage } from "@tryghost/content-api";
import { fadeInOutVariants } from "@/utils/motion-animate";
import { urlFormat } from "@/utils/commons";
import { useRouter } from "next/router";
import { wrap } from "popmotion";

interface FeatureBoxProps {
  posts?: PostOrPage[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const FeatureBox: FC<FeatureBoxProps> = memo(({ posts }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  const router = useRouter();

  const imageIndex = useMemo(() => {
    return posts ? wrap(0, posts.length, page) : 0;
  }, [posts, page]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  return (
    <AnimatePresence>
      {posts ? (
        <motion.div className="mb-12">
          <div className="text-lg leading-none relative font-semibold inline-block z-[1] after:content-[''] after:w-full after:h-1 after:absolute after:bottom-0 after:left-0 after:bg-main after:-z-[1] after:rounded-[1] mb-8">
            Featured
          </div>

          <div className="w-full h-[180px] small:h-[260px] rounded-lg overflow-hidden flex relative">
            <div
              className="flex-1 h-full cursor-pointer"
              onClick={() =>
                router.push(urlFormat("post", posts[imageIndex]!.slug))
              }
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  src={posts[imageIndex]!.feature_image!}
                  className="w-full h-full object-cover object-center absolute z-0 rounded-lg"
                  alt={`文章 ${posts[imageIndex]!.title} 封面`}
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                />
              </AnimatePresence>

              <div className="w-full h-1/3 bg-gradient-to-t from-black via-[rgba(0,0,0,0.6)_64%] absolute bottom-0 left-0 z-10" />
              <motion.div
                className="w-full px-6 absolute z-20 bottom-4 left-0 text-white text-lg font-semibold"
                key={`feature-post-title-${posts[imageIndex]!.slug}`}
                variants={fadeInOutVariants}
                initial="fadeOut"
                animate="fadeIn"
                exit="fadeOut"
              >
                {posts[imageIndex]!.title}
              </motion.div>
            </div>

            {posts.length > 1 && (
              <div
                className="absolute top-1/2 left-4 -mt-3 w-6 h-6 rounded-full bg-white justify-center items-center shadow-md z-10 hidden small:flex cursor-pointer"
                onClick={() => paginate(-1)}
              >
                <Left theme="outline" />
              </div>
            )}

            {posts.length > 1 && (
              <div
                className="absolute top-1/2 right-4 -mt-3 w-6 h-6 rounded-full bg-white justify-center items-center shadow-md z-10 hidden small:flex cursor-pointer"
                onClick={() => paginate(1)}
              >
                <Right theme="outline" />
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

export default FeatureBox;
