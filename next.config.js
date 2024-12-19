/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:8000/api/:path*/`,
      },
      {
        source: '/covers/:path*',
        destination: `http://localhost:8000/covers/:path*/`,
      }
    ]
  }
}

module.exports = nextConfig
