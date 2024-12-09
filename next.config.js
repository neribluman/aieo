/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
=======
  swcMinify: true,
>>>>>>> 5b330cb2faa91f2e16c2bb0a9db1273cc37bcc17
}

module.exports = nextConfig 