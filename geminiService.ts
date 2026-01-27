
import { GoogleGenAI, Type } from "@google/genai";
import { IMRaDResult, GrammarFix, PlagiarismResult, Language, DOIMetadata, ArticleStats, AcademicMaterial } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries === 0 || error.status === 403) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

const getLangPrompt = (lang: Language) => {
  if (lang === 'ru') return "Используй только РУССКИЙ язык.";
  if (lang === 'en') return "Respond strictly in ENGLISH.";
  return "Javobingni faqat O'ZBEK tilida yoz.";
};

export const getLiveAcademicFeed = async (query: string, lang: Language, categoryType: 'grant' | 'conference'): Promise<{ items: any[] }> => {
  return withRetry(async () => {
    const today = new Date().toISOString().split('T')[0];
    const typeInstruction = categoryType === 'grant' 
      ? `Search for CURRENTLY OPEN and UPCOMING research grants, funding opportunities, and scientific project calls for 2025-2026. EXCLUDE expired calls. Focus on active funding cycles.`
      : `Search for UPCOMING scientific conferences, symposiums, and academic events for 2025-2026. EXCLUDE past events. Only return events where the registration or submission deadline is AFTER ${today}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `${typeInstruction} Target: ${query}. Use real-time search for sources like ilmiyloyiha.uz, mininnovation.uz, and global databases (Nature, Science, ResearchGate, Conference Alerts). 
      IMPORTANT: Only provide information that is current and not outdated.
      ${getLangPrompt(lang)}
      Format as JSON with: id (number), title (string), type (string), deadline (string, exact date), link (URL), field (string).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  type: { type: Type.STRING },
                  deadline: { type: Type.STRING },
                  link: { type: Type.STRING },
                  field: { type: Type.STRING }
                },
                required: ["title", "link", "deadline", "id"]
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"items": []}');
  });
};

export const searchAcademicMaterials = async (query: string, lang: Language): Promise<{ materials: AcademicMaterial[], synthesis: string }> => {
  return withRetry(async () => {
    const searchResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Search for high-quality academic papers, articles and theses 2024-2025: ${query}. 
      Return a synthesis of current research trends with citations [1], [2] etc. 
      Also provide a detailed list of materials with DOI or direct URLs. ${getLangPrompt(lang)}`,
      config: { tools: [{ googleSearch: {} }] }
    });
    const synthesis = searchResponse.text || "";
    const extractionResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract academic material metadata as JSON from this text: "${synthesis}". 
      Ensure DOI or Link is included for every item.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            materials: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  type: { type: Type.STRING },
                  author: { type: Type.STRING },
                  year: { type: Type.STRING },
                  link: { type: Type.STRING },
                  description: { type: Type.STRING },
                  relevanceScore: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });
    return { materials: JSON.parse(extractionResponse.text || '{"materials": []}').materials, synthesis };
  });
};

export const analyzeIMRaD = async (text: string, lang: Language): Promise<IMRaDResult[]> => {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze IMRaD structure: ${text}. ${getLangPrompt(lang)}`,
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
            required: ["section", "confidence", "suggestions"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

export const monitorGrammar = async (text: string, lang: Language): Promise<GrammarFix[]> => {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Academic grammar monitor: ${text}. ${getLangPrompt(lang)}`,
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
              severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
            },
            required: ["original", "suggestion", "explanation", "severity"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

export const identifyDOI = async (query: string): Promise<DOIMetadata> => {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find DOI metadata for: ${query}.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            doi: { type: Type.STRING },
            title: { type: Type.STRING },
            authors: { type: Type.ARRAY, items: { type: Type.STRING } },
            journal: { type: Type.STRING },
            year: { type: Type.INTEGER },
            status: { type: Type.STRING, enum: ['valid', 'invalid'] }
          },
          required: ["doi", "title", "authors", "journal", "year", "status"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const checkPlagiarism = async (text: string, lang: Language): Promise<PlagiarismResult> => {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Check plagiarism for: ${text}. ${getLangPrompt(lang)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalityScore: { type: Type.NUMBER },
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
            },
            verdict: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"originalityScore": 100, "matches": [], "verdict": "Clear"}');
  });
};

export const getArticleAnalytics = async (problem: string, text: string, lang: Language): Promise<ArticleStats> => {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `MART analysis for: ${problem}. Text: ${text}. ${getLangPrompt(lang)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            wordCount: { type: Type.INTEGER },
            readingTime: { type: Type.NUMBER },
            complexity: { type: Type.STRING },
            academicTermDensity: { type: Type.NUMBER },
            topKeywords: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { word: { type: Type.STRING }, count: { type: Type.INTEGER } } } },
            topCitedSources: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, count: { type: Type.INTEGER } } } },
            imradDistribution: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { section: { type: Type.STRING }, percentage: { type: Type.NUMBER } } } },
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
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};
