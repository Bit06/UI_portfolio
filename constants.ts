import { type PortfolioItem, type AboutContent } from './types';

export const RESUME_URL = '/resume.pdf'; // Placeholder for the resume PDF

export const aboutContent: AboutContent = {
    name: "David Oloniyo",
    introduction: "I'm a UI/UX Designer and Computer Engineering student passionate about transforming complex problems into simple, intuitive, and user-friendly designs.\n\nI'm a designer driven by one core belief: technology should be a bridge, not a barrier. My passion is to find the frustration in everyday systems, whether it's the chaos of a student marketplace or the disconnect in a campus-wide feedback loop, and design a solution that feels effortless and logical.\n\nMy process is built on empathy and data. I love digging into a problem, understanding the real human needs, and iterating until the solution truly works.",
    imageUrl: 'https://i.imgur.com/uFVErFN.png',
    skills: ['User Research & Usability Testing', 'Information Architecture', 'Wireframing & Prototyping', 'UI & Visual Design', 'Design System Thinking', 'Figma', 'Adobe XD'],
    credentials: [
        'Google UX Design Certificate',
        'IBM SkillsBuild - User Experience Design Fundamentals',
    ]
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'echo',
    title: 'Echo',
    category: 'Civic-Tech Platform',
    imageUrl: 'https://i.imgur.com/w1iOhC4.png',
    phoneImageUrl: 'https://i.imgur.com/M5E162p.png',
    summary: 'A civic-tech platform to bridge the communication gap between students and university leadership with data-driven design.',
    caseStudy: {
      hero: {
        title: "Echo: Bridging the Communication Gap with Data-Driven Design",
        tags: ["Product Strategy", "UX Research", "UI Design", "Branding"],
        summary: "Co-founded and led the design for Echo, a platform empowering students to voice issues and propose solutions, using community support to provide leaders with clear, data-driven insights. Validated with 1,489 students.",
        role: "Co-Founder & Design Lead",
        timeline: "Concept to Prototype",
        imageUrl: 'https://i.imgur.com/w1iOhC4.png',
        imageAlt: "Polished hero image of the Echo platform"
      },
      sections: [
        {
          title: "The Spark: A Real-World Disconnect",
          content: "Echo wasn't born in a classroom; it started from a real campus issue. When our university implemented a sudden, campus-wide power cut policy, the student response was immediate but chaotic. Feedback scattered across social media created noise, highlighting a critical disconnect: students felt unheard, and leadership lacked a clear signal. This was a symptom of a larger communication breakdown.",
        },
        {
          title: "User Research: From Anecdote to Data",
          content: "To move beyond frustration, I co-authored the 'Student Feedback Report.' Using a simple Google Form, we gathered quantitative and qualitative data. The response validated our concerns:\n\n- 1,489 students (nearly 25% of the student body) responded in just 48 hours.\n- Over 90% reported negative impacts on academics and well-being.\n- 78.1% explicitly stated they felt their feedback was 'rarely' or 'never' heard by management.\n\nThe key insight: The problem wasn't apathy; it was the system. Students were eager to engage constructively.",
        },
        {
            title: "Validation: The Mandate for Echo",
            content: "The report concluded with a pivotal question: Would students use a dedicated platform for structured feedback? An overwhelming 88.1% said YES. This massive affirmation became our mandate. It proved the demand for a tool that focused on 'Collaboration, Not Protest', a platform turning voices into actionable solutions, not just amplifying complaints.",
        },
        {
          title: "The Solution: A Unified Platform",
          content: "The culmination of this process is the Echo platform prototype, designed to be intuitive for users and insightful for leaders across all devices. The platform was designed with a mobile-first approach to ensure accessibility, with key features like the Student Dashboard, submission flows, and Administrator analytics available on both desktop and mobile.",
          imageUrl: 'https://i.imgur.com/w1iOhC4.png',
          imageAlt: 'High-fidelity mockups of key Echo screens',
          phoneImageUrl: 'https://i.imgur.com/M5E162p.png',
          phoneImageAlt: 'High-fidelity mockups of key Echo mobile screens',
          device: 'laptop-and-phone'
        },
        {
          title: "Reflections & Learnings",
          content: "1. Power of Data-Driven Advocacy: The Student Report demonstrated that objective data can bridge emotional divides and create a foundation for constructive dialogue much more effectively than noise.\n\n2. Designing for Dual Trust: A successful civic-tech platform isn't just about UI; it's about engineering trust between potentially skeptical user groups through features like transparency, security, and clear processes.\n\n3. From Problem to Product: This project was a crash course in the end-to-end product lifecycle – identifying a deep user need, validating it with research, designing a solution, building partnerships, and planning for launch.",
        }
      ]
    }
  },
  {
    slug: 'shop-hebron',
    title: 'Shop Hebron',
    category: 'E-Commerce Platform',
    imageUrl: 'https://i.imgur.com/r6y05k4.png',
    phoneImageUrl: 'https://i.imgur.com/lEa6Uht.png',
    summary: 'Designing a centralized, trustworthy e-commerce platform to streamline a chaotic student-run economy.',
    caseStudy: {
      hero: {
        title: "Shop Hebron: Designing Trust and Efficiency for a Student Economy",
        tags: ["UI/UX Design", "Front-End Development", "E-Commerce"],
        summary: "Designed and prototyped a centralized e-commerce platform for a university community, solving core user frustrations around friction and trust. Key designs included distinct buyer/seller interfaces, a user-centric dual-purchase flow, and a seller verification system.",
        role: "UI/UX Designer & Front-End Developer",
        timeline: "Concept to Prototype",
        imageUrl: 'https://i.imgur.com/r6y05k4.png',
        imageAlt: "High-quality mockup of the Shop Hebron homepage"
      },
      sections: [
        {
          title: "The Problem: A Marketplace of Spam",
          content: "Covenant University has a vibrant internal economy, but commerce was trapped in chaotic and 'spammy' social media groups. This created significant friction for both buyers, who were bombarded with ads, and sellers, who had to compete for views. The existing 'system' bred distrust and inefficiency.",
        },
        {
            title: "Solution: A Clean, Responsive Marketplace",
            content: "The redesigned interface provides a clean, intuitive shopping experience on any device. The desktop view features robust filtering and clear categorization, while the prioritized mobile experience offers touch-friendly navigation and a streamlined checkout. This professional and trustworthy environment directly addresses the 'spammy' nature of the old system.",
            imageUrl: 'https://i.imgur.com/r6y05k4.png',
            imageAlt: 'Desktop interface for Shop Hebron',
            phoneImageUrl: 'https://i.imgur.com/lEa6Uht.png',
            phoneImageAlt: 'Mobile interface for Shop Hebron',
            device: 'laptop-and-phone',
        },
        {
          title: "Reflections & Learnings",
          content: "1. Qualitative Insights Drive Design: Understanding user frustrations through observation and interviews was key to defining the right problems and designing relevant solutions like the dual-purchase flow.\n\n2. Trust is Foundational: In peer-to-peer marketplaces, designing for trust (verification, secure payments) is paramount and often more critical than novel UI features.\n\n3. Context is Key: Designing specifically for the 'Hebron' student context allowed for tailored solutions that wouldn't apply to a generic e-commerce site.",
        }
      ]
    }
  },
  {
    slug: 'estate',
    title: 'Estate',
    category: 'Real Estate Management',
    imageUrl: 'https://i.imgur.com/83pM2S4.png',
    phoneImageUrl: 'https://i.imgur.com/GCRQk36.png',
    summary: 'A centralized, multi-role platform that simplifies property management for landlords, tenants, and facility managers.',
    caseStudy: {
      hero: {
        title: "Estate: A Multi-Role Property Management Platform",
        tags: ["UX Research", "UI Design", "Design Systems"],
        summary: "A centralized, multi-role platform that simplifies operations by providing customized dashboards for five distinct user types, from Tenants paying rent to Executives monitoring portfolio health.",
        role: "Lead UI/UX Designer",
        timeline: "Contract Project",
        imageUrl: 'https://i.imgur.com/83pM2S4.png',
        imageAlt: "High-quality mockup of the main Executive dashboard"
      },
      sections: [
        {
          title: "The Problem: One Platform, Five Worlds",
          content: "Property management is a tangle of disconnected workflows. Landlords, tenants, residents, and managers use separate, inefficient systems, leading to costly errors and frustration. The central challenge wasn't just to design a dashboard, but to design five different versions of a single platform for users with completely different and sometimes conflicting needs.",
        },
        {
            title: "User Research: The 'Tenant vs. Resident' Insight",
            content: "My initial discovery phase revealed the system required five user roles, not four. The key insight was that a 'Tenant' (who pays rent to a Landlord) and a 'Resident' (who pays service charges to a Facility Manager) are two separate users with different goals. Grouping them would lead to a confusing interface. This discovery led me to define a clear permission structure for all 5 roles: Executive, Landlord, Facility Manager, Tenant, and Resident.",
        },
        {
          title: "Solution: Role-Based Dashboards",
          content: "The final design delivers a unique, tailored dashboard for each user. The Executive 'God view' provides a high-level overview of portfolio health and KPIs, while the mobile app provides managers with critical data and quick actions on the go, ensuring users can stay on top of their properties from anywhere.",
          imageUrl: 'https://i.imgur.com/83pM2S4.png',
          imageAlt: 'Executive Dashboard for Estate',
          isScrollable: true,
          phoneImageUrl: 'https://i.imgur.com/GCRQk36.png',
          phoneImageAlt: 'Mobile dashboard for Estate',
          device: 'laptop-and-phone',
        },
        {
          title: "Reflections & Learnings",
          content: "1. Discovery is Everything: The most critical milestone was identifying the 5 distinct user roles. The 'Tenant vs. Resident' insight saved the project from designing a confusing, one-size-fits-all product.\n\n2. Design Systems are Non-Negotiable for Complexity: Managing 5+ dashboards would have been impossible without a centralized component library. It was the only way to maintain consistency and efficiency.\n\n3. Microcopy is UX: A user's experience is shaped by words. Building a microcopy library ensured the platform felt empathetic and intelligent, adapting its tone for each role.",
        }
      ]
    }
  },
];