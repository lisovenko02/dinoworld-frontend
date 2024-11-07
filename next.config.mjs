/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-service.zaonce.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dinoworld.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
