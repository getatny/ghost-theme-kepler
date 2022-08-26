import { memo, useContext } from "react";

import { blogSettingsContext } from "@/utils/context";
import styles from "./index.module.scss";

const FooterComponent = memo(() => {
  const blogSettings = useContext(blogSettingsContext);

  return (
    <footer className="py-6 flex justify-center items-center bg-black/5 mt-12 flex-col">
      <div className="h-11">
        <picture>
          <source srcSet={blogSettings.logo} type="image/png" />
          <img src={blogSettings.logo} alt="Logo" className="h-10" />
        </picture>
      </div>

      <div className="text-sm font-semibold text-text mt-4">
        {blogSettings.description}
      </div>
      <div className="text-xs text-text mt-1">2022 ©️ Matthew Wang</div>
    </footer>
  );
});

export default FooterComponent;
