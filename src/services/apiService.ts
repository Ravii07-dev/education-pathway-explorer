import { EducationLevel, Course, Career, EntranceExam, SwitchingRoute, ShortlistItem } from '../types';
import { EDUCATION_LEVELS, COURSES, CAREERS, ENTRANCE_EXAMS, SWITCHING_ROUTES } from '../data/pathwayData';

const BACKEND_BASE_URL = 'http://localhost:8080/api';

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export const apiService = {
  // Authentication & Session
  getAuthToken(): string | null {
    return localStorage.getItem('edu_jwt_token');
  },

  setAuthToken(token: string | null): void {
    if (token) localStorage.setItem('edu_jwt_token', token);
    else localStorage.removeItem('edu_jwt_token');
  },

  getStoredUser(): UserProfile | null {
    try {
      const u = localStorage.getItem('edu_user_profile');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setStoredUser(user: UserProfile | null): void {
    if (user) localStorage.setItem('edu_user_profile', JSON.stringify(user));
    else localStorage.removeItem('edu_user_profile');
  },

  getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async signup(data: { username: string; email: string; password: string; fullName?: string }): Promise<UserProfile> {
    const res = await fetch(`${BACKEND_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(err.message || 'Registration failed');
    }
    const result = await res.json();
    this.setAuthToken(result.token);
    const profile: UserProfile = {
      userId: result.userId,
      username: result.username,
      email: result.email,
      fullName: result.fullName,
      roles: result.roles || ['ROLE_USER']
    };
    this.setStoredUser(profile);
    return profile;
  },

  async login(data: { username: string; password: string }): Promise<UserProfile> {
    const res = await fetch(`${BACKEND_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Invalid username or password' }));
      throw new Error(err.message || 'Invalid username or password');
    }
    const result = await res.json();
    this.setAuthToken(result.token);
    const profile: UserProfile = {
      userId: result.userId,
      username: result.username,
      email: result.email,
      fullName: result.fullName,
      roles: result.roles || ['ROLE_USER']
    };
    this.setStoredUser(profile);
    return profile;
  },

  logout(): void {
    this.setAuthToken(null);
    this.setStoredUser(null);
  },

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
      const res = await fetch(`${BACKEND_BASE_URL}/levels`, { headers: this.getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using bundled data', e);
    }
    return EDUCATION_LEVELS;
  },

  async getCourses(domain?: string, levelId?: string): Promise<Course[]> {
    try {
      const params = new URLSearchParams();
      if (domain && domain !== 'All') params.append('domain', domain);
      if (levelId) params.append('levelId', levelId);
      const url = `${BACKEND_BASE_URL}/courses${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: this.getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || COURSES;
      }
    } catch (e) {
      console.warn('Backend offline, using bundled courses', e);
    }
    return COURSES;
  },

  async getCareers(domain?: string): Promise<Career[]> {
    try {
      const params = new URLSearchParams();
      if (domain && domain !== 'All') params.append('domain', domain);
      const url = `${BACKEND_BASE_URL}/careers${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: this.getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : data.content || CAREERS;
      }
    } catch (e) {
      console.warn('Backend offline, using bundled careers', e);
    }
    return CAREERS;
  },

  async getExams(): Promise<EntranceExam[]> {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/exams`, { headers: this.getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using bundled exams', e);
    }
    return ENTRANCE_EXAMS;
  },

  async getSwitchingRoutes(difficulty?: string): Promise<SwitchingRoute[]> {
    try {
      const params = new URLSearchParams();
      if (difficulty && difficulty !== 'All') params.append('difficulty', difficulty);
      const url = `${BACKEND_BASE_URL}/switching-routes${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: this.getAuthHeaders() });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using bundled switching routes', e);
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
      const res = await fetch(`${BACKEND_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
        headers: this.getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, searching locally', e);
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
      const res = await fetch(`${BACKEND_BASE_URL}/shortlist`, {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data.map(item => ({
            id: item.itemId || item.id,
            type: item.itemType || item.type,
            title: item.title,
            subtitle: item.subtitle,
            domain: item.domain,
            dateAdded: item.dateAdded,
            userNotes: item.userNotes
          }));
        }
      }
    } catch (e) {
      console.warn('Backend offline, falling back to local storage', e);
    }
    return [];
  },

  async syncShortlistItemToBackend(item: ShortlistItem): Promise<void> {
    try {
      await fetch(`${BACKEND_BASE_URL}/shortlist`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(item)
      });
    } catch (e) {
      console.warn('Failed to sync shortlist to backend', e);
    }
  },

  async deleteShortlistItemFromBackend(type: string, id: string): Promise<void> {
    try {
      await fetch(`${BACKEND_BASE_URL}/shortlist/${type}/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
    } catch (e) {
      console.warn('Failed to delete shortlist item from backend', e);
    }
  }
};
