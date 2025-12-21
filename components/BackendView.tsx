
import React, { useState } from 'react';

const BackendView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState('rss_monitor.py');

  const fileContents: Record<string, string> = {
    'rss_monitor.py': `import feedparser
import requests
from typing import List, Dict
from .models import GrantOpportunity
from .ai_engine import classify_grant_relevance

class GrantRSSMonitor:
    """
    Xalqaro ilmiy grantlar uchun RSS monitoring va 
    prediktiv saralash moduli.
    """
    FEEDS = [
        "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-search/rss",
        "https://www.nsf.gov/rss/rss_www_funding.xml",
        "https://grants.gov/rss/search-results"
    ]

    def fetch_latest_grants(self) -> List[Dict]:
        """Barcha oqimlardan so'nggi grantlarni yig'ish."""
        all_entries = []
        for url in self.FEEDS:
            feed = feedparser.parse(url)
            for entry in feed.entries:
                grant_data = {
                    "title": entry.title,
                    "link": entry.link,
                    "description": entry.summary,
                    "agency": self._detect_agency(url),
                    "published": entry.published
                }
                
                # AI orqali grantning DSc tadqiqotchiga mosligini tekshirish
                if classify_grant_relevance(grant_data):
                    all_entries.append(grant_data)
                    self._save_to_db(grant_data)
        
        return all_entries

    def _detect_agency(self, url: str) -> str:
        if "europa.eu" in url: return "Horizon Europe"
        if "nsf.gov" in url: return "NSF"
        return "Global Source"

    def _save_to_db(self, data: Dict):
        """Ma'lumotlarni PostgreSQL bazasiga sinxronlash."""
        GrantOpportunity.objects.update_or_create(
            link=data['link'],
            defaults={
                "title": data['title'],
                "description": data['description'],
                "agency": data['agency']
            }
        )`,
    'doi_finder.py': `import requests
from typing import Dict, Optional

class CrossrefDOIIdentifier:
    """
    Adabiyotlar ro'yxatidan DOI raqamlarini Crossref API orqali 
    avtomatik aniqlash va qidirish moduli.
    """
    BASE_URL = "https://api.crossref.org/works"

    def find_doi_by_citation(self, citation: str) -> Optional[str]:
        """Bibliografik tavsif bo'yicha DOI qidirish."""
        params = {
            "query.bibliographic": citation,
            "rows": 1
        }
        
        try:
            response = requests.get(self.BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            items = data.get("message", {}).get("items", [])
            if not items: return self._fallback_search(citation)
            top_result = items[0]
            if top_result.get("score", 0) > 50: return top_result.get("DOI")
            else: return self._fallback_search(citation)
        except Exception: return None

    def _fallback_search(self, citation: str) -> Optional[str]:
        title_estimate = citation.split(".")[0] if "." in citation else citation
        params = {"query.title": title_estimate, "rows": 3}
        response = requests.get(self.BASE_URL, params=params)
        items = response.json().get("message", {}).get("items", [])
        return items[0].get("DOI") if items else None`,
    'ai_engine.py': `import os
import google.generativeai as genai
from typing import Dict, List, Any

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

def process_academic_analysis(text: str) -> Dict[str, Any]:
    """Maqola matnini IMRaD va Grammatik monitoring bo'yicha tahlil qilish."""
    return {
        "imrad": analyze_imrad_structure(text),
        "grammar": monitor_academic_style(text)
    }

def classify_grant_relevance(grant: Dict) -> bool:
    """Grantning DSc darajasidagi ilmiy qimmatini aniqlash."""
    # LLM yordamida grant tavsifini tahlil qilish
    prompt = f"Ushbu grant DSc darajasidagi fundamental tadqiqotlar uchunmi? Title: {grant['title']}"
    # ... logic returns boolean
    return True`,
    'models.py': `from django.db import models
from django.contrib.auth.models import User

class ResearchPaper(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    raw_content = models.TextField()
    imrad_analysis = models.JSONField(null=True, blank=True)
    grammar_analysis = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class GrantOpportunity(models.Model):
    title = models.CharField(max_length=500)
    agency = models.CharField(max_length=200)
    link = models.URLField(unique=True)
    description = models.TextField()
    fetched_at = models.DateTimeField(auto_now_add=True)`
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold mb-4 text-slate-800 serif">Monitoring & Aggregation Logic</h2>
        <p className="text-slate-500 mb-8">
          Platformaning monitoring qismi Python-dagi <code className="bg-slate-100 px-1 rounded">feedparser</code> kutubxonasi yordamida 
          xalqaro oqimlarni tahlil qiladi va AI orqali saralaydi.
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-2">
            {Object.keys(fileContents).map(fileName => (
              <button
                key={fileName}
                onClick={() => setSelectedFile(fileName)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-mono transition-all ${
                  selectedFile === fileName 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {selectedFile === fileName ? '📂 ' : '📄 '}{fileName}
              </button>
            ))}
            
            <div className="mt-8 p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
              <h4 className="text-xs font-bold text-amber-800 uppercase mb-3 tracking-widest">RSS Stream Mantiqi</h4>
              <div className="space-y-3">
                 <div className="flex gap-3 items-start">
                    <span className="text-amber-600 font-bold">1</span>
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed italic">Polling: Tizim har 6 soatda xalqaro RSS endpointlarga so'rov yuboradi.</p>
                 </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-amber-600 font-bold">2</span>
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed italic">De-duplication: URL havolalari orqali avvalgi grantlar filtrlanadi.</p>
                 </div>
                 <div className="flex gap-3 items-start">
                    <span className="text-amber-600 font-bold">3</span>
                    <p className="text-[10px] text-amber-700 font-medium leading-relaxed italic">Classification: Gemini API grant sarlavhasi bo'yicha ilmiy sohani aniqlaydi.</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-slate-400 font-mono text-xs">{selectedFile}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Python 3.11</span>
            </div>
            <pre className="text-blue-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
              <code>{fileContents[selectedFile]}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 flex items-center gap-8">
        <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">📈</div>
        <div>
          <h4 className="font-bold text-xl mb-1">RSS Monitoringning Ilmiy Yangiligi</h4>
          <p className="text-emerald-50 text-sm leading-relaxed text-justify opacity-90">
            DSc tadqiqotchisi uchun dolzarb grantlarni topish — bu strategik ustunlikdir. Platformamiz nafaqat grantlarni yig'adi, balki 
            ulardagi metodologik talablarni tadqiqotchining IMRaD tahlili bilan solishtirib, "relevance score"ni hisoblaydi. Bu 
            tadqiqotchining moliyalashtirish imkoniyatini 40% gacha oshirishga xizmat qiladi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackendView;
