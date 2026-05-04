/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoBasePath = isGithubPages ? "/Enox" : "";

const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? "export" : undefined,
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath || undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: isGithubPages,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBasePath,
  },
};

export default nextConfig;
