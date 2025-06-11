'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'IT Outsourcing',
      description: 'We offer a team for your project',
      image: '/Home/Elemen Design Website Company GSA (40) copy 4.png',
      link: '/services/outsourcing',
    },
    {
      id: 2,
      title: 'IT Services',
      description: 'We provide IT services according to your needs',
      image: '/Home/Elemen Design Website Company GSA (40) copy 5.png',
      link: '/services/it-services',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-3 text-base">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What do you <span className="text-blue-600">Need?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">We can help according to your needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="group">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
                <div className="relative h-72 overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">{service.description}</p>
                  <motion.a href={service.link} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                    More Information
                    <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
