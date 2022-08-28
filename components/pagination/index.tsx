import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useCallback, useState } from "react";
import { MoreOne, Rotation } from "@icon-park/react";
import {
  Pagination as PaginationType,
  PostOrPage,
} from "@tryghost/content-api";

import GhostApi from "@/utils/ghost-api";
import { fadeInOutVariants } from "@/utils/motion-animate";

interface PaginationProps {
  initInfo: PaginationType;
  onPostsLoaded?: (posts: PostOrPage[]) => void;
}

const PaginationComponent: FC<PaginationProps> = memo(
  ({ initInfo, onPostsLoaded }) => {
    const [pagination, setPagination] = useState<PaginationType>(initInfo);
    const [loading, setLoading] = useState<boolean>(false);

    const loadMorePosts = useCallback(async () => {
      setLoading(true);

      const morePosts = await GhostApi.posts.browse({
        limit: 9,
        include: ["tags"],
        filter: "featured:false",
        page: pagination.next!,
      });

      setPagination(morePosts.meta.pagination);
      setLoading(false);
      onPostsLoaded?.(morePosts);
    }, [onPostsLoaded, pagination]);

    return (
      <AnimatePresence>
        {pagination.next ? (
          <motion.div
            className="mt-12 flex justify-center"
            variants={fadeInOutVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            key="pagination"
          >
            <div
              className="flex justify-center items-center border border-main rounded-full text-sm leading-none space-x-1 text-main cursor-pointer w-[108px] h-8"
              onClick={loadMorePosts}
            >
              {loading ? (
                <Rotation
                  theme="outline"
                  strokeWidth={4}
                  className="animate-spin"
                />
              ) : (
                <MoreOne theme="outline" strokeWidth={4} />
              )}
              <span>{loading ? "载入中..." : "加载更多"}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }
);

export default PaginationComponent;
