'use client';

import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { useI18n } from '../../src/components/I18nProvider';
import { motion } from 'framer-motion';

const translations = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 2025',
    intro: 'Your privacy is important to us. This Privacy Policy explains how GSA collects, uses, and protects your information when you use our website and services.',
    sections: [
      {
        heading: '1. Information We Collect',
        content: 'We may collect personal information such as your name, email address, phone number, and any other information you provide when you contact us or use our services.'
      },
      {
        heading: '2. How We Use Your Information',
        content: 'Your information is used to provide and improve our services, respond to your inquiries, and communicate important updates. We do not sell or share your personal data with third parties except as required by law.'
      },
      {
        heading: '3. Data Security',
        content: 'We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.'
      },
      {
        heading: '4. Cookies',
        content: 'Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.'
      },
      {
        heading: '5. Your Rights',
        content: 'You have the right to access, update, or request deletion of your personal information. Please contact us for any privacy-related requests.'
      },
      {
        heading: '6. Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page.'
      },
      {
        heading: '7. Contact Us',
        content: 'If you have any questions about this Privacy Policy, please contact us at info@gsagroup.id.'
      }
    ]
  },
  id: {
    title: 'Kebijakan Privasi',
    updated: 'Terakhir diperbarui: Juni 2024',
    intro: 'Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana GSA mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan situs web dan layanan kami.',
    sections: [
      {
        heading: '1. Informasi yang Kami Kumpulkan',
        content: 'Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email, nomor telepon, dan informasi lain yang Anda berikan saat menghubungi kami atau menggunakan layanan kami.'
      },
      {
        heading: '2. Cara Kami Menggunakan Informasi Anda',
        content: 'Informasi Anda digunakan untuk menyediakan dan meningkatkan layanan kami, merespons pertanyaan Anda, dan mengirimkan pembaruan penting. Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga kecuali diwajibkan oleh hukum.'
      },
      {
        heading: '3. Keamanan Data',
        content: 'Kami menerapkan langkah-langkah keamanan standar industri untuk melindungi data Anda dari akses, perubahan, atau pengungkapan yang tidak sah.'
      },
      {
        heading: '4. Cookie',
        content: 'Situs web kami dapat menggunakan cookie untuk meningkatkan pengalaman browsing Anda. Anda dapat memilih untuk menonaktifkan cookie di pengaturan browser Anda.'
      },
      {
        heading: '5. Hak Anda',
        content: 'Anda berhak mengakses, memperbarui, atau meminta penghapusan informasi pribadi Anda. Silakan hubungi kami untuk permintaan terkait privasi.'
      },
      {
        heading: '6. Perubahan Kebijakan',
        content: 'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini.'
      },
      {
        heading: '7. Hubungi Kami',
        content: 'Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di info@gsagroup.id.'
      }
    ]
  }
};

export default function PrivacyPage() {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 overflow-hidden py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-white/90 text-lg md:text-2xl mb-2">
              {t.updated}
            </motion.p>
          </div>
        </section>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-gray-700 text-lg md:text-xl mb-8 text-center">
              {t.intro}
            </motion.p>
            <div className="space-y-8">
              {t.sections.map((section, i) => (
                <motion.div key={section.heading} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-gray-50 rounded-2xl shadow p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-2">{section.heading}</h2>
                  <p className="text-gray-700 text-base md:text-lg">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 