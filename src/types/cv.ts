/**
 * TypeScript definitions for CV data structure
 * This file provides type safety for cv.json
 */

export interface URL {
  label: string;
  href: string;
}

export interface CustomField {
  id: string;
  icon: string;
  name: string;
  value: string;
}

export interface Picture {
  url: string;
  size: number;
  aspectRatio: number;
  borderRadius: number;
  effects: {
    hidden: boolean;
    border: boolean;
    grayscale: boolean;
  };
}

export interface Basics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  url: URL;
  customFields: CustomField[];
  picture: Picture;
}

// Generic section item interface
interface BaseItem {
  id: string;
  visible: boolean;
}

export interface Profile extends BaseItem {
  network: string;
  username: string;
  icon: string;
  url: URL;
}

export interface Skill extends BaseItem {
  name: string;
  description: string;
  level: number;
  keywords: string[];
}

export interface Interest extends BaseItem {
  name: string;
  keywords: string[];
}

export interface Certification extends BaseItem {
  name: string;
  issuer: string;
  date: string;
  summary: string;
  url: URL;
}

export interface Language extends BaseItem {
  name: string;
  description: string;
  level: number;
}

export interface Reference extends BaseItem {
  name: string;
  description: string;
  summary: string;
  url: URL;
}

export interface Experience extends BaseItem {
  company: string;
  position: string;
  location: string;
  date: string;
  summary: string;
  url: URL;
}

export interface Education extends BaseItem {
  institution: string;
  studyType: string;
  area: string;
  score: string;
  date: string;
  summary: string;
  url: URL;
}

export interface Award extends BaseItem {
  title: string;
  awarder: string;
  date: string;
  summary: string;
  url: URL;
}

export interface Project extends BaseItem {
  name: string;
  description: string;
  date: string;
  summary: string;
  keywords: string[];
  url: URL;
}

export interface Publication extends BaseItem {
  name: string;
  publisher: string;
  date: string;
  summary: string;
  url: URL;
}

export interface Volunteer extends BaseItem {
  organization: string;
  position: string;
  location: string;
  date: string;
  summary: string;
  url: URL;
}

// Generic section structure
interface Section<T> {
  name: string;
  columns: number;
  separateLinks: boolean;
  visible: boolean;
  id: string;
  items: T[];
}

// Summary section (special case - has content instead of items)
export interface SummarySection {
  name: string;
  columns: number;
  separateLinks: boolean;
  visible: boolean;
  id: string;
  content: string;
}

export interface Sections {
  summary: SummarySection;
  awards: Section<Award>;
  certifications: Section<Certification>;
  education: Section<Education>;
  experience: Section<Experience>;
  volunteer: Section<Volunteer>;
  interests: Section<Interest>;
  languages: Section<Language>;
  profiles: Section<Profile>;
  projects: Section<Project>;
  publications: Section<Publication>;
  references: Section<Reference>;
  skills: Section<Skill>;
  custom: Record<string, unknown>;
}

export interface CSSConfig {
  value: string;
  visible: boolean;
}

export interface PageConfig {
  margin: number;
  format: string;
  options: {
    breakLine: boolean;
    pageNumbers: boolean;
  };
}

export interface Theme {
  background: string;
  text: string;
  primary: string;
}

export interface Typography {
  font: {
    family: string;
    subset: string;
    variants: string[];
    size: number;
  };
  lineHeight: number;
  hideIcons: boolean;
  underlineLinks: boolean;
}

export interface Metadata {
  template: string;
  layout: string[][][];
  css: CSSConfig;
  page: PageConfig;
  theme: Theme;
  typography: Typography;
  notes: string;
}

export interface CV {
  basics: Basics;
  sections: Sections;
  metadata: Metadata;
}
