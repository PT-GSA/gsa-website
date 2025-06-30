'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { getAllBlogPosts, getBlogPostsByCategory, BlogPost } from '../../lib/contentful';
import { useI18n } from '../../src/components/I18nProvider';
import Head from 'next/head';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    breadcrumb: "Home • Blog",
    pageTitle: "GSA Blog",
    pageSubtitle: "Our News • Knowledge",
    categories: {
      all: "All",
      technology: "Technology",
      business: "Business",
      innovation: "Innovation",
      digitalMarketing: "Digital Marketing",
      softwareDevelopment: "Software Development",
      itServices: "IT Services"
    },
    sortOptions: {
      all: "All",
      newest: "Newest",
      mostRead: "Most Read"
    },
    filters: {
      selectDate: "Select Date"
    },
    loading: "Loading blog posts...",
    noPosts: {
      title: "No Posts Found",
      messageAll: "No blog posts available at the moment. Check back soon!",
      messageCategory: "No posts found in \"{category}\" category.",
      setupTitle: "Ready to set up your blog?",
      setupDescription: "To display real blog posts, you need to connect to Contentful CMS. Follow the setup guide to get started.",
      quickSetup: "Quick Setup:",
      steps: [
        "Create a Contentful account",
        "Set up the blog content model",
        "Add your API keys to .env.local",
        "Create your first blog post"
      ],
      seeGuide: "See BLOG_SETUP.md for detailed instructions"
    },
    cta: {
      title: "Stay Updated with GSA Insights",
      description: "Get the latest updates on technology trends, business insights, and digital transformation strategies.",
      contactUs: "Contact Us",
      ourServices: "Our Services"
    }
  },
  id: {
    breadcrumb: "Beranda • Blog",
    pageTitle: "Blog GSA",
    pageSubtitle: "Berita Kami • Pengetahuan",
    categories: {
      all: "Semua",
      technology: "Teknologi",
      business: "Bisnis",
      innovation: "Inovasi",
      digitalMarketing: "Digital Marketing",
      softwareDevelopment: "Pengembangan Perangkat Lunak",
      itServices: "Layanan IT"
    },
    sortOptions: {
      all: "Semua",
      newest: "Terbaru",
      mostRead: "Paling Banyak Dibaca"
    },
    filters: {
      selectDate: "Pilih Tanggal"
    },
    loading: "Memuat posting blog...",
    noPosts: {
      title: "Tidak Ada Postingan Ditemukan",
      messageAll: "Tidak ada posting blog yang tersedia saat ini. Periksa kembali segera!",
      messageCategory: "Tidak ada postingan ditemukan dalam kategori \"{category}\".",
      setupTitle: "Siap untuk mengatur blog Anda?",
      setupDescription: "Untuk menampilkan posting blog nyata, Anda perlu terhubung ke Contentful CMS. Ikuti panduan pengaturan untuk memulai.",
      quickSetup: "Pengaturan Cepat:",
      steps: [
        "Buat akun Contentful",
        "Siapkan model konten blog",
        "Tambahkan kunci API Anda ke .env.local",
        "Buat posting blog pertama Anda"
      ],
      seeGuide: "Lihat BLOG_SETUP.md untuk instruksi terperinci"
    },
    cta: {
      title: "Tetap Update dengan Wawasan GSA",
      description: "Dapatkan pembaruan terbaru tentang tren teknologi, wawasan bisnis, dan strategi transformasi digital.",
      contactUs: "Hubungi Kami",
      ourServices: "Layanan Kami"
    }
  },
  ja: {
    breadcrumb: "ホーム • ブログ",
    pageTitle: "GSAブログ",
    pageSubtitle: "私たちのニュース • ナレッジ",
    categories: {
      all: "すべて",
      technology: "テクノロジー",
      business: "ビジネス",
      innovation: "イノベーション",
      digitalMarketing: "デジタルマーケティング",
      softwareDevelopment: "ソフトウェア開発",
      itServices: "ITサービス"
    },
    sortOptions: {
      all: "すべて",
      newest: "最新",
      mostRead: "最も読まれた"
    },
    filters: {
      selectDate: "日付を選択"
    },
    loading: "ブログ記事を読み込み中...",
    noPosts: {
      title: "投稿が見つかりません",
      messageAll: "現在利用可能なブログ記事はありません。後ほどご確認ください！",
      messageCategory: '"{category}" カテゴリに投稿が見つかりません。',
      setupTitle: "ブログのセットアップを始めますか？",
      setupDescription: "実際のブログ記事を表示するにはContentful CMSに接続する必要があります。セットアップガイドに従ってください。",
      quickSetup: "クイックセットアップ:",
      steps: [
        "Contentfulアカウントを作成",
        "ブログコンテンツモデルを設定",
        "APIキーを.env.localに追加",
        "最初のブログ記事を作成"
      ],
      seeGuide: "詳細な手順はBLOG_SETUP.mdをご覧ください"
    },
    cta: {
      title: "GSAインサイトで最新情報をゲット",
      description: "テクノロジートレンド、ビジネスインサイト、デジタルトランスフォーメーション戦略の最新情報を入手しましょう。",
      contactUs: "お問い合わせ",
      ourServices: "私たちのサービス"
    }
  },
  'zh-TW': {
    breadcrumb: "首頁 • 部落格",
    pageTitle: "GSA部落格",
    pageSubtitle: "我們的新聞 • 知識",
    categories: {
      all: "全部",
      technology: "科技",
      business: "商業",
      innovation: "創新",
      digitalMarketing: "數位行銷",
      softwareDevelopment: "軟體開發",
      itServices: "IT服務"
    },
    sortOptions: {
      all: "全部",
      newest: "最新",
      mostRead: "最多閱讀"
    },
    filters: {
      selectDate: "選擇日期"
    },
    loading: "正在載入部落格文章...",
    noPosts: {
      title: "找不到文章",
      messageAll: "目前沒有可用的部落格文章。請稍後再查看！",
      messageCategory: '在 "{category}" 分類中找不到文章。',
      setupTitle: "準備好設置您的部落格了嗎？",
      setupDescription: "要顯示真實的部落格文章，您需要連接Contentful CMS。請按照設置指南操作。",
      quickSetup: "快速設置:",
      steps: [
        "建立Contentful帳號",
        "設置部落格內容模型",
        "將API金鑰加入.env.local",
        "建立您的第一篇部落格文章"
      ],
      seeGuide: "詳細說明請參閱BLOG_SETUP.md"
    },
    cta: {
      title: "隨時掌握GSA洞察",
      description: "獲取科技趨勢、商業洞察和數位轉型策略的最新資訊。",
      contactUs: "聯絡我們",
      ourServices: "我們的服務"
    }
  }
};

