'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';

const AboutUs = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Gradient Background */}
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <p className="text-white/80 text-lg mb-2">Home / About Us</p>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                About Us
              </h1>
              <p className="text-white/90 text-xl font-medium">
                GSA&apos;s Information
              </p>
            </motion.div>
          </div>

          {/* Right Content - Robot Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <Image
                src="/Home/Elemen Design Website Company GSA (44) 1.svg"
                alt="GSA Robot Mascot"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Company Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-blue-600">G</span>
              <span className="text-green-500">S</span>
              <span className="text-purple-600">A</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              GSA is a company that specializes in IT consulting, software development (development), 
              and others. GSA is supported by a team of experts in each field and has served clients from 
              national to international levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                <Image
                  src="/Home/Elemen Design Website Company GSA (38).png"
                  alt="Professional Woman with Laptop"
                  width={500}
                  height={400}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                ADS
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h3 className="text-3xl font-bold mb-6">
                Is your website just for display or your website not found by Google?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                This means you need to improve your SEO (Search Engine Optimization)!
              </p>
              <p className="text-white font-semibold text-xl mb-8">
                We can help you with this problem!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MSME Business Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h3 className="text-3xl font-bold mb-6">
                Want to create your own MSME Business?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                GSA provides services from website creation to digital marketing so that if you who want to 
                build or develop MSME businesses.
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">Why Us?</h4>
                <p className="text-white/90 mb-6">
                  GSA has given the most affordable price for you!
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  More Information
                </button>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Image
                  src="/Home/Elemen Design Website Company GSA (40) copy 4.png"
                  alt="Business Woman"
                  width={500}
                  height={400}
                  className="rounded-xl object-cover w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-12">GSA Blog</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-6xl">📱</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>GSA • 03/12/2024</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Revolusi Perdaban 2035, AI, ML Era Digital
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pernah mendengar soal Revolusi Industri 4.0 yang seolah Digital? Kini...
                  </p>
                </div>
              </div>

              {/* Blog Post 2 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-6xl">🏪</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>GSA • 29/11/2024</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Perkusasi Tektongan yang Dibagtag dengan GO, Sistem Tangkap Disinteg Akan dari Tok
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Silemak ditekgot dari persmungan antar dan tentang persemuan sebuah dalam pertam...
                  </p>
                </div>
              </div>

              {/* Blog Post 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Image
                    src="/Home/Logo AI Intelligence.png"
                    alt="DuckDuckGo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>DuckDuckGo</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    DuckDuckGo Meluncurkan Chatbot AI
                  </h3>
                  <p className="text-gray-600 text-sm">
                    DuckDuckGo baru menumumkan telah chatbot AI dengan privacy yang...
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow">
                Click to see our Blog
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/Home/Elemen Design Website Company GSA (40) copy 5.png"
                alt="Professional Consultant"
                width={500}
                height={600}
                className="rounded-2xl object-cover w-full"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                What&apos;s we can do for you?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We offer exceptional expertise across a range of key services tailored to your needs. Our team of professionals is committed to delivering outstanding results that help you achieve your goals and stay ahead in a competitive landscape. With a focus on quality and customer satisfaction, we aim to exceed your expectations and provide results that truly make a difference.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUs;
