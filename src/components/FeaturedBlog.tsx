'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedBlogPosts, getAllBlogPosts, BlogPost } from '../../lib/contentful';

const FeaturedBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      let featuredPosts = await getFeaturedBlogPosts(3);
      
      // If no featured posts, get the latest 3 posts
      if (featuredPosts.length === 0) {
        const allPosts = await getAllBlogPosts();
        featuredPosts = allPosts.slice(0, 3);
      }
      
      setPosts(featuredPosts);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading || posts.length === 0) {
    return null; // Don't show the section if no posts or loading
  }

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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.sys.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.fields.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Featured Image - Made larger to match the design */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {post.fields.featuredImage ? (
                      <Image
                        src={`https:${post.fields.featuredImage.fields.file.url}`}
                        alt={post.fields.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-4xl text-blue-600">📖</div>
                      </div>
                    )}
                  </div>

                  {/* Content - Updated to match the image layout */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* GSA | Date format */}
                    <div className="text-sm text-gray-500 mb-3">
                      GSA | {formatDate(post.fields.publishDate)}
                    </div>

                    {/* Title - Made more prominent */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {post.fields.title}
                    </h3>

                    {/* Description - Styled to match the gray text in image */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {post.fields.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
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

export default FeaturedBlog; 