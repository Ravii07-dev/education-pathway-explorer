import React, { useState, useMemo } from 'react';
import { COURSES, CAREERS, ENTRANCE_EXAMS } from '../data/pathwayData';
import { ShortlistItem, DomainCategory } from '../types';
import {
  Search,
  GraduationCap,
  Briefcase,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Clock,
  IndianRupee,
  ExternalLink,
  Filter,
  ArrowRight
} from 'lucide-react';

interface DirectoryViewProps {
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: Omit<ShortlistItem, 'dateAdded'>) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectNode,
  shortlist,
  onToggleShortlist
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'courses' | 'careers' | 'exams'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchDomain = selectedDomain === 'All' || course.domains.includes(selectedDomain as DomainCategory);
      const matchSearch =
        searchQuery === '' ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDomain && matchSearch;
    });
  }, [selectedDomain, searchQuery]);

  const filteredCareers = useMemo(() => {
    return CAREERS.filter(career => {
      const matchDomain = selectedDomain === 'All' || career.domain === selectedDomain;
      const matchSearch =
        searchQuery === '' ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDomain && matchSearch;
    });
  }, [selectedDomain, searchQuery]);

  const filteredExams = useMemo(() => {
    return ENTRANCE_EXAMS.filter(exam => {
      return (
        searchQuery === '' ||
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search & Sub-Tabs Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              National Education & Career Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive reference database of verified degrees, entrance exams, and 21st-century careers in India.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex p-1 bg-slate-100 rounded-2xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('courses')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'courses'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Courses ({COURSES.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('careers')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'careers'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers ({CAREERS.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('exams')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'exams'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Exams ({ENTRANCE_EXAMS.length})</span>
            </button>
          </div>
        </div>

        {/* Search input & Filter row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeSubTab}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {activeSubTab !== 'exams' && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
              {['All', 'Technology & Software', 'AI & Data Science', 'Design & Creative', 'Defence & Aviation', 'Finance & Management'].map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedDomain === d
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d === 'Technology & Software' ? 'Tech' : d === 'AI & Data Science' ? 'AI/Data' : d === 'Design & Creative' ? 'Design' : d === 'Defence & Aviation' ? 'Aviation' : d === 'Finance & Management' ? 'Finance' : d}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {/* COURSES TAB */}
      {activeSubTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => {
            const isShortlisted = shortlist.some(s => s.id === course.id && s.type === 'course');
            return (
              <div
                key={course.id}
                onClick={() => onSelectNode('course', course.id)}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {course.degreeType}
                    </span>
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

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
                      {course.name}
                    </h3>
                    <div className="text-xs font-semibold text-slate-500 mt-0.5">
                      {course.code}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Duration:</span>
                      <strong className="text-slate-800">{course.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Govt Fee:</span>
                      <strong className="text-slate-800">{course.costRangeGovt.split('(')[0]}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-emerald-700 font-semibold">
                    {course.careerIds.length} Careers Unlocked
                  </span>
                  <span className="font-semibold text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Inspect <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CAREERS TAB */}
      {activeSubTab === 'careers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCareers.map(career => {
            const isShortlisted = shortlist.some(s => s.id === career.id && s.type === 'career');
            return (
              <div
                key={career.id}
                onClick={() => onSelectNode('career', career.id)}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {career.domain}
                    </span>
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
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {career.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {career.shortDesc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Starting Salary:</span>
                      <strong className="text-emerald-700">{career.salaryEntry}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Mid Career:</span>
                      <strong className="text-slate-800">{career.salaryMid}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-500 font-medium">
                    {career.routes.length} Education Routes
                  </span>
                  <span className="font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    View Pathways <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EXAMS TAB */}
      {activeSubTab === 'exams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map(exam => {
            const isShortlisted = shortlist.some(s => s.id === exam.id && s.type === 'exam');
            return (
              <div
                key={exam.id}
                onClick={() => onSelectNode('exam', exam.id)}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {exam.difficulty} Difficulty
                    </span>
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

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                      {exam.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {exam.fullName}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Conducting Body:</span>{' '}
                    {exam.conductingBody}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Exam Dates:</span>
                      <strong className="text-purple-800">{exam.examMonths}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Applications:</span>
                      <strong className="text-slate-800">{exam.applicationMonths}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-purple-700 font-semibold">
                    {exam.unlockedCourseIds.length} Degrees Covered
                  </span>
                  <span className="font-semibold text-purple-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Syllabus & Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
