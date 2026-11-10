import { EducationLevel, Course, Career, EntranceExam, SwitchingRoute, ShortlistItem } from '../types';
import { EDUCATION_LEVELS, COURSES, CAREERS, ENTRANCE_EXAMS, SWITCHING_ROUTES } from '../data/pathwayData';

const BACKEND_BASE_URL = 'http://localhost:8080/api';

export const apiService = {
  async checkBackendHealth(): Promise<{ status: string; javaVersion?: string } | null> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/health`);
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  },

  async getLevels(): Promise<EducationLevel[]> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/levels`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, using bundled data', e);
    }
    return EDUCATION_LEVELS;
  },

  async getCourses(domain?: string, levelId?: string): Promise<Course[]> {
    try {
      const params = new URLSearchParams();
      if (domain && domain !== 'All') params.append('domain', domain);
      if (levelId) params.append('levelId', levelId);
      const url = `${BACKEND_BASE_URL}/courses${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, using bundled courses', e);
    }
    return COURSES;
  },

  async getCareers(domain?: string): Promise<Career[]> {
    try {
      const params = new URLSearchParams();
      if (domain && domain !== 'All') params.append('domain', domain);
      const url = `${BACKEND_BASE_URL}/careers${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, using bundled careers', e);
    }
    return CAREERS;
  },

  async getExams(): Promise<EntranceExam[]> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/exams`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, using bundled exams', e);
    }
    return ENTRANCE_EXAMS;
  },

  async getSwitchingRoutes(difficulty?: string): Promise<SwitchingRoute[]> {
    try {
      const params = new URLSearchParams();
      if (difficulty && difficulty !== 'All') params.append('difficulty', difficulty);
      const url = `${BACKEND_BASE_URL}/switching-routes${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, using bundled switching routes', e);
    }
    return SWITCHING_ROUTES;
  },

  async search(query: string): Promise<{
    courses: Course[];
    careers: Career[];
    exams: EntranceExam[];
    switchingRoutes: SwitchingRoute[];
  }> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Java backend offline, searching locally', e);
    }
    const q = query.toLowerCase();
    return {
      courses: COURSES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)),
      careers: CAREERS.filter(c => c.title.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q))),
      exams: ENTRANCE_EXAMS.filter(e => e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q)),
      switchingRoutes: SWITCHING_ROUTES.filter(s => s.title.toLowerCase().includes(q) || s.fromDomain.toLowerCase().includes(q))
    };
  },

  async getShortlist(): Promise<ShortlistItem[]> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/shortlist`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('Java backend offline, falling back to local storage', e);
    }
    return [];
  },

  async getDatabaseStatus(): Promise<any> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/db-status`);
      if (res.ok) return await res.json();
    } catch {
      return null;
    }
  },

  async syncShortlistItemToBackend(item: ShortlistItem): Promise<void> {
    try {
      await fetch(`${BACKEND_BASE_URL}/shortlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (e) {
      console.warn('Failed to sync shortlist to Java backend', e);
    }
  },

  async deleteShortlistItemFromBackend(type: string, id: string): Promise<void> {
    try {
      await fetch(`${BACKEND_BASE_URL}/shortlist/${type}/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('Failed to delete shortlist item from Java backend', e);
    }
  }
};
