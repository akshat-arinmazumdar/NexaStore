const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'i.pravatar.cc'
    ],
    formats: ['image/avif', 'image/webp'],
  }
}
export default nextConfig
