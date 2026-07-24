import { portfolioItems } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FloatingDock from '@/components/FloatingDock';
import ImageCarousel from '@/components/ImageCarousel';
import MobileFrameCarousel from '@/components/MobileFrameCarousel';
import ThumbnailCarousel from '@/components/ThumbnailCarousel';

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const study = portfolioItems.find((s) => s.slug === resolvedParams.slug);

  if (!study || !study.caseStudy) {
    notFound();
  }

  const { hero, sections } = study.caseStudy;

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 px-6 py-4">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
        <div className="mb-6 flex flex-wrap gap-2">
          {hero.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-foreground/5 rounded-full text-xs font-semibold text-foreground uppercase tracking-widest text-pixel">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">
          {hero.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8 mb-16 border-t border-b border-foreground/10 py-8">
          <div className="flex-1">
            <h3 className="text-sm text-secondary uppercase tracking-widest mb-2 font-semibold">Summary</h3>
            <p className="text-lg text-foreground font-medium">{hero.summary}</p>
          </div>
          <div className="md:w-1/4">
            <h3 className="text-sm text-secondary uppercase tracking-widest mb-2 font-semibold">Role</h3>
            <p className="text-lg text-foreground font-medium">{hero.role}</p>
            <h3 className="text-sm text-secondary uppercase tracking-widest mb-2 font-semibold mt-4">Timeline</h3>
            <p className="text-lg text-foreground font-medium">{hero.timeline}</p>
          </div>
        </div>

        {hero.imageUrl && (
          <div className={`w-full aspect-[16/9] rounded-xl md:rounded-3xl overflow-hidden shadow-2xl relative ${hero.isContainHero ? 'bg-[#1a1a1a] p-8 md:p-16' : 'bg-foreground/5'}`}>
            <img src={hero.imageUrl} alt={hero.imageAlt || hero.title} className={`w-full h-full ${hero.isContainHero ? 'object-contain' : 'object-cover'}`} />
          </div>
        )}
      </section>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16 md:gap-24 py-8 md:py-16">
        {sections.map((section: any, idx: number) => (
          <section key={idx} className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-16">
              <div className="md:w-1/3">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground md:sticky md:top-24">{section.title}</h2>
              </div>
              <div className="md:w-2/3">
                <div 
                  className="prose prose-base md:prose-lg dark:prose-invert text-secondary whitespace-pre-wrap max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
            </div>
            
            {(section.imageUrl || section.phoneImageUrl || section.imageUrls) && (
              <div className="mt-8 w-full">
                {section.device === 'laptop-and-phone' ? (
                  <div className="flex flex-col gap-8 w-full">
                    {/* Top Row: Two up */}
                    <div className="flex flex-col md:flex-row gap-8 w-full md:items-stretch items-center justify-center">
                      {section.imageUrl && (
                        <div className="flex-[2] rounded-lg md:rounded-2xl overflow-hidden bg-foreground/5 shadow-xl flex items-center">
                          <img src={section.imageUrl} alt={section.imageAlt || ''} className="w-full h-auto object-contain block" />
                        </div>
                      )}
                      {section.phoneImageUrl && (
                        <div className="flex-[1] flex justify-center py-4 md:py-0 w-3/4 md:w-auto">
                          <div className="h-full w-auto aspect-[9/19] rounded-xl md:rounded-3xl overflow-hidden bg-foreground/5 shadow-2xl border-[4px] md:border-[8px] border-foreground">
                            <img src={section.phoneImageUrl} alt={section.phoneImageAlt || ''} className="w-full h-full object-cover block" />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Bottom Row: One down */}
                    {section.bottomImageUrl && (
                      <div className="w-full rounded-lg md:rounded-2xl overflow-hidden bg-foreground/5 shadow-xl">
                        <img src={section.bottomImageUrl} alt="Full dashboard layout" className="w-full h-auto object-contain" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Single Image */}
                    {section.imageUrl && !section.imageUrls && (
                      <div className="rounded-lg md:rounded-2xl overflow-hidden bg-foreground/5 shadow-xl w-full">
                        <img src={section.imageUrl} alt={section.imageAlt || ''} className={`w-full ${section.isScrollable ? 'h-auto' : 'h-auto object-contain'}`} />
                      </div>
                    )}
                    
                    {/* Image Lists (Carousels, Side-by-Side, etc) */}
                    {section.imageUrls && (
                      section.displayLayout === 'mobile-frame-carousel' ? (
                        <div className="w-full">
                          <MobileFrameCarousel images={section.imageUrls} />
                        </div>
                      ) : section.displayLayout === 'thumbnail-carousel' ? (
                        <div className="w-full">
                          <ThumbnailCarousel images={section.imageUrls} />
                        </div>
                      ) : section.displayLayout === 'side-by-side' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
                          {section.imageUrls.map((url: string, i: number) => (
                            <div key={i} className="rounded-lg md:rounded-2xl overflow-hidden bg-foreground/5 shadow-xl">
                              <img src={url} alt={`${section.imageAlt || 'Image'} ${i+1}`} className="w-full h-auto object-contain" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full">
                          <ImageCarousel images={section.imageUrls} altPrefix={section.imageAlt} />
                        </div>
                      )
                    )}

                    {/* Phone Image only (if not in laptop-and-phone layout) */}
                    {section.phoneImageUrl && (
                      <div className="w-2/3 md:w-1/3 aspect-[9/19] rounded-xl md:rounded-3xl overflow-hidden bg-foreground/5 shadow-2xl border-[4px] md:border-[8px] border-foreground mx-auto mt-8">
                        <img src={section.phoneImageUrl} alt={section.phoneImageAlt || ''} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      <FloatingDock />
    </main>
  );
}
