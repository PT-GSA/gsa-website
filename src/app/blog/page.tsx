'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllBlogPosts, getBlogPostsByCategory, BlogPost } from '../../../lib/contentful';

const categories = [
  'All',
  'Technology',
  'Business',
  'Innovation',
  'Digital Marketing',
  'Software Development',
  'IT Services',
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, posts]);

  const fetchPosts = async () => {
    try {
      const allPosts = await getAllBlogPosts();
      setPosts(allPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const filterPosts = async () => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      try {
        const categoryPosts = await getBlogPostsByCategory(selectedCategory);
        setFilteredPosts(categoryPosts);
      } catch (error) {
        console.error('Error filtering posts:', error);
        setFilteredPosts(posts.filter(post => post.fields.category === selectedCategory));
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
        <Image 
          src="/Blog/Elemen Design Website Company GSA (54).png" 
          alt="GSA Blog Hero" 
          fill 
          priority 
          className="object-cover object-center w-full h-full absolute z-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-1"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-12">
          <div className="text-white max-w-xl">
            <div className="text-sm mb-2 opacity-80">Home &gt; Blog</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">GSA Blog</h1>
            <div className="text-lg mb-4 opacity-90">Insights, Innovation, and Industry Trends</div>
            <p className="text-base opacity-80">Stay updated with the latest in technology, business strategies, and digital transformation.</p>
          </div>
          <div className="hidden md:block w-[320px] h-[320px] relative">
            <Image 
              src="/Blog/Elemen Design Website Company GSA (54) 3.svg" 
              alt="Blog Illustration" 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Posts Found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'All' 
                  ? 'No blog posts available at the moment. Check back soon!' 
                  : `No posts found in "${selectedCategory}" category.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
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
                          GSA | {formatDate(post.fields.publishDate).replace(/,/g, '/')}
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated with GSA Insights
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest updates on technology trends, business insights, and digital transformation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 border border-gray-200 transition-all duration-300"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 