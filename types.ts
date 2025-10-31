export interface CaseStudySection {
  title: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  phoneImageUrl?: string;
  phoneImageAlt?: string;
  device?: 'laptop' | 'phone' | 'laptop-and-phone';
  isScrollable?: boolean;
  isPhoneScrollable?: boolean;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  phoneImageUrl?: string;
  summary: string;
  caseStudy: {
    hero: {
      title: string;
      tags: string[];
      summary: string;
      role: string;
      timeline: string;
      imageUrl: string;
      imageAlt: string;
    };
    sections: CaseStudySection[];
  };
}

export interface AboutContent {
    name: string;
    introduction: string;
    imageUrl: string;
    skills: string[];
    credentials: string[];
}