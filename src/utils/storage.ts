import { ShortlistItem } from '../types';

const SHORTLIST_STORAGE_KEY = 'edu_pathway_shortlist_v1';

export function getStoredShortlist(): ShortlistItem[] {
  try {
    const data = localStorage.getItem(SHORTLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read shortlist from localStorage', e);
    return [];
  }
}

export function saveStoredShortlist(items: ShortlistItem[]): void {
  try {
    localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save shortlist to localStorage', e);
  }
}

export function exportShortlistAsMarkdown(items: ShortlistItem[]): string {
  if (items.length === 0) return '# My Education Pathway Shortlist\n\nNo items saved yet.';

  const courses = items.filter(i => i.type === 'course');
  const careers = items.filter(i => i.type === 'career');
  const exams = items.filter(i => i.type === 'exam');

  let md = `# My Education Pathway Shortlist\n\n*Generated on: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}*\n\n`;

  if (careers.length > 0) {
    md += `## 🎯 Target Careers (${careers.length})\n\n`;
    careers.forEach((c, idx) => {
      md += `${idx + 1}. **${c.title}** - *${c.subtitle}*\n`;
      if (c.userNotes) md += `   > Note: ${c.userNotes}\n`;
    });
    md += `\n`;
  }

  if (courses.length > 0) {
    md += `## 🎓 Prospective Courses (${courses.length})\n\n`;
    courses.forEach((c, idx) => {
      md += `${idx + 1}. **${c.title}** - *${c.subtitle}*\n`;
      if (c.userNotes) md += `   > Note: ${c.userNotes}\n`;
    });
    md += `\n`;
  }

  if (exams.length > 0) {
    md += `## 📝 Key Entrance Exams (${exams.length})\n\n`;
    exams.forEach((e, idx) => {
      md += `${idx + 1}. **${e.title}** - *${e.subtitle}*\n`;
      if (e.userNotes) md += `   > Note: ${e.userNotes}\n`;
    });
    md += `\n`;
  }

  md += `---\n*Created with Education Pathway Explorer (Indian Education System)*`;
  return md;
}
