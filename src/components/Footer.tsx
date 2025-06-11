'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Location</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white/90 leading-relaxed">
                  Kompetisi Strategic Square, Jl. Jenderal Sudirman,
                  <br />
                  Karet Semanggi, Setiabudi, Jakarta Selatan,
                  <br />
                  DKI Jakarta 12930
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Email</h3>
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@gsa.co.id" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
                info@gsa.co.id
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="space-y-4">
            <h3 className="text-xl font-bold mb-6">Contact & Social Media</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-white/90 font-medium">+62 878-3421-7963</p>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.219-.359-1.219c0-1.14.661-1.989 1.485-1.989.699 0 1.037.525 1.037 1.155 0 .703-.448 1.754-.679 2.728-.193.818.409 1.484 1.212 1.484 1.455 0 2.436-1.871 2.436-4.085 0-1.686-1.133-2.948-3.196-2.948-2.312 0-3.746 1.687-3.746 3.569 0 .647.19 1.104.484 1.454.132.156.151.219.103.399-.035.132-.115.448-.149.574-.047.179-.173.217-.403.13-1.122-.466-1.657-1.719-1.657-3.13 0-2.308 1.923-5.075 5.759-5.075 3.074 0 5.097 2.209 5.097 4.595 0 3.146-1.75 5.505-4.338 5.505-.872 0-1.69-.465-1.971-.999 0 0-.451 1.777-.546 2.157-.213.833-.675 1.537-1.124 2.144C9.607 23.812 10.8 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
                <a href="https://instagram.com/gsa.group.id" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors duration-300 font-medium">
                  Instagram: @gsa.group.id
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="flex items-center justify-center md:justify-end">
            <div className="text-center">
              <div className="w-40 h-20 relative mb-4">
                <Image src="/Home/Elemen Design Website Company GSA (45) 1.svg" alt="GSA Logo" fill className="object-contain" />
              </div>
              <p className="text-white/80 text-sm font-medium">Gemerlang Sejahtera Abadi</p>
              <p className="text-white/60 text-xs mt-1">Digital Strategic Partner</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-white/70 text-sm">
              © 2025 Gemerlang Sejahtera Abadi. All rights reserved.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="flex space-x-6">
              <a href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/70 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
