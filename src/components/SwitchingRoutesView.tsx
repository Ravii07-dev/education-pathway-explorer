import React, { useState } from 'react';
import { SWITCHING_ROUTES } from '../data/pathwayData';
import {
  Shuffle,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Search,
  Filter
} from 'lucide-react';

export const SwitchingRoutesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredRoutes = SWITCHING_ROUTES.filter(route => {
    const matchesDifficulty =
      selectedDifficulty === 'All' || route.difficulty === selectedDifficulty;
    const matchesSearch =
      searchQuery === '' ||
      route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.fromDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.toDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.commonScenario.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 -mb-10 -mr-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3">
            <Shuffle className="w-3.5 h-3.5" />
            Zero-Fear Switching Routes (Feature F7)
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            You Are Never Locked In
          </h2>
          <p className="text-indigo-100 text-xs md:text-sm mt-2 leading-relaxed">
            The biggest anxiety students face in India is the belief that choosing one stream or degree traps them forever. In reality, hundreds of lateral bridges, entrance conversions, and multidisciplinary pathways exist.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Difficulty:
          </span>
          {['All', 'Low', 'Moderate', 'Challenging'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search switching paths (e.g. Design, Law)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Switching Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoutes.map(route => (
          <div
            key={route.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {route.fromDomain}
                  </span>
                  <ArrowRight className="w-3 h-3 text-indigo-500" />
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {route.toDomain}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    route.difficulty === 'Low'
                      ? 'bg-emerald-100 text-emerald-800'
                      : route.difficulty === 'Moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {route.difficulty} Effort
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {route.title}
              </h3>

              {/* Common Scenario */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-800 font-semibold block mb-0.5">
                  Typical Student Situation:
                </strong>
                {route.commonScenario}
              </div>

              {/* How to Switch */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  The Transition Strategy
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {route.howToSwitch}
                </p>
              </div>

              {/* Pro Tips */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <div className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Insider Advice
                </div>
                <ul className="space-y-1.5">
                  {route.proTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Transition Time: <strong>{route.timeline}</strong></span>
              </div>

              <div className="flex flex-wrap gap-1">
                {route.recommendedCoursesOrCerts.slice(0, 2).map((c, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
