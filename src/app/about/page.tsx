import AboutSkills from '@/components/AboutSkills';
import FloatingDock from '@/components/FloatingDock';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background pb-32 pt-20">
      <AboutSkills />
      <FloatingDock />
    </main>
  );
}
