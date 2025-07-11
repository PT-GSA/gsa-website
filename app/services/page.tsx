'use client';

import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../src/components/I18nProvider';
import Head from 'next/head';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    breadcrumb: "Home • Services",
    pageTitle: "GSA Services",
    pageSubtitle: "Services we offer for your Project",
    itOutsourcing: {
      badge: "IT OUTSOURCING",
      title: "Need a Team for your project?",
      subtitle: "We can support your project by offering our expert team with proven track record and professional expertise"
    },
    bestSolution: {
      title: "We are the best solution",
      titleHighlight: "for all your IT needs!",
      subtitle: "Comprehensive IT solutions tailored to your business requirements"
    },
    softwareSkills: {
      title: "Our Software Skills",
      subtitle: "Technologies and tools we master to deliver exceptional results"
    },
    professionalServices: {
      badge: "IT SERVICES",
      title: "Our Professional Services",
      subtitle: "Choose from our comprehensive range of professional IT services designed to accelerate your business growth",
      budgetFrom: "Budget From",
      buyNow: "Buy Now"
    },
    contact: {
      title: "Contact us for more information",
      button: "Contact Us"
    },
    teamProfiles: {
      keySkills: "Key Skills & Expertise",
      profiles: [
        {
          name: 'Boedi Moelya M. Fikih',
          title: 'GSA Project Director',
          description: 'A professional web developer and SEO expert with extensive experience in building efficient, results-driven digital solutions. Combines strong technical skills with a deep understanding of online strategy to create websites that are not only visually engaging but also performance-optimized.',
          skills: ['WordPress Development', 'Search Engine Optimization (SEO)', 'Front-End Development', 'Web Performance Optimization', 'UI/UX Design & Responsiveness', 'Google Analytics & Search Console', 'Technical SEO Audit & Implementation']
        },
        {
          name: 'M Syahrul Hidayat',
          title: 'GSA Digital Marketing & Branding Specialist',
          description: 'A Young Innovator & Digitalization Enthusiast with a strong Business Management and IT background. Passionate about modern digital transformation, leveraging technology for innovation, efficiency, and growth to empower businesses and communities.',
          skills: ['Digitalization & Innovation', 'Business & IT Integration', 'Creative Problem-Solving', 'Branding & Digital Presence', 'Community & Talent Management', 'Event & Project Management']
        },
        {
          name: 'Kevie Hendrix',
          title: 'Representative Project Manager',
          description: 'A seasoned Project Manager & Business Development Leader with 20+ years of experience in IT solutions, digital transformation, and outsourcing management. Proven expertise in high-value contracts, international partnerships, and vendor negotiations, making him the ideal USA Representative for IT companies expanding into the US market.',
          skills: ['Project & Program Management', 'Business Development & B2B/Government Sales', 'Contract & Vendor Negotiation', 'IT & Digital Solutions Consulting', 'Supplier & Outsourcing Management', 'Financial & Operational Auditing']
        },
        {
          name: 'Oliver King-Smith',
          title: 'AI Strategy & Innovation Specialist Representative',
          description: 'Oliver Peter King-Smith is a prolific inventor and entrepreneur in the fields of sensors, healthcare technology, and artificial intelligence. At his company smartR AI, he spearheads innovative patent applications that harness AI for societal impact, including advancements in health tracking, support for vulnerable populations, and resource optimization. One of his notable inventions is the alertR device, aimed at enhancing independence and quality of life.',
          skills: ['AI Strategy & Innovation', 'Healthcare Technology', 'Patent Development', 'Sensor Technology', 'Business Strategy', 'Product Development']
        }
      ]
    },
    solutionCards: [
      {
        title: 'Creative & Design',
        items: ['UI/UX Design', 'Graphic Design', 'Branding', 'Logo Design', 'Motion Graphics', 'Video Editing', '3D Design', 'Figma', 'Adobe Suite']
      },
      {
        title: 'Software Development',
        items: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions', 'AI/ML', 'Blockchain', 'IoT', 'DevOps']
      },
      {
        title: 'Game Development',
        items: ['Unity Development', 'Unreal Engine', '2D/3D Games', 'VR/AR', 'Game Design']
      },
      {
        title: 'Digital Marketing',
        items: ['SEO Optimization', 'Social Media', 'Content Marketing', 'PPC Campaigns', 'Analytics']
      }
    ],
    serviceCards: [
      {
        title: 'Advanced AI',
        desc: 'AI-powered business solutions for automation, analytics, and customer engagement to drive digital transformation.',
        category: 'ARTIFICIAL INTELLIGENCE',
        features: ['AI-Powered Business Solutions', 'Assistive Intelligence', 'AI Automation & Optimization', 'Machine Learning & Analytics', 'AI-Powered Robotics Integration', 'AI for Healthcare & Finance', 'AI Customization & Training', 'Data Security & Privacy']
      },
      {
        title: 'AR & VR Solutions',
        desc: 'Immersive AR/VR experiences for training, marketing, and interactive applications across industries.',
        category: 'AUGMENTED REALITY',
        features: ['Virtual Reality Development', 'Augmented Reality Apps', 'Immersive Training Solutions', 'VR/AR Marketing Tools', 'Interactive 3D Experiences', 'Cross-Platform Compatibility']
      },
      {
        title: 'IoT Solutions',
        desc: 'Smart device integration and IoT ecosystems for enhanced business intelligence and automation.',
        category: 'INTERNET OF THINGS',
        features: ['Smart Device Integration', 'IoT Ecosystem Development', 'Real-time Data Analytics', 'Automated Control Systems', 'Cloud IoT Platforms', 'Security & Monitoring']
      },
      {
        title: 'ERP Software',
        desc: 'Custom enterprise resource planning solutions to streamline and automate your business processes.',
        category: 'ENTERPRISE SOFTWARE',
        features: ['Custom ERP Development', 'Business Process Automation', 'Financial Management', 'Inventory & Supply Chain', 'CRM Integration', 'Reporting & Analytics']
      },
      {
        title: 'Gaming & Web3',
        desc: 'Next-generation gaming experiences with blockchain integration, NFTs, and decentralized solutions.',
        category: 'BLOCKCHAIN GAMING',
        features: ['Blockchain Game Development', 'NFT Integration', 'Decentralized Gaming', 'Smart Contracts', 'Token Economics', 'Web3 Wallet Integration']
      },
      {
        title: 'IT Governance',
        desc: 'Comprehensive IT governance frameworks ensuring compliance, security, and operational excellence.',
        category: 'COMPLIANCE',
        features: ['IT Policy Development', 'Compliance Auditing', 'Risk Management', 'Security Frameworks', 'Data Governance', 'Operational Excellence']
      }
    ]
  },
  id: {
    breadcrumb: "Beranda • Layanan",
    pageTitle: "Layanan GSA",
    pageSubtitle: "Layanan yang kami tawarkan untuk Proyek Anda",
    itOutsourcing: {
      badge: "IT OUTSOURCING",
      title: "Butuh Tim untuk proyek Anda?",
      subtitle: "Kami dapat mendukung proyek Anda dengan menawarkan tim ahli kami yang memiliki rekam jejak terbukti dan keahlian profesional"
    },
    bestSolution: {
      title: "Kami adalah solusi terbaik",
      titleHighlight: "untuk semua kebutuhan IT Anda!",
      subtitle: "Solusi IT komprehensif yang disesuaikan dengan kebutuhan bisnis Anda"
    },
    softwareSkills: {
      title: "Keahlian Perangkat Lunak Kami",
      subtitle: "Teknologi dan alat yang kami kuasai untuk memberikan hasil yang luar biasa"
    },
    professionalServices: {
      badge: "LAYANAN IT",
      title: "Layanan Profesional Kami",
      subtitle: "Pilih dari berbagai layanan IT profesional komprehensif kami yang dirancang untuk mempercepat pertumbuhan bisnis Anda",
      budgetFrom: "Anggaran Mulai dari",
      buyNow: "Beli Sekarang"
    },
    contact: {
      title: "Hubungi kami untuk informasi lebih lanjut",
      button: "Hubungi Kami"
    },
    teamProfiles: {
      keySkills: "Keahlian & Expertise Utama",
      profiles: [
        {
          name: 'Boedi Moelya M. Fikih',
          title: 'Direktur Proyek GSA',
          description: 'Seorang pengembang web profesional dan ahli SEO dengan pengalaman luas dalam membangun solusi digital yang efisien dan berorientasi hasil. Menggabungkan keterampilan teknis yang kuat dengan pemahaman mendalam tentang strategi online untuk menciptakan website yang tidak hanya menarik secara visual tetapi juga dioptimalkan untuk performa.',
          skills: ['Pengembangan WordPress', 'Search Engine Optimization (SEO)', 'Pengembangan Front-End', 'Optimisasi Performa Web', 'Desain UI/UX & Responsivitas', 'Google Analytics & Search Console', 'Audit & Implementasi SEO Teknis']
        },
        {
          name: 'M Syahrul Hidayat',
          title: 'Spesialis Digital Marketing & Branding GSA',
          description: 'Seorang Inovator Muda & Penggemar Digitalisasi dengan latar belakang Manajemen Bisnis dan IT yang kuat. Bersemangat tentang transformasi digital modern, memanfaatkan teknologi untuk inovasi, efisiensi, dan pertumbuhan untuk memberdayakan bisnis dan komunitas.',
          skills: ['Digitalisasi & Inovasi', 'Integrasi Bisnis & IT', 'Pemecahan Masalah Kreatif', 'Branding & Kehadiran Digital', 'Manajemen Komunitas & Talenta', 'Manajemen Acara & Proyek']
        },
        {
          name: 'Kevie Hendrix',
          title: 'Manajer Proyek Perwakilan',
          description: 'Seorang Manajer Proyek berpengalaman & Pemimpin Pengembangan Bisnis dengan pengalaman 20+ tahun dalam solusi IT, transformasi digital, dan manajemen outsourcing. Keahlian terbukti dalam kontrak bernilai tinggi, kemitraan internasional, dan negosiasi vendor, menjadikannya Perwakilan USA yang ideal untuk perusahaan IT yang ekspansi ke pasar AS.',
          skills: ['Manajemen Proyek & Program', 'Pengembangan Bisnis & Penjualan B2B/Pemerintah', 'Negosiasi Kontrak & Vendor', 'Konsultasi Solusi IT & Digital', 'Manajemen Supplier & Outsourcing', 'Audit Keuangan & Operasional']
        },
        {
          name: 'Oliver King-Smith',
          title: 'Spesialis Strategi AI & Inovasi Perwakilan',
          description: 'Oliver Peter King-Smith adalah seorang penemu dan pengusaha produktif di bidang sensor, teknologi kesehatan, dan kecerdasan buatan. Di perusahaannya smartR AI, dia memimpin aplikasi paten inovatif yang memanfaatkan AI untuk dampak sosial, termasuk kemajuan dalam pelacakan kesehatan, dukungan untuk populasi rentan, dan optimisasi sumber daya. Salah satu penemuannya yang terkenal adalah perangkat alertR, yang bertujuan meningkatkan kemandirian dan kualitas hidup.',
          skills: ['Strategi AI & Inovasi', 'Teknologi Kesehatan', 'Pengembangan Paten', 'Teknologi Sensor', 'Strategi Bisnis', 'Pengembangan Produk']
        }
      ]
    },
    solutionCards: [
      {
        title: 'Kreatif & Desain',
        items: ['Desain UI/UX', 'Desain Grafis', 'Branding', 'Desain Logo', 'Motion Graphics', 'Video Editing', 'Desain 3D', 'Figma', 'Adobe Suite']
      },
      {
        title: 'Pengembangan Perangkat Lunak',
        items: ['Aplikasi Web', 'Aplikasi Mobile', 'Pengembangan API', 'Solusi Cloud', 'AI/ML', 'Blockchain', 'IoT', 'DevOps']
      },
      {
        title: 'Pengembangan Game',
        items: ['Pengembangan Unity', 'Unreal Engine', 'Game 2D/3D', 'VR/AR', 'Desain Game']
      },
      {
        title: 'Digital Marketing',
        items: ['Optimisasi SEO', 'Media Sosial', 'Content Marketing', 'Kampanye PPC', 'Analytics']
      }
    ],
    serviceCards: [
      {
        title: 'AI Lanjutan',
        desc: 'Solusi bisnis bertenaga AI untuk otomasi, analitik, dan keterlibatan pelanggan untuk mendorong transformasi digital.',
        category: 'KECERDASAN BUATAN',
        features: ['Solusi Bisnis Bertenaga AI', 'Kecerdasan Bantuan', 'Otomasi & Optimisasi AI', 'Machine Learning & Analytics', 'Integrasi Robotika Bertenaga AI', 'AI untuk Kesehatan & Keuangan', 'Kustomisasi & Pelatihan AI', 'Keamanan & Privasi Data']
      },
      {
        title: 'Solusi AR & VR',
        desc: 'Pengalaman AR/VR yang imersif untuk pelatihan, pemasaran, dan aplikasi interaktif di berbagai industri.',
        category: 'AUGMENTED REALITY',
        features: ['Pengembangan Virtual Reality', 'Aplikasi Augmented Reality', 'Solusi Pelatihan Imersif', 'Alat Pemasaran VR/AR', 'Pengalaman 3D Interaktif', 'Kompatibilitas Cross-Platform']
      },
      {
        title: 'Solusi IoT',
        desc: 'Integrasi perangkat pintar dan ekosistem IoT untuk meningkatkan business intelligence dan otomasi.',
        category: 'INTERNET OF THINGS',
        features: ['Integrasi Perangkat Pintar', 'Pengembangan Ekosistem IoT', 'Analitik Data Real-time', 'Sistem Kontrol Otomatis', 'Platform IoT Cloud', 'Keamanan & Monitoring']
      },
      {
        title: 'Perangkat Lunak ERP',
        desc: 'Solusi perencanaan sumber daya perusahaan kustom untuk merampingkan dan mengotomatisasi proses bisnis Anda.',
        category: 'PERANGKAT LUNAK ENTERPRISE',
        features: ['Pengembangan ERP Kustom', 'Otomasi Proses Bisnis', 'Manajemen Keuangan', 'Inventori & Supply Chain', 'Integrasi CRM', 'Pelaporan & Analytics']
      },
      {
        title: 'Gaming & Web3',
        desc: 'Pengalaman gaming generasi berikutnya dengan integrasi blockchain, NFT, dan solusi terdesentralisasi.',
        category: 'BLOCKCHAIN GAMING',
        features: ['Pengembangan Game Blockchain', 'Integrasi NFT', 'Gaming Terdesentralisasi', 'Smart Contracts', 'Token Economics', 'Integrasi Web3 Wallet']
      },
      {
        title: 'IT Governance',
        desc: 'Framework tata kelola IT komprehensif yang memastikan kepatuhan, keamanan, dan keunggulan operasional.',
        category: 'KEPATUHAN',
        features: ['Pengembangan Kebijakan IT', 'Audit Kepatuhan', 'Manajemen Risiko', 'Framework Keamanan', 'Tata Kelola Data', 'Keunggulan Operasional']
      }
    ]
  }
};

