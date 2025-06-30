'use client';

import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { useI18n } from '../../src/components/I18nProvider';
import { motion } from 'framer-motion';

const translations = {
  en: {
    title: 'Terms & Conditions',
    updated: 'Last updated: June 2025',
    intro: 'Please read these Terms & Conditions carefully before using the GSA website and services. By accessing or using our site, you agree to be bound by these terms.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: 'By accessing or using the GSA website, you agree to comply with and be bound by these Terms & Conditions and all applicable laws and regulations.'
      },
      {
        heading: '2. Use of the Website',
        content: 'You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else\'s use and enjoyment of the site.'
      },
      {
        heading: '3. Intellectual Property',
        content: 'All content, trademarks, and data on this website, including but not limited to text, images, logos, and software, are the property of GSA or its licensors and are protected by copyright and intellectual property laws.'
      },
      {
        heading: '4. Limitation of Liability',
        content: 'GSA is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or services.'
      },
      {
        heading: '5. Links to Other Sites',
        content: 'Our website may contain links to third-party websites. GSA is not responsible for the content or privacy practices of these sites.'
      },
      {
        heading: '6. Changes to Terms',
        content: 'We may update these Terms & Conditions from time to time. Any changes will be posted on this page.'
      },
      {
        heading: '7. Contact Us',
        content: 'If you have any questions about these Terms & Conditions, please contact us at info@gsagroup.id.'
      }
    ]
  },
  id: {
    title: 'Syarat & Ketentuan',
    updated: 'Terakhir diperbarui: Juni 2025',
    intro: 'Harap baca Syarat & Ketentuan ini dengan saksama sebelum menggunakan situs web dan layanan GSA. Dengan mengakses atau menggunakan situs kami, Anda setuju untuk terikat dengan syarat-syarat ini.',
    sections: [
      {
        heading: '1. Penerimaan Syarat',
        content: 'Dengan mengakses atau menggunakan situs web GSA, Anda setuju untuk mematuhi dan terikat oleh Syarat & Ketentuan ini serta semua hukum dan peraturan yang berlaku.'
      },
      {
        heading: '2. Penggunaan Situs',
        content: 'Anda setuju untuk menggunakan situs web hanya untuk tujuan yang sah dan dengan cara yang tidak melanggar hak, membatasi, atau menghambat penggunaan dan kenikmatan situs oleh pihak lain.'
      },
      {
        heading: '3. Hak Kekayaan Intelektual',
        content: 'Seluruh konten, merek dagang, dan data di situs ini, termasuk namun tidak terbatas pada teks, gambar, logo, dan perangkat lunak, adalah milik GSA atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta dan kekayaan intelektual.'
      },
      {
        heading: '4. Batasan Tanggung Jawab',
        content: 'GSA tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan situs web atau layanan.'
      },
      {
        heading: '5. Tautan ke Situs Lain',
        content: 'Situs web kami dapat berisi tautan ke situs web pihak ketiga. GSA tidak bertanggung jawab atas konten atau praktik privasi situs-situs tersebut.'
      },
      {
        heading: '6. Perubahan Syarat',
        content: 'Kami dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini.'
      },
      {
        heading: '7. Hubungi Kami',
        content: 'Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di info@gsagroup.id.'
      }
    ]
  }
};

export default function TermsPage() {
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