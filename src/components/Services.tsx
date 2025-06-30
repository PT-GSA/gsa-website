'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    sectionTitle: "Our Services",
    mainHeading: "What do you",
    needText: "Need?",
    subtitle: "We can help according to your needs",
    moreInformation: "More Information",
    services: {
      itOutsourcing: {
        title: "IT Outsourcing",
        description: "We offer a team for your project"
      },
      itServices: {
        title: "IT Services", 
        description: "We provide IT services according to your needs"
      }
    }
  },
  id: {
    sectionTitle: "Layanan Kami",
    mainHeading: "Apa yang Anda",
    needText: "Butuhkan?",
    subtitle: "Kami dapat membantu sesuai kebutuhan Anda",
    moreInformation: "Informasi Lebih Lanjut",
    services: {
      itOutsourcing: {
        title: "IT Outsourcing",
        description: "Kami menawarkan tim untuk proyek Anda"
      },
      itServices: {
        title: "Layanan IT",
        description: "Kami menyediakan layanan IT sesuai kebutuhan Anda"
      }
    }
  },
  ja: {
    sectionTitle: "サービス",
    mainHeading: "あなたが必要なものは",
    needText: "何ですか？",
    subtitle: "ご要望に応じてお手伝いします",
    moreInformation: "詳細情報",
    services: {
      itOutsourcing: {
        title: "ITアウトソーシング",
        description: "あなたのプロジェクトのためのチームを提供します"
      },
      itServices: {
        title: "ITサービス",
        description: "ご要望に応じたITサービスを提供します"
      }
    }
  },
  'zh-TW': {
    sectionTitle: "我們的服務",
    mainHeading: "您需要什麼",
    needText: "？",
    subtitle: "我們可以根據您的需求提供協助",
    moreInformation: "更多資訊",
    services: {
      itOutsourcing: {
        title: "IT外包",
        description: "我們為您的專案提供團隊"
      },
      itServices: {
        title: "IT服務",
        description: "我們根據您的需求提供IT服務"
      }
    }
  }
};

const Services = () => {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];

  const services = [
    {
      id: 1,
      title: t.services.itOutsourcing.title,
      description: t.services.itOutsourcing.description,
      image: '/Home/Elemen Design Website Company GSA (40) copy 4.png',
      link: '/services/outsourcing',
    },
    {
      id: 2,
      title: t.services.itServices.title,
      description: t.services.itServices.description,
      image: '/Home/Elemen Design Website Company GSA (40) copy 5.png',
      link: '/services/it-services',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-3 text-base">{t.sectionTitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t.mainHeading} <span className="text-blue-600">{t.needText}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="group">
              <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-blue-200">
                <div className="p-8 space-y-6">
                  <div className="relative h-48 w-full">
                    <Image src={service.image} alt={service.title} fill className="object-contain" />
                  </div>
                  
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {service.description}
                    </p>
                    
                    <motion.a href={service.link} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm">
                      {t.moreInformation}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  </div>
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
