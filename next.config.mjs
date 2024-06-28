/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/hot',
                destination: '/',
                permanent: true
            },
            {
                source: '/en/hot',
                destination: '/',
                permanent: true
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
