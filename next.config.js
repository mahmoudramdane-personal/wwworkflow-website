/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['fakestoreapi.com', 'source.unsplash.com', 'picsum.photos', 'dummyimage.com']
  }
}

module.exports = nextConfig
