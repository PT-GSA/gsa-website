'use client';

import Navbar from '../../../src/components/Navbar';
import Footer from '../../../src/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '../../../src/components/I18nProvider';

const translations = {
  en: {
    breadcrumb: 'Home • Services • Outsourcing',
    heroTitle: 'GSA IT Outsourcing',
    heroSubtitle: 'Professional IT Team Solution for Your Project',
    whyTitle: 'Why IT Outsourcing?',
    whyDesc: 'IT outsourcing with GSA gives you access to an experienced professional team without the hassle of recruiting, training, and managing yourself. Focus on your business, let us handle your technology needs.',
    benefits: [
      {
        icon: '/services/IT Cyber Security.svg',
        title: 'Professional Expertise',
        desc: 'Our team consists of experienced IT experts in various fields, ready to support your project.'
      },
      {
        icon: '/services/IT Governance & Compliance.svg',
        title: 'Cost Efficiency',
        desc: 'Save operational costs without reducing the quality of IT services for your business.'
      },
      {
        icon: '/services/Quality Assurance.svg',
        title: 'Focus on Business',
        desc: 'You can focus on business development while IT matters are handled by professionals.'
      }
    ],
    processTitle: 'GSA Outsourcing Process',
    processDesc: 'We ensure a transparent, efficient, and easy-to-follow process for every client.',
    process: [
      { step: 1, title: 'Consultation', desc: 'Discuss your needs and business goals with our team.' },
      { step: 2, title: 'Proposal & Team', desc: 'We propose solutions, team, and cost estimates tailored to your needs.' },
      { step: 3, title: 'Implementation', desc: 'GSA team starts working, you can monitor progress regularly.' },
      { step: 4, title: 'Evaluation & Support', desc: 'We conduct evaluation and are ready to provide ongoing support.' },
    ],
    ctaTitle: 'Ready to Collaborate with a Professional IT Team?',
    ctaDesc: 'Contact us now for a free consultation and the best solution for your business.',
    ctaButton: 'Contact Us',
  },
  id: {
    breadcrumb: 'Beranda • Layanan • Outsourcing',
    heroTitle: 'IT Outsourcing GSA',
    heroSubtitle: 'Solusi Tim IT Profesional untuk Proyek Anda',
    whyTitle: 'Mengapa Outsourcing IT?',
    whyDesc: 'Outsourcing IT bersama GSA memberikan Anda akses ke tim profesional berpengalaman tanpa harus repot merekrut, melatih, dan mengelola sendiri. Fokus pada bisnis Anda, biarkan kami yang menangani kebutuhan teknologi Anda.',
    benefits: [
      {
        icon: '/services/IT Cyber Security.svg',
        title: 'Keahlian Profesional',
        desc: 'Tim kami terdiri dari ahli IT berpengalaman di berbagai bidang, siap mendukung proyek Anda.'
      },
      {
        icon: '/services/IT Governance & Compliance.svg',
        title: 'Efisiensi Biaya',
        desc: 'Hemat biaya operasional tanpa mengurangi kualitas layanan IT untuk bisnis Anda.'
      },
      {
        icon: '/services/Quality Assurance.svg',
        title: 'Fokus pada Bisnis',
        desc: 'Anda dapat fokus pada pengembangan bisnis, sementara urusan IT ditangani oleh profesional.'
      }
    ],
    processTitle: 'Proses Kerja Outsourcing GSA',
    processDesc: 'Kami memastikan proses yang transparan, efisien, dan mudah diikuti untuk setiap klien.',
    process: [
      { step: 1, title: 'Konsultasi', desc: 'Diskusikan kebutuhan dan tujuan bisnis Anda bersama tim kami.' },
      { step: 2, title: 'Penawaran & Tim', desc: 'Kami ajukan solusi, tim, dan estimasi biaya yang sesuai kebutuhan Anda.' },
      { step: 3, title: 'Implementasi', desc: 'Tim GSA mulai bekerja, Anda dapat memantau progres secara berkala.' },
      { step: 4, title: 'Evaluasi & Support', desc: 'Kami lakukan evaluasi dan siap memberikan support berkelanjutan.' },
    ],
    ctaTitle: 'Siap Kolaborasi dengan Tim IT Profesional?',
    ctaDesc: 'Hubungi kami sekarang untuk konsultasi gratis dan solusi terbaik untuk bisnis Anda.',
    ctaButton: 'Hubungi Kami',
  }
};

export default function OutsourcingPage() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Left content */}
          <motion.div
            className="text-center md:text-left text-white max-w-xl mb-8 md:mb-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="text-sm mb-4 opacity-90">{t.breadcrumb}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.heroTitle}</h1>
            <p className="text-lg md:text-2xl opacity-90">{t.heroSubtitle}</p>
          </motion.div>
          {/* Right image */}
          <motion.div
            className="w-full max-w-xs h-60 md:w-96 md:h-96 md:max-w-[400px] relative flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <Image 
              src="/services/IT Administrative & Support.svg" 
              alt="IT Outsourcing" 
              fill 
              className="object-contain" 
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Description & Benefits */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 bg-clip-text text-transparent">{t.whyTitle}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.whyDesc}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.benefits.map((card, i) => (
              <motion.div
                key={card.title}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col items-center h-full justify-between cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                style={{ minHeight: '320px' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(59,130,246,0.15)' }}
              >
                <motion.div
                  className="h-20 w-20 mb-4 flex items-center justify-center"
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <Image src={card.icon} alt={card.title} width={64} height={64} />
                </motion.div>
                <h3 className="font-bold text-xl mb-2 text-blue-600 text-center w-full min-h-[56px] flex items-center justify-center">{card.title}</h3>
                <div className="flex-1 w-full flex items-end">
                  <p className="text-gray-600 text-center w-full">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proses Kerja */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">{t.processTitle}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.processDesc}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.process.map((item, i) => (
              <motion.div
                key={item.step}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4 text-2xl font-bold text-blue-600">{item.step}</span>
                <h4 className="font-semibold text-base mb-2">{item.title}</h4>
                <p className="text-gray-600 text-center text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h3 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">{t.ctaTitle}</h3>
          <p className="text-lg text-gray-600 mb-8">{t.ctaDesc}</p>
          <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-200 inline-block">{t.ctaButton}</a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
} 