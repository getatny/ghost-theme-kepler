import { LoadingFour } from "@icon-park/react";
import { fadeInOutVariants } from "@/utils/motion-animate";
import { memo } from "react";
import { motion } from "framer-motion";

const PageLoading = memo(() => {
  return (
    <motion.div
      className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 z-[100] bg-white"
      variants={fadeInOutVariants}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
    >
      <div>
        <LoadingFour
          theme="filled"
          strokeWidth={4}
          className="animate-spin text-main text-4xl flex justify-center items-center mb-4"
        />
        <div className="text-sm animate-pulse">数据载入中...</div>
      </div>
    </motion.div>
  );
});

export default PageLoading;
