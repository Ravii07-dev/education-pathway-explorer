import React, { useState } from 'react';
import { Career, ShortlistItem } from '../types';
import { CAREERS, COURSES } from '../data/pathwayData';
import {
  Compass,
  Search,
  Sparkles,
  TrendingUp,
  Bookmark,
  BookmarkCheck,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface CareerToRoutesViewProps {
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: Omit<ShortlistItem, 'dateAdded'>) => void;
}

export const CareerToRoutesView: React.FC<CareerToRoutesViewProps> = ({
  onSelectNode,
  shortlist,
  onToggleShortlist
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(CAREERS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

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

  const filteredCareers = CAREERS.filter(career => {
    const matchesDomain = selectedDomain === 'All' || career.domain === selectedDomain;
    const matchesSearch =
      searchQuery === '' ||
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const activeCareer = CAREERS.find(c => c.id === selectedCareerId) || filteredCareers[0] || CAREERS[0];
  const isShortlisted = shortlist.some(s => s.id === activeCareer.id && s.type === 'career');

  return (
    <div className="space-y-6">
      {/* Hero explanation */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Reverse Pathway Exploration (Feature F4)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Start With The Destination
          </h2>
          <p className="text-emerald-100 text-xs md:text-sm mt-2 leading-relaxed">
            Most students are told there is only one narrow road to each career. Pick any career below to reveal every direct degree, alternative shortcut, lateral bridge, and self-built route that leads to it.
          </p>
        </div>
      </div>

      {/* Main split view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Career Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search target careers (e.g. UX, Pilot, Quant)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Filter tags */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Tech', 'Design', 'Aviation', 'Finance'].map(tag => {
                const mapTag = tag === 'Tech' ? 'Technology & Software' : tag === 'Design' ? 'Design & Creative' : tag === 'Aviation' ? 'Defence & Aviation' : tag === 'Finance' ? 'Finance & Management' : 'All';
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedDomain(mapTag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedDomain === mapTag
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {/* List */}
            <div className="max-h-[540px] overflow-y-auto space-y-1.5 pr-1">
              {filteredCareers.map(career => {
                const isSelected = activeCareer.id === career.id;
                return (
                  <button
                    key={career.id}
                    onClick={() => setSelectedCareerId(career.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-emerald-50 border border-emerald-300 shadow-sm'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {career.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{career.domain}</span>
                        <span>&bull;</span>
                        <span className="text-emerald-700 font-semibold">{career.routes.length} routes</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Complete Route Breakdown (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
            {/* Active Career Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    {activeCareer.domain}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {activeCareer.growthOutlook} Growth
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{activeCareer.title}</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
                  {activeCareer.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    onToggleShortlist({
                      id: activeCareer.id,
                      type: 'career',
                      title: activeCareer.title,
                      subtitle: activeCareer.domain,
                      domain: activeCareer.domain
                    })
                  }
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isShortlisted
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {isShortlisted ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" />
                      <span>Saved in Curious List</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmark Career</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectNode('career', activeCareer.id)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Full Profile</span>
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Stats banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Fresher Compensation</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{activeCareer.salaryEntry}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Mid-Career (5-8 Yrs)</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{activeCareer.salaryMid}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Educational Pathways</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">{activeCareer.routes.length} Distinct Routes</div>
              </div>
            </div>

            {/* The Education Routes Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Available Routes to Become a {activeCareer.title}
                </h4>
              </div>

              <div className="space-y-4">
                {activeCareer.routes.map((route, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-gradient-to-b from-white to-slate-50/50 shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900">{route.title}</h5>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider self-start sm:self-auto ${
                          route.type === 'Direct / Traditional'
                            ? 'bg-blue-100 text-blue-700'
                            : route.type === 'Alternative Route'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {route.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {route.description}
                    </p>

                    {/* Step-by-step Ladder */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-100 space-y-2 mb-3">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Pathway Milestones
                      </div>
                      {route.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer details */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Timeline: <strong className="text-slate-700">{route.typicalDuration}</strong></span>
                      </div>
                      <div>
                        <span className="text-slate-400">Prep / Exams: </span>
                        <span className="font-semibold text-slate-800">{route.requiredExamsOrPrep}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clickable degrees that feed this career */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Inspect Connected Degree Programs
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCareer.courseIds.map(cid => {
                  const courseObj = COURSES.find(c => c.id === cid);
                  if (!courseObj) return null;
                  return (
                    <button
                      key={cid}
                      onClick={() => onSelectNode('course', cid)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 text-xs font-semibold text-slate-800 transition-all group"
                    >
                      <GraduationCap className="w-4 h-4 text-brand-600" />
                      <span>{courseObj.code}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
