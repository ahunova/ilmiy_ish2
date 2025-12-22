
import { GoogleGenAI, Type } from "@google/genai";
import { IMRaDResult, GrammarFix, PlagiarismResult, Language, DOIMetadata, ArticleStats } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getLangPrompt = (lang: Language) => {
  if (lang === 'ru') return "Используй только строгий академический русский язык. Ответ должен быть профессиональным, лаконичным и соответствовать стандартам научного стиля (научный стиль речи).";
  if (lang === 'en') return "Respond strictly in professional academic ENGLISH.";
  return "Javobingni faqat O'ZBEK tilida, akademik uslubda yoz.";
};

export const getArticleAnalytics = async (problem: string, text: string, lang: Language): Promise<ArticleStats> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a professional senior academic editor and PhD analyst, evaluate the following research components. 
    1. Formulate a rigorous scientific hypothesis based on the problem and provided text.
    2. Perform detailed MART analysis (Logical reasoning, Analytical depth, Numerical validity).
    3. Extract general lexicographical statistics and key terminology.
    
    Research Problem: ${problem}
    Research Text: ${text.substring(0, 8000)}
    ${getLangPrompt(lang)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          wordCount: { type: Type.NUMBER },
          readingTime: { type: Type.NUMBER },
          complexity: { type: Type.STRING },
          academicTermDensity: { type: Type.NUMBER },
          readabilityScore: { type: Type.NUMBER },
          aiSummary: { type: Type.STRING },
          problemStatement: { type: Type.STRING },
          hypothesis: { type: Type.STRING },
          martAnalysis: {
            type: Type.OBJECT,
            properties: {
              logic: { type: Type.NUMBER },
              analytical: { type: Type.NUMBER },
              numerical: { type: Type.NUMBER },
              synthesis: { type: Type.STRING }
            },
            required: ["logic", "analytical", "numerical", "synthesis"]
          },
          topKeywords: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                count: { type: Type.NUMBER }
              }
            }
          },
          topCitedSources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                count: { type: Type.NUMBER }
              }
            }
          },
          imradDistribution: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                section: { type: Type.STRING },
                percentage: { type: Type.NUMBER }
              }
            }
          }
        },
        required: ["wordCount", "readingTime", "complexity", "academicTermDensity", "topKeywords", "topCitedSources", "imradDistribution", "readabilityScore", "aiSummary", "problemStatement", "hypothesis", "martAnalysis"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const analyzeIMRaD = async (text: string, lang: Language): Promise<IMRaDResult[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Perform a structural decomposition of this academic text according to IMRaD standards. 
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

export const monitorGrammar = async (text: string, lang: Language): Promise<GrammarFix[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Review this text for adherence to formal academic style and grammatical precision. 
    Focus on eliminating colloquialisms and improving scientific clarity.
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

export const checkPlagiarism = async (text: string, lang: Language): Promise<PlagiarismResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Evaluate the originality of this academic contribution. Identify potential overlaps with existing scholarly literature.
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

export const identifyDOI = async (query: string): Promise<DOIMetadata> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Identify the Digital Object Identifier (DOI) and associated metadata for the following bibliographic reference.
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
