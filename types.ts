
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  IMRAD_ANALYZER = 'IMRAD_ANALYZER',
  GRAMMAR_MONITOR = 'GRAMMAR_MONITOR',
  DOI_IDENTIFIER = 'DOI_IDENTIFIER',
  GRANT_HUB = 'GRANT_HUB',
  SCIENTIFIC_JUSTIFICATION = 'SCIENTIFIC_JUSTIFICATION',
  BACKEND_LOGIC = 'BACKEND_LOGIC',
  ANALYTICS = 'ANALYTICS',
  CONTACT_CREATOR = 'CONTACT_CREATOR',
  ANTI_PLAGIARISM = 'ANTI_PLAGIARISM',
  RESOURCE_MANAGEMENT = 'RESOURCE_MANAGEMENT'
}

export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type Language = 'uz' | 'ru' | 'en';

export interface IMRaDResult {
  section: string;
  confidence: number;
  suggestions: string[];
  missingElements: string[];
}

export interface GrammarFix {
  original: string;
  suggestion: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PlagiarismResult {
  originalityScore: number;
  matches: {
    text: string;
    source: string;
    similarity: number;
    suggestion: string;
  }[];
  verdict: string;
}

export interface DOIMetadata {
  doi: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  status: 'valid' | 'invalid';
}

export interface GrantOpportunity {
  id: string;
  title: string;
  agency: string;
  deadline: string;
  amount: string;
  link: string;
  description: string;
}
