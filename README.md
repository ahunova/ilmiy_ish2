
# AcademiaAI - Professional Research Suite (Mahalliy o'rnatish)

Ushbu loyiha PhD tadqiqotchilari uchun mo'ljallangan intellektual tahlil platformasidir.

## O'rnatish bosqichlari:

1. **Terminalda loyiha papkasiga kiring:**
   ```bash
   cd academia-ai-project
   ```

2. **Kutubxonalarni o'rnating:**
   ```bash
   npm install
   ```

3. **API kalitlarni sozlash:**
   Loyiha papkasida `.env` nomli fayl yarating va uning ichiga quyidagi kalitlarni yozing:
   ```env
   API_KEY=Sizning_Gemini_API_Kalitingiz
   SUPABASE_URL=Sizning_Supabase_Proyekt_URL
   SUPABASE_ANON_KEY=Sizning_Supabase_Anon_Kalitingiz
   ```
   *Eslatma: Gemini API kalitini [Google AI Studio](https://aistudio.google.com/app/apikey) saytidan olishingiz mumkin.*

4. **Loyihani ishga tushiring:**
   ```bash
   npm run dev
   ```

5. **Brauzerda oching:**
   Terminalda ko'rsatilgan manzilga (odatda `http://localhost:5173`) kiring.

## Imkoniyatlar:
- IMRaD strukturasini tahlil qilish (Gemini 3 Pro)
- Akademik uslub va grammatika monitoringi
- MART (Mantiqiy-Analitik-Raqamli Tahlil) metodologiyasi
- Grantlar va DOI identifikatsiyasi
- Hybrid Storage (IndexedDB + Supabase Cloud Sync)
