'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from './I18nProvider';
import { motion } from 'framer-motion';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    home: "Home",
    about: "About Us",
    services: "Services",
    blog: "Blog",
    contact: "Contact"
  },
  id: {
    home: "Beranda",
    about: "Tentang Kami",
    services: "Layanan",
    blog: "Blog",
    contact: "Kontak"
  },
  ja: {
    home: "ホーム",
    about: "私たちについて",
    services: "サービス",
    blog: "ブログ",
    contact: "お問い合わせ"
  },
  'zh-TW': {
    home: "首頁",
    about: "關於我們",
    services: "服務",
    blog: "部落格",
    contact: "聯絡我們"
  }
};

const languageOptions = [
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-TW', label: '繁體中文' }
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href}>
      <motion.span className="text-white px-3 py-2 text-base font-medium cursor-pointer hover:text-white/80 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </motion.span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useI18n();
  const t = translations[language as keyof typeof translations] || translations['en'];

  return (
    <nav className="sticky top-0 w-full z-50 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div className="w-20 h-10 md:w-28 md:h-16 relative cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image src="/Home/Elemen Design Website Company GSA (45) 1.svg" alt="GSA Logo" fill className="object-contain" />
              </motion.div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">{t.home}</NavLink>
            <NavLink href="/about">{t.about}</NavLink>
            <NavLink href="/services">{t.services}</NavLink>
            <NavLink href="/blog">{t.blog}</NavLink>
            <NavLink href="/contact">{t.contact}</NavLink>
          </div>

          {/* Language Dropdown */}
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={e => changeLanguage(e.target.value)}
              className="bg-white/15 backdrop-blur-md rounded-full border border-white/20 cursor-pointer hover:bg-white/25 transition-all duration-300 px-3 py-1 text-xs font-medium text-gray-900"
            >
              {languageOptions.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.label}</option>
              ))}
            </select>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="md:hidden pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-1 pt-4">
              <NavLink href="/">{t.home}</NavLink>
              <NavLink href="/about">{t.about}</NavLink>
              <NavLink href="/services">{t.services}</NavLink>
              <NavLink href="/blog">{t.blog}</NavLink>
              <NavLink href="/contact">{t.contact}</NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
