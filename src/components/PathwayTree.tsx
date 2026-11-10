import React, { useState, useMemo } from 'react';
import { EducationLevel, Course, EntranceExam, Career, DomainCategory, ShortlistItem } from '../types';
import { COURSES, ENTRANCE_EXAMS, CAREERS } from '../data/pathwayData';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Search,
  CheckCircle,
  Clock,
  IndianRupee,
  ChevronRight,
  Compass,
  Info
} from 'lucide-react';

interface PathwayTreeProps {
  currentLevel: EducationLevel;
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: Omit<ShortlistItem, 'dateAdded'>) => void;
}

export const PathwayTree: React.FC<PathwayTreeProps> = ({
  currentLevel,
  onSelectNode,
  shortlist,
  onToggleShortlist
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeCareerId, setActiveCareerId] = useState<string | null>(null);
  const [treeSearch, setTreeSearch] = useState<string>('');

  // Filter courses available for the current education level
  const availableCourses = useMemo(() => {
    return COURSES.filter(course => {
      // Must be unlocked in current level
      const isLevelMatch = currentLevel.courseIds.includes(course.id) || 
        (currentLevel.id === '12th_pcm' && course.isPcmPrimary);
      
      // Domain filter
      const isDomainMatch = selectedDomain === 'All' || course.domains.includes(selectedDomain as DomainCategory);

      // Search filter
      const isSearchMatch = treeSearch === '' || 
        course.name.toLowerCase().includes(treeSearch.toLowerCase()) ||
        course.code.toLowerCase().includes(treeSearch.toLowerCase()) ||
        course.description.toLowerCase().includes(treeSearch.toLowerCase());

      return isLevelMatch && isDomainMatch && isSearchMatch;
    });
  }, [currentLevel, selectedDomain, treeSearch]);

  // Derived available exams based on available courses
  const relevantExamIds = useMemo(() => {
    const set = new Set<string>();
    availableCourses.forEach(c => c.examIds.forEach(eid => set.add(eid)));
    return Array.from(set);
  }, [availableCourses]);

  const availableExams = useMemo(() => {
    return ENTRANCE_EXAMS.filter(e => relevantExamIds.includes(e.id));
  }, [relevantExamIds]);

  // Derived careers based on active selection or visible courses
  const visibleCareers = useMemo(() => {
    const careerSet = new Set<string>();
    
    if (activeCourseId) {
      const crs = COURSES.find(c => c.id === activeCourseId);
      crs?.careerIds.forEach(cid => careerSet.add(cid));
    } else {
      availableCourses.forEach(c => c.careerIds.forEach(cid => careerSet.add(cid)));
    }

    return CAREERS.filter(c => {
      const inSet = careerSet.has(c.id);
      const matchesSearch = treeSearch === '' || 
        c.title.toLowerCase().includes(treeSearch.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(treeSearch.toLowerCase());
      return inSet && matchesSearch;
    });
  }, [activeCourseId, availableCourses, treeSearch]);

  // Highlight connections
  const highlightedCourses = useMemo(() => {
    if (activeCareerId) {
      const cr = CAREERS.find(c => c.id === activeCareerId);
      return cr?.courseIds || [];
    }
    return [];
  }, [activeCareerId]);

  const highlightedExams = useMemo(() => {
    if (activeCourseId) {
      const crs = COURSES.find(c => c.id === activeCourseId);
      return crs?.examIds || [];
    }
    return [];
  }, [activeCourseId]);

  const allDomains = [
    'All',
    'Technology & Software',
    'AI & Data Science',
    'Design & Creative',
    'Engineering & Hardware',
    'Defence & Aviation',
    'Sciences & Research',
    'Finance & Management',
    'Law & Policy'
  ];

  return (
    <div className="space-y-6">
      {/* Control bar: Domain filter & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Domain tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {allDomains.map(d => (
            <button
              key={d}
              onClick={() => {
                setSelectedDomain(d);
                setActiveCourseId(null);
                setActiveCareerId(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedDomain === d
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Search within tree */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter courses, careers, exams..."
            value={treeSearch}
            onChange={e => setTreeSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Guided Info Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
            <Compass className="w-4 h-4" />
          </span>
          <div>
            <span className="font-bold text-slate-900">Branching Pathway Map: </span>
            Click on any course or career to filter linked relationships. Tap anywhere to open complete detail cards.
          </div>
        </div>
        {(activeCourseId || activeCareerId) && (
          <button
            onClick={() => {
              setActiveCourseId(null);
              setActiveCareerId(null);
            }}
            className="text-xs font-semibold text-brand-600 hover:text-brand-800 underline underline-offset-2 shrink-0 text-left"
          >
            Reset Active Selection
          </button>
        )}
      </div>

      {/* 3-Column Branching Pathway Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1: Entrance Exams (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-100" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Entrance Gateways ({availableExams.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Step 1</span>
          </div>

          <div className="space-y-2.5">
            {availableExams.map(exam => {
              const isShortlisted = shortlist.some(s => s.id === exam.id && s.type === 'exam');
              const isHighlighted = highlightedExams.includes(exam.id);

              return (
                <div
                  key={exam.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isHighlighted
                      ? 'border-purple-400 bg-purple-50/70 shadow-md ring-2 ring-purple-400/20'
                      : 'border-slate-200/80 bg-white hover:border-purple-300 hover:shadow-sm'
                  }`}
                  onClick={() => onSelectNode('exam', exam.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">{exam.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {exam.difficulty}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {exam.fullName}
                      </div>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onToggleShortlist({
                          id: exam.id,
                          type: 'exam',
                          title: exam.name,
                          subtitle: exam.fullName
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 transition-colors"
                      title={isShortlisted ? 'Saved' : 'Mark Curious'}
                    >
                      {isShortlisted ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="text-purple-700 font-medium">{exam.examMonths}</span>
                    <span className="text-slate-400">Tap for details &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Courses / Undergraduate Programs (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Undergraduate Pathways ({availableCourses.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Step 2 &bull; Primary Choices</span>
          </div>

          <div className="space-y-3">
            {availableCourses.map(course => {
              const isShortlisted = shortlist.some(s => s.id === course.id && s.type === 'course');
              const isSelected = activeCourseId === course.id;
              const isHighlighted = highlightedCourses.includes(course.id);

              return (
                <div
                  key={course.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 shadow-md ring-2 ring-brand-500/20'
                      : isHighlighted
                      ? 'border-blue-400 bg-blue-50/40 shadow-sm ring-1 ring-blue-300'
                      : 'border-slate-200/80 bg-white hover:border-brand-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    setActiveCourseId(prev => (prev === course.id ? null : course.id));
                    setActiveCareerId(null);
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">{course.code}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {course.degreeType}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {course.duration}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-700 mt-1">
                        {course.name}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleShortlist({
                            id: course.id,
                            type: 'course',
                            title: course.code,
                            subtitle: course.name,
                            domain: course.domains[0]
                          });
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 transition-colors"
                        title={isShortlisted ? 'Saved in shortlist' : 'Mark Curious'}
                      >
                        {isShortlisted ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectNode('course', course.id);
                        }}
                        className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Badges footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-3 h-3 text-slate-400" />
                      <span>Govt: {course.costRangeGovt.split('(')[0]}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">Unlocks:</span>
                      <span className="font-semibold text-emerald-700">
                        {course.careerIds.length} Careers
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 3: High-Value Career Outcomes (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Career Destinations ({visibleCareers.length})
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Step 3 &bull; Outcomes</span>
          </div>

          <div className="space-y-2.5">
            {visibleCareers.map(career => {
              const isShortlisted = shortlist.some(s => s.id === career.id && s.type === 'career');
              const isSelected = activeCareerId === career.id;

              return (
                <div
                  key={career.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    setActiveCareerId(prev => (prev === career.id ? null : career.id));
                    setActiveCourseId(null);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">{career.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {career.domain}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleShortlist({
                            id: career.id,
                            type: 'career',
                            title: career.title,
                            subtitle: career.domain,
                            domain: career.domain
                          });
                        }}
                        className="p-1 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 transition-colors"
                        title={isShortlisted ? 'Saved' : 'Mark Curious'}
                      >
                        {isShortlisted ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectNode('career', career.id);
                        }}
                        className="p-1 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="View Career Details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Compensation & Routes preview */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {career.salaryEntry}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {career.routes.length} Education Routes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