const teamProfiles = [
  {
    image: '/services/42.svg',
    name: 'Boedi Moelya M. Fikih',
    country: 'Indonesia',
    title: 'GSA Project Director',
    description: 'A professional web developer and SEO expert with extensive experience in building efficient, results-driven digital solutions. Combines strong technical skills with a deep understanding of online strategy to create websites that are not only visually engaging but also performance-optimized.',
    skills: ['WordPress Development', 'Search Engine Optimization (SEO)', 'Front-End Development', 'Web Performance Optimization', 'UI/UX Design & Responsiveness', 'Google Analytics & Search Console', 'Technical SEO Audit & Implementation'],
  },
  {
    image: '/services/43.svg',
    name: 'M Syahrul Hidayat',
    country: 'Indonesia',
    title: 'GSA Digital Marketing & Branding Specialist',
    description: 'A Young Innovator & Digitalization Enthusiast with a strong Business Management and IT background. Passionate about modern digital transformation, leveraging technology for innovation, efficiency, and growth to empower businesses and communities.',
    skills: ['Digitalization & Innovation', 'Business & IT Integration', 'Creative Problem-Solving', 'Branding & Digital Presence', 'Community & Talent Management', 'Event & Project Management'],
  },
  {
    image: '/services/44.svg',
    name: 'Kevie Hendrix',
    country: 'USA',
    title: 'Representative Project Manager',
    description: 'A seasoned Project Manager & Business Development Leader with 20+ years of experience in IT solutions, digital transformation, and outsourcing management. Proven expertise in high-value contracts, international partnerships, and vendor negotiations, making him the ideal USA Representative for IT companies expanding into the US market.',
    skills: ['Project & Program Management', 'Business Development & B2B/Government Sales', 'Contract & Vendor Negotiation', 'IT & Digital Solutions Consulting', 'Supplier & Outsourcing Management', 'Financial & Operational Auditing'],
  },
  {
    image: '/services/45.svg',
    name: 'Oliver King-Smith',
    country: 'United Kingdom',
    title: 'AI Strategy & Innovation Specialist Representative',
    description:
      'Oliver Peter King-Smith is a prolific inventor and entrepreneur in the fields of sensors, healthcare technology, and artificial intelligence. At his company smartR AI, he spearheads innovative patent applications that harness AI for societal impact, including advancements in health tracking, support for vulnerable populations, and resource optimization. One of his notable inventions is the alertR device, aimed at enhancing independence and quality of life.',
    skills: ['AI Strategy & Innovation', 'Healthcare Technology', 'Patent Development', 'Sensor Technology', 'Business Strategy', 'Product Development'],
  },
];

