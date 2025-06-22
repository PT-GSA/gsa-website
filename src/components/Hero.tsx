'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "Welcome to the",
    digitalPartner: "Digital Strategic Partner",
    tellUsWhatYouNeed: "Tell us what you need",
    searchPlaceholder: "AI Intelligence"
  },
  id: {
    companyName: "Gemerlang Sejahtera Abadi",
    welcomeTo: "Selamat Datang di",
    digitalPartner: "Mitra Strategis Digital",
    tellUsWhatYouNeed: "Beritahu kami apa yang Anda butuhkan",
    searchPlaceholder: "Kecerdasan Buatan"
  }
};

const Hero = () => {
  const [text, setText] = useState('');
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  const fullText = t.digitalPartner;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Reset animation after completion
        setTimeout(() => {
          currentIndex = 0;
          setText('');
        }, 2000); // Wait 2 seconds before restarting
      }
    }, 150); // Slowed down typing speed for better readability

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center px-4 relative overflow-hidden pt-8">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-full pt-2">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xl text-white mb-10 font-medium">
            {t.companyName}
          </motion.h2>

          <div className="mb-20">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t.welcomeTo}
            </motion.h1>
            <div className="relative h-[1.2em] flex items-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-white whitespace-nowrap border-r-4 border-white inline-block animate-typing px-2">{text}</h1>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="relative max-w-6xl">
            <p className="text-white/90 mb-8 text-lg font-medium">{t.tellUsWhatYouNeed}</p>
            <div className="relative">
              <input type="text" placeholder={t.searchPlaceholder} className="w-full px-8 py-6 rounded-2xl text-gray-800 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30 pl-20 text-lg font-medium shadow-2xl" />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-8 h-8">
                <Image src="/Home/Logo AI Intelligence.png" alt="AI Intelligence" width={32} height={32} className="object-contain" />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Hero;
