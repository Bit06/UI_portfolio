import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { portfolioItems } from './constants';
import { type PortfolioItem } from './types';

type Page = 'home' | 'about' | 'case-study';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [caseStudySlug, setCaseStudySlug] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigate = (newPage: Page, newSlug: string | null = null) => {
    if (newPage === page && newSlug === caseStudySlug) return;
    
    setIsExiting(true);
    setTimeout(() => {
      setPage(newPage);
      setCaseStudySlug(newSlug);
      window.scrollTo(0, 0);
      setIsExiting(false);
    }, 300);
  };
  
  const selectedCaseStudy = portfolioItems.find(item => item.slug === caseStudySlug) || null;

  const renderPage = () => {
    switch (page) {
      case 'about':
        return <AboutPage />;
      case 'case-study':
        return selectedCaseStudy ? <CaseStudyPage study={selectedCaseStudy} onNavigate={handleNavigate} /> : <HomePage onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#EAEAEA] min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className={`transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;