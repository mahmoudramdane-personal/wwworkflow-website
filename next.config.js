/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
};

module.exports = nextConfig
