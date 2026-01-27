
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  UNIFIED_WORKSPACE = 'UNIFIED_WORKSPACE',
  INTERACTIVE_GAME = 'INTERACTIVE_GAME',
  ACADEMIC_EVENTS = 'ACADEMIC_EVENTS',
  IMRAD_ANALYZER = 'IMRAD_ANALYZER',
  GRAMMAR_MONITOR = 'GRAMMAR_MONITOR',
  DOI_IDENTIFIER = 'DOI_IDENTIFIER',
  SCIENTIFIC_JUSTIFICATION = 'SCIENTIFIC_JUSTIFICATION',
  BACKEND_LOGIC = 'BACKEND_LOGIC',
  ANALYTICS = 'ANALYTICS',
  CONTACT_CREATOR = 'CONTACT_CREATOR',
  ANTI_PLAGIARISM = 'ANTI_PLAGIARISM',
  ACADEMIC_SEARCH = 'ACADEMIC_SEARCH',
  ARTICLE_GUIDE = 'ARTICLE_GUIDE',
  SECURITY_CENTER = 'SECURITY_CENTER',
  CONFERENCE_NEWS = 'CONFERENCE_NEWS',
  GRANT_HUB = 'GRANT_HUB'
}

export type Language = 'uz' | 'ru' | 'en';

export interface SavedEvent {
  id: string | number;
  title: string;
  link: string;
  deadline: string;
  type: string;
  savedAt: string;
  category: 'grant' | 'conference';
}

export interface AcademicMaterial {
  title: string;
  type: 'article' | 'thesis' | 'phd_work' | 'book' | 'manual' | 'other';
  author: string;
  year: string;
  link: string;
  description: string;
  relevanceScore: number;
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

export interface ArticleStats {
  wordCount: number;
  readingTime: number;
  complexity: string;
  academicTermDensity: number;
  topKeywords: { word: string; count: number }[];
  topCitedSources: { name: string; count: number }[];
  imradDistribution: { section: string; percentage: number }[];
  readabilityScore: number;
  aiSummary: string;
  problemStatement: string;
  hypothesis: string;
  martAnalysis: {
    logic: number;
    analytical: number;
    numerical: number;
    synthesis: string;
  };
}

// Added missing security and health types to support SecurityCenter component
export interface SecurityEvent {
  id: string;
  timestamp: string;
  event: string;
  type: 'access' | 'encryption' | 'backup' | 'purge' | 'warning' | 'critical';
  status: 'success' | 'warning' | 'critical';
  detail: string;
}

export interface SystemHealth {
  apiLatency: number;
  dbStatus: string;
  encryptionStatus: string;
  lastBackup: string;
}
