'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAllBlogPosts, getFeaturedBlogPosts, isContentfulConfigured, BlogPost } from '../../lib/contentful';
import { useI18n } from './I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    sectionTitle: "Latest Insights",
    mainHeading: "From Our",
    blogText: "Blog",
    subtitle: "Stay updated with the latest trends, insights, and innovations in technology and business",
    demoMode: "Demo Mode:",
    demoDescription: "Connect to Contentful CMS to display real blog posts.",
    visitBlog: "Visit full blog page →",
    loadingText: "Loading featured posts...",
    errorTitle: "Unable to load blog posts",
    errorDescription: "Please check your Contentful configuration or try again later.",
    viewAllArticles: "View All Articles",
    samplePosts: {
      post1: {
        title: "The Future of Digital Transformation in Indonesian Business",
        excerpt: "Exploring how Indonesian businesses are adapting to the digital age and the key strategies driving successful digital transformation initiatives.",
        category: "Business"
      },
      post2: {
        title: "AI and Machine Learning: Revolutionizing IT Services",
        excerpt: "Discover how artificial intelligence and machine learning are transforming the IT services landscape and creating new opportunities for businesses.",
        category: "Technology"
      },
      post3: {
        title: "Building Scalable Web Applications with Modern Technologies",
        excerpt: "A comprehensive guide to building scalable web applications using the latest technologies and frameworks for optimal performance.",
        category: "Software Development"
      }
    }
  },
  id: {
    sectionTitle: "Wawasan Terbaru",
    mainHeading: "Dari",
    blogText: "Blog Kami",
    subtitle: "Tetap terkini dengan tren, wawasan, dan inovasi terbaru dalam teknologi dan bisnis",
    demoMode: "Mode Demo:",
    demoDescription: "Hubungkan ke Contentful CMS untuk menampilkan postingan blog yang sebenarnya.",
    visitBlog: "Kunjungi halaman blog lengkap →",
    loadingText: "Memuat postingan unggulan...",
    errorTitle: "Tidak dapat memuat postingan blog",
    errorDescription: "Silakan periksa konfigurasi Contentful Anda atau coba lagi nanti.",
    viewAllArticles: "Lihat Semua Artikel",
    samplePosts: {
      post1: {
        title: "Masa Depan Transformasi Digital dalam Bisnis Indonesia",
        excerpt: "Menjelajahi bagaimana bisnis Indonesia beradaptasi dengan era digital dan strategi kunci yang mendorong inisiatif transformasi digital yang sukses.",
        category: "Bisnis"
      },
      post2: {
        title: "AI dan Machine Learning: Merevolusi Layanan IT",
        excerpt: "Temukan bagaimana kecerdasan buatan dan machine learning mengubah lanskap layanan IT dan menciptakan peluang baru untuk bisnis.",
        category: "Teknologi"
      },
      post3: {
        title: "Membangun Aplikasi Web Scalable dengan Teknologi Modern",
        excerpt: "Panduan komprehensif untuk membangun aplikasi web yang scalable menggunakan teknologi dan framework terbaru untuk performa optimal.",
        category: "Pengembangan Perangkat Lunak"
      }
    }
  }
};

const FeaturedBlog = () => {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      if (!isContentfulConfigured()) {
        setError('Contentful not configured');
        setLoading(false);
        return;
      }

      // Try to get featured posts first, fallback to all posts
      let blogPosts = await getFeaturedBlogPosts(3);
      
      // If no featured posts, get the 3 most recent posts
      if (blogPosts.length === 0) {
        const allPosts = await getAllBlogPosts();
        blogPosts = allPosts
          .sort((a, b) => new Date(b.fields.publishDate).getTime() - new Date(a.fields.publishDate).getTime())
          .slice(0, 3);
      }
      
      setPosts(blogPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('Failed to fetch blog posts');
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Sample fallback posts for when Contentful is not configured
  const samplePosts = [
    {
      sys: { id: '1', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post1.title,
        slug: 'future-digital-transformation-indonesia',
        excerpt: t.samplePosts.post1.excerpt,
        category: t.samplePosts.post1.category,
        author: 'GSA Team',
        publishDate: '2024-01-15',
        readTime: 5,
        featuredImage: {
          fields: {
            file: {
              url: '/Blog/Blog/Elemen Design Website Company GSA (54).png'
            }
          }
        },
        tags: ['Digital Transformation', 'Indonesia', 'Business Strategy'],
        content: {} as Record<string, unknown>
      }
    },
    {
      sys: { id: '2', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post2.title,
        slug: 'ai-machine-learning-it-services',
        excerpt: t.samplePosts.post2.excerpt,
        category: t.samplePosts.post2.category,
        author: 'Tech Team',
        publishDate: '2024-01-10',
        readTime: 7,
        featuredImage: {
          fields: {
            file: {
              url: '/services/Software Development.png'
            }
          }
        },
        tags: ['AI', 'Machine Learning', 'IT Services'],
        content: {} as Record<string, unknown>
      }
    },
    {
      sys: { id: '3', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post3.title,
        slug: 'scalable-web-applications-modern-tech',
        excerpt: t.samplePosts.post3.excerpt,
        category: t.samplePosts.post3.category,
        author: 'Dev Team',
        publishDate: '2024-01-05',
        readTime: 8,
        featuredImage: {
          fields: {
            file: {
              url: '/services/Creative & Design.png'
            }
          }
        },
        tags: ['Web Development', 'Scalability', 'Modern Tech'],
        content: {} as Record<string, unknown>
      }
    }
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;
  const isDemo = posts.length === 0;

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
          <p className="text-blue-600 font-semibold mb-3 text-base">{t.sectionTitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t.mainHeading} <span className="text-blue-600">{t.blogText}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Demo Notice - Only show if using fallback data */}
        {isDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-blue-800 text-sm">
              <strong>{t.demoMode}</strong> {t.demoDescription}
              <Link href="/blog" className="text-blue-600 hover:text-blue-700 underline ml-1">
                {t.visitBlog}
              </Link>
            </p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t.loadingText}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{t.errorTitle}</p>
            <p className="text-sm text-gray-500">
              {t.errorDescription}
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayPosts.map((post, index) => (
                <motion.article
                  key={post.sys.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${post.fields.slug}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      {/* Featured Image */}
                      <div className="relative h-64 w-full overflow-hidden">
                        {post.fields.featuredImage ? (
                          <Image
                            src={post.fields.featuredImage.fields.file.url.startsWith('//') 
                              ? `https:${post.fields.featuredImage.fields.file.url}`
                              : post.fields.featuredImage.fields.file.url}
                            alt={post.fields.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <div className="text-4xl text-gray-400">📱</div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Info */}
                        <div className="text-sm text-gray-500 mb-3">
                          GSA | {formatDate(post.fields.publishDate)}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {post.fields.title}
                        </h3>

                        {/* Excerpt */}
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
                {t.viewAllArticles}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedBlog; 