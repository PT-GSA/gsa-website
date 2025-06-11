import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import Services from '@/components/Services';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partners />

      {/* Main Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[800px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img src="/Home/Elemen Design Website Company GSA.png" alt="GSA Company Showcase" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <Services />
      <CTA />
      <Footer />
    </>
  );
}