const solutionCards = [
  {
    title: 'Creative & Design',
    image: '/services/Product Management.svg',
    items: ['UI/UX Design', 'Graphic Design', 'Branding', 'Logo Design', 'Motion Graphics', 'Video Editing', '3D Design', 'Figma', 'Adobe Suite'],
  },
  {
    title: 'Software Development',
    image: '/services/Software Development.svg',
    items: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions', 'AI/ML', 'Blockchain', 'IoT', 'DevOps'],
  },
  {
    title: 'Game Development',
    image: '/services/Game Development.svg',
    items: ['Unity Development', 'Unreal Engine', '2D/3D Games', 'VR/AR', 'Game Design'],
  },
  {
    title: 'Digital Marketing',
    image: '/services/Technical Writing.svg',
    items: ['SEO Optimization', 'Social Media', 'Content Marketing', 'PPC Campaigns', 'Analytics'],
  },
];

const serviceCards = [
  {
    title: 'Advanced AI',
    desc: 'AI-powered business solutions for automation, analytics, and customer engagement to drive digital transformation.',
    price: '999.99',
    image: '/services/Research & Innovation.png',
    category: 'ARTIFICIAL INTELLIGENCE',
    color: 'bg-blue-500',
    isNew: true,
    features: ['AI-Powered Business Solutions', 'Assistive Intelligence', 'AI Automation & Optimization', 'Machine Learning & Analytics', 'AI-Powered Robotics Integration', 'AI for Healthcare & Finance', 'AI Customization & Training', 'Data Security & Privacy'],
  },
  {
    title: 'AR & VR Solutions',
    desc: 'Immersive AR/VR experiences for training, marketing, and interactive applications across industries.',
    price: '1299.99',
    image: '/services/Quality Assurance.png',
    category: 'AUGMENTED REALITY',
    color: 'bg-purple-500',
    isNew: false,
    features: ['Virtual Reality Development', 'Augmented Reality Apps', 'Immersive Training Solutions', 'VR/AR Marketing Tools', 'Interactive 3D Experiences', 'Cross-Platform Compatibility'],
  },
  {
    title: 'IoT Solutions',
    desc: 'Smart device integration and IoT ecosystems for enhanced business intelligence and automation.',
    price: '899.99',
    image: '/services/IT Cyber Security.png',
    category: 'INTERNET OF THINGS',
    color: 'bg-green-500',
    isNew: true,
    features: ['Smart Device Integration', 'IoT Ecosystem Development', 'Real-time Data Analytics', 'Automated Control Systems', 'Cloud IoT Platforms', 'Security & Monitoring'],
  },
  {
    title: 'ERP Software',
    desc: 'Custom enterprise resource planning solutions to streamline and automate your business processes.',
    price: '2299.99',
    image: '/services/IT Administrative & Support.png',
    category: 'ENTERPRISE SOFTWARE',
    color: 'bg-indigo-500',
    isNew: false,
    features: ['Custom ERP Development', 'Business Process Automation', 'Financial Management', 'Inventory & Supply Chain', 'CRM Integration', 'Reporting & Analytics'],
  },
  {
    title: 'Gaming & Web3',
    desc: 'Next-generation gaming experiences with blockchain integration, NFTs, and decentralized solutions.',
    price: '1599.99',
    image: '/services/Game Development.png',
    category: 'BLOCKCHAIN GAMING',
    color: 'bg-pink-500',
    isNew: true,
    features: ['Blockchain Game Development', 'NFT Integration', 'Decentralized Gaming', 'Smart Contracts', 'Token Economics', 'Web3 Wallet Integration'],
  },
  {
    title: 'IT Governance',
    desc: 'Comprehensive IT governance frameworks ensuring compliance, security, and operational excellence.',
    price: '799.99',
    image: '/services/IT Governance & Compliance.png',
    category: 'COMPLIANCE',
    color: 'bg-teal-500',
    isNew: false,
    features: ['IT Policy Development', 'Compliance Auditing', 'Risk Management', 'Security Frameworks', 'Data Governance', 'Operational Excellence'],
  },
];

