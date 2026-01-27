
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
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveManuscript(id: string, content: string, problem: string) {
    const db = await this.openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction('manuscripts', 'readwrite');
      transaction.objectStore('manuscripts').put({ id, content, problem, updatedAt: new Date().toISOString() });
      transaction.oncomplete = () => resolve(true);
    });
  }

  async getManuscript(id: string) {
    const db = await this.openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction('manuscripts', 'readonly');
      const request = transaction.objectStore('manuscripts').get(id);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAllHistory() {
    const db = await this.openDB();
    return new Promise<any[]>((resolve) => {
      const transaction = db.transaction('analysis_history', 'readonly');
      const request = transaction.objectStore('analysis_history').getAll();
      request.onsuccess = () => resolve(request.result);
    });
  }
}

export const db = new ResearchDB();
