import { Project, SkillCategory, ExperienceItem, EducationItem, ServiceItem } from '@/types/portfolio';

export const PERSONAL_INFO = {
  name: 'Sirojbek Muxtorov',
  shortName: 'SM.',
  role: {
    uz: 'Full-Stack Software Engineer | AI/ML & Automation Engineer',
    en: 'Full-Stack Software Engineer | AI/ML & Automation Engineer'
  },
  heroTitle: {
    uz: 'Full-Stack & AI Engineer',
    en: 'Full-Stack & AI Engineer'
  },
  tagline: {
    uz: 'Biznes uchun zamonaviy veb ilovalar, AI yechimlar va avtomatlashtirish tizimlarini yarataman.',
    en: 'Building cutting-edge web applications, AI solutions, and intelligent business automation systems.'
  },
  location: {
    uz: 'Samarqand, O‘zbekiston',
    en: 'Samarkand, Uzbekistan'
  },
  phone: '+998 90 192 0755',
  phoneTel: 'tel:+998901920755',
  github: 'https://github.com/sirojbekmuxtorov2006',
  githubUsername: 'sirojbekmuxtorov2006',
  freelancePeriod: {
    uz: '2023-yildan hozirgacha',
    en: '2023 – Present'
  },
  languages: [
    {
      lang: { uz: 'O‘zbek tili', en: 'Uzbek' },
      level: { uz: 'Ona tili', en: 'Native' },
      code: 'UZ'
    },
    {
      lang: { uz: 'Ingliz tili', en: 'English' },
      level: { uz: 'B2 (Intermediate / Upper)', en: 'B2 (Upper Intermediate)' },
      code: 'EN'
    },
    {
      lang: { uz: 'Rus tili', en: 'Russian' },
      level: { uz: 'Professional ish darajasi', en: 'Professional Working' },
      code: 'RU'
    }
  ]
};

