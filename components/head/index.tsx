/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import { Close, HamburgerButton } from "@icon-park/react";
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import {
  fadeInOutVariants,
  sidebar,
  slideInOutVariants,
} from "@/utils/motion-animate";

import Link from "next/link";
import { blogSettingsContext } from "@/utils/context";
import classNames from "classnames";
import { urlFormat } from "@/utils/commons";
import { useRouter } from "next/router";

const HeadComponent: FC = memo(() => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const blogSettings = useContext(blogSettingsContext);
  const router = useRouter();

  const checkIfRouterActive = useCallback(
    (targetRouter: string) => {
      const reg = new RegExp(`^/?(post|page)?${targetRouter}?$`);
      return reg.test(router.asPath);
    },
    [router]
  );

  useEffect(() => {
    if (menuOpened) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "100%";
      document.body.style.overflow = "auto";
    }
  }, [menuOpened]);

  useEffect(() => {
    setMenuOpened(false);
  }, [router]);

  return (
    <>
      <header
        className="w-full h-16 bg-white/[.86] backdrop-blur-sm flex justify-center z-30 border-b border-solid border-black/5 shadow-sm"
        key="header"
      >
        <div className="w-website small:px-8 px-6 h-auto flex justify-between items-center">
          {blogSettings.logo ? (
            <motion.img
              src={blogSettings.logo}
              alt="Logo"
              className="h-[30px] cursor-pointer"
              onClick={() => router.push("/")}
              layoutId="header-logo"
            />
          ) : null}

          <div className="hidden small:flex items-center space-x-6">
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

          <div
            className="flex small:hidden items-center text-2xl leading-none text-title cursor-pointer absolute top-5 right-6 small:right-8 z-50"
            onClick={() => setMenuOpened((menuOpened) => !menuOpened)}
          >
            <HamburgerButton theme="filled" strokeWidth={4} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpened && (
          <motion.div
            className="fixed w-screen h-screen top-0 left-0 z-40 flex items-center justify-center  small:hidden bg-white"
            key="mobile-navigation-panel"
            initial="slideOut"
            animate="slideIn"
            exit="slideOut"
            variants={slideInOutVariants}
            transition={{ bounce: false }}
          >
            <div
              className="flex small:hidden items-center text-2xl leading-none text-title cursor-pointer absolute top-5 right-6 small:right-8 z-50"
              onClick={() => setMenuOpened((menuOpened) => !menuOpened)}
            >
              <Close theme="filled" strokeWidth={4} />
            </div>

            <motion.img
              src={blogSettings.logo}
              alt="Logo"
              className="h-10 absolute top-[88px]"
              layoutId="header-logo"
            />

            <div className="flex justify-center items-center flex-col space-y-6">
              {blogSettings.navigation?.map((nav) => (
                <Link href={urlFormat("page", nav.url)} key={nav.url}>
                  <a
                    className={classNames(
                      "text-text text-xl w-40 h-10 text-center leading-[40px] rounded-full active:bg-main active:text-white",
                      checkIfRouterActive(nav.url) && "bg-black/5"
                    )}
                  >
                    {nav.label}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default HeadComponent;
