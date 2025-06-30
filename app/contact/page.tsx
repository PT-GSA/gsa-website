'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { useI18n } from '../../src/components/I18nProvider';

// Direct translation object - no external JSON needed
const translations = {
  en: {
    breadcrumb: {
      home: "Home",
      contact: "Contact"
    },
    hero: {
      title: "Contact Us",
      subtitle: "Interact with us"
    },
    consultation: {
      title: "Do a consultation with our team",
      titleHighlight: "consultation"
    },
    contactInfo: {
      title: "We Can Help You",
      subtitle: "To advance your company in technology and branding",
      ourInformation: "Our Information",
      headquarters: "Headquarters",
      email: "Email",
      phone: "Phone",
      workingHour: "Working Hour",
      workingDays: "Monday - Friday",
      workingTime: "09:00 AM - 17:00 PM",
      address: {
        line1: "Sampoerna Strategic Square,",
        line2: "South Tower, 18th Floor",
        line3: "Jl. Jenderal Sudirman No.45 - 46, RT.3/RW.4,",
        line4: "Karet Semanggi, Kecamatan Setiabudi,",
        line5: "Kota Jakarta Selatan, Daerah Khusus",
        line6: "Ibukota Jakarta 12930"
      }
    },
    form: {
      fullName: {
        label: "Full Name*",
        placeholder: "Full Name"
      },
      companyName: {
        label: "Company Name",
        placeholder: "Company Name"
      },
      email: {
        label: "Email*",
        placeholder: "Email"
      },
      phoneNumber: {
        label: "Active Phone Number*",
        placeholder: "Phone"
      },
      address: {
        label: "Address*",
        placeholder: "Address"
      },
      service: {
        label: "Service*",
        placeholder: "Select a service",
        options: [
          "Web Development",
          "AI Customize",
          "Software Development",
          "Digital Marketing",
          "AR/VR Solutions",
          "IT Outsourcing",
          "IT Support & Consulting",
          "Other"
        ]
      },
      submit: "Submit"
    }
  },
  id: {
    breadcrumb: {
      home: "Beranda",
      contact: "Kontak"
    },
    hero: {
      title: "Hubungi Kami",
      subtitle: "Berinteraksi dengan kami"
    },
    consultation: {
      title: "Lakukan konsultasi dengan tim kami",
      titleHighlight: "konsultasi"
    },
    contactInfo: {
      title: "Kami Dapat Membantu Anda",
      subtitle: "Untuk memajukan perusahaan Anda dalam teknologi dan branding",
      ourInformation: "Informasi Kami",
      headquarters: "Kantor Pusat",
      email: "Email",
      phone: "Telepon",
      workingHour: "Jam Kerja",
      workingDays: "Senin - Jumat",
      workingTime: "09:00 - 17:00",
      address: {
        line1: "Sampoerna Strategic Square,",
        line2: "South Tower, Lantai 18",
        line3: "Jl. Jenderal Sudirman No.45 - 46, RT.3/RW.4,",
        line4: "Karet Semanggi, Kecamatan Setiabudi,",
        line5: "Kota Jakarta Selatan, Daerah Khusus",
        line6: "Ibukota Jakarta 12930"
      }
    },
    form: {
      fullName: {
        label: "Nama Lengkap*",
        placeholder: "Nama Lengkap"
      },
      companyName: {
        label: "Nama Perusahaan",
        placeholder: "Nama Perusahaan"
      },
      email: {
        label: "Email*",
        placeholder: "Email"
      },
      phoneNumber: {
        label: "Nomor Telepon Aktif*",
        placeholder: "Telepon"
      },
      address: {
        label: "Alamat*",
        placeholder: "Alamat"
      },
      service: {
        label: "Layanan*",
        placeholder: "Pilih layanan",
        options: [
          "Pengembangan Perangkat Lunak",
          "Digital Marketing",
          "Solusi AR/VR",
          "IT Outsourcing",
          "IT Support & Konsultasi",
          "Lainnya"
        ]
      },
      submit: "Kirim"
    }
  }
};

const ContactPage = () => {
  const { language } = useI18n();
  const t = translations[language as keyof typeof translations];
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
    service: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp integration
    const waNumber = '6287854207963'; // GSA WhatsApp number (remove +)
    const message =
      `${t.form.fullName.label} ${formData.fullName}\n` +
      `${t.form.companyName.label} ${formData.companyName}\n` +
      `${t.form.email.label} ${formData.email}\n` +
      `${t.form.phoneNumber.label} ${formData.phoneNumber}\n` +
      `${t.form.address.label} ${formData.address}\n` +
      `${t.form.service.label} ${formData.service}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-white/80">{t.breadcrumb.home}</span>
                <span className="text-white/80 mx-2">›</span>
                <span className="text-white">{t.breadcrumb.contact}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-6xl font-bold mb-4">
                {t.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-white/90">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Robot SVG */}
            <div className="flex-1 flex justify-end">
              <div className="w-full max-w-xs h-60 md:w-96 md:h-96 md:max-w-[400px] relative">
                <Image
                  src="/Contact/Contact/Elemen Design Website Company GSA (55) 3.svg"
                  alt="Contact Robot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-40 h-40 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.consultation.title.split(t.consultation.titleHighlight)[0]}
              <span className="text-blue-600">{t.consultation.titleHighlight}</span>
              {t.consultation.title.split(t.consultation.titleHighlight)[1]}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">{t.contactInfo.title}</h3>
                <p className="text-gray-600 text-lg">
                  {t.contactInfo.subtitle}
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">{t.contactInfo.ourInformation}</h4>
                
                {/* Headquarters */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">{t.contactInfo.headquarters}</h5>
                  <div className="text-gray-600">
                    <p>{t.contactInfo.address.line1}</p>
                    <p>{t.contactInfo.address.line2}</p>
                    <br />
                    <p>{t.contactInfo.address.line3}</p>
                    <p>{t.contactInfo.address.line4}</p>
                    <p>{t.contactInfo.address.line5}</p>
                    <p>{t.contactInfo.address.line6}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">{t.contactInfo.email}</h5>
                  <a 
                    href="mailto:info@gsagroup.id" 
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    info@gsagroup.id
                  </a>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">{t.contactInfo.phone}</h5>
                  <p className="text-gray-600">+62 878-5420-7963</p>
                </div>

                {/* Working Hours */}
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">{t.contactInfo.workingHour}</h5>
                  <div className="text-gray-600">
                    <p>{t.contactInfo.workingDays}</p>
                    <p>{t.contactInfo.workingTime}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.fullName.label}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t.form.fullName.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.companyName.label}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={t.form.companyName.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.form.email.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Active Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.phoneNumber.label}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder={t.form.phoneNumber.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.address.label}
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t.form.address.placeholder}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.service.label}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-700"
                    required
                  >
                    <option value="" disabled>{t.form.service.placeholder}</option>
                    {t.form.service.options.map((option: string) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-green-600 transition-all duration-300 shadow-lg"
                >
                  {t.form.submit}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage; 