import React, { useState, useEffect, useRef } from 'react';
import { COURSES, CAREERS, ENTRANCE_EXAMS, SWITCHING_ROUTES } from '../data/pathwayData';
import {
  Search,
  X,
  GraduationCap,
  Briefcase,
  BookOpen,
  Shuffle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
  onSelectSwitchingTab: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectNode,
  onSelectSwitchingTab
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const matchingCourses = cleanQ
    ? COURSES.filter(
        c =>
          c.name.toLowerCase().includes(cleanQ) ||
          c.code.toLowerCase().includes(cleanQ) ||
          c.description.toLowerCase().includes(cleanQ)
      ).slice(0, 4)
    : [];

  const matchingCareers = cleanQ
    ? CAREERS.filter(
        c =>
          c.title.toLowerCase().includes(cleanQ) ||
          c.shortDesc.toLowerCase().includes(cleanQ) ||
          c.skills.some(s => s.toLowerCase().includes(cleanQ))
      ).slice(0, 4)
    : [];

  const matchingExams = cleanQ
    ? ENTRANCE_EXAMS.filter(
        e =>
          e.name.toLowerCase().includes(cleanQ) ||
          e.fullName.toLowerCase().includes(cleanQ) ||
          e.conductingBody.toLowerCase().includes(cleanQ)
      ).slice(0, 3)
    : [];

  const matchingSwitches = cleanQ
    ? SWITCHING_ROUTES.filter(
        s =>
          s.title.toLowerCase().includes(cleanQ) ||
          s.fromDomain.toLowerCase().includes(cleanQ) ||
          s.toDomain.toLowerCase().includes(cleanQ)
      ).slice(0, 2)
    : [];

  const hasResults =
    matchingCourses.length > 0 ||
    matchingCareers.length > 0 ||
    matchingExams.length > 0 ||
    matchingSwitches.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 sm:pt-24 pb-8">
        <div className="inline-block w-full max-w-2xl bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all relative border border-slate-200">
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
            <Search className="w-5 h-5 text-brand-600 shrink-0 ml-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search anything: B.Tech, UX Design, Pilot, JEE, switching to law..."
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-lg">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
            {!cleanQ && (
              <div className="py-8 text-center space-y-2">
                <Sparkles className="w-6 h-6 text-brand-500 mx-auto opacity-70" />
                <div className="text-xs font-semibold text-slate-700">
                  Quick Search across the entire Indian education matrix
                </div>
                <div className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  Try typing "UX Designer", "Actuarial", "UCEED", "NDA", or "Engineering to Product"
                </div>
              </div>
            )}

            {cleanQ && !hasResults && (
              <div className="py-8 text-center text-xs text-slate-500">
                No matching pathways found for "<strong className="text-slate-700">{query}</strong>". Try a broader term.
              </div>
            )}

            {/* CAREERS */}
            {matchingCareers.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  Careers
                </div>
                <div className="space-y-1">
                  {matchingCareers.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelectNode('career', c.id);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-emerald-50/60 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                          {c.title}
                        </div>
                        <div className="text-[11px] text-slate-500">{c.domain}</div>
                      </div>
                      <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                        View Routes <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COURSES */}
            {matchingCourses.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  Degrees & Programs
                </div>
                <div className="space-y-1">
                  {matchingCourses.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelectNode('course', c.id);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-brand-50/60 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-brand-700">
                          {c.code} - {c.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{c.duration} &bull; {c.degreeType}</div>
                      </div>
                      <span className="text-[11px] font-medium text-brand-600 flex items-center gap-1">
                        Inspect <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EXAMS */}
            {matchingExams.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  Entrance Exams
                </div>
                <div className="space-y-1">
                  {matchingExams.map(e => (
                    <div
                      key={e.id}
                      onClick={() => {
                        onSelectNode('exam', e.id);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-purple-50/60 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                          {e.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{e.fullName}</div>
                      </div>
                      <span className="text-[11px] font-medium text-purple-600 flex items-center gap-1">
                        Dates & Tips <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SWITCHING PATHWAYS */}
            {matchingSwitches.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
                  Switching Routes
                </div>
                <div className="space-y-1">
                  {matchingSwitches.map(s => (
                    <div
                      key={s.id}
                      onClick={() => {
                        onSelectSwitchingTab();
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-indigo-50/60 cursor-pointer flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                          {s.title}
                        </div>
                        <div className="text-[11px] text-slate-500">{s.timeline} transition</div>
                      </div>
                      <span className="text-[11px] font-medium text-indigo-600 flex items-center gap-1">
                        Read Guide <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
