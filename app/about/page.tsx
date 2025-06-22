'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { getAllBlogPosts, BlogPost } from '../../lib/contentful';
import { Document } from '@contentful/rich-text-types';
import { useI18n } from '../../src/components/I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    breadcrumb: "Home • About Us",
    pageTitle: "About Us",
    pageSubtitle: "GSA's Information • Our Journey",
    companyDescription: "GSA is a company that specializes in IT consulting, software development (development), and others. GSA is supported by a team of experts in each field and has served clients from national to international levels.",
    seoSection: {
      title: "Is your website just for display or your website not found by Google?",
      subtitle: "This means you need to improve your SEO (Search Engine Optimization)!",
      cta: "We can help you with this problem!"
    },
    msmeSection: {
      title: "Want to create your own MSME Business?",
      description: "GSA provides services from website creation to digital marketing so that if you who want to build or develop MSME businesses.",
      whyUs: "Why Us?",
      whyUsDescription: "GSA has given the most affordable price for you!",
      moreInfo: "More Information"
    },
    blogSection: {
      title: "GSA Blog",
      previewMode: "Preview Mode:",
      previewDescription: "These are sample blog posts. Connect to Contentful CMS to display real content.",
      clickToSee: "Click to see our Blog"
    },
    whatWeCanDo: {
      title: "What's we can do for you?",
      description1: "We offer exceptional expertise across a range of key services tailored to your needs. Our team of professionals is committed to delivering outstanding results that help you achieve your goals and stay ahead in a competitive landscape.",
      description2: "With a focus on quality and customer satisfaction, we aim to exceed your expectations and provide results that truly make a difference."
    },
    samplePosts: {
      post1: {
        title: "Digital Civilization Revolution 2035, AI & ML Digital Era",
        excerpt: "Ever heard of the Industrial Revolution 4.0 that seems Digital? Now it's time for us to prepare for the next era..."
      },
      post2: {
        title: "Technological Developments that Change the World GO",
        excerpt: "Technology continues to develop rapidly and changes the way we work and interact..."
      },
      post3: {
        title: "DuckDuckGo Launches AI Chatbot",
        excerpt: "DuckDuckGo just announced that it has launched an AI chatbot with a focus on strong privacy..."
      }
    }
  },
  id: {
    breadcrumb: "Beranda • Tentang Kami",
    pageTitle: "Tentang Kami",
    pageSubtitle: "Informasi GSA • Perjalanan Kami",
    companyDescription: "GSA adalah perusahaan yang mengkhususkan diri dalam konsultasi IT, pengembangan perangkat lunak (development), dan lainnya. GSA didukung oleh tim ahli di setiap bidang dan telah melayani klien dari tingkat nasional hingga internasional.",
    seoSection: {
      title: "Apakah website Anda hanya untuk pajangan atau website Anda tidak ditemukan oleh Google?",
      subtitle: "Ini berarti Anda perlu meningkatkan SEO (Search Engine Optimization) Anda!",
      cta: "Kami dapat membantu Anda dengan masalah ini!"
    },
    msmeSection: {
      title: "Ingin membuat Bisnis UMKM sendiri?",
      description: "GSA menyediakan layanan mulai dari pembuatan website hingga digital marketing sehingga jika Anda yang ingin membangun atau mengembangkan bisnis UMKM.",
      whyUs: "Mengapa Kami?",
      whyUsDescription: "GSA telah memberikan harga paling terjangkau untuk Anda!",
      moreInfo: "Informasi Lebih Lanjut"
    },
    blogSection: {
      title: "Blog GSA",
      previewMode: "Mode Pratinjau:",
      previewDescription: "Ini adalah contoh postingan blog. Hubungkan ke Contentful CMS untuk menampilkan konten yang sebenarnya.",
      clickToSee: "Klik untuk melihat Blog kami"
    },
    whatWeCanDo: {
      title: "Apa yang bisa kami lakukan untuk Anda?",
      description1: "Kami menawarkan keahlian luar biasa di berbagai layanan utama yang disesuaikan dengan kebutuhan Anda. Tim profesional kami berkomitmen untuk memberikan hasil yang luar biasa yang membantu Anda mencapai tujuan dan tetap unggul dalam lanskap yang kompetitif.",
      description2: "Dengan fokus pada kualitas dan kepuasan pelanggan, kami bertujuan untuk melampaui harapan Anda dan memberikan hasil yang benar-benar membuat perbedaan."
    },
    samplePosts: {
      post1: {
        title: "Revolusi Peradaban 2035, AI & ML Era Digital",
        excerpt: "Pernah mendengar soal Revolusi Industri 4.0 yang seolah Digital? Kini saatnya kita bersiap untuk era berikutnya..."
      },
      post2: {
        title: "Perkembangan Teknologi yang Mengubah Dunia GO",
        excerpt: "Teknologi terus berkembang dengan pesat dan mengubah cara kita bekerja dan berinteraksi..."
      },
      post3: {
        title: "DuckDuckGo Meluncurkan Chatbot AI",
        excerpt: "DuckDuckGo baru mengumumkan telah meluncurkan chatbot AI dengan fokus pada privasi yang kuat..."
      }
    }
  }
};

