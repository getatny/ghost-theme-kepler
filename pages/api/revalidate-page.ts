import type { NextApiRequest, NextApiResponse } from "next";

import LocalConfig from "../../.env.local.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("收到 webhook 请求：", req.body);

  const currentSlug = req.body.page.current?.slug;
  const previousSlug = req.body.page.previous?.slug;

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== LocalConfig.key) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate("/");
    currentSlug && (await res.revalidate("/page/" + currentSlug));
    previousSlug && (await res.revalidate("/page/" + previousSlug));

    return res.json({
      success: true,
      message:
        "Index and Post named " +
        req.body.page.current.slug +
        " generated successfully!",
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
