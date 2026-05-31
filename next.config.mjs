/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Nackte Domain -> Standardsprache, damit "/" nie ins Leere läuft.
      { source: "/", destination: "/de", permanent: false },
    ];
  },
};

export default nextConfig;