const AboutUs = () => {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const posts = await getAllBlogPosts();
      setBlogPosts(posts.slice(0, 3)); // Get latest 3 posts
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
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

  // Fallback sample posts when no real content is available
  const samplePosts: BlogPost[] = [
    {
      sys: { id: '1', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post1.title,
        slug: 'revolusi-peradaban-2035-ai-ml',
        excerpt: t.samplePosts.post1.excerpt,
        category: 'Technology',
        author: 'GSA',
        publishDate: '2024-03-12',
        readTime: 5,
        content: {
          nodeType: 'document',
          data: {},
          content: []
        } as Document
      }
    },
    {
      sys: { id: '2', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post2.title,
        slug: 'perkembangan-teknologi-go',
        excerpt: t.samplePosts.post2.excerpt,
        category: 'Technology',
        author: 'GSA',
        publishDate: '2024-11-29',
        readTime: 6,
        content: {
          nodeType: 'document',
          data: {},
          content: []
        } as Document
      }
    },
    {
      sys: { id: '3', createdAt: '', updatedAt: '' },
      fields: {
        title: t.samplePosts.post3.title,
        slug: 'duckduckgo-chatbot-ai',
        excerpt: t.samplePosts.post3.excerpt,
        category: 'Innovation',
        author: 'DuckDuckGo',
        publishDate: '2024-01-15',
        readTime: 4,
        content: {
          nodeType: 'document',
          data: {},
          content: []
        } as Document
      }
    }
  ];

  const displayPosts = blogPosts.length > 0 ? blogPosts : samplePosts;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header Section - Matching Blog Page Design */}
      <section className="relative w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left side content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left text-white max-w-xl mb-8 md:mb-0"
            >
              <div className="text-sm mb-4 opacity-90">{t.breadcrumb}</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.pageTitle}</h1>
              <p className="text-xl opacity-90">{t.pageSubtitle}</p>
            </motion.div>
            
            {/* Right side robot illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[576px] h-[576px] md:w-[600px] md:h-[600px] relative flex-shrink-0"
            >
              <Image 
                src="/About Us/Elemen Design Website Company GSA (67).png" 
                alt="GSA Robot Mascot" 
                fill 
                className="object-contain" 
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Main GSA Logo */}
            <div className="flex justify-center mb-12">
              <Image
                src="/About Us/1736247733575 1.svg"
                alt="GSA Main Logo"
                width={300}
                height={120}
                className="object-contain"
              />
            </div>
            
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              {t.companyDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Services Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image with ADS graphic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <Image
                  src="/About Us/108.png"
                  alt="Professional Woman with Laptop"
                  width={1600}
                  height={900}
                  className="rounded-xl object-cover"
                />
                {/* ADS floating element */}
                <div className="absolute top-0 -right-0.5">
                  <Image
                    src="/About Us/107.png"
                    alt="ADS"
                    width={270}
                    height={270}
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.seoSection.title}
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                {t.seoSection.subtitle}
              </p>
              <p className="text-white font-semibold text-xl">
                {t.seoSection.cta}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MSME Business Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {t.msmeSection.title}
              </h3>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                {t.msmeSection.description}
              </p>
              
              <div className="backdrop-blur-sm rounded-2xl py-6 pr-6 mb-8">
                <h4 className="text-xl font-semibold mb-4">{t.msmeSection.whyUs}</h4>
                <p className="text-white/90 mb-6">
                  {t.msmeSection.whyUsDescription}
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  {t.msmeSection.moreInfo}
                </button>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <Image
                  src="/About Us/Elemen Design Website Company GSA (63) 1.svg"
                  alt="Business Woman"
                  width={500}
                  height={400}
                  className="rounded-xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">{t.blogSection.title}</h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {displayPosts.map((post, index) => (
                  <motion.div
                    key={post.sys.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <Link href={blogPosts.length > 0 ? `/blog/${post.fields.slug}` : '/blog'}>
                      {/* Featured Image */}
                      <div className="h-48 overflow-hidden">
                        {post.fields.featuredImage ? (
                          <Image
                            src={`https:${post.fields.featuredImage.fields.file.url}`}
                            alt={post.fields.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className={`h-full flex items-center justify-center ${
                            index === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-600' :
                            index === 1 ? 'bg-gradient-to-br from-green-500 to-blue-500' :
                            'bg-gradient-to-br from-orange-500 to-red-500'
                          }`}>
                            {index === 0 && <span className="text-white text-6xl">📱</span>}
                            {index === 1 && <span className="text-white text-6xl">🏪</span>}
                            {index === 2 && (
                              <Image
                                src="/Home/Logo AI Intelligence.png"
                                alt="Blog"
                                width={80}
                                height={80}
                                className="object-contain"
                              />
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        {/* Author and Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <span className="font-medium">{post.fields.author}</span>
                          <span>•</span>
                          <span>{formatDate(post.fields.publishDate)}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
                          {post.fields.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {post.fields.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Demo Notice when using fallback data */}
            {blogPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center max-w-2xl mx-auto"
              >
                <p className="text-blue-800 text-sm">
                  <strong>{t.blogSection.previewMode}</strong> {t.blogSection.previewDescription}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/blog">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25">
                  {t.blogSection.clickToSee}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left - Image (takes more space) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:col-span-3"
            >
              <div className="relative w-full max-w-none">
                <Image
                  src="/About Us/116.png"
                  alt="Professional Consultant"
                  width={1600}
                  height={1920}
                  className="w-full h-auto max-w-none"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
                    // Use mix-blend-mode to blend with background and remove white background
                    mixBlendMode: 'multiply',
                    maxWidth: 'none'
                  }}
                />
                
                {/* Add a subtle background effect */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-br from-white/40 to-gray-200/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:col-span-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                {t.whatWeCanDo.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.whatWeCanDo.description1}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.whatWeCanDo.description2}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUs;
