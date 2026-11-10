export type LevelId = 
  | '10th_pass'
  | '12th_pcm'
  | '12th_pcb'
  | '12th_commerce'
  | '12th_arts'
  | 'college_grad';

export interface EducationLevel {
  id: LevelId;
  name: string;
  badge: string;
  category: '10th' | '12th' | 'college';
  tagline: string;
  description: string;
  typicalAge: string;
  keyStreamsUnlocked: string[];
  courseIds: string[];
}

export type DomainCategory = 
  | 'Technology & Software'
  | 'AI & Data Science'
  | 'Design & Creative'
  | 'Engineering & Hardware'
  | 'Defence & Aviation'
  | 'Sciences & Research'
  | 'Finance & Management'
  | 'Law & Policy'
  | 'Healthcare & Bio';

export interface Course {
  id: string;
  code: string;
  name: string;
  degreeType: 'B.Tech' | 'B.Des' | 'B.Arch' | 'B.Sc' | 'BCA' | 'Integrated' | 'Defence Academy' | 'Professional License' | 'Other';
  duration: string;
  eligibility: string;
  costRangeGovt: string;
  costRangePrivate: string;
  examIds: string[];
  careerIds: string[];
  furtherStudies: string[];
  description: string;
  curriculumHighlights: string[];
  domains: DomainCategory[];
  isPcmPrimary?: boolean;
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  eligibility: string;
  frequency: string;
  applicationMonths: string;
  examMonths: string;
  patternSummary: string;
  officialUrl: string;
  difficulty: 'High' | 'Moderate' | 'Standard';
  keyTips: string;
  unlockedCourseIds: string[];
}

export interface RouteStep {
  title: string;
  type: 'Direct / Traditional' | 'Alternative Route' | 'Lateral / Bridge';
  description: string;
  steps: string[];
  typicalDuration: string;
  requiredExamsOrPrep: string;
}

export interface Career {
  id: string;
  title: string;
  domain: DomainCategory;
  shortDesc: string;
  dayToDay: string[];
  skills: string[];
  salaryEntry: string;
  salaryMid: string;
  growthOutlook: 'Very High' | 'High' | 'Steady';
  growthReason: string;
  courseIds: string[];
  routes: RouteStep[];
}

export interface SwitchingRoute {
  id: string;
  title: string;
  fromDomain: string;
  toDomain: string;
  commonScenario: string;
  howToSwitch: string;
  requirements: string;
  timeline: string;
  difficulty: 'Low' | 'Moderate' | 'Challenging';
  proTips: string[];
  recommendedCoursesOrCerts: string[];
}

export interface ShortlistItem {
  id: string;
  type: 'course' | 'career' | 'exam';
  title: string;
  subtitle: string;
  domain?: string;
  dateAdded: string;
  userNotes?: string;
}
