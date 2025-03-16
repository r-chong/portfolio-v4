// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: '/experience',
                destination: '/resume',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
