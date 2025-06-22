'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const DemoBlog = () => {
  // Sample blog posts for demonstration
  const samplePosts = [
    {
      id: '1',
      title: 'The Future of Digital Transformation in Indonesian Business',
      slug: 'future-digital-transformation-indonesia',
      excerpt: 'Exploring how Indonesian businesses are adapting to the digital age and the key strategies driving successful digital transformation initiatives.',
      category: 'Business',
      author: 'GSA Team',
      publishDate: '2024-01-15',
      readTime: 5,
      featuredImage: '/Blog/Blog/Elemen Design Website Company GSA (54).png',
      tags: ['Digital Transformation', 'Indonesia', 'Business Strategy']
    },
    {
      id: '2',
      title: 'AI and Machine Learning: Revolutionizing IT Services',
      slug: 'ai-machine-learning-it-services',
      excerpt: 'Discover how artificial intelligence and machine learning are transforming the IT services landscape and creating new opportunities for businesses.',
      category: 'Technology',
      author: 'Tech Team',
      publishDate: '2024-01-10',
      readTime: 7,
      featuredImage: '/services/Software Development.png',
      tags: ['AI', 'Machine Learning', 'IT Services']
    },
    {
      id: '3',
      title: 'Building Scalable Web Applications with Modern Technologies',
      slug: 'scalable-web-applications-modern-tech',
      excerpt: 'A comprehensive guide to building scalable web applications using the latest technologies and frameworks for optimal performance.',
      category: 'Software Development',
      author: 'Dev Team',
      publishDate: '2024-01-05',
      readTime: 8,
      featuredImage: '/services/Creative & Design.png',
      tags: ['Web Development', 'Scalability', 'Modern Tech']
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold mb-3 text-base">Latest Insights</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            From Our <span className="text-blue-600">Blog</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and innovations in technology and business
          </p>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center"
        >
          <p className="text-blue-800 text-sm">
            <strong>Demo Mode:</strong> This shows sample blog posts. Connect to Contentful CMS to display real content. 
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 underline ml-1">
              Visit full blog page →
            </Link>
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {samplePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Featured Image - Made larger to match the design */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content - Updated to match the image layout */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* GSA | Date format */}
                  <div className="text-sm text-gray-500 mb-3">
                    GSA | {formatDate(post.publishDate)}
                  </div>

                  {/* Title - Made more prominent */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  {/* Description - Styled to match the gray text in image */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA to Blog Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoBlog; 