const softwareLogos = Array.from({ length: 24 }, (_, i) => `/services/Logo software/${60 + i}.png`);

function TeamCarousel() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const [index, setIndex] = useState(0);
  const profile = teamProfiles[index];
  const translatedProfile = t.teamProfiles.profiles[index];
  const next = () => setIndex((i) => (i + 1) % teamProfiles.length);
  const prev = () => setIndex((i) => (i - 1 + teamProfiles.length) % teamProfiles.length);

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      Indonesia: '🇮🇩',
      USA: '🇺🇸',
      'United Kingdom': '🇬🇧',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center gap-4 py-8 flex-wrap">
        <button onClick={prev} className="group w-10 h-10 md:w-16 md:h-16 bg-white hover:bg-blue-600 border-2 border-blue-200 hover:border-blue-600 rounded-full transition-all duration-300 flex-shrink-0 flex items-center justify-center shadow-lg hover:shadow-xl">
          <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 rounded-3xl shadow-2xl border border-gray-200 p-1 max-w-full w-full md:max-w-5xl">
          <div className="bg-white rounded-3xl p-4 md:p-8 h-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-8">
              {/* Profile Image */}
              <div className="relative w-full max-w-xs h-60 md:w-64 md:h-80 rounded-3xl overflow-hidden flex-shrink-0">
                <Image src={profile.image} alt={profile.name} fill className="object-contain" />
              </div>
              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                {/* Country & Flag */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCountryFlag(profile.country)}</span>
                  <span className="text-gray-600 font-medium">{profile.country}</span>
                </div>
                {/* Name */}
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    {profile.name.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? 'text-blue-600' : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">{translatedProfile.title}</p>
                </div>
                {/* Description */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-base">{translatedProfile.description}</p>
                </div>
                {/* Skills */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-4 text-lg">{t.teamProfiles.keySkills}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {translatedProfile.skills.map((skill) => (
                      <div key={skill} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <button onClick={next} className="group w-10 h-10 md:w-16 md:h-16 bg-white hover:bg-blue-600 border-2 border-blue-200 hover:border-blue-600 rounded-full transition-all duration-300 flex-shrink-0 flex items-center justify-center shadow-lg hover:shadow-xl">
          <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {/* Pagination dots */}
      <div className="flex justify-center gap-3 mt-8">
        {teamProfiles.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-4 h-4 rounded-full transition-all duration-300 ${i === index ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];

  return (
    <>
      <Head>
        <title>{t.pageTitle} | GSA</title>
        <meta name="description" content={t.pageSubtitle} />
        <meta property="og:title" content={`${t.pageTitle} | GSA`} />
        <meta property="og:description" content={t.pageSubtitle} />
        <meta property="og:image" content="https://gsagroup.id/services/42.png" />
        <meta property="og:url" content="https://gsagroup.id/services" />
        <link rel="canonical" href="https://gsagroup.id/services" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GSA",
          "url": "https://gsagroup.id/services",
          "logo": "https://gsagroup.id/services/42.png",
          "description": t.pageSubtitle
        }) }} />
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
              "name": t.pageTitle,
              "item": "https://gsagroup.id/services"
            }
          ]
        }) }} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
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
              <div className="w-full max-w-xs h-60 md:w-96 md:h-96 md:max-w-[400px] relative flex-shrink-0">
                <Image 
                  src="/Home/Elemen Design Website Company GSA (44) 1.svg" 
                  alt="GSA Robot" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* IT Outsourcing Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-full text-sm mb-4">{t.itOutsourcing.badge}</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">{t.itOutsourcing.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.itOutsourcing.subtitle}</p>
            </div>
            <TeamCarousel />
          </div>
        </section>

        {/* Best Solution Section */}
        <section className="bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                {t.bestSolution.title}
                <br />
                <span className="text-blue-600">{t.bestSolution.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.bestSolution.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutionCards.map((card, i) => (
                <motion.div key={i} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 p-8 flex flex-col items-center transition-all duration-300 group" whileHover={{ y: -8 }}>
                  <div className="w-40 h-40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image src={card.image} alt={card.title} width={120} height={120} className="object-contain" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-center text-gray-800">{t.solutionCards[i].title}</h3>
                  <ul className="text-sm space-y-2 w-full text-gray-600">
                    {t.solutionCards[i].items.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-left">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Software Skills */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t.softwareSkills.title}</h3>
              <p className="text-lg text-gray-600">{t.softwareSkills.subtitle}</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 items-center">
              {softwareLogos.map((logo, i) => (
                <motion.div key={i} className="w-full max-w-xs h-20 flex items-center justify-center transition-all duration-300 group" whileHover={{ scale: 1.1 }}>
                  <Image src={logo} alt={`Technology ${i + 60}`} width={96} height={96} className="object-contain group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Services */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-full text-sm mb-4">{t.professionalServices.badge}</div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                {t.professionalServices.title}
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.professionalServices.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCards.map((card, i) => (
                <motion.div key={i} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 p-8 flex flex-col transition-all duration-300 group relative" whileHover={{ y: -5 }}>
                  {/* New Badge */}
                  {card.isNew && (
                    <div className="absolute top-6 left-6">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">New</span>
                    </div>
                  )}

                  {/* Title */}
                  <div className="mt-8 mb-6">
                    <h4 className="font-bold text-2xl text-gray-800">{t.serviceCards[i].title}</h4>
                  </div>

                  {/* Features List */}
                  <div className="mb-8 flex-1">
                    <ul className="space-y-3">
                      {t.serviceCards[i].features.map((feature) => (
                        <li key={feature} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2">{t.professionalServices.budgetFrom}</div>
                    <div className="text-3xl font-bold text-gray-800">${card.price}</div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-center">
                      {t.professionalServices.buyNow}
                    </a>

                    {/* Cart Icon */}
                    <button className="w-12 h-12 bg-purple-100 hover:bg-purple-200 rounded-2xl flex items-center justify-center transition-all duration-200 group">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                        <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
                      </svg>
                    </button>

                    {/* Heart Icon */}
                    <button className="w-12 h-12 bg-purple-100 hover:bg-purple-200 rounded-2xl flex items-center justify-center transition-all duration-200 group">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h4 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
              {t.contact.title}
            </h4>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-200">
              {t.contact.button}
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
