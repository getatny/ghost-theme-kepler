export const fadeInOutVariants = {
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
};

export const bouceInOutVariants = {
  bounceIn: {
    opacity: 1,
    scale: 1,
  },
  bounceOut: {
    opacity: 0,
    scale: 0,
  },
};

export const slideUpDownVariants = {
  slideIn: {
    opacity: 1,
    y: 0,
  },
  slideOut: {
    opacity: 0,
    y: 100,
  },
};

export const slideInOutVariants = {
  slideIn: {
    opacity: 1,
    x: 0,
  },
  slideOut: {
    opacity: 0,
    x: "100vw",
  },
};

export const sidebar = {
  open: {
    clipPath: `circle(calc(100vh * 2) at calc(100vw - 36px) 32px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(0px at calc(100vw - 36px) 32px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
