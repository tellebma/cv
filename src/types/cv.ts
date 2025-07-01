export interface CVBasics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  url: {
    label: string;
    href: string;
  };
  customFields?: Array<{
    id: string;
    icon: string;
    name: string;
    value: string;
  }>;
  picture: {
    url: string;
    size: number;
    aspectRatio: number;
    borderRadius: number;
    effects: {
      hidden: boolean;
      border: boolean;
      grayscale: boolean;
    };
  };
}

export interface CVSection {
  name: string;
  columns: number;
  separateLinks: boolean;
  visible: boolean;
  id: string;
}

export interface CVSummary extends CVSection {
  content: string;
}

export interface CVProfile {
  id: string;
  visible: boolean;
  network: string;
  username: string;
  icon: string;
  url: {
    label: string;
    href: string;
  };
}

export interface CVProfilesSection extends CVSection {
  items: CVProfile[];
}

export interface CVSkill {
  id: string;
  visible: boolean;
  name: string;
  description: string;
  level: number;
  keywords: string[];
}

export interface CVSkillsSection extends CVSection {
  items: CVSkill[];
}

export interface CVExperience {
  id: string;
  visible: boolean;
  company: string;
  position: string;
  location: string;
  date: string;
  summary: string;
  url: {
    label: string;
    href: string;
  };
}

export interface CVExperienceSection extends CVSection {
  items: CVExperience[];
}

export interface CVEducation {
  id: string;
  visible: boolean;
  institution: string;
  studyType: string;
  area: string;
  score: string;
  date: string;
  summary: string;
  url: {
    label: string;
    href: string;
  };
}

export interface CVEducationSection extends CVSection {
  items: CVEducation[];
}

export interface CVCertification {
  id: string;
  visible: boolean;
  name: string;
  issuer: string;
  date: string;
  summary: string;
  url: {
    label: string;
    href: string;
  };
}

export interface CVCertificationsSection extends CVSection {
  items: CVCertification[];
}

export interface CVLanguage {
  id: string;
  visible: boolean;
  name: string;
  description: string;
  level: number;
}

export interface CVLanguagesSection extends CVSection {
  items: CVLanguage[];
}

export interface CVInterest {
  id: string;
  visible: boolean;
  name: string;
  keywords: string[];
}

export interface CVInterestsSection extends CVSection {
  items: CVInterest[];
}

export interface CVReference {
  id: string;
  visible: boolean;
  name: string;
  description: string;
  summary: string;
  url: {
    label: string;
    href: string;
  };
}

export interface CVReferencesSection extends CVSection {
  items: CVReference[];
}

export interface CVSections {
  summary: CVSummary;
  awards: CVSection & { items: any[] };
  certifications: CVCertificationsSection;
  education: CVEducationSection;
  experience: CVExperienceSection;
  volunteer: CVSection & { items: any[] };
  interests: CVInterestsSection;
  languages: CVLanguagesSection;
  profiles: CVProfilesSection;
  projects: CVSection & { items: any[] };
  publications: CVSection & { items: any[] };
  references: CVReferencesSection;
  skills: CVSkillsSection;
  custom: Record<string, any>;
}

export interface CVMetadata {
  template: string;
  layout: string[][][];
  css: {
    value: string;
    visible: boolean;
  };
  page: {
    margin: number;
    format: string;
    options: {
      breakLine: boolean;
      pageNumbers: boolean;
    };
  };
  theme: {
    background: string;
    text: string;
    primary: string;
  };
  typography: {
    font: {
      family: string;
      subset: string;
      variants: string[];
      size: number;
    };
    lineHeight: number;
    hideIcons: boolean;
    underlineLinks: boolean;
  };
  notes: string;
}

export interface CV {
  basics: CVBasics;
  sections: CVSections;
  metadata: CVMetadata;
}