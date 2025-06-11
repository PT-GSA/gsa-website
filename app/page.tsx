'use client';

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import Partners from '../src/components/Partners';
import Services from '../src/components/Services';
import CTA from '../src/components/CTA';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <CTA />
      <Footer />
    </main>
  );
}
