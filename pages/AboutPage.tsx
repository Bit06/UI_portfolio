import React from 'react';
import { aboutContent } from '../constants';
import { images } from '../components/Image';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 lg:px-8 pt-32 pb-12 max-w-7xl">
            <section className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-1">
                        <img 
                            src={images.profile} 
                            alt={aboutContent.name} 
                            className="rounded-lg w-full object-cover aspect-square"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Hello! I'm {aboutContent.name}.</h1>
                        <p className="mt-6 text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                           {aboutContent.introduction}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 mt-24">
                    <div className="md:col-span-1">
                        <h2 className="text-sm uppercase text-zinc-500 tracking-widest sticky top-28">My Design Toolkit</h2>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-3">
                        {aboutContent.skills.map(skill => (
                            <div key={skill} className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-full">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-12 mt-24">
                    <div className="md:col-span-1">
                        <h2 className="text-sm uppercase text-zinc-500 tracking-widest sticky top-28">Credentials & Recognition</h2>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        {aboutContent.credentials.map((credential, index) => (
                            <p key={index} className="text-white font-medium">{credential}</p>
                        ))}
                        {/*
                        <div className="pt-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block font-medium text-white relative group text-lg"
                            >
                                <span>View My Full Resume</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </div>
                        */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;