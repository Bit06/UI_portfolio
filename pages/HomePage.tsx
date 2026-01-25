import React from 'react';
import { portfolioItems } from '../constants';

const HeroBackgroundTile: React.FC = () => (
    <div className="w-12 h-12 border border-zinc-800/50 transform rotate-45 transition-all duration-300 group-hover:bg-zinc-800/50 group-hover:scale-125" />
);

const HomePage: React.FC<{ onNavigate: (page: 'case-study', slug: string) => void; }> = ({ onNavigate }) => {

  return (
    <>
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center py-16 relative">
            <div className="absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
                <div className="grid h-full w-full grid-cols-10 gap-12">
                    {Array.from({ length: 10 * 7 }).map((_, i) => (
                       <div key={i} className="group flex h-full w-full items-center justify-center">
                           <HeroBackgroundTile />
                       </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight animate-fade-in-up">
                    David Oloniyo — Digital Designer & Engineer
                </h1>
                <p className="mt-8 text-lg text-zinc-300 max-w-3xl animate-fade-in-up mx-auto" style={{ animationDelay: '200ms' }}>
                    Passionate about transforming complex problems into simple, intuitive, and user-friendly designs.
                </p>
            </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="py-24">
            <h2 className="text-sm uppercase text-zinc-500 tracking-widest mb-12 animate-fade-in-up text-center" style={{ animationDelay: '400ms' }}>Selected Work</h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {portfolioItems.map((item, index) => (
                    <button
                        key={item.slug}
                        onClick={() => onNavigate('case-study', item.slug)}
                        className="group text-left animate-fade-in-up"
                        style={{ animationDelay: `${500 + index * 150}ms` }}
                    >
                        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] relative aspect-[4/3] flex items-center justify-center">
                           <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="mt-4 px-1">
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-zinc-400 mt-1">{item.summary}</p>
                        </div>
                    </button>
                ))}
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="text-center py-24">
             <h2 className="text-4xl md:text-5xl font-bold text-white">Have a project in mind?</h2>
             <a href="mailto:david.oloniyio@gmail.com" className="mt-8 inline-block text-2xl md:text-3xl font-medium text-zinc-300 relative group">
                <span>Get in touch</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
        </section>
      </div>
    </>
  );
};

export default HomePage;