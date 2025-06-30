'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, Block, Inline, Document, Text, TopLevelBlock } from '@contentful/rich-text-types';
import Navbar from '../../../src/components/Navbar';
import Footer from '../../../src/components/Footer';
import { getBlogPostBySlug, getAllBlogPosts, BlogPost } from '../../../lib/contentful';
import { useI18n } from '../../../src/components/I18nProvider';
import Head from 'next/head';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    navigation: {
      backToBlog: "← Back to Blog"
    },
    metadata: {
      by: "By",
      minRead: "min read"
    },
    loading: "Loading blog post...",
    error: {
      title: "Blog Post Not Found",
      message: "The blog post you're looking for doesn't exist.",
      lookingForContent: "Looking for content?",
      description: "Blog posts will appear here once you connect to Contentful CMS and create content.",
      toGetStarted: "To get started:",
      steps: [
        "Set up your Contentful space",
        "Create blog posts in Contentful",
        "Add environment variables"
      ],
      seeGuide: "See BLOG_SETUP.md for detailed instructions",
      backToBlog: "Back to Blog"
    },
    content: {
      tags: "Tags",
      shareTitle: "Share this article",
      shareButtons: {
        linkedin: "Share on LinkedIn",
        twitter: "Share on Twitter",
        whatsapp: "Share via WhatsApp"
      }
    },
    relatedPosts: {
      title: "Related Articles",
      subtitle: "More insights from the same category"
    }
  },
  id: {
    navigation: {
      backToBlog: "← Kembali ke Blog"
    },
    metadata: {
      by: "Oleh",
      minRead: "menit baca"
    },
    loading: "Memuat posting blog...",
    error: {
      title: "Posting Blog Tidak Ditemukan",
      message: "Posting blog yang Anda cari tidak ada.",
      lookingForContent: "Mencari konten?",
      description: "Posting blog akan muncul di sini setelah Anda terhubung ke Contentful CMS dan membuat konten.",
      toGetStarted: "Untuk memulai:",
      steps: [
        "Siapkan ruang Contentful Anda",
        "Buat posting blog di Contentful",
        "Tambahkan variabel lingkungan"
      ],
      seeGuide: "Lihat BLOG_SETUP.md untuk instruksi terperinci",
      backToBlog: "Kembali ke Blog"
    },
    content: {
      tags: "Tag",
      shareTitle: "Bagikan artikel ini",
      shareButtons: {
        linkedin: "Bagikan di LinkedIn",
        twitter: "Bagikan di Twitter",
        whatsapp: "Bagikan via WhatsApp"
      }
    },
    relatedPosts: {
      title: "Artikel Terkait",
      subtitle: "Lebih banyak wawasan dari kategori yang sama"
    }
  },
  ja: {
    navigation: {
      backToBlog: "← ブログに戻る"
    },
    metadata: {
      by: "著者",
      minRead: "分で読めます"
    },
    loading: "ブログ記事を読み込み中...",
    error: {
      title: "ブログ記事が見つかりません",
      message: "お探しのブログ記事は存在しません。",
      lookingForContent: "コンテンツをお探しですか？",
      description: "Contentful CMSに接続してコンテンツを作成すると、ここにブログ記事が表示されます。",
      toGetStarted: "始めるには:",
      steps: [
        "Contentfulスペースを設定する",
        "Contentfulでブログ記事を作成する",
        "環境変数を追加する"
      ],
      seeGuide: "詳細な手順はBLOG_SETUP.mdをご覧ください",
      backToBlog: "ブログに戻る"
    },
    content: {
      tags: "タグ",
      shareTitle: "この記事をシェア",
      shareButtons: {
        linkedin: "LinkedInでシェア",
        twitter: "Twitterでシェア",
        whatsapp: "WhatsAppでシェア"
      }
    },
    relatedPosts: {
      title: "関連記事",
      subtitle: "同じカテゴリの他の記事"
    }
  },
  'zh-TW': {
    navigation: {
      backToBlog: "← 返回部落格"
    },
    metadata: {
      by: "作者",
      minRead: "分鐘閱讀"
    },
    loading: "正在載入部落格文章...",
    error: {
      title: "找不到部落格文章",
      message: "您要找的部落格文章不存在。",
      lookingForContent: "正在尋找內容？",
      description: "連接Contentful CMS並建立內容後，部落格文章將顯示在這裡。",
      toGetStarted: "開始步驟：",
      steps: [
        "設定您的Contentful空間",
        "在Contentful中建立部落格文章",
        "新增環境變數"
      ],
      seeGuide: "詳細說明請參閱BLOG_SETUP.md",
      backToBlog: "返回部落格"
    },
    content: {
      tags: "標籤",
      shareTitle: "分享這篇文章",
      shareButtons: {
        linkedin: "分享到LinkedIn",
        twitter: "分享到Twitter",
        whatsapp: "通過WhatsApp分享"
      }
    },
    relatedPosts: {
      title: "相關文章",
      subtitle: "同分類的更多見解"
    }
  }
};

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-bold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 mt-12">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-10">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 ml-4">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
      <li className="text-lg">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 py-4 mb-6 bg-blue-50 rounded-r-lg">
        <div className="text-lg italic text-gray-800">{children}</div>
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { file, title } = node.data.target.fields;
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || 'Blog image'}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 underline transition-colors duration-300"
      >
        {children}
      </a>
    ),
  },
};

export default function BlogPostPage() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
  const [translatedExcerpt, setTranslatedExcerpt] = useState<string | null>(null);
  const [translatedContent, setTranslatedContent] = useState<Document | null>(null);
  const lastTranslatedSlug = useRef<string | null>(null);

  const fetchRelatedPosts = useCallback(async (category: string) => {
    try {
      const allPosts = await getAllBlogPosts();
      const related = allPosts
        .filter(p => p.fields.category === category && p.sys.id !== post?.sys.id)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  }, [post?.sys.id]);

  const fetchPost = useCallback(async () => {
    try {
      const blogPost = await getBlogPostBySlug(slug);
      if (blogPost) {
        setPost(blogPost);
        await fetchRelatedPosts(blogPost.fields.category);
      } else {
        setError('Blog post not found');
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  }, [slug, fetchRelatedPosts]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, fetchPost]);

  useEffect(() => {
    if (!post || !post.fields || !post.fields.title || !post.fields.excerpt || !post.fields.content) return;
    if (language === 'en') {
      setTranslatedTitle(null);
      setTranslatedExcerpt(null);
      setTranslatedContent(null);
      lastTranslatedSlug.current = post.fields.slug;
      return;
    }
    if (lastTranslatedSlug.current === post.fields.slug) return;
    lastTranslatedSlug.current = post.fields.slug;
    // Helper translate function with Google Translate unofficial
    const googleTranslate = async (text: string, from: string, to: string) => {
      if (!text || !text.trim() || !from || !to) return text;
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) {
          const err = await res.text();
          console.error('Google Translate error:', res.status, err);
          return text;
        }
        const data = await res.json();
        return (data[0] as [string, ...unknown[]][]).map((item) => item[0]).join('');
      } catch (e) {
        console.error('Google Translate fetch error:', e);
        return text;
      }
    };
    // Translate title
    googleTranslate(post.fields.title, 'en', language).then(setTranslatedTitle);
    // Translate excerpt
    googleTranslate(post.fields.excerpt, 'en', language).then(setTranslatedExcerpt);
    // Traverse dan translate rich text
    const content = post.fields.content as Document;
    const translateNodes = async () => {
      // Type guards
      function isText(node: Block | Inline | Text): node is Text {
        return node.nodeType === 'text';
      }
      function isBlock(node: Block | Inline | Text): node is Block {
        return typeof node.nodeType === 'string' && Array.isArray((node as Block).content) && (node as Block).content.every(
          (n: Block | Inline | Text) => typeof n.nodeType === 'string'
        );
      }
      function isInline(node: Block | Inline | Text): node is Inline {
        return typeof node.nodeType === 'string' && Array.isArray((node as Inline).content) && (node as Inline).content.every(
          (n: Block | Inline | Text) => typeof n.nodeType === 'string'
        );
      }
      function isTopLevelBlock(node: Block | Inline | Text): node is TopLevelBlock {
        const validTypes = [
          'paragraph',
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'blockquote',
          'hr',
          'ordered-list',
          'unordered-list',
          'list-item',
          'embedded-asset-block',
          'embedded-entry-block',
          'embedded-entry-inline',
          'table',
          'table-row',
          'table-cell',
          'table-header-cell',
          'document'
        ];
        return typeof node.nodeType === 'string' && validTypes.includes(node.nodeType);
      }
      // Fungsi rekursif aman
      const traverseAndTranslate = async (node: Block | Inline | Text): Promise<Block | Inline | Text> => {
        if (isText(node) && node.value && node.value.trim()) {
          const translated = await googleTranslate(node.value, 'en', language);
          return { ...node, value: translated };
        }
        if (isBlock(node) && node.content) {
          const newContent: (Block | Inline)[] = [];
          for (const child of node.content) {
            const translatedChild = await traverseAndTranslate(child);
            if (isBlock(translatedChild) || isInline(translatedChild)) {
              newContent.push(translatedChild);
            }
          }
          return { ...node, content: newContent };
        }
        if (isInline(node) && node.content) {
          const newContent: (Inline | Text)[] = [];
          for (const child of node.content) {
            const translatedChild = await traverseAndTranslate(child);
            if (isInline(translatedChild) || isText(translatedChild)) {
              newContent.push(translatedChild);
            }
          }
          return { ...node, content: newContent };
        }
        return node;
      };
      const rootDoc = content as Document;
      const newContent: TopLevelBlock[] = [];
      for (const node of rootDoc.content) {
        const translatedNode = await traverseAndTranslate(node);
        if (isTopLevelBlock(translatedNode)) {
          newContent.push(translatedNode);
        }
      }
      setTranslatedContent({ ...rootDoc, content: newContent });
    };
    translateNodes();
  }, [post, language]);

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

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | GSA Blog</title>
        </Head>
        <div className="bg-white min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">{t.loading}</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Head>
          <title>Blog Not Found | GSA Blog</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="bg-white min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.error.title}</h1>
              <p className="text-gray-600 mb-6">{error || t.error.message}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">{t.error.lookingForContent}</h4>
                <p className="text-blue-800 text-sm mb-4">
                  {t.error.description}
                </p>
                <div className="text-left text-sm text-blue-700">
                  <p className="font-medium mb-2">{t.error.toGetStarted}</p>
                  <ol className="list-decimal list-inside space-y-1">
                    {t.error.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-3 text-xs">
                    📖 {t.error.seeGuide}
                  </p>
                </div>
              </div>
              <Link
                href="/blog"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {t.error.backToBlog}
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  // SEO Metadata
  const metaTitle = post.fields.title || 'Blog GSA - Digital Strategic Partner';
  const metaDesc = post.fields.excerpt || 'Artikel, insight, dan berita terbaru dari GSA.';
  const metaImage = post.fields.featuredImage ? `https:${post.fields.featuredImage.fields.file.url}` : 'https://gsagroup.id/og-image.jpg';
  const metaUrl = `https://gsagroup.id/blog/${post.fields.slug}`;
  const metaDate = post.fields.publishDate;
  const metaAuthor = post.fields.author || 'GSA';

  // JSON-LD Article Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metaTitle,
    description: metaDesc,
    image: [metaImage],
    author: [{ '@type': 'Person', name: metaAuthor }],
    publisher: {
      '@type': 'Organization',
      name: 'GSA',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gsagroup.id/logo.png',
      },
    },
    datePublished: metaDate,
    mainEntityOfPage: metaUrl,
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={metaImage} />
        <link rel="canonical" href={metaUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": metaTitle,
              "item": metaUrl
            }
          ]
        }) }} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="relative w-full mt-16 mb-12 overflow-hidden">
          <div className="relative h-[450px] md:h-[500px] flex items-center justify-center rounded-2xl mx-8 md:mx-12 overflow-hidden">
            {post.fields.featuredImage ? (
              <>
                <Image
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  priority
                  className="object-cover w-full h-full absolute z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-1"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 z-0"></div>
            )}
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
              <div className="mb-4">
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-white text-sm transition-colors duration-300"
                >
                  {t.navigation.backToBlog}
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.fields.category}
                </span>
                <span className="text-white/80">•</span>
                <span className="text-white/80 text-sm">
                  {formatDate(post.fields.publishDate)}
                </span>
                <span className="text-white/80">•</span>
                <span className="text-white/80 text-sm">
                  {post.fields.readTime || getReadTime(post.fields.content)} {t.metadata.minRead}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {translatedTitle || post.fields.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {translatedExcerpt || post.fields.excerpt}
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {post.fields.author.charAt(0)}
                  </span>
                </div>
                <span className="text-white font-medium">
                  {t.metadata.by} {post.fields.author}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {documentToReactComponents(
                translatedContent || post.fields.content, renderOptions
              )}
            </motion.div>

            {/* Tags */}
            {post.fields.tags && post.fields.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.content.tags}</h3>
                <div className="flex flex-wrap gap-2">
                  {post.fields.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.content.shareTitle}</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  {t.content.shareButtons.linkedin}
                </button>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300">
                  {t.content.shareButtons.twitter}
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                  {t.content.shareButtons.whatsapp}
                </button>
              </div>
            </motion.div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t.relatedPosts.title}
                </h2>
                <p className="text-gray-600">{t.relatedPosts.subtitle}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.sys.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href={`/blog/${relatedPost.fields.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 h-full">
                        <div className="relative h-48 w-full overflow-hidden">
                          {relatedPost.fields.featuredImage ? (
                            <Image
                              src={`https:${relatedPost.fields.featuredImage.fields.file.url}`}
                              alt={relatedPost.fields.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <div className="text-4xl text-blue-600">📖</div>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="text-sm text-gray-500 mb-2">
                            {formatDate(relatedPost.fields.publishDate)}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {relatedPost.fields.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {relatedPost.fields.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
} 