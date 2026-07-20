import Hero from '@/components/Hero';
import CaseStudyGrid from '@/components/CaseStudyGrid';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';
import FloatingDock from '@/components/FloatingDock';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <CaseStudyGrid />
      <Timeline />
      <Footer />
      <FloatingDock />
    </main>
  );
}
