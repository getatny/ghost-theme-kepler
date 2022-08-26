/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost", "blog.matthew-wang", "blog-admin.matthew-wang.com"],
  },
};

module.exports = nextConfig;
