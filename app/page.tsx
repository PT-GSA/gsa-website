'use client';

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Partners from '../src/components/Partners';
import Services from '../src/components/Services';
import CTA from '../src/components/CTA';
import Footer from '../src/components/Footer';
import DemoBlog from '../src/components/DemoBlog';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <DemoBlog />
      <CTA />
      <Footer />
    </main>
  );
}
