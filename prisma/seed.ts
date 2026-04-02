// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()

  const products = [
    {
      name: 'Nexus AI Article Generator',
      slug: 'nexus-ai-article-generator',
      description: 'Generate high-quality SEO optimized articles in seconds using advanced AI models.',
      longDesc: 'Our Nexus AI Article Generator is built on top of the latest LLMs to ensure your content is not only grammatically perfect but also highly engaging and optimized for search engines. It comes with automatic keyword insertion, plagiarism checking, and multiple language support.',
      category: 'AI_MODEL',
      price: 49.99,
      originalPrice: 99.99,
      images: ['/images/products/ai-article.png', '/images/products/ai-article-2.png'],
      demoUrl: 'https://demo.nexastore.com/nexus-ai',
      videoUrl: 'https://youtube.com/watch?v=demo',
      features: ['SEO Optimization', 'Multi-language', 'Plagiarism Check', 'Auto-formatting'],
      techStack: ['Python', 'FastAPI', 'React', 'OpenAI'],
      whatYouGet: ['Source Code', 'Deployment Guide', '1 Year Updates'],
      accessLink: 'https://github.com/nexastore/nexus-ai',
      isFeatured: true,
      isActive: true,
      rating: 4.8,
      totalSales: 1250,
      totalReviews: 86,
      badge: 'Bestseller'
    },
    {
      name: 'FitTrack Pro Mobile App',
      slug: 'fittrack-pro',
      description: 'A comprehensive fitness tracking mobile app template built with React Native.',
      longDesc: 'Start your own fitness business with FitTrack Pro. Features include workout logging, meal planning, progress tracking, and social sharing. Fully customizable and ready to deploy to both iOS and Android stores.',
      category: 'MOBILE_APP',
      price: 129.00,
      originalPrice: 199.00,
      images: ['/images/products/fittrack-1.png'],
      demoUrl: 'https://expo.io/@nexastore/fittrack',
      features: ['Workout Logging', 'Diet Tracking', 'Social Feed', 'Push Notifications'],
      techStack: ['React Native', 'Expo', 'Firebase', 'Redux'],
      whatYouGet: ['App Source Code', 'Firebase Rules', 'Figma Design', 'Docs'],
      accessLink: 'https://github.com/nexastore/fittrack-pro',
      isFeatured: true,
      isActive: true,
      rating: 4.6,
      totalSales: 840,
      totalReviews: 42,
      badge: 'Popular'
    },
    {
      name: 'E-commerce UI Kit Pro',
      slug: 'ecommerce-ui-kit-pro',
      description: 'Premium React functional components for modern e-commerce websites.',
      longDesc: 'Accelerate your web development with over 100+ fully responsive, accessible, and themeable React components tailored for e-commerce. Includes product cards, cart sliders, checkout flows, and user dashboards.',
      category: 'WEBSITE',
      price: 79.50,
      originalPrice: 120.00,
      images: ['/images/products/ui-kit.png'],
      demoUrl: 'https://demo.nexastore.com/ui-kit',
      features: ['100+ Components', 'Dark Mode Support', 'Accessibility Ready', 'Framer Motion Animations'],
      techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      whatYouGet: ['Component Library', 'Storybook Forms', 'License Key'],
      accessLink: 'https://github.com/nexastore/ui-kit-pro',
      isFeatured: false,
      isActive: true,
      rating: 4.9,
      totalSales: 2100,
      totalReviews: 154,
      badge: 'Top Rated'
    },
    {
      name: 'SaaS Billing Starter Kit',
      slug: 'saas-billing-starter',
      description: 'Complete Stripe integration template for subscription-based SaaS apps.',
      longDesc: 'Skip the headaches of setting up Stripe webhooks, subscription tiers, and customer portals. This starter kit provides a production-ready billing service integration for Next.js applications.',
      category: 'SAAS_TOOL',
      price: 149.00,
      originalPrice: 200.00,
      images: ['/images/products/saas-billing.png'],
      demoUrl: 'https://demo.nexastore.com/saas-billing',
      features: ['Stripe Webhooks', 'Customer Portal', 'Pricing Tables', 'Invoice Generation'],
      techStack: ['Next.js', 'Stripe API', 'Prisma', 'Tailwind CSS'],
      whatYouGet: ['Source Code', 'Stripe Config Guide', 'Database Schema'],
      accessLink: 'https://github.com/nexastore/saas-billing',
      isFeatured: true,
      isActive: true,
      rating: 4.7,
      totalSales: 430,
      totalReviews: 28,
      badge: 'New'
    },
    {
      name: 'Startup Bundle Megapack',
      slug: 'startup-bundle-megapack',
      description: 'Everything you need to launch your startup: Website, App, and Backend.',
      longDesc: 'The ultimate bundle for entrepreneurs. Get our responsive landing page builder, cross-platform mobile app template, and robust Node.js backend architecture at a heavily discounted price.',
      category: 'BUNDLE',
      price: 299.00,
      originalPrice: 600.00,
      images: ['/images/products/bundle.png'],
      features: ['3-in-1 Value', 'Unified Design System', 'Shared Backend Services'],
      techStack: ['Next.js', 'React Native', 'Node.js', 'PostgreSQL'],
      whatYouGet: ['3 Respositories', 'Integration Guide', 'Premium Support'],
      accessLink: 'https://github.com/nexastore/startup-bundle',
      isFeatured: true,
      isActive: true,
      rating: 5.0,
      totalSales: 150,
      totalReviews: 12,
      badge: 'Bundle Deal'
    },
    {
      name: 'VisionAI Object Recognition',
      slug: 'vision-ai-object-recognition',
      description: 'Plug-and-play computer vision API wrap for real-time object tracking.',
      longDesc: 'Easily add machine learning to your apps with this lightweight wrapper around TensorFlow. Perfect for security feeds, automated inventory counting, or interactive media.',
      category: 'AI_MODEL',
      price: 89.00,
      originalPrice: 150.00,
      images: ['/images/products/vision-ai.png'],
      features: ['Real-time Tracking', 'Low Latency', 'REST API included', 'Dockerized'],
      techStack: ['Python', 'TensorFlow', 'Docker', 'Flask'],
      whatYouGet: ['Docker Image', 'API Documentation', 'Postman Collection'],
      accessLink: 'https://github.com/nexastore/vision-ai',
      isFeatured: false,
      isActive: true,
      rating: 4.5,
      totalSales: 320,
      totalReviews: 21,
      badge: null
    },
    {
      name: 'DeliveryX Mobile App',
      slug: 'delivery-x-app',
      description: 'On-demand food and grocery delivery application template for iOS/Android.',
      longDesc: 'A dual-app solution featuring a rider app and a customer app. Integrated with maps, live tracking, and real-time chat between delivery personnel and customers.',
      category: 'MOBILE_APP',
      price: 199.00,
      originalPrice: 249.00,
      images: ['/images/products/delivery-x.png'],
      features: ['Live Tracking', 'In-app Chat', 'Push Notifications', 'Payment Gateway'],
      techStack: ['Flutter', 'Firebase', 'Google Maps API'],
      whatYouGet: ['Flutter Source Code', 'Admin Dashboard Code', 'Deployment Guide'],
      accessLink: 'https://github.com/nexastore/delivery-x',
      isFeatured: false,
      isActive: true,
      rating: 4.4,
      totalSales: 610,
      totalReviews: 44,
      badge: 'Updated'
    },
    {
      name: 'BlogMaster Next.js Template',
      slug: 'blogmaster-nextjs',
      description: 'Lightning fast statically generated blog template with MDX support.',
      longDesc: 'Write your blogs in Markdown and let Next.js handle the rest. Highly optimized for Core Web Vitals, includes dark mode, code highlighting, and newsletter integration.',
      category: 'WEBSITE',
      price: 39.00,
      originalPrice: null,
      images: ['/images/products/blogmaster.png'],
      demoUrl: 'https://demo.nexastore.com/blogmaster',
      features: ['MDX Support', 'Syntax Highlighting', 'SEO Optimized', 'RSS Feed'],
      techStack: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
      whatYouGet: ['Source Code', 'Content Guidelines'],
      accessLink: 'https://github.com/nexastore/blogmaster',
      isFeatured: false,
      isActive: true,
      rating: 4.9,
      totalSales: 3400,
      totalReviews: 210,
      badge: 'Best Value'
    },
    {
      name: 'Formify Form Builder',
      slug: 'formify-builder',
      description: 'Embeddable drag-and-drop form builder for any platform.',
      longDesc: 'Create complex forms with conditional logic, multi-step wizards, and custom styling without writing a single line of code. Generates pure HTML/CSS/JS that you can embed anywhere.',
      category: 'SAAS_TOOL',
      price: 119.00,
      originalPrice: 149.00,
      images: ['/images/products/formify.png'],
      features: ['Drag & Drop', 'Conditional Logic', 'Webhooks Integration', 'Analytics'],
      techStack: ['Vue.js', 'Node.js', 'MongoDB'],
      whatYouGet: ['SaaS Source Code', 'Database Scripts', 'Deployment Docs'],
      accessLink: 'https://github.com/nexastore/formify',
      isFeatured: true,
      isActive: true,
      rating: 4.6,
      totalSales: 520,
      totalReviews: 35,
      badge: 'Trending'
    },
    {
      name: 'DevOps CI/CD Toolkit',
      slug: 'devops-cicd-toolkit',
      description: 'Collection of premium GitHub Actions and GitLab CI templates.',
      longDesc: 'Stop reinventing the wheel. Use our battle-tested CI/CD pipelines to automate testing, building, and deploying your web and mobile applications securely and efficiently.',
      category: 'BUNDLE',
      price: 49.00,
      originalPrice: 89.00,
      images: ['/images/products/devops.png'],
      features: ['Auto Testing', 'Security Scanning', 'Docker Support', 'Slack Alerts'],
      techStack: ['YAML', 'Bash', 'Docker', 'GitHub Actions'],
      whatYouGet: ['Pipeline Templates', 'Implementation Guide'],
      accessLink: 'https://github.com/nexastore/devops-toolkit',
      isFeatured: false,
      isActive: true,
      rating: 4.8,
      totalSales: 890,
      totalReviews: 67,
      badge: null
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product as any
    })
  }

  console.log('Seeded 10 products successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
