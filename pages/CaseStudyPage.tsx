import React from 'react';
import { type PortfolioItem } from '../types';
import { ArrowUpRightIcon } from '../components/icons/ArrowUpRightIcon';
import { portfolioItems } from '../constants';
import { LaptopFrame } from '../components/LaptopFrame';
import { PhoneFrame } from '../components/PhoneFrame';
import { CompositeFrame } from '../components/CompositeFrame';

interface CaseStudyPageProps {
  study: PortfolioItem;
  onNavigate: (page: 'case-study', slug: string) => void;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ study, onNavigate }) => {
  const currentIndex = portfolioItems.findIndex(item => item.slug === study.slug);
  const nextStudy = portfolioItems[(currentIndex + 1) % portfolioItems.length];

  return (
    <div className="container mx-auto px-6 lg:px-8 pt-24 pb-12 max-w-7xl">
      {/* Case Study Hero */}
      <section className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto">{study.caseStudy.hero.title}</h1>
        <p className="mt-6 text-lg text-zinc-400 max-w-3xl mx-auto">{study.caseStudy.hero.summary}</p>
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {study.caseStudy.hero.tags.map(tag => (
            <span key={tag} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </section>

      {/* Meta Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden my-12">
        <div className="bg-[#0A0A0A] p-6 text-center">
          <h3 className="text-sm text-zinc-500 uppercase tracking-wider">Role</h3>
          <p className="text-white font-semibold mt-1">{study.caseStudy.hero.role}</p>
        </div>
        <div className="bg-[#0A0A0A] p-6 text-center">
          <h3 className="text-sm text-zinc-500 uppercase tracking-wider">Timeline</h3>
          <p className="text-white font-semibold mt-1">{study.caseStudy.hero.timeline}</p>
        </div>
        <div className="bg-[#0A0A0A] p-6 text-center">
          <h3 className="text-sm text-zinc-500 uppercase tracking-wider">Category</h3>
          <p className="text-white font-semibold mt-1">{study.category}</p>
        </div>
        <div className="bg-[#0A0A0A] p-6 text-center">
           <h3 className="text-sm text-zinc-500 uppercase tracking-wider">Status</h3>
          <p className="text-white font-semibold mt-1">Completed</p>
        </div>
      </div>

      {/* Hero Image */}
      <section className="my-12 md:my-24">
          <LaptopFrame src={study.caseStudy.hero.imageUrl} alt={study.caseStudy.hero.imageAlt} />
      </section>
      
      {/* Content Sections */}
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          {study.caseStudy.sections.map((section, index) => (
              <section key={index} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-1">
                          <h2 className="text-2xl font-bold text-white sticky top-28">{section.title}</h2>
                      </div>
                      <div className="md:col-span-2">
                           <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-line">{section.content}</p>
                      </div>
                  </div>
                  {section.imageUrl && (
                      <div className="pt-8">
                        {section.device === 'laptop-and-phone' && section.phoneImageUrl ? (
                            <CompositeFrame
                                laptopSrc={section.imageUrl}
                                laptopAlt={section.imageAlt || ''}
                                isLaptopScrollable={section.isScrollable}
                                phoneSrc={section.phoneImageUrl}
                                phoneAlt={section.phoneImageAlt || ''}
                                isPhoneScrollable={section.isPhoneScrollable}
                            />
                        ) : section.device === 'laptop' ? (
                            <LaptopFrame src={section.imageUrl} alt={section.imageAlt || section.title} isScrollable={section.isScrollable} />
                        ) : section.device === 'phone' ? (
                            <PhoneFrame src={section.imageUrl} alt={section.imageAlt || section.title} isScrollable={section.isScrollable} />
                        ) : (
                            <img src={section.imageUrl} alt={section.imageAlt || section.title} className="rounded-xl w-full h-auto object-cover"/>
                        )}
                      </div>
                  )}
              </section>
          ))}
      </div>
      
      {/* Next Project */}
      <section className="mt-24 md:mt-32">
          <button
            onClick={() => onNavigate('case-study', nextStudy.slug)}
            className="group block w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12 text-center hover:border-zinc-700 hover:bg-zinc-900 transition-colors relative"
          >
               <p className="text-zinc-400">Next Project</p>
               <h3 className="text-3xl md:text-5xl font-bold text-white mt-2">{nextStudy.title}</h3>
               <div className="inline-block mt-6 bg-[#0A0A0A] border border-zinc-700 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRightIcon />
               </div>
          </button>
      </section>
    </div>
  );
};

export default CaseStudyPage;