// /** @type {import('next').NextConfig} */
// const NextConfig = {
//     images: {
//      remotePatterns: [
//             {
//                 protocol: 'https', 
//                 hostname: 'cdn.sanity.io',
//                 port: ''
//             }
//         ]
//     }
//  };
// export default NextConfig;

/** @type {import('next').NextConfig} */
const NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', 
                hostname: 'cdn.sanity.io',
                port: ''
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true, // Skip ESLint checks during production builds
    },
};

export default NextConfig;
