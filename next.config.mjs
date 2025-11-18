/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'i.annihil.us',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'rickandmortyapi.com',
                pathname: '/api/character/avatar/**',
            },
        ],
    },
};

export default nextConfig;