export default function BlogPage() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Create translated categories array
  const translatedCategories = [
    { key: 'All', label: t.categories.all },
    { key: 'Technology', label: t.categories.technology },
    { key: 'Business', label: t.categories.business },
    { key: 'Innovation', label: t.categories.innovation },
    { key: 'Digital Marketing', label: t.categories.digitalMarketing },
    { key: 'Software Development', label: t.categories.softwareDevelopment },
    { key: 'IT Services', label: t.categories.itServices },
  ];

  // Create translated sort options
  const translatedSortOptions = [
    { value: 'all', label: t.sortOptions.all },
    { value: 'newest', label: t.sortOptions.newest },
    { value: 'most-read', label: t.sortOptions.mostRead },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const filterPosts = useCallback(async () => {
    let filtered = posts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      try {
        const categoryPosts = await getBlogPostsByCategory(selectedCategory);
        filtered = categoryPosts;
      } catch (error) {
        console.error('Error filtering posts:', error);
        filtered = posts.filter(post => post.fields.category === selectedCategory);
      }
    }

    // Filter by date if selected
    if (selectedDate) {
      const selectedYear = new Date(selectedDate).getFullYear();
      filtered = filtered.filter(post => {
        const postYear = new Date(post.fields.publishDate).getFullYear();
        return postYear === selectedYear;
      });
    }

    // Sort posts
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.fields.publishDate).getTime() - new Date(a.fields.publishDate).getTime()
      );
    } else if (sortBy === 'most-read') {
      filtered = [...filtered].sort((a, b) => {
        const aReadTime = a.fields.readTime || getReadTime(a.fields.content);
        const bReadTime = b.fields.readTime || getReadTime(b.fields.content);
        return bReadTime - aReadTime;
      });
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, selectedDate, sortBy]);

  useEffect(() => {
    filterPosts();
  }, [selectedCategory, posts, sortBy, selectedDate, filterPosts]);

  const formatDate = (dateString: string) => {
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadTime = (content: unknown) => {
    if (!content) return 5;
    const textContent = JSON.stringify(content);
    const wordCount = textContent.split(' ').length;
    return Math.ceil(wordCount / 200);
  };

  return (
    <>
      <Head>
        <title>GSA Blog</title>
        <meta name="description" content="Insights, Innovation, and Industry Trends from GSA." />
        <meta property="og:title" content="GSA Blog" />
        <meta property="og:description" content="Insights, Innovation, and Industry Trends from GSA." />
        <meta property="og:image" content="https://gsagroup.id/og-image.jpg" />
        <meta property="og:url" content="https://gsagroup.id/blog" />
        <link rel="canonical" href="https://gsagroup.id/blog" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://gsagroup.id/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://gsagroup.id/blog"
            }
          ]
        }) }} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        
        {/* Header Section */}
        <section className="relative w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left side content */}
              <div className="text-center md:text-left text-white max-w-xl mb-8 md:mb-0">
                <div className="text-sm mb-4 opacity-90">{t.breadcrumb}</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.pageTitle}</h1>
                <p className="text-xl opacity-90">{t.pageSubtitle}</p>
              </div>
              
              {/* Right side robot illustration */}
              <div className="w-96 h-96 md:w-[400px] md:h-[400px] relative flex-shrink-0">
                <Image 
                  src="/Blog/Blog/Elemen Design Website Company GSA (54) 3.svg" 
                  alt="GSA Robot with Book" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white py-6 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2">
                {translatedSortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      sortBy === option.value
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Date Selector */}
              <div className="relative">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer min-w-[140px]"
                >
                  <option value="">{t.filters.selectDate}</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tags */}
        <section className="bg-gray-50 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {translatedCategories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t.loading}</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.noPosts.title}</h3>
                <p className="text-gray-600 mb-8">
                  {selectedCategory === 'All' 
                    ? t.noPosts.messageAll
                    : t.noPosts.messageCategory.replace('{category}', translatedCategories.find(cat => cat.key === selectedCategory)?.label || selectedCategory)}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">{t.noPosts.setupTitle}</h4>
                  <p className="text-blue-800 text-sm mb-4">
                    {t.noPosts.setupDescription}
                  </p>
                  <div className="text-left text-sm text-blue-700">
                    <p className="font-medium mb-2">{t.noPosts.quickSetup}</p>
                    <ol className="list-decimal list-inside space-y-1">
                      {t.noPosts.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                    <p className="mt-3 text-xs">
                      📖 {t.noPosts.seeGuide}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.sys.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/blog/${post.fields.slug}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        {/* Large Horizontal Featured Image */}
                        <div className="relative h-64 w-full overflow-hidden">
                          {post.fields.featuredImage ? (
                            <Image
                              src={`https:${post.fields.featuredImage.fields.file.url}`}
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

                        {/* Content Section */}
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Meta Info */}
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="font-semibold">GSA</span>
                            <span>|</span>
                            <span>{formatDate(post.fields.publishDate)}</span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.fields.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-1">
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
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {t.cta.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {t.cta.contactUs}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  {t.cta.ourServices}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
} 