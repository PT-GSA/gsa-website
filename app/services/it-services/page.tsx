'use client';

import Navbar from '../../../src/components/Navbar';
import Footer from '../../../src/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ITServicesPage() {
  const services = [
    {
      icon: '/services/Software Development.svg',
      title: 'Pengembangan Perangkat Lunak',
      desc: 'Solusi pengembangan aplikasi web, mobile, dan sistem berbasis cloud yang disesuaikan dengan kebutuhan bisnis Anda.'
    },
    {
      icon: '/services/IT Cyber Security.svg',
      title: 'Keamanan Siber',
      desc: 'Lindungi data dan sistem Anda dengan layanan keamanan siber, audit, dan implementasi standar keamanan terbaik.'
    },
    {
      icon: '/services/IT Administrative & Support.svg',
      title: 'IT Support & Administrasi',
      desc: 'Dukungan teknis, pemeliharaan, dan administrasi infrastruktur IT untuk kelancaran operasional bisnis.'
    },
    {
      icon: '/services/IT Governance & Compliance.svg',
      title: 'IT Governance & Compliance',
      desc: 'Penerapan tata kelola IT, kepatuhan, dan manajemen risiko untuk memastikan bisnis Anda berjalan sesuai regulasi.'
    },
    {
      icon: '/services/Quality Assurance.svg',
      title: 'Quality Assurance',
      desc: 'Jaminan kualitas perangkat lunak dan sistem melalui pengujian, audit, dan continuous improvement.'
    },
    {
      icon: '/services/Product Management.svg',
      title: 'Manajemen Produk IT',
      desc: 'Pendampingan dalam pengelolaan siklus hidup produk digital, mulai dari ide hingga implementasi.'
    },
  ];

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
            <div className="text-sm mb-4 opacity-90">Beranda • Layanan • IT Services</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Layanan IT GSA</h1>
            <p className="text-lg md:text-2xl opacity-90">Solusi IT Terintegrasi untuk Bisnis Modern</p>
          </motion.div>
          {/* Right image */}
          <motion.div
            className="w-full max-w-xs h-60 md:w-96 md:h-96 md:max-w-[400px] relative flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <Image 
              src="/services/Software Development.svg" 
              alt="IT Services" 
              fill 
              className="object-contain" 
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Description */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 bg-clip-text text-transparent">Layanan IT Profesional & Terpercaya</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            GSA menyediakan berbagai layanan IT untuk mendukung transformasi digital, efisiensi operasional, dan pertumbuhan bisnis Anda. Tim kami siap membantu dari konsultasi, implementasi, hingga support berkelanjutan.
          </p>
        </motion.div>
      </section>

      {/* Service Cards */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="bg-blue-50 rounded-3xl shadow-lg p-8 flex flex-col items-center text-center cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(59,130,246,0.15)' }}
              >
                <motion.div
                  className="mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <Image src={service.icon} alt={service.title} width={72} height={72} />
                </motion.div>
                <h3 className="font-bold text-xl mb-2 text-blue-600">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">Proses Layanan IT GSA</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami memastikan setiap layanan berjalan transparan, efisien, dan sesuai kebutuhan klien.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Konsultasi', desc: 'Diskusi kebutuhan dan analisa solusi IT terbaik.' },
              { step: 2, title: 'Perencanaan', desc: 'Penyusunan rencana kerja, tim, dan estimasi biaya.' },
              { step: 3, title: 'Implementasi', desc: 'Eksekusi layanan oleh tim profesional GSA.' },
              { step: 4, title: 'Support', desc: 'Dukungan dan evaluasi berkelanjutan untuk hasil optimal.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                whileHover={{ scale: 1.07, boxShadow: '0 8px 32px rgba(59,130,246,0.18)' }}
              >
                <motion.span
                  className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4 text-2xl font-bold text-blue-600"
                  whileHover={{ scale: 1.18, boxShadow: '0 0 0 8px #dbeafe' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 12 }}
                >
                  {item.step}
                </motion.span>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
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
          <h3 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">Butuh Solusi IT untuk Bisnis Anda?</h3>
          <p className="text-lg text-gray-600 mb-8">Hubungi tim GSA sekarang untuk konsultasi gratis dan penawaran terbaik.</p>
          <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-200 inline-block">Hubungi Kami</a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
} 