export const ABOUT_TEXT = {
  uz: {
    bio: 'Men zamonaviy veb ilovalar, backend tizimlar, AI mahsulotlar va biznes jarayonlarini avtomatlashtirish ustida ishlaydigan dasturchiman. Talablarni tahlil qilishdan arxitektura, frontend, backend, ma’lumotlar bazasi, integratsiyalar va deploygacha bo‘lgan jarayonda ishtirok etaman. Maqsadim — foydalanuvchiga qulay, ishonchli va rivojlantirish oson bo‘lgan mahsulotlar yaratish.',
    highlights: [
      { title: 'End-to-End Ishlanma', desc: 'Loyihani arxitekturadan tortib to to‘liq ishlab chiqarish (production) serveriga yetkazishgacha bo‘lgan to‘liq sikl.' },
      { title: 'AI & Avtomatlashtirish', desc: 'Zamonaviy LLM modellar, AI agentlar va biznesni yengillashtiruvchi intellektual skriptlar.' },
      { title: 'Ishonchli Arxitektura', desc: 'Tirbandlikka chidamli APIlar, xavfsiz ma’lumotlar bazalari va qulay foydalanuvchi interfeyslari.' }
    ]
  },
  en: {
    bio: 'I am a software engineer focused on developing modern web applications, robust backend architectures, AI-driven products, and business automation pipelines. I take ownership across the entire product lifecycle — from requirement discovery and system design to frontend, backend, database modeling, external integrations, and cloud deployment. My mission is to build software that is intuitive for users, reliable in production, and simple to maintain and scale.',
    highlights: [
      { title: 'End-to-End Engineering', desc: 'Full development lifecycle from system design to high-availability production deployment.' },
      { title: 'AI & Intelligent Automation', desc: 'Modern LLM agents, vector retrieval systems, and workflow automation solutions.' },
      { title: 'Scalable Architecture', desc: 'High-throughput APIs, robust data storage, and accessible, responsive frontends.' }
    ]
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: { uz: 'Frontend Dasturlash', en: 'Frontend Engineering' },
    description: {
      uz: 'Zamonaviy, tezkor va foydalanuvchi uchun qulay interfeyslar yaratish',
      en: 'Building high-performance, dynamic, and accessible user interfaces'
    },
    icon: 'Layers',
    accent: '#00f0ff',
    skills: [
      { name: 'Next.js', highlight: true },
      { name: 'React', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript' },
      { name: 'Tailwind CSS', highlight: true },
      { name: 'shadcn/ui' },
      { name: 'Redux Toolkit' },
      { name: 'TanStack Query' }
    ]
  },
  {
    id: 'backend',
    title: { uz: 'Backend & Tizimlar', en: 'Backend & Systems' },
    description: {
      uz: 'Kengayuvchan API lar, mikroxizmatlar va server logikasi',
      en: 'Scalable web APIs, microservices, and reliable server-side architecture'
    },
    icon: 'Server',
    accent: '#818cf8',
    skills: [
      { name: 'Node.js', highlight: true },
      { name: 'NestJS', highlight: true },
      { name: 'Express' },
      { name: 'Python', highlight: true },
      { name: 'FastAPI', highlight: true },
      { name: 'Django' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'REST API', highlight: true },
      { name: 'WebSockets' }
    ]
  },
  {
    id: 'ai-ml',
    title: { uz: 'AI/ML & Avtomatlashtirish', en: 'AI/ML & Automation' },
    description: {
      uz: 'Intellektual agentlar, katta til modellari va kompyuter ko‘rishi',
      en: 'Autonomous AI agents, large language models, and computer vision'
    },
    icon: 'Cpu',
    accent: '#a855f7',
    skills: [
      { name: 'AI Agents', highlight: true },
      { name: 'LLM', highlight: true },
      { name: 'LangChain', highlight: true },
      { name: 'RAG', highlight: true },
      { name: 'Hugging Face' },
      { name: 'PyTorch' },
      { name: 'TensorFlow' },
      { name: 'NLP' },
      { name: 'Computer Vision' },
      { name: 'YOLO' },
      { name: 'OpenCV' }
    ]
  },
  {
    id: 'databases',
    title: { uz: 'Ma’lumotlar Bazalari', en: 'Databases & Storage' },
    description: {
      uz: 'Strukturalangan, NoSQL va vektor ma’lumotlar omborlari',
      en: 'Relational, document-oriented, and high-dimensional vector stores'
    },
    icon: 'Database',
    accent: '#38bdf8',
    skills: [
      { name: 'PostgreSQL', highlight: true },
      { name: 'Prisma', highlight: true },
      { name: 'MongoDB' },
      { name: 'Mongoose' },
      { name: 'Redis', highlight: true },
      { name: 'Pinecone', highlight: true }
    ]
  },
  {
    id: 'devops',
    title: { uz: 'DevOps & Bulut Infratuzilmasi', en: 'DevOps & Cloud' },
    description: {
      uz: 'Konteynerlashtirish, doimiy integratsiya va xavfsiz deploy',
      en: 'Containerization, CI/CD automation, and resilient cloud hosting'
    },
    icon: 'Cloud',
    accent: '#34d399',
    skills: [
      { name: 'Docker', highlight: true },
      { name: 'Kubernetes' },
      { name: 'Nginx' },
      { name: 'GitHub Actions', highlight: true },
      { name: 'CI/CD' },
      { name: 'AWS' },
      { name: 'Google Cloud' },
      { name: 'Vercel', highlight: true },
      { name: 'Railway' },
      { name: 'Linux', highlight: true }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'sirojbek-ai-agent',
    title: 'SIROJBEK AI Agent',
    category: 'AI',
    tags: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'LangChain', 'Docker'],
    shortDesc: {
      uz: 'AI agentlar, suhbatlar, API integratsiyalari va biznes jarayonlarini avtomatlashtirish platformasi.',
      en: 'Platform for autonomous AI agents, intelligent conversations, API integrations, and business workflow automation.'
    },
    fullDesc: {
      uz: 'SIROJBEK AI Agent — foydalanuvchilar va tashkilotlar uchun murakkab biznes jarayonlarini avtomatlashtirishga mo‘ljallangan ko‘p qirrali platforma. LangChain va LLMlar orqali hujjatlar bilan ishlash, ma’lumotlar bazalaridan javob qidirish va tashqi APIlar orqali harakatlarni mustaqil bajarish imkoniyatiga ega.',
      en: 'SIROJBEK AI Agent is a comprehensive autonomous platform designed to automate intricate enterprise workflows. Leveraging LangChain and LLM pipelines, it empowers real-time document intelligence, vector semantic lookup, and autonomous tool calling via external APIs.'
    },
    architecture: {
      uz: [
        'FastAPI asosidagi asinxron AI xizmatlar va LLM pipeline',
        'Redis yordamida suhbatlar kontekstini tezkor keshlashtirish',
        'PostgreSQL va pgvector orqali semantik qidiruv',
        'Next.js 14 App Router da reaktiv chat interfeysi'
      ],
      en: [
        'Asynchronous AI microservice built with FastAPI and LangChain',
        'Redis cache layer for ultra-low latency conversation context',
        'PostgreSQL with pgvector for hybrid semantic document retrieval',
        'Responsive interactive cockpit powered by Next.js App Router'
      ]
    },
    features: {
      uz: [
        'Kontekstni eslab qoluvchi intellektual suhbatdosh agent',
        'Maxsus biznes qoidalariga moslashtirilgan vositalar (tools)',
        'Hujjatlar (PDF, TXT, CSV) bo‘yicha tezkor tahlil va xulosa',
        'Docker konteynerlarida oson deploy qilish arxitekturasi'
      ],
      en: [
        'Memory-retaining conversational agents with autonomous reasoning',
        'Custom tool-calling ecosystem tailored to enterprise workflows',
        'In-depth document analysis and instant contextual synthesis',
        'Isolated Docker containerization for straightforward deployment'
      ]
    },
    stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'LangChain', 'Docker'],
    conceptType: 'chat-ai'
  },
  {
    id: '21-asr-website',
    title: '21-ASR Website',
    category: 'Full-Stack',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    shortDesc: {
      uz: 'Raqamli kontent va ijtimoiy media yo‘nalishidagi responsive platforma.',
      en: 'High-performance responsive platform focused on digital media and modern social content.'
    },
    fullDesc: {
      uz: '21-ASR platformasi — media va kontent yaratuvchilar uchun moslashtirilgan zamonaviy axborot portali. Tez yuklanish, SEO optimizatsiyasi va barcha mobil qurilmalarga mukammal moslashuvchanlik prinsiplari asosida ishlab chiqilgan.',
      en: '21-ASR is a modern digital media portal built for contemporary publishers and dynamic content distribution. Engineered with Core Web Vitals optimization, server-side rendering, and responsive multi-device layouts.'
    },
    architecture: {
      uz: [
        'Next.js Server Components orqali tezkor sahifalarni ko‘rsatish',
        'Tailwind CSS yordamida toza va moslashuvchan dizayn tizimi',
        'Node.js RESTful API integratsiyasi',
        'SEO va ijtimoiy tarmoqlar uchun avtomatlashtirilgan OpenGraph metama’lumotlar'
      ],
      en: [
        'Next.js Server Components for instantaneous first-paint and low LCP',
        'Modular design tokens and atomic utility classes with Tailwind CSS',
        'Structured Node.js REST API endpoints for media management',
        'Dynamic OpenGraph generation for high social engagement'
      ]
    },
    features: {
      uz: [
        'Media maqolalari va multimediyani qulay ko‘rish rejimi',
        'Teglar va kategoriyalar bo‘yicha tezkor qidiruv',
        'Mobil qurilmalarda tezkor va silliq ishlash',
        'Zamonaviy to‘q rangli mavzu va vizual kontrast'
      ],
      en: [
        'Optimized media article reader with rich multimedia embedding',
        'Instant multi-category filtering and real-time search',
        'Mobile-first responsive layout with zero layout shifts',
        'Adaptive dark theme with refined typographic balance'
      ]
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    conceptType: 'portal'
  },
  {
    id: 'flashcards-uz',
    title: 'Flashcards UZ',
    category: 'Education',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    shortDesc: {
      uz: 'Flashcardlar, autentifikatsiya va o‘quv jarayonini kuzatish imkoniyatlariga ega ta’lim platformasi.',
      en: 'Educational platform featuring spaced-repetition flashcards, user authentication, and learning analytics.'
    },
    fullDesc: {
      uz: 'Flashcards UZ — talabalar va mustaqil o‘rganuvchilar uchun xotirani mustahkamlashga yordam beradigan intellektual ta’lim tizimi. Foydalanuvchilar o‘z kartalarini yaratishi, bilimlarni takrorlash rejasini tuzishi va o‘zlashtirish statistikasini kuzatishi mumkin.',
      en: 'Flashcards UZ is a comprehensive active-recall study platform. It implements spaced repetition intervals, progress analytics, and custom deck management to accelerate knowledge retention.'
    },
    architecture: {
      uz: [
        'Next.js App Router va TypeScript tip xavfsizligi',
        'PostgreSQL relieshinal bazasida foydalanuvchi va kartochkalar bog‘lanishi',
        'Node.js orqali oraliq takrorlash (spaced repetition) algoritmlari',
        'JWT asosidagi xavfsiz sessiya va autentifikatsiya'
      ],
      en: [
        'Next.js App Router delivering complete type safety across tiers',
        'Relational PostgreSQL schema linking users, decks, and card stats',
        'Node.js computational engine for spaced-repetition review scheduling',
        'JWT-based session authentication with secure HTTP-only cookies'
      ]
    },
    features: {
      uz: [
        'Interaktiv 3D buriluvchi kartochkalar interfeysi',
        'Kunlik o‘quv rejasi va oraliq takrorlash algoritmi',
        'O‘quvchining shaxsiy statistikasi va o‘zlashtirish ko‘rsatkichlari',
        'Mavzular bo‘yicha to‘plamlarni guruhlash'
      ],
      en: [
        'Interactive flip-card study interface with smooth feedback',
        'Intelligent daily review queue calculated via repetition algorithms',
        'Personal learning curves and mastery progression metrics',
        'Categorized deck organization and bulk card import/export'
      ]
    },
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    conceptType: 'cards-study'
  },
  {
    id: 'speke-uz',
    title: 'Speke-UZ',
    category: 'AI',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI/NLP'],
    shortDesc: {
      uz: 'AI yordamidagi til o‘rganish platformasi.',
      en: 'AI-assisted language acquisition and interactive fluency coaching platform.'
    },
    fullDesc: {
      uz: 'Speke-UZ — tabiiy tilni qayta ishlash (NLP) texnologiyalari yordamida xorijiy tillarni jonli muloqot orqali o‘rganishga qaratilgan innovatsion platforma. Foydalanuvchi xatolarini tahlil qiladi va talaffuz hamda grammatika bo‘yicha takliflar beradi.',
      en: 'Speke-UZ is an AI-powered conversational language tutor. Utilizing natural language processing pipelines, it simulates real-world dialogue, provides instantaneous grammatical feedback, and builds speaking confidence.'
    },
    architecture: {
      uz: [
        'AI/NLP modellarini integratsiya qiluvchi asinxron backend',
        'Next.js frontendida audio/matn oqimlari (streaming response)',
        'PostgreSQL bazasida muloqotlar tarixi va lug‘at zaxirasi',
        'Node.js orqali tezkor tahlil xizmatlari'
      ],
      en: [
        'Asynchronous backend orchestrating NLP models and scoring',
        'Next.js frontend supporting streamed responses and audio feedback',
        'PostgreSQL datastore for conversation histories and vocabulary logs',
        'Modular Node.js services executing real-time syntactic analysis'
      ]
    },
    features: {
      uz: [
        'AI bilan real vaqtda jonli mavzuli suhbatlar',
        'Grammatik xatolarni bir zumda aniqlash va tushuntirish',
        'Lug‘at boyligini kontekstda kengaytirish tizimi',
        'Har bir suhbatdan so‘ng rivojlanish hisoboti'
      ],
      en: [
        'Live contextual dialogues with intelligent conversational agents',
        'Instant syntactic and grammatical error feedback loops',
        'Contextual vocabulary builder with situational prompts',
        'Actionable session performance debriefs and mastery tracking'
      ]
    },
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI/NLP'],
    conceptType: 'chat-ai'
  },
  {
    id: 'seller-ecommerce-platform',
    title: 'Seller E-Commerce Platform',
    category: 'E-Commerce',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Payme'],
    shortDesc: {
      uz: 'Sotuvchilar paneli, mahsulotlar, buyurtmalar va to‘lov integratsiyalariga ega marketplace.',
      en: 'Multi-vendor marketplace featuring seller dashboard, inventory management, orders, and payment integrations.'
    },
    fullDesc: {
      uz: 'Zamonaviy marketplace platformasi: sotuvchilar o‘z tovarlarini boshqarishi, buyurtmalarni kuzatishi, xaridorlar esa tovarlarni tanlab Payme hamda xalqaro Stripe orqali xavfsiz to‘lovlarni amalga oshirishi mumkin.',
      en: 'A multi-vendor digital commerce ecosystem: merchants manage inventory, fulfill orders, and monitor sales, while buyers experience frictionless checkout with Payme and global Stripe gateways.'
    },
    architecture: {
      uz: [
        'Next.js App Router da xaridor va sotuvchi uchun alohida modulli interfeys',
        'PostgreSQL relieshinal modelida tovarlar, ombor qoldig‘i va buyurtmalar holati',
        'Node.js orqali Stripe va Payme webhook integratsiyalari',
        'Tranzaksiyalar xavfsizligi va atomik yangilanishlar'
      ],
      en: [
        'Next.js App Router with separated merchant portal and storefront',
        'PostgreSQL relational schema modeling catalogs, stock, and orders',
        'Node.js webhook ingestion pipeline for Stripe and Payme events',
        'ACID-compliant transaction handling for payments and inventory'
      ]
    },
    features: {
      uz: [
        'Sotuvchilar uchun qulay boshqaruv paneli va hisobotlar',
        'Xavfsiz to‘lov shlyuzlari (Payme, Stripe)',
        'Buyurtmalar holatini real vaqtda kuzatish',
        'Katalog filtrlash va xarid savatchasi'
      ],
      en: [
        'Comprehensive merchant dashboard with real-time sales metrics',
        'Dual payment integrations: domestic Payme and international Stripe',
        'Real-time order lifecycle tracking and automated notifications',
        'Multi-criteria catalog filters, search, and dynamic cart state'
      ]
    },
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Payme'],
    conceptType: 'marketplace'
  },
  {
    id: 'ai-powered-startup-platform',
    title: 'AI-Powered Startup Platform',
    category: 'AI',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker'],
    shortDesc: {
      uz: 'Autentifikatsiya va boshqaruv tizimlariga ega modulli platforma.',
      en: 'Modular enterprise startup platform featuring robust auth, multi-tenant governance, and AI workflows.'
    },
    fullDesc: {
      uz: 'Startap va korxonalar uchun moslashuvchan, modulli raqamli platforma. NestJS ning arxitektura qulayliklaridan foydalanib yozilgan kuchli backend va Next.js asosidagi qulay boshqaruv paneli orqali jamoa a’zolari, rollar va sun’iy intellekt xizmatlarini boshqarishni ta’minlaydi.',
      en: 'A scalable foundation engineered for modern digital ventures. Featuring a robust NestJS backend architecture, Prisma ORM, and Next.js, it facilitates role-based access control, workspace management, and embedded AI microservices.'
    },
    architecture: {
      uz: [
        'NestJS modulli arxitekturasi va Dependency Injection tizimi',
        'Prisma ORM bilan kuchli tip xavfsizligi va migratsiyalar',
        'Docker konteynerlashtirish va mikroxizmatlarga mos tuzilma',
        'Next.js boshqaruv paneli'
      ],
      en: [
        'NestJS modular architecture with declarative dependency injection',
        'Prisma ORM enforcing end-to-end schema validation and migrations',
        'Full Dockerized environment for uniform dev and staging pipelines',
        'High-density dashboard interface powered by Next.js'
      ]
    },
    features: {
      uz: [
        'Ko‘p rolli RBAC (Admin, Manager, User) ruxsatlar tizimi',
        'Jamoalar uchun tashkiliy ish maydonlari (Workspaces)',
        'Avtomatlashtirilgan AI xizmatlariga ulanish shlyuzi',
        'Keng qamrovli loglar va xavfsizlik auditlari'
      ],
      en: [
        'Role-Based Access Control (RBAC) supporting granular policies',
        'Multi-tenant workspace isolation for collaborative teams',
        'Pluggable API integration layer for enterprise AI capabilities',
        'Comprehensive audit logs and performance telemetry'
      ]
    },
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker'],
    conceptType: 'dashboard'
  },
  {
    id: 'time-tracking-application',
    title: 'Time Tracking Application',
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    shortDesc: {
      uz: 'Xodimlarning ish vaqtini kuzatish, rollar, filtrlash va hisobotlar ilovasi.',
      en: 'Workforce productivity tool featuring real-time time logging, role controls, filters, and exportable reports.'
    },
    fullDesc: {
      uz: 'Kompaniyalar va masofaviy jamoalar uchun ish vaqtini hisobga olish tizimi. Har bir xodim o‘z vazifalariga sarflangan vaqtni qayd qiladi, menejerlar esa loyihalar, muddatlar va mahsuldorlik hisobotlarini filtrlash orqali ko‘rib chiqishi mumkin.',
      en: 'A reliable workforce time-management system tailored for distributed teams. Facilitates active task logging, timesheet approvals, manager dashboards, and automated productivity reporting.'
    },
    architecture: {
      uz: [
        'React SPA interfeysi va tezkor holat boshqaruvi',
        'Node.js / Express orqali RESTful xizmatlar',
        'MongoDB hujjatsimon bazasida vaqt yozuvlari va loyihalar arxivi',
        'JWT tokenlari asosidagi xavfsiz autentifikatsiya'
      ],
      en: [
        'React client with fluid timer state and reactive time tracking',
        'Node.js and Express RESTful layer managing task logs',
        'MongoDB document model storing flexible time entries and project logs',
        'JWT security with granular role-based endpoint protection'
      ]
    },
    features: {
      uz: [
        'Bir bosishda vaqt hisoblashni boshlash va to‘xtatish (Timer)',
        'Xodimlar, loyihalar va sanalar bo‘yicha ko‘p bosqichli filtrlar',
        'Boshqaruvchilar uchun xulosa jadvallari va grafiklar',
        'Haftalik va oylik hisobotlarni shakllantirish'
      ],
      en: [
        'Single-click timer initiation with instant sync across sessions',
        'Multi-dimensional filtering by collaborator, date range, and project',
        'Managerial analytics dashboard highlighting productivity patterns',
        'Automated weekly and monthly timesheet compilation'
      ]
    },
    stack: ['React', 'Node.js', 'MongoDB', 'JWT'],
    conceptType: 'time-tracker'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'freelance',
    role: {
      uz: 'Freelance Full-Stack Developer',
      en: 'Freelance Full-Stack Developer'
    },
    company: 'Independent / Remote',
    period: {
      uz: '2023 – hozirgacha',
      en: '2023 – Present'
    },
    type: {
      uz: 'Freelance',
      en: 'Freelance'
    },
    description: {
      uz: 'Mijozlar uchun to‘liq siklli veb-ilovalar, avtomatlashtirish skriptlari, AI integratsiyalari va maxsus backend xizmatlarini ishlab chiqish.',
      en: 'Delivering end-to-end web applications, automated business pipelines, AI integrations, and high-performance backend systems for diverse clients.'
    },
    highlights: {
      uz: [
        'Talablarni aniqlashtirish, ma’lumotlar bazasi loyihasi va UI dizaynini kelishish',
        'Next.js, Node.js, Python FastAPI va PostgreSQL asosida loyihalarni tayyorlash',
        'To‘lov tizimlari (Stripe, Payme) va tashqi API xizmatlarini ulash',
        'Bulutli serverlar (Docker, Vercel, Railway) orqali ishonchli ishga tushirish'
      ],
      en: [
        'Discovering technical requirements, schema modeling, and UI architectures',
        'Building full-stack stacks using Next.js, Node.js, FastAPI, and PostgreSQL',
        'Integrating payment processors (Stripe, Payme) and third-party APIs',
        'Deploying and maintaining production workloads on Docker and cloud platforms'
      ]
    }
  },
  {
    id: 'startup',
    role: {
      uz: 'Full-Stack Developer',
      en: 'Full-Stack Developer'
    },
    company: 'Startup',
    period: {
      uz: 'Loyihaviy faoliyat',
      en: 'Project Collaboration'
    },
    type: {
      uz: 'Startup Loyihasi',
      en: 'Startup Project'
    },
    description: {
      uz: 'Startap loyihasi doirasida modulli veb-platforma arxitekturasi va foydalanuvchi interfeysini ishlab chiqish.',
      en: 'Architected and implemented modular web platform components, frontend dashboards, and backend services within a fast-moving startup environment.'
    },
    highlights: {
      uz: [
        'Foydalanuvchi autentifikatsiyasi va rollarni boshqarish mexanizmini joriy etish',
        'Reaktiv dashboard komponentlarini yaratish va API bilan integratsiya qilish',
        'Ma’lumotlar bazasi so‘rovlarini optimallashtirish'
      ],
      en: [
        'Implemented authentication, RBAC authorization, and state management',
        'Engineered responsive interactive dashboards with robust API connectivity',
        'Optimized query structures and backend data pipelines'
      ]
    }
  },
  {
    id: '21-asr',
    role: {
      uz: 'SMM & Web Developer',
      en: 'SMM & Web Developer'
    },
    company: '21-ASR',
    period: {
      uz: 'Loyihaviy faoliyat',
      en: 'Project Collaboration'
    },
    type: {
      uz: 'Media & Web',
      en: 'Media & Web'
    },
    description: {
      uz: 'Raqamli platformaning veb qismini yaratish va media kontentining internetdagi taqdimotini texnik jihatdan ta’minlash.',
      en: 'Engineered web solutions for digital media distribution, content presentation, and technical web strategy.'
    },
    highlights: {
      uz: [
        'Media portalning qulay va tezkor responsive veb-sahifalarini yaratish',
        'Kontentni yetkazib berish tezligini oshirish va SEO ko‘rsatkichlarini yaxshilash',
        'Ijtimoiy media integratsiyalari bilan platformani boyitish'
      ],
      en: [
        'Developed performant, responsive web interfaces for high-volume content delivery',
        'Streamlined SEO assets and Core Web Vitals to elevate discoverability',
        'Integrated social media syndication feeds and interactive modules'
      ]
    }
  },
  {
    id: 'flashcards-uz',
    role: {
      uz: 'Full-Stack Developer',
      en: 'Full-Stack Developer'
    },
    company: 'Flashcards UZ',
    period: {
      uz: 'Loyihaviy faoliyat',
      en: 'Project Collaboration'
    },
    type: {
      uz: 'Ta’lim Platformasi',
      en: 'EdTech Project'
    },
    description: {
      uz: 'O‘quv jarayonini interaktiv kartochkalar orqali osonlashtiruvchi platforma backend va frontend qismlarini ishlab chiqish.',
      en: 'Built full-stack components for an interactive learning platform using active recall and spaced repetition.'
    },
    highlights: {
      uz: [
        'Kartochkalar yaratish, tahrirlash va o‘rganish algoritmini kodlashtirish',
        'Foydalanuvchi hisoblari va o‘zlashtirish progressini hisoblovchi bazani qurish',
        'Silliq animatsiyali kartochka interfeysini ta’minlash'
      ],
      en: [
        'Programmed review scheduling workflows and deck management modules',
        'Architected PostgreSQL schema for card telemetry and mastery milestones',
        'Delivered responsive, interactive card-flip user interfaces'
      ]
    }
  },
  {
    id: 'it-center',
    role: {
      uz: 'DevOps / Software Engineering',
      en: 'DevOps / Software Engineering'
    },
    company: 'IT Center',
    period: {
      uz: 'Muhandislik faoliyati',
      en: 'Engineering Engagement'
    },
    type: {
      uz: 'IT Infratuzilma',
      en: 'IT Infrastructure'
    },
    description: {
      uz: 'Dasturiy tizimlarni serverlarga o‘rnatish, tarmoq va deployment jarayonlarini boshqarish hamda muhandislik amaliyotlari.',
      en: 'Managed deployment pipelines, server environments, container orchestration, and practical software engineering workflows.'
    },
    highlights: {
      uz: [
        'Linux serverlarida muhitlarni sozlash va xizmatlarni monitoring qilish',
        'Docker konteynerlari yordamida ilovalarni izolyatsiyalash va deploy qilish',
        'Dasturiy ta’minot sifatini oshirish bo‘yicha muhandislik tajribasi'
      ],
      en: [
        'Configured Linux runtime environments, reverse proxies, and server telemetry',
        'Containerized multi-service applications using Docker and compose manifests',
        'Applied reliable CI/CD deployment routines for software releases'
      ]
    }
  },
  {
    id: 'meteor',
    role: {
      uz: 'Software Developer',
      en: 'Software Developer'
    },
    company: 'Meteor',
    period: {
      uz: 'Dasturchi faoliyati',
      en: 'Developer Engagement'
    },
    type: {
      uz: 'Dasturiy Yechimlar',
      en: 'Software Solutions'
    },
    description: {
      uz: 'Dasturiy ta’minot modullari, foydalanuvchi funksionalligi va tizim integratsiyalari ustida ishlash.',
      en: 'Developed modular application features, client-facing functionalities, and back-office software integrations.'
    },
    highlights: {
      uz: [
        'Veb modullarini kodlash va mavjud tizimlar bilan integratsiya qilish',
        'Xatoliklarni bartaraf etish (debugging) va kod sifatini yaxshilash',
        'Foydalanuvchi tajribasini (UX) takomillashtirish'
      ],
      en: [
        'Developed client and server modules adhering to modern engineering standards',
        'Identified and resolved functional regressions via structured debugging',
        'Enhanced client-side UX flows and overall interface responsiveness'
      ]
    }
  }
];

export const EDUCATION_PLATFORMS: EducationItem[] = [
  {
    name: 'Mohirdev',
    description: {
      uz: 'Zamonaviy dasturlash, frontend va backend amaliy kurslari',
      en: 'Hands-on coursework covering modern frontend and backend development'
    },
    focus: {
      uz: 'Full-Stack, JavaScript, Python',
      en: 'Full-Stack, JavaScript, Python'
    },
    badge: 'Amaliy Ta’lim'
  },
  {
    name: 'Ustoz AI',
    description: {
      uz: 'Sun’iy intellekt, LLM va zamonaviy AI agentlar bilan ishlash',
      en: 'Artificial intelligence paradigms, LLM engineering, and autonomous agents'
    },
    focus: {
      uz: 'AI/ML, Prompt Engineering, Agents',
      en: 'AI/ML, Prompt Engineering, Agents'
    },
    badge: 'AI Mutaxassisligi'
  },
  {
    name: 'SAMMI',
    description: {
      uz: 'JavaScript, React va zamonaviy veb texnologiyalari bo‘yicha chuqurlashtirilgan o‘quv',
      en: 'In-depth specialization in JavaScript runtime, React, and modern web patterns'
    },
    focus: {
      uz: 'Web Development, React Ecosystem',
      en: 'Web Development, React Ecosystem'
    },
    badge: 'Web Muhandisligi'
  },
  {
    name: 'Udemy',
    description: {
      uz: 'Xalqaro muhandislar tomonidan tayyorlangan dasturlash va DevOps darslari',
      en: 'Global engineering coursework in backend architecture, DevOps, and cloud systems'
    },
    focus: {
      uz: 'Next.js, Docker, Cloud, Databases',
      en: 'Next.js, Docker, Cloud, Databases'
    },
    badge: 'Xalqaro Kurslar'
  },
  {
    name: 'Coursera',
    description: {
      uz: 'Kompyuter ilmlari, algoritmlar va sun’iy intellekt asoslari bo‘yicha chuqur bilimlar',
      en: 'Rigorous computer science principles, algorithms, and AI fundamentals'
    },
    focus: {
      uz: 'Algorithms, Data Structures, AI Foundations',
      en: 'Algorithms, Data Structures, AI Foundations'
    },
    badge: 'Akademik Rivojlanish'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack-web',
    title: {
      uz: 'Full-Stack Veb Ilovalar',
      en: 'Full-Stack Web Applications'
    },
    description: {
      uz: 'Tez yuklanuvchi, zamonaviy va moslashuvchan veb-platformalar. Next.js, React va TypeScript asosida foydalanuvchiga zavq bag‘ishlovchi tajriba.',
      en: 'Production-ready, highly responsive web platforms built on Next.js, React, and TypeScript with uncompromising user experience.'
    },
    icon: 'Globe',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'backend-api',
    title: {
      uz: 'Backend va API Arxitekturasi',
      en: 'Backend & API Architecture'
    },
    description: {
      uz: 'Tirbandlikka chidamli RESTful va WebSocket API lar, mikroxizmatlar, xavfsiz autentifikatsiya hamda relyatsion va NoSQL bazalar integratsiyasi.',
      en: 'Resilient RESTful and WebSocket APIs, microservices, secure authentication, and optimized relational or NoSQL database schemas.'
    },
    icon: 'Server',
    tags: ['Node.js', 'NestJS', 'FastAPI', 'PostgreSQL']
  },
  {
    id: 'ai-agents',
    title: {
      uz: 'AI Agentlar va Avtomatlashtirish',
      en: 'AI Agents & Automation'
    },
    description: {
      uz: 'Biznesingizning takrorlanuvchi jarayonlarini avtomatlashtiruvchi aqlli AI agentlar, LLM (ChatGPT, Claude) integratsiyalari va RAG tizimlari.',
      en: 'Intelligent AI agents and workflow automation pipelines leveraging LLMs, LangChain, and RAG architectures to save business hours.'
    },
    icon: 'Bot',
    tags: ['LangChain', 'LLM', 'FastAPI', 'Vector DB']
  },
  {
    id: 'telegram-bots',
    title: {
      uz: 'Telegram Botlar & Xizmatlar',
      en: 'Telegram Bots & Services'
    },
    description: {
      uz: 'Mijozlarga xizmat ko‘rsatish, buyurtma qabul qilish, to‘lovlarni amalga oshirish va ma’lumotlar bazasi bilan bog‘langan murakkab Telegram botlar.',
      en: 'Multi-functional Telegram bots for customer operations, order handling, payment processing, and direct CRM/database sync.'
    },
    icon: 'Send',
    tags: ['Python', 'Node.js', 'Webhooks', 'PostgreSQL']
  },
  {
    id: 'ecommerce-payments',
    title: {
      uz: 'E-Commerce va To‘lov Integratsiyalari',
      en: 'E-Commerce & Payment Systems'
    },
    description: {
      uz: 'Onlayn do‘konlar, tovar kataloglari, sotuvchi boshqaruv paneli hamda Payme, Click va Stripe to‘lov shlyuzlarini xavfsiz ulash.',
      en: 'Online storefronts, inventory portals, multi-vendor marketplaces, and seamless integrations with Payme, Click, and Stripe.'
    },
    icon: 'CreditCard',
    tags: ['Payme', 'Stripe', 'Shopping Cart', 'Security']
  },
  {
    id: 'deploy-devops',
    title: {
      uz: 'Deploy va DevOps Xizmatlari',
      en: 'Deployment & DevOps Services'
    },
    description: {
      uz: 'Loyiha serverlarini sozlash, Docker konteynerlariga joylash, CI/CD avtomatlashtirish, SSL sertifikatlar va uzluksiz ishlashni ta’minlash.',
      en: 'Server configuration, Docker container orchestration, CI/CD pipelines via GitHub Actions, SSL hardening, and continuous monitoring.'
    },
    icon: 'ShieldCheck',
    tags: ['Docker', 'Nginx', 'GitHub Actions', 'Linux']
  }
];

export const NAV_ITEMS = [
  { id: 'about', label: { uz: 'Men haqimda', en: 'About' } },
  { id: 'skills', label: { uz: 'Ko‘nikmalar', en: 'Skills' } },
  { id: 'projects', label: { uz: 'Loyihalar', en: 'Projects' } },
  { id: 'experience', label: { uz: 'Tajriba', en: 'Experience' } },
  { id: 'services', label: { uz: 'Xizmatlar', en: 'Services' } },
  { id: 'education', label: { uz: 'Ta’lim', en: 'Education' } },
  { id: 'contact', label: { uz: 'Aloqa', en: 'Contact' } }
];
