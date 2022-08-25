import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useCallback, useContext } from "react";

import Link from "next/link";
import { blogSettingsContext } from "@/utils/context";
import classNames from "classnames";
import { fadeInOutVariants } from "@/utils/motion-animate";
import { urlFormat } from "@/utils/commons";
import { useRouter } from "next/router";

const HeadComponent: FC = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  const router = useRouter();

  const checkIfRouterActive = useCallback(
    (targetRouter: string) => {
      const reg = new RegExp(`^/?(post|page)?${targetRouter}?$`);
      return reg.test(router.asPath);
    },
    [router]
  );

  return (
    <motion.header
      className="w-full h-16 bg-white/[.86] backdrop-blur-sm flex justify-center fixed top-0 left-0 border-b border-solid border-black/5 shadow-sm"
      key="header"
    >
      <div className="w-website h-auto flex justify-between items-center">
        {blogSettings.logo ? (
          <picture onClick={() => router.push("/")}>
            <source srcSet={blogSettings.logo} type="image/png" />
            <img
              src={blogSettings.logo}
              alt="Logo"
              className="h-[30px] cursor-pointer"
            />
          </picture>
        ) : null}

        <div className="flex items-center space-x-6">
          {blogSettings.navigation?.map((nav) => (
            <motion.div
              className={classNames(
                "relative text-base",
                checkIfRouterActive(nav.url) && "font-semibold text-title"
              )}
              key={nav.url}
              layout
            >
              <Link href={urlFormat("page", nav.url)}>
                <a className="text-text">{nav.label}</a>
              </Link>

              <AnimatePresence>
                {checkIfRouterActive(nav.url) && (
                  <motion.div
                    className="w-1.5 h-1.5 absolute -bottom-2 bg-main left-1/2 -mr-[3px] rounded-full"
                    variants={fadeInOutVariants}
                    initial="fadeOut"
                    animate="fadeIn"
                    exit="fadeOut"
                    key="router-active-dot"
                    layoutId="router-active-dot"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.header>
  );
});

export default HeadComponent;
