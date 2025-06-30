'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState } from 'react';


const teamProfiles = [
  {
    name: 'Baedi Melyda M. Fikih',
    image: '/services/42.png',
    description: 'GSA provides a variety of B2B services with a team of experts in their fields. We are ready to support your project with the best solutions and professional services.',
    keySkills: ['IT Outsourcing', 'Project Management', 'System Integration'],
    country: 'Indonesia',
  },
  // Add more profiles as needed
];

const solutionCards = [
  {
    title: 'Creative & Design',
    image: '/services/Creative & Design.png',
    items: ['UI/UX Design', 'Graphic Design', 'Branding', 'Logo Design', 'Motion Graphic', 'Video Editing', '3D Design', 'Figma', 'Adobe Suite', 'Blender', 'Canva', 'Miro', 'Classroom'],
  },
  {
    title: 'Software Development',
    image: '/services/Software Development.png',
    items: ['Web App', 'Mobile App', 'API', 'Cloud', 'AI/ML', 'Blockchain', 'IoT', 'Embedded', 'DevOps', 'Testing', 'Automation', 'Database', 'Integration'],
  },
  {
    title: 'Game Development',
    image: '/services/Game Development.png',
    items: ['Unity', 'Unreal', '2D/3D', 'VR/AR', 'Story Writer'],
  },
  {
    title: 'Game Development',
    image: '/services/Game Development.png',
    items: ['Unity', 'Unreal', '2D/3D', 'VR/AR', 'Story Writer'],
  },
];

const serviceCards = [
  {
    title: 'Advanced AI',
    desc: 'AI-powered business solutions for automation, analytics, and customer engagement.',
    price: '999.99',
    image: '/services/Research & Innovation.png',
  },
  {
    title: 'AR & VR',
    desc: 'Augment your business by implementing AR & VR for immersive experiences.',
    price: '999.99',
    image: '/services/Quality Assurance.png',
  },
  {
    title: 'IOT Solutions',
    desc: 'Smart devices and IoT integration for enhanced business intelligence.',
    price: '999.99',
    image: '/services/IT Cyber Security.png',
  },
  {
    title: 'ERP Software',
    desc: 'Streamline & automate your business processes with custom ERP solutions.',
    price: '999.99',
    image: '/services/IT Administrative & Support.png',
  },
  {
    title: 'Gaming + Web 3',
    desc: 'Blockchain-based gaming, NFTs, and decentralized web solutions.',
    price: '999.99',
    image: '/services/Game Development.png',
  },
  {
    title: 'IT Governance & Compliance',
    desc: 'Ensure your business IT meets all governance and compliance standards.',
    price: '999.99',
    image: '/services/IT Governance & Compliance.png',
  },
  {
    title: 'Hardware Engineers',
    desc: 'Expertise in hardware design, prototyping, and integration.',
    price: '999.99',
    image: '/services/Hardware Engineers.png',
  },
  {
    title: 'Product Management',
    desc: 'From ideation to launch, we manage your product lifecycle.',
    price: '999.99',
    image: '/services/Product Management.png',
  },
  {
    title: 'Website & Apps Development',
    desc: 'Custom website and mobile app development for your business.',
    price: '999.99',
    image: '/services/Software Development.png',
  },
  {
    title: 'Marketplace Optimization',
    desc: 'Helping businesses grow and scale in the digital marketplace.',
    price: '999.99',
    image: '/services/DevOps & IT Operation.png',
  },
  {
    title: 'Digital Marketing',
    desc: 'Grow your brand with our digital marketing and growth strategies.',
    price: '999.99',
    image: '/services/Technical Writing.png',
  },
];

const softwareLogos = Array.from({ length: 35 }, (_, i) => `/services/Logo software/${60 + i}.png`);

function TeamCarousel() {
  const [index, setIndex] = useState(0);
  const profile = teamProfiles[index];
  const next = () => setIndex((i) => (i + 1) % teamProfiles.length);
  const prev = () => setIndex((i) => (i - 1 + teamProfiles.length) % teamProfiles.length);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
      <button onClick={prev} className="text-3xl px-2 text-gray-400 hover:text-blue-500">
        &#8592;
      </button>
      <div className="bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center max-w-md w-full">
        <Image src={profile.image} alt={profile.name} width={120} height={120} className="rounded-xl object-cover mb-4" />
        <div className="text-xs text-gray-500 mb-1">{profile.country}</div>
        <div className="font-bold text-lg mb-2">{profile.name}</div>
        <div className="text-gray-700 text-sm mb-2">{profile.description}</div>
        <ul className="text-xs text-blue-600 mb-2 list-disc list-inside">
          {profile.keySkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <button onClick={next} className="text-3xl px-2 text-gray-400 hover:text-blue-500">
        &#8594;
      </button>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 overflow-hidden">
        <Image src="/services/Elemen Design Website Company GSA (46).png" alt="GSA Services Hero" fill priority className="object-cover object-top w-full h-full absolute z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left text-white max-w-xl mb-8 md:mb-0">
              <div className="text-sm mb-4 opacity-90">Home › Services</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">GSA Services</h1>
              <p className="text-xl opacity-90">Services we offer for your Project</p>
            </div>
            <div className="w-96 h-96 md:w-[400px] md:h-[400px] relative flex-shrink-0">
              <Image src="/Home/Elemen Design Website Company GSA (44) 1.svg" alt="Robot" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* IT Outsourcing Section */}
      <section className="bg-white w-full py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-blue-600 font-semibold mb-2">IT Outsourcing</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Need a Team for your project?</h2>
            <div className="text-gray-600 mb-6">We can Support your project by offering our expert team</div>
          </div>
          <TeamCarousel />
        </div>
      </section>

      {/* Best Solution Section */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
            We are the best solution for all your <span className="text-blue-600">IT needs!</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {solutionCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center">
                <Image src={card.image} alt={card.title} width={64} height={64} className="mb-4" />
                <div className="font-bold text-lg mb-2 text-center">{card.title}</div>
                <ul className="text-xs text-gray-600 list-disc list-inside text-left">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Skills */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <h3 className="text-center text-xl font-semibold mb-4 text-gray-700">Our Software Skills</h3>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
            {softwareLogos.map((logo, i) => (
              <Image key={i} src={logo} alt={`Logo ${i + 60}`} width={40} height={40} className="object-contain" />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services */}
      <section className="bg-gradient-to-br from-blue-100 to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Our <span className="text-blue-600">Professional</span> Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {serviceCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col h-full">
                <Image src={card.image} alt={card.title} width={56} height={56} className="mb-4" />
                <div className="font-bold text-lg mb-2">{card.title}</div>
                <div className="text-gray-600 text-sm mb-4 flex-1">{card.desc}</div>
                <div className="font-bold text-blue-600 text-xl mb-4">${card.price}</div>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl text-center transition-all duration-200">
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h4 className="text-xl font-bold mb-4">
            Contact us for <span className="text-blue-600">more information</span>
          </h4>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-2xl text-lg transition-all duration-200">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
