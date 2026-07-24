import { type PortfolioItem, type AboutContent } from '@/types';


export const RESUME_URL = '/resume.pdf'; // Placeholder for the resume PDF

export const heroContent = {
  availability: "AVAILABLE FOR WORK",
  headline: "Designing simple, intuitive solutions to complex problems.",
  subheadline: "Passionate about transforming complex problems into simple, intuitive, and user-friendly designs.",
};

export const aboutContent: AboutContent = {
    name: "David Oloniyo",
    introduction: "I'm a UI/UX Designer and Computer Engineering student passionate about transforming complex problems into simple, intuitive, and user-friendly designs.\n\nI'm a designer driven by one core belief: technology should be a bridge, not a barrier. My passion is to find the frustration in everyday systems, whether it's the chaos of a student marketplace or the disconnect in a campus-wide feedback loop, and design a solution that feels effortless and logical.\n\nMy process is built on empathy and data. I love digging into a problem, understanding the real human needs, and iterating until the solution truly works.",
    imageUrl: 'https://i.imgur.com/uFVErFN.png',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'User Flow', 'Collaboration', 'Empathy', 'Visual & UI', 'Information Design', 'Critical Thinking', 'Communication', 'Design Thinking', '&'],
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
    imageUrl: '/images/main/ECHO - Homepage.webp',
    phoneImageUrl: 'https://i.imgur.com/M5E162p.png',
    summary: 'A civic-tech platform to bridge the communication gap between students and university leadership with data-driven design.',
    caseStudy: {
      hero: {
        title: "ECHO: Engineering a Civic-Tech Platform to Silence Campus Noise.",
        tags: ["Product Strategy", "System Architecture", "UX Design"],
        summary: "Co-founded and led the design for Echo, a civic-tech platform bridging the communication gap. I architected a dual-trust platform and smart-ranking system to turn 1,489 frustrated student voices into actionable data for university leadership.",
        role: "Co-Founder & Lead Product Designer",
        timeline: "Feb 2025 – Present",
        imageUrl: '/images/main/ECHO - First Image.webp',
        imageAlt: "Polished hero image of the Echo platform"
      },
      sections: [
        {
          title: "The Disconnect",
          content: "Echo wasn't born in a classroom; it started from a real campus issue. When our university implemented a sudden, campus-wide power cut policy, the student response was immediate but chaotic, highlighting a critical disconnect.\n\n**The Catalyst:** A sudden campus-wide power policy sparked outrage.\n\n**The Friction:** Students flooded social media (creating noise), while leadership required structured, actionable feedback (creating silence).\n\n**The Data:** In 48 hours, 1,489 students were surveyed. 88.1% demanded a dedicated platform for structured feedback.\n\n**The Goal:** Shift from amplifying complaints to structuring solutions.",
          imageUrls: ['/images/main/Problem 1.webp', '/images/main/Problem 2.webp'],
          imageAlt: 'Visualizing noise vs structure'
        },
        {
          title: "System Architecture & Validation",
          content: "To move beyond frustration, I co-authored the 'Student Feedback Report' which proved the mandate for a tool focused on 'Collaboration, Not Protest'. But ECHO isn't just a feedback form; it's a dynamic data-routing engine.\n\nI architected the 'Echo Flow' to handle varying levels of urgency by categorizing inputs into distinct severity tiers (Wave, Surge, Ping, Whisper). Before reaching an administrator, every submission passes through a smart-ranking algorithm. This ensures that a critical, campus-wide infrastructure failure (a 'Surge') is prioritized immediately over a minor maintenance request (a 'Whisper'). By designing this underlying logic first, I guaranteed the UI would serve the system's core purpose: triage and resolution.",
          imageUrls: ['/images/main/Flow.webp?v=4', '/images/main/Flow 2.webp'],
          imageAlt: 'System Flow logic maps'
        },
        {
          title: "Designing for Dual Trust",
          content: "A successful civic-tech platform isn't just about UI; it's about engineering trust between potentially skeptical user groups. For ECHO, I mapped out a rigid state management system that handled edge cases gracefully.\n\n**The Waiting Room UX:** I designed a specific 'Limbo State' for users who join restricted organizations. Instead of a blank screen or a frustrating lockout, users see a transparent pending state, preventing drop-off while enforcing strict security.\n\n**Domain Matching:** To prevent spam, the onboarding flow validates email domains in real-time. If a student tries to join an official university space without the correct domain, they are seamlessly routed to an empathetic error state rather than breaking the application.",
          imageUrl: '/images/main/ECHO - Second Image Mobile.webp?v=4',
          imageAlt: 'Student mobile app and Admin dashboard comparisons',
          phoneImageUrl: '/images/main/Mobile.webp?v=4',
          phoneImageAlt: 'Student mobile app',
          bottomImageUrl: '/images/main/ECHO - Second Image.webp?v=4',
          device: 'laptop-and-phone'
        },
        {
          title: "Cross-Functional Execution",
          content: "The platform was designed with a mobile-first approach to ensure accessibility for students, while building the Super Admin dashboard required designing for global visibility on desktop. I created a clinical, utilitarian interface for the 'Maintenance' panel, requiring explicit toggles (like 'Dry Run' states) before admins could purge data or deactivate organizations, ensuring system safety.\n\nTo ensure a flawless developer handoff to my engineering partner, I anchored the UI in a rigorous Figma component library. Using strict auto-layout rules and comprehensive component variants, we resolved technical constraints together, bridging the gap between product vision and backend realities.",
          imageUrl: '/images/main/Echo Handoff.webp?v=4',
          imageAlt: 'Figma component library handoff'
        },
        {
          title: "Impact & Reflections",
          content: "**Data Bridges Emotional Divides:** The Student Report demonstrated that objective data can bridge emotional divides and create a foundation for constructive dialogue much more effectively than social media noise.\n\n**Trust Requires Transparency:** Features like the 'Waiting Room' prove that a successful platform engineers trust for both users and administrators.\n\n**From Problem to Product:** This project was a crash course in the end-to-end product lifecycle – identifying a deep user need, validating it with research, designing a solution, building partnerships, and planning for launch.",
          imageUrls: ['/images/main/Impact 1.webp', '/images/main/Impact 2.webp'],
          displayLayout: 'side-by-side',
          imageAlt: 'Echo case study reflections'
        }
      ]
    }
  },
  {
    slug: 'shop-hebron',
    title: 'Shop Hebron',
    category: 'E-Commerce Platform',
    imageUrl: '/images/main/SHOP HEBRON - Homepage.webp',
    phoneImageUrl: 'https://i.imgur.com/lEa6Uht.png',
    summary: 'Transitioning a chaotic student-run economy into a secure, centralized platform using A/B-tested checkout flows.',
    caseStudy: {
      hero: {
        title: "Shop Hebron: Engineering Trust in a Localized Micro-Economy",
        tags: ["UI/UX Design", "UX Research", "E-Commerce"],
        summary: "Transitioning a university's chaotic social commerce into a secure, centralized platform using A/B-tested checkout flows. I delivered an engineering-ready prototype that solved core user frustrations around friction and peer-to-peer trust.",
        role: "Lead UI/UX Designer",
        timeline: "June 2025 – Sept 2025 | Prototype & Contract Handoff Completed",
        imageUrl: '/images/main/SHOP HEBRON - First Image.webp',
        imageAlt: "High-quality mockup of the Shop Hebron homepage"
      },
      sections: [
        {
          title: "The Context: A Marketplace of Spam",
          content: "Covenant University possessed a vibrant internal economy, but commerce was trapped in chaotic and 'spammy' social media groups. This created a massive trust deficit and significant friction for both parties.\n\n**The Friction:** Buyers were constantly bombarded with unstructured ads and risked falling for scams. Conversely, legitimate sellers fought a losing battle for visibility in fast-moving chat feeds. The existing 'system' bred distrust and inefficiency, highlighting the critical business goal: build a platform that eradicates spam and establishes foundational trust between peer-to-peer buyers and sellers.",
        },
        {
          title: "Designing for Trust (The Core Feature)",
          content: "In peer-to-peer marketplaces, designing for trust (verification, secure payments) is paramount and often more critical than novel UI features. Through deep qualitative insights, observation, and user interviews, I understood that the platform needed distinct, highly secure environments for both buyers and sellers.\n\nBy implementing clear 'Verified Seller' badging, transparent payout dashboards for vendors, and a user-centric dual-purchase flow, I designed an interface where trust was baked directly into the architecture. This professional environment directly addressed the 'spammy' nature of the old system.",
          displayLayout: 'thumbnail-carousel',
          imageUrls: [
            '/images/gallery/Shop Hebron - (Dashboard) Admin Dashboard.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Admin Payout.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Admin Seller - Customers.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Admin Customers Comments.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Seller Dashboard.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Seller Add New Product.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Seller Order Management Details.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Product Desktop.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Order History Desktop.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Order History Detail Desktop.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Refund Desktop.webp',
            '/images/gallery/Shop Hebron - (Dashboard) Wishlist Desktop.webp'
          ]
        },
        {
          title: "The Prototype A/B Test",
          content: "**The Hypothesis:** I hypothesized that positioning a prominent 'Verified Student Seller' badge directly adjacent to the 'Checkout' button would reduce buyer anxiety and increase checkout initiation.\n\n**The Test:** I conducted usability A/B testing on the high-fidelity prototype with active student buyers. Variant A kept standard e-commerce placement, while Variant B prioritized the trust badge.\n\n**The Result:** Variant B demonstrated a significant decrease in perceived purchase risk. This data-driven insight dictated the final layout and proved that understanding the specific 'Hebron' student context allows for tailored solutions that wouldn't apply to generic e-commerce sites."
        },
        {
          title: "The Conversion Engine: Streamlining Checkout",
          content: "E-commerce lives and dies by friction. The redesigned interface provides a clean, intuitive shopping experience on any device, but the true conversion engine is the checkout flow.\n\nBased on A/B test insights, I completely overhauled the cart management system. The prioritized mobile experience offers touch-friendly navigation that reduces the steps from 'intent to purchase' to 'payment confirmed'. While the desktop view features robust filtering and clear categorization, the mobile flow acts as a silent conversion engine by removing cognitive overload during the payment phase.",
          displayLayout: 'mobile-frame-carousel',
          imageUrls: [
            '/images/gallery/Shop Hebron - (Mobile) Product Mobile.webp',
            '/images/gallery/Shop Hebron - (Mobile) Product Mobile Extended.webp',
            '/images/gallery/Shop Hebron - (Mobile) Cart.webp',
            '/images/gallery/Shop Hebron - (Mobile) Checkout.webp',
            '/images/gallery/Shop Hebron - (Mobile) Order History Mobile.webp',
            '/images/gallery/Shop Hebron - (Mobile) Refund Mobile.webp',
            '/images/gallery/Shop Hebron - (Mobile) Subscription Cancellation-1 Mobiile.webp',
            '/images/gallery/Shop Hebron - (Mobile) Wishlist Mobile.webp'
          ]
        },
        {
          title: "The Contract Handoff",
          content: "A design is only as good as its execution. I concluded my contract by delivering a fully A/B-tested, high-fidelity prototype alongside a rigorously organized Figma component library.\n\nBy leveraging global design tokens and strict auto-layout rules, I ensured the engineering team had a flawless, developer-ready design system prepared for immediate deployment. This comprehensive handoff marked a highly successful conclusion to the project.",
          imageUrl: '/images/main/SHOP HEBRON - Second Image.webp',
          imageAlt: 'Shop Hebron design system and contract handoff'
        },
        {
          title: "The Landing Page",
          content: "The public-facing marketing pages designed to onboard users and communicate trust.",
          displayLayout: 'thumbnail-carousel',
          imageUrls: [
            '/images/gallery/Shop Hebron - (Landing Page) Desk.webp',
            '/images/gallery/Shop Hebron - (Landing Page) About Us Desktop.webp'
          ]
        }
      ]
    }
  },
  {
    slug: 'estate',
    title: 'Estate',
    category: 'Real Estate Management',
    imageUrl: '/images/main/MY-ESTATE - Homepage.webp',
    phoneImageUrl: 'https://i.imgur.com/GCRQk36.png',
    summary: 'A centralized, multi-role platform that simplifies property management for landlords, tenants, and facility managers.',
    caseStudy: {
      hero: {
        title: "MyEstate: Architecting a Multi-Role Enterprise Platform",
        tags: ["Enterprise SaaS", "UX Architecture", "Design Systems"],
        summary: "Designing a centralized SaaS ecosystem that untangles property management by delivering tailored, role-based workflows for executives, managers, landlords, and tenants.",
        role: "Lead UI/UX Designer",
        timeline: "Sept 2025 – Oct 2025",
        imageUrl: '/images/main/MY-ESTATE - First Image.webp',
        imageAlt: "High-quality mockup of the main Executive dashboard"
      },
      sections: [
        {
          title: "The Core Challenge: One Platform, Five Worlds",
          content: "Property management relies on a tangle of deeply disconnected workflows. Landlords, tenants, residents, and managers use separate, inefficient systems, leading to costly errors in rent tracking, maintenance, and financial reporting.\n\n**The Tangle:** Disconnected systems cause massive friction, miscommunication, and data loss across the property lifecycle.\n\n**The UX Challenge:** Designing a unified platform that serves five distinct user types with fundamentally conflicting needs—without making the interface feel bloated or compromising security.",
          imageUrl: '/images/main/core-challenge.svg',
          imageAlt: 'The core challenge diagram showing disconnected systems',
        },
        {
          title: "The Breakthrough Insight: RBAC & Permission Matrix",
          content: "My initial discovery phase revealed a critical flaw in the project's initial assumptions: a 'Tenant' and a 'Resident' are NOT the same user. Assuming they were would have ruined the financial architecture.\n\n**Tenant:** Pays rent directly to the Landlord.\n**Resident:** Pays service charges to the Facility Manager.\n\nBy splitting these roles, I defined a highly secure, clear Role-Based Access Control (RBAC) structure for all 5 user types (Executive, Landlord, Facility Manager, Tenant, Resident). This pivot ensured the UI was driven by sound business logic, preventing catastrophic financial overlap.",
          imageUrl: '/images/main/matrix.svg',
        },
        {
          title: "Role-Based Dashboards (The 'God View')",
          content: "Designing for enterprise scale means managing density. For the Executive and Landlord dashboards, I designed a desktop-first 'God View'. This interface focuses heavily on data visualization, financial reporting, occupancy rates, and high-level portfolio health. By structuring the information architecture logically, executives can scan complex financial health indicators in seconds without digging through nested menus.",
          displayLayout: 'thumbnail-carousel',
          imageUrls: [
            '/images/gallery/MyEstate - (Dashboard) Dashboard.webp',
            '/images/gallery/MyEstate - (Dashboard) Dashboard - Facility Manger.webp',
            '/images/gallery/MyEstate - (Dashboard) Dashboard RE - Landlord.webp',
            '/images/gallery/MyEstate - (Dashboard) Dashboard - Tenant.webp',
            '/images/gallery/MyEstate - (Dashboard) Dashboard - Resident.webp',
            '/images/gallery/MyEstate - (Dashboard) Customers.webp',
            '/images/gallery/MyEstate - (Dashboard) MyEstate - (Dashboard) All Properties - Details.webp',
            '/images/gallery/MyEstate - (Dashboard) Tenant Details (Overview)- Landlord.webp',
            '/images/gallery/MyEstate - (Dashboard) Property Detail (Active Task) - Facility Manger.webp',
            '/images/gallery/MyEstate - (Dashboard) Property Detail - Facility Manger.webp',
            '/images/gallery/MyEstate - (Dashboard) Request Details - Resident.webp',
            '/images/gallery/MyEstate - (Dashboard) Schedule- Facility Manger.webp',
            '/images/gallery/MyEstate - (Dashboard) Pay Rent - Tenant.webp',
            '/images/gallery/MyEstate - (Dashboard) Chat - Resident.webp',
            '/images/gallery/MyEstate - (Dashboard) Login.webp'
          ]
        },

        {
          title: "Scaling with Systems",
          content: "Managing 5+ distinct dashboards would have been impossible without a rigid, centralized design system. To ensure a flawless developer handoff and maintain UI consistency across the entire ecosystem, I built a comprehensive Figma component library. By leveraging global design tokens, strict auto-layout rules, and reusable variants for data tables and form fields, I empowered the engineering team to build the platform efficiently and at scale.",
          imageUrl: '/images/main/MyEsate Handoff.png',
          imageAlt: 'Figma component library for MyEstate',
        },
        {
          title: "The Microcopy Polish",
          content: "A user's experience is heavily shaped by the words they read. Because the platform serves five entirely different mindsets, building a context-aware microcopy library was essential. The tone of the UI adapts based on the user's role—for example, a rent reminder for a Tenant is designed to be empathetic and helpful, whereas a late-payment alert for an Executive is direct, data-driven, and urgent. This micro-level attention to detail ensures the platform feels intelligent and deeply human.",
          imageUrl: '/images/main/micro.png',
          imageAlt: 'Microcopy polish examples',
        }
      ]
    }
  },
  {
    slug: 'chowcheck',
    title: 'ChowCheck',
    category: 'FoodTech Utility',
    imageUrl: '/images/timeline/CHOWCHECK - First Image.webp',
    phoneImageUrl: '',
    summary: "I built a smart campus food assistant that links daily budgets and provisions to stretch a student's chow allowance all semester. Serving as Lead Product Designer and Web Developer, I engineered this resilient, offline-first utility from the ground up.",
    caseStudy: {
      hero: {
        title: "CHOWCHECK: Architecting a Smart Campus Food Assistant.",
        tags: ["Product Strategy", "UI/UX Design", "Front-End Development"],
        summary: "I built a smart campus food assistant that links daily budgets and provisions to stretch a student's chow allowance all semester. Serving as Lead Product Designer and Web Developer, I engineered this resilient, offline-first utility from the ground up.",
        role: "Lead Product Designer & Web Developer",
        timeline: "June 2026 – Present",
        imageUrl: '/images/timeline/CHOWCHECK - First Image.webp',
        imageAlt: "ChowCheck Hero Placeholder"
      },
      sections: [
        {
          title: "The Core Constraint: Designing for Disconnection",
          content: "University campuses are notorious for spotty internet, making conventional cloud dependent apps unreliable for students on a tight budget. ChowCheck is built for the student who cannot afford to be locked out of their meal planning because the Wi-Fi dropped. I designed an offline first architecture that prioritizes resilience. The UX ensures students can access their financial data, log meals, and calculate their remaining balance without a live connection. Once connectivity is restored, a seamless background sync updates the system, building trust in low bandwidth environments.",
          imageUrl: '/images/main/CHOWCHECK - Offline Flow.webp',
          imageAlt: 'Offline first user flow diagram',
        },
        {
          title: "Structuring the Mess: The Database UI",
          content: "Campus food vendors do not sell in flat, predictable menus; they sell in multi tiered packages where items like swallow and soup must be paired together. This real world complexity presented a unique UX challenge. To solve this, I designed a highly intuitive interface that handles nested meal packages gracefully. By visually flattening these complex dependencies, I empowered users to build intricate meals without cognitive overload or a cluttered screen, showcasing my ability to design for complex data structures.",
          imageUrl: '/images/main/SHOP HEBRON - Second Image.webp',
          imageAlt: 'Database UI showing multi-tiered packages',
          phoneImageUrl: 'https://i.imgur.com/lEa6Uht.png',
          phoneImageAlt: 'Mobile Database UI',
          device: 'laptop-and-phone',
        },
        {
          title: "Designing for Failure: Telemetry & Transactions",
          content: "Real world products fail, and error states are where user trust is truly tested. I incorporated telemetry logging directly into my UX strategy. When critical errors occur, I ensured users see context aware, empathetic failure screens instead of a confusing crash. I also designed specific UI recovery flows for mid processing payment drops via Paystack, ensuring my users can confidently recover their transactions without financial anxiety.",
          imageUrl: '/images/main/CHOWCHECK - Error States.webp',
          imageAlt: 'Error state UI and telemetry recovery flows',
        },
        {
          title: "The 'Survival Engine' & Personalization",
          content: "I designed ChowCheck as a highly personalized campus lifestyle platform. I built the Survival Engine feature to generate meal routines based on exact budgets, specific cravings, and real time vendor availability. Whether I was filtering out empty carbs for health focused students or finding open vendors at 2 AM for night readers, I used empathetic microcopy and intentional color psychology like Spicy Orange for urgency to act as a resourceful guide, effectively eliminating student decision fatigue.",
        },
        {
          title: "Product Strategy & Web Execution",
          content: "Bringing a product to market required more than just designing screens. To drive user acquisition, I expanded my role to develop and code the marketing website. Bridging the gap between design and frontend development allowed me to ensure the final build matched my design vision perfectly. I also architected the web rollout strategy, scripting promotional videos and crafting a narrative that positioned the product as an indispensable campus utility.",
          imageUrl: '/images/main/MY-ESTATE - Second Image.webp',
          imageAlt: 'Marketing website code and live webpage',
          phoneImageUrl: 'https://i.imgur.com/GCRQk36.png',
          phoneImageAlt: 'Mobile Marketing website',
          device: 'laptop-and-phone',
        }
      ]
    }
  }
];