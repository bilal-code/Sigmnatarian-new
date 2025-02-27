/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;

// async rewrites() {
//   return [
//     {
//       source: "/api/:path*",
//       destination:
//         "https://sigmantarian-g2-iwyc-7zz6yk0qb-bawdic-soft-s-team.vercel.app/:path*",
//     },
//   ];
// },
