
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
  ANTI_PLAGIARISM = 'ANTI_PLAGIARISM'
}

export type Language = 'uz' | 'ru' | 'en';

export interface ArticleStats {
  wordCount: number;
  readingTime: number; // in minutes
  complexity: string;
  academicTermDensity: number; // 0-100
  topKeywords: { word: string; count: number }[];
  topCitedSources: { name: string; count: number }[];
  imradDistribution: { section: string; percentage: number }[];
  readabilityScore: number; // 0-100
  aiSummary: string;
}

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
