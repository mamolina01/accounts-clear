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
    }
};

export default nextConfig;
