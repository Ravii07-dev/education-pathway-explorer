import React from 'react';
import { EducationLevel, LevelId } from '../types';
import { EDUCATION_LEVELS } from '../data/pathwayData';
import { MapPin, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: EducationLevel;
  onSelectLevel: (levelId: LevelId) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  onSelectLevel
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
              Where Are You In Your Education Today?
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
              {currentLevel.typicalAge}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Current Stage: <span className="text-brand-600">{currentLevel.name}</span>
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {currentLevel.description}
          </p>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {EDUCATION_LEVELS.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => onSelectLevel(lvl.id)}
              className={`px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                currentLevel.id === lvl.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{lvl.name}</span>
              {lvl.id === '12th_pcm' && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-500 text-white font-extrabold">
                  v1 Focus
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Unlocked streams highlight chips */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Key Unlocked Fields:
        </span>
        {currentLevel.keyStreamsUnlocked.map((stream, idx) => (
          <span
            key={idx}
            className="text-xs px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-medium flex items-center gap-1"
          >
            <CheckCircle2 className="w-3 h-3 text-brand-500" />
            {stream}
          </span>
        ))}
      </div>
    </div>
  );
};
