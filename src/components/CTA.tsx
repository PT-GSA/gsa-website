'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const CTA = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }} 
            className="relative"
          >
            <div className="relative h-[400px] w-full">
              <Image 
                src="/Home/Elemen Design Website Company GSA (44) 1.svg" 
                alt="Digital Business" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }} 
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
                Ready to Take Your <br />
                <span className="text-blue-600">Business Digital?</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Let Us Help You Build a Winning Strategy.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Start Your Consultation Today!
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default CTA;
