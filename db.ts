
import { supabase } from './supabase';

export class ResearchDB {
  private dbName = 'AcademiaResearchDB';
  private version = 1;

  async openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('manuscripts')) {
          db.createObjectStore('manuscripts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('analysis_history')) {
          db.createObjectStore('analysis_history', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'link' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Manuscripts: Local first, then Sync to Cloud
  async saveManuscript(id: string, content: string, problem: string) {
    const db = await this.openDB();
    const localSave = new Promise((resolve) => {
      const transaction = db.transaction('manuscripts', 'readwrite');
      transaction.objectStore('manuscripts').put({ id, content, problem, updatedAt: new Date().toISOString() });
      transaction.oncomplete = () => resolve(true);
    });

    // Cloud sync (Anonymous)
    try {
      await supabase.from('manuscripts').upsert({
        id,
        content,
        problem,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Cloud sync failed (manuscript), working in offline mode.");
    }

    return localSave;
  }

  async getManuscript(id: string) {
    // Try Cloud first for latest version
    try {
      const { data } = await supabase.from('manuscripts').select('*').eq('id', id).single();
      if (data) return data;
    } catch (e) {
      console.warn("Cloud fetch failed, using local fallback.");
    }

    const db = await this.openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction('manuscripts', 'readonly');
      const request = transaction.objectStore('manuscripts').get(id);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Favorites (Grants/Conferences) Sync
  async saveFavorite(item: any) {
    const db = await this.openDB();
    const localSave = new Promise((resolve) => {
      const transaction = db.transaction('favorites', 'readwrite');
      transaction.objectStore('favorites').put({ ...item, savedAt: new Date().toISOString() });
      transaction.oncomplete = () => resolve(true);
    });

    try {
      await supabase.from('favorites').upsert({
        link: item.link,
        title: item.title,
        category: item.category,
        data: item,
        saved_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn("Cloud sync failed (favorite).");
    }
    return localSave;
  }

  async deleteFavorite(link: string) {
    const db = await this.openDB();
    const localDelete = new Promise((resolve) => {
      const transaction = db.transaction('favorites', 'readwrite');
      transaction.objectStore('favorites').delete(link);
      transaction.oncomplete = () => resolve(true);
    });

    try {
      await supabase.from('favorites').delete().eq('link', link);
    } catch (e) {
      console.warn("Cloud delete failed.");
    }
    return localDelete;
  }

  async getFavorites() {
    try {
      const { data } = await supabase.from('favorites').select('*');
      if (data) return data.map(d => d.data);
    } catch (e) {}

    const db = await this.openDB();
    return new Promise<any[]>((resolve) => {
      const transaction = db.transaction('favorites', 'readonly');
      const request = transaction.objectStore('favorites').getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Analysis History Sync
  async saveHistory(historyItem: any) {
    const db = await this.openDB();
    const localSave = new Promise((resolve) => {
      const transaction = db.transaction('analysis_history', 'readwrite');
      transaction.objectStore('analysis_history').add(historyItem);
      transaction.oncomplete = () => resolve(true);
    });

    try {
      await supabase.from('analysis_history').insert({
        problem: historyItem.problem,
        date: historyItem.date,
        stats: historyItem.stats,
        text_preview: historyItem.textPreview
      });
    } catch (e) {
      console.warn("Cloud history sync failed.");
    }
    return localSave;
  }

  async getAllHistory() {
    try {
      const { data } = await supabase.from('analysis_history').select('*').order('date', { ascending: false });
      if (data) return data;
    } catch (e) {}

    const db = await this.openDB();
    return new Promise<any[]>((resolve) => {
      const transaction = db.transaction('analysis_history', 'readonly');
      const request = transaction.objectStore('analysis_history').getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }
}

export const db = new ResearchDB();
