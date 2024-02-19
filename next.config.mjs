/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      // domains: ['api.unchiudaanclasses.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.unchiudaanclasses.com',
          pathname: '**',
        },
      ],
    },
};

export default nextConfig;

