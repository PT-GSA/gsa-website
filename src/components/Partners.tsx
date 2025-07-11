'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from './I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    trustedBy: "We are Trusted by our Clients and Global Network Partners",
    leadingPartner: "Leading digital strategic partner with",
    description: "Seamless IT solutions, efficient management support, integrated virtual ecosystems, and impactful digital marketing.",
    stats: {
      integratedSoftware: "Integrated Software",
      globalNetwork: "Global Network",
      dedicatedTeam: "Dedicated team with 60% Engineers",
      softwareMastered: "Software that has been mastered"
    }
  },
  id: {
    trustedBy: "Kami Dipercaya oleh Klien dan Mitra Jaringan Global Kami",
    leadingPartner: "Mitra strategis digital terdepan dengan",
    description: "Solusi IT yang mulus, dukungan manajemen yang efisien, ekosistem virtual terintegrasi, dan pemasaran digital yang berdampak.",
    stats: {
      integratedSoftware: "Perangkat Lunak Terintegrasi",
      globalNetwork: "Jaringan Global",
      dedicatedTeam: "Tim khusus dengan 60% Insinyur",
      softwareMastered: "Perangkat lunak yang telah dikuasai"
    }
  },
  ja: {
    trustedBy: "私たちはクライアントとグローバルネットワークパートナーに信頼されています",
    leadingPartner: "リーディングデジタル戦略パートナー",
    description: "シームレスなITソリューション、効率的な管理サポート、統合されたバーチャルエコシステム、そして効果的なデジタルマーケティング。",
    stats: {
      integratedSoftware: "統合ソフトウェア",
      globalNetwork: "グローバルネットワーク",
      dedicatedTeam: "60%がエンジニアの専任チーム",
      softwareMastered: "習得済みソフトウェア"
    }
  },
  'zh-TW': {
    trustedBy: "我們受到客戶和全球合作夥伴的信賴",
    leadingPartner: "領先的數位策略夥伴",
    description: "無縫的IT解決方案、高效的管理支援、整合虛擬生態系統，以及有影響力的數位行銷。",
    stats: {
      integratedSoftware: "整合軟體",
      globalNetwork: "全球網絡",
      dedicatedTeam: "60%工程師的專業團隊",
      softwareMastered: "已精通的軟體"
    }
  }
};

const Partners = () => {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];

  const partners = [
    { id: 1, name: 'Partner 1', logo: '/partners/Elemen_Design_Website_Company_GSA__4_-removebg-preview.png' },
    { id: 2, name: 'Partner 2', logo: '/partners/Elemen_Design_Website_Company_GSA__5_-removebg-preview.png' },
    { id: 3, name: 'Partner 3', logo: '/partners/Elemen_Design_Website_Company_GSA__6_-removebg-preview.png' },
    { id: 4, name: 'Partner 4', logo: '/partners/Elemen_Design_Website_Company_GSA__7_-removebg-preview.png' },
    { id: 5, name: 'Partner 5', logo: '/partners/Elemen_Design_Website_Company_GSA__8_-removebg-preview.png' },
    { id: 6, name: 'Partner 6', logo: '/partners/Elemen_Design_Website_Company_GSA__9_-removebg-preview.png' },
    { id: 7, name: 'Partner 7', logo: '/partners/Elemen_Design_Website_Company_GSA__10_-removebg-preview.png' },
    { id: 8, name: 'Partner 8', logo: '/partners/Elemen_Design_Website_Company_GSA__11_-removebg-preview.png' },
    { id: 9, name: 'Partner 9', logo: '/partners/Elemen_Design_Website_Company_GSA__12_-removebg-preview.png' },
    { id: 10, name: 'Partner 10', logo: '/partners/Elemen_Design_Website_Company_GSA__13_-removebg-preview.png' },
    { id: 11, name: 'Partner 11', logo: '/partners/Elemen_Design_Website_Company_GSA__14_-removebg-preview.png' },
    { id: 12, name: 'Partner 12', logo: '/partners/Elemen_Design_Website_Company_GSA__15_-removebg-preview.png' },
    { id: 13, name: 'Partner 13', logo: '/partners/Elemen_Design_Website_Company_GSA__16_-removebg-preview.png' },
    { id: 14, name: 'Partner 14', logo: '/partners/Elemen_Design_Website_Company_GSA__17_-removebg-preview.png' },
    { id: 15, name: 'Partner 15', logo: '/partners/Elemen_Design_Website_Company_GSA__18_-removebg-preview.png' },
    { id: 16, name: 'Partner 16', logo: '/partners/Elemen_Design_Website_Company_GSA__20_-removebg-preview.png' },
    { id: 17, name: 'Partner 17', logo: '/partners/Elemen_Design_Website_Company_GSA__22_-removebg-preview.png' },
    { id: 18, name: 'Partner 18', logo: '/partners/Elemen_Design_Website_Company_GSA__24_-removebg-preview (1).png' },
    { id: 19, name: 'Partner 19', logo: '/partners/Elemen_Design_Website_Company_GSA__25_-removebg-preview.png' },
    { id: 20, name: 'Partner 20', logo: '/partners/Elemen_Design_Website_Company_GSA__26_-removebg-preview (1).png' },
    { id: 21, name: 'Partner 21', logo: '/partners/Elemen_Design_Website_Company_GSA__27_-removebg-preview.png' },
    { id: 22, name: 'Partner 22', logo: '/partners/Elemen_Design_Website_Company_GSA__28_-removebg-preview.png' },
    { id: 23, name: 'Partner 23', logo: '/partners/Elemen_Design_Website_Company_GSA__29_-removebg-preview.png' },
    { id: 24, name: 'Partner 24', logo: '/partners/Elemen_Design_Website_Company_GSA__30_-removebg-preview.png' },
    { id: 25, name: 'Partner 25', logo: '/partners/Elemen_Design_Website_Company_GSA__31_-removebg-preview.png' },
    { id: 26, name: 'Partner 26', logo: '/partners/Elemen_Design_Website_Company_GSA__32_-removebg-preview.png' },
  ];

  // Duplicate partners for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners Logo Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{t.trustedBy}</h2>

          {/* Partners logos with auto-scroll */}
          <div className="relative overflow-hidden bg-gray-50/50 rounded-2xl py-6">
            <motion.div
              className="flex space-x-12 whitespace-nowrap"
              initial={{ x: 0 }}
              animate={{
                x: [0, -120 * partners.length],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div key={`${partner.id}-${index}`} whileHover={{ scale: 1.05 }} className="inline-block flex-shrink-0 w-28 h-20 relative transition-all duration-300">
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" sizes="112px" priority />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* World Map and Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* World Map */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative">
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image src="/Home/Elemen Design Website Company GSA (34).png" alt="World Map" fill className="object-contain p-4" priority />
            </div>
          </motion.div>

          {/* Stats and Description */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.leadingPartner}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{t.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="text-center">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">100+</h4>
                <p className="text-gray-600 text-sm font-medium">{t.stats.integratedSoftware}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-center">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">11+</h4>
                <p className="text-gray-600 text-sm font-medium">{t.stats.globalNetwork}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="text-center">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">350+</h4>
                <p className="text-gray-600 text-sm font-medium">{t.stats.dedicatedTeam}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }} className="text-center">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">35+</h4>
                <p className="text-gray-600 text-sm font-medium">{t.stats.softwareMastered}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Team Section with Elemen Design Website Company GSA (38).png */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
          <div className="relative h-40 md:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
            <Image src="/Home/Elemen Design Website Company GSA (38).png" alt="GSA Team" fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
