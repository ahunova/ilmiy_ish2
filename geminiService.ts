
import { GoogleGenAI, Type } from "@google/genai";
import { IMRaDResult, GrammarFix, PlagiarismResult, Language, DOIMetadata } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLangPrompt = (lang: Language) => {
  if (lang === 'ru') return "Отвечай строго на РУССКОМ языке.";
  if (lang === 'en') return "Respond strictly in ENGLISH.";
  return "Javobingni faqat O'ZBEK tilida yoz.";
};

// Fix: analyzeIMRaD function to handle academic text structure analysis
export const analyzeIMRaD = async (text: string, lang: Language): Promise<IMRaDResult[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this academic text for IMRaD structure. 
    ${getLangPrompt(lang)}
    Text: ${text.substring(0, 5000)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            section: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingElements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["section", "confidence", "suggestions", "missingElements"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

// Fix: monitorGrammar function to handle style and grammar monitoring
export const monitorGrammar = async (text: string, lang: Language): Promise<GrammarFix[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a professional academic editor. Check this text for grammar and academic style.
    ${getLangPrompt(lang)}
    Text: ${text.substring(0, 3000)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            original: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            explanation: { type: Type.STRING },
            severity: { type: Type.STRING }
          },
          required: ["original", "suggestion", "explanation", "severity"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

// Fix: checkPlagiarism function to analyze text originality
export const checkPlagiarism = async (text: string, lang: Language): Promise<PlagiarismResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Check this academic text for originality and plagiarism.
    ${getLangPrompt(lang)}
    Text: ${text.substring(0, 4000)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalityScore: { type: Type.NUMBER },
          verdict: { type: Type.STRING },
          matches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                source: { type: Type.STRING },
                similarity: { type: Type.NUMBER },
                suggestion: { type: Type.STRING }
              }
            }
          }
        },
        required: ["originalityScore", "verdict", "matches"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// Fix: Added missing identifyDOI function for reference identification
export const identifyDOI = async (query: string): Promise<DOIMetadata> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify the DOI and metadata for this academic reference. 
    Provide metadata including doi, title, authors, journal, year, and status ('valid' or 'invalid').
    Reference: ${query}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          doi: { type: Type.STRING },
          title: { type: Type.STRING },
          authors: { type: Type.ARRAY, items: { type: Type.STRING } },
          journal: { type: Type.STRING },
          year: { type: Type.NUMBER },
          status: { type: Type.STRING }
        },
        required: ["doi", "title", "authors", "journal", "year", "status"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
