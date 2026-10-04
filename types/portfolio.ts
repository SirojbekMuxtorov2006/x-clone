export type Language = 'uz' | 'en';

export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'AI' | 'Education' | 'E-Commerce';
  tags: string[];
  shortDesc: {
    uz: string;
    en: string;
  };
  fullDesc: {
    uz: string;
    en: string;
  };
  architecture: {
    uz: string[];
    en: string[];
  };
  features: {
    uz: string[];
    en: string[];
  };
  stack: string[];
  conceptType: 'dashboard' | 'chat-ai' | 'cards-study' | 'marketplace' | 'time-tracker' | 'portal';
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
  icon: string;
  accent: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: {
    uz: string;
    en: string;
  };
  company: string;
  period: {
    uz: string;
    en: string;
  };
  type: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
  highlights: {
    uz: string[];
    en: string[];
  };
}

export interface EducationItem {
  name: string;
  description: {
    uz: string;
    en: string;
  };
  focus: {
    uz: string;
    en: string;
  };
  badge: string;
}

export interface ServiceItem {
  id: string;
  title: {
    uz: string;
    en: string;
  };
  description: {
    uz: string;
    en: string;
  };
  icon: string;
  tags: string[];
}
