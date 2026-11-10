import React, { useState, useEffect } from 'react';
import { EducationLevel, ShortlistItem, LevelId } from '../types';
import { EDUCATION_LEVELS } from '../data/pathwayData';
import { apiService } from '../services/apiService';
import { UserProfile } from '../services/apiService';
import {
  Compass,
  MapPin,
  BookmarkCheck,
  Search,
  Share2,
  GraduationCap,
  Layers,
  Shuffle,
  BookOpen,
  ChevronDown,
  Server,
  UserCheck,
  LogIn,
  LogOut,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  currentLevel: EducationLevel;
  onSelectLevel: (levelId: LevelId) => void;
  activeTab: 'explore' | 'career-to-routes' | 'switching' | 'directory';
  onSelectTab: (tab: 'explore' | 'career-to-routes' | 'switching' | 'directory') => void;
  shortlistCount: number;
  onOpenShortlist: () => void;
  onOpenSearch: () => void;
  onOpenShareModal: () => void;
  user: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  onSelectLevel,
  activeTab,
  onSelectTab,
  shortlistCount,
  onOpenShortlist,
  onOpenSearch,
  onOpenShareModal,
  user,
  onOpenAuthModal,
  onLogout
}) => {
  const [javaBackendOnline, setJavaBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    apiService.checkBackendHealth().then(status => {
      setJavaBackendOnline(!!status && status.status === 'UP');
    });
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs w-full max-w-full overflow-hidden">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Left: Brand Logo & Level Picker (Starts from the very left edge) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              className="flex items-center gap-2 shrink-0 cursor-pointer"
              onClick={() => onSelectTab('explore')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="shrink-0">
                <div className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                  Pathway Explorer
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                  Indian Education
                </div>
              </div>
            </div>

            {/* Level Selector Dropdown */}
            <div className="relative group shrink-0">
              <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 cursor-pointer transition-colors max-w-[140px] sm:max-w-[180px]">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {currentLevel.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 hidden group-hover:block transition-all z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Change Starting Education Stage
                </div>
                <div className="space-y-1">
                  {EDUCATION_LEVELS.map(lvl => (
                    <button
                      key={lvl.id}
                      onClick={() => onSelectLevel(lvl.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentLevel.id === lvl.id
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div>{lvl.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{lvl.tagline}</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium shrink-0 ml-2">
                        {lvl.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs (Responsive: compact on xl, full on 2xl) */}
          <nav className="hidden xl:flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/50 shrink-0">
            <button
              onClick={() => onSelectTab('explore')}
              className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeTab === 'explore'
                  ? 'bg-white text-brand-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Branching Tree</span>
              <span className="2xl:hidden">Tree</span>
            </button>

            <button
              onClick={() => onSelectTab('career-to-routes')}
              className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeTab === 'career-to-routes'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Career to Routes</span>
              <span className="2xl:hidden">Careers</span>
            </button>

            <button
              onClick={() => onSelectTab('switching')}
              className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeTab === 'switching'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Switching Routes</span>
              <span className="2xl:hidden">Switching</span>
            </button>

            <button
              onClick={() => onSelectTab('directory')}
              className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeTab === 'directory'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Directory</span>
            </button>
          </nav>

          {/* Right Actions - All shrink-0 and cleanly responsive so nothing gets cut off */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Java Backend Status Badge */}
            {javaBackendOnline !== null && (
              <a
                href="http://localhost:8080/api/health"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-colors border shrink-0 ${
                  javaBackendOnline
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title={`Java 21 REST Backend (${javaBackendOnline ? 'Online' : 'Offline'})`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${javaBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="hidden 2xl:inline">Java Backend {javaBackendOnline ? 'Online' : 'Offline'}</span>
                <span className="2xl:hidden text-[10px]">Java API</span>
              </a>
            )}

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-medium transition-colors border border-slate-200/50 shrink-0"
              title="Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Shortlist Curious List button */}
            <button
              onClick={onOpenShortlist}
              className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                shortlistCount > 0
                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200/80 border border-amber-300/80 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50'
              }`}
              title="Curious Shortlist"
            >
              <BookmarkCheck className={`w-3.5 h-3.5 shrink-0 ${shortlistCount > 0 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Shortlist</span>
              {shortlistCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Share / Export */}
            <button
              onClick={onOpenShareModal}
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200/50 transition-colors shrink-0"
              title="Share or Export"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* User Profile / Authentication */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200 shrink-0">
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold shrink-0"
                  title={`Logged in as ${user.username} (${user.roles.join(', ')})`}
                >
                  <span className="w-5 h-5 rounded-lg bg-brand-600 text-white text-[10px] flex items-center justify-center uppercase shrink-0">
                    {user.username.slice(0, 2)}
                  </span>
                  <span className="max-w-[70px] truncate hidden md:inline">{user.username}</span>
                  {user.roles.includes('ROLE_ADMIN') && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-600 text-white font-extrabold uppercase shrink-0">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs shadow-brand-500/20 shrink-0"
                title="Sign In / Register"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Responsive Navigation Tabs (Row 2 on screens below 1280px / Laptops) */}
        <div className="flex xl:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1.5 scrollbar-none">
          <button
            onClick={() => onSelectTab('explore')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'explore'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Branching Tree
          </button>
          <button
            onClick={() => onSelectTab('career-to-routes')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'career-to-routes'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Career to Routes
          </button>
          <button
            onClick={() => onSelectTab('switching')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'switching'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Switching Routes
          </button>
          <button
            onClick={() => onSelectTab('directory')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'directory'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Directory
          </button>
        </div>
      </div>
    </header>
  );
};
