import React, { useState, useEffect } from 'react';
import { LevelId, ShortlistItem } from './types';
import { EDUCATION_LEVELS, COURSES, CAREERS, ENTRANCE_EXAMS } from './data/pathwayData';
import { getStoredShortlist, saveStoredShortlist } from './utils/storage';
import { apiService, UserProfile } from './services/apiService';
import { Navbar } from './components/Navbar';
import { LevelSelector } from './components/LevelSelector';
import { PathwayTree } from './components/PathwayTree';
import { CareerToRoutesView } from './components/CareerToRoutesView';
import { SwitchingRoutesView } from './components/SwitchingRoutesView';
import { DirectoryView } from './components/DirectoryView';
import { DetailDrawer } from './components/DetailDrawer';
import { ShortlistModal } from './components/ShortlistModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ShareModal } from './components/ShareModal';
import { AuthModal } from './components/AuthModal';
import {
  Compass,
  Layers,
  Shuffle,
  BookOpen,
  BookmarkCheck,
  ShieldAlert,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentLevelId, setCurrentLevelId] = useState<LevelId>('12th_pcm');
  const [activeTab, setActiveTab] = useState<'explore' | 'career-to-routes' | 'switching' | 'directory'>('explore');
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [selectedNode, setSelectedNode] = useState<{
    type: 'course' | 'career' | 'exam';
    id: string;
  } | null>(null);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(apiService.getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Modals
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    // Reload shortlist for newly authenticated user
    apiService.getShortlist().then(items => {
      setShortlist(items);
      saveStoredShortlist(items);
    });
  };

  const handleLogout = () => {
    apiService.logout();
    setCurrentUser(null);
    // Revert to local storage or guest shortlist
    const local = getStoredShortlist();
    setShortlist(local);
  };

  // Load initial shortlist & URL hash params on mount
  useEffect(() => {
    const saved = getStoredShortlist();
    if (saved && saved.length > 0) {
      setShortlist(saved);
    }

    // Synchronize with Java backend / MongoDB Atlas store
    apiService.getShortlist().then(backendItems => {
      if (backendItems && backendItems.length > 0) {
        setShortlist(backendItems);
        saveStoredShortlist(backendItems);
      }
    });

    // Parse URL hash if available (e.g. #level=12th_pcm&shortlist=...)
    try {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const params = new URLSearchParams(hash);
        const lvl = params.get('level') as LevelId;
        if (lvl && EDUCATION_LEVELS.some(l => l.id === lvl)) {
          setCurrentLevelId(lvl);
        }
        const encodedShortlist = params.get('shortlist');
        if (encodedShortlist) {
          const parsed = JSON.parse(atob(decodeURIComponent(encodedShortlist)));
          if (Array.isArray(parsed)) {
            // Restore items
            const restored: ShortlistItem[] = [];
            parsed.forEach((item: { id: string; type: string }) => {
              if (item.type === 'course') {
                const c = COURSES.find(x => x.id === item.id);
                if (c) restored.push({ id: c.id, type: 'course', title: c.code, subtitle: c.name, dateAdded: new Date().toISOString() });
              } else if (item.type === 'career') {
                const car = CAREERS.find(x => x.id === item.id);
                if (car) restored.push({ id: car.id, type: 'career', title: car.title, subtitle: car.domain, dateAdded: new Date().toISOString() });
              } else if (item.type === 'exam') {
                const ex = ENTRANCE_EXAMS.find(x => x.id === item.id);
                if (ex) restored.push({ id: ex.id, type: 'exam', title: ex.name, subtitle: ex.fullName, dateAdded: new Date().toISOString() });
              }
            });
            if (restored.length > 0) {
              setShortlist(restored);
              saveStoredShortlist(restored);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Could not parse hash params', e);
    }
  }, []);

  // Keyboard shortcut for Cmd/Ctrl + K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Shortlist management
  const handleToggleShortlist = (item: Omit<ShortlistItem, 'dateAdded'>) => {
    setShortlist(prev => {
      const exists = prev.some(s => s.id === item.id && s.type === item.type);
      let updated: ShortlistItem[];
      if (exists) {
        updated = prev.filter(s => !(s.id === item.id && s.type === item.type));
        apiService.deleteShortlistItemFromBackend(item.type, item.id);
      } else {
        const newItem: ShortlistItem = {
          ...item,
          dateAdded: new Date().toISOString()
        };
        updated = [...prev, newItem];
        apiService.syncShortlistItemToBackend(newItem);
      }
      saveStoredShortlist(updated);
      return updated;
    });
  };

  const handleRemoveShortlistItem = (id: string, type: string) => {
    apiService.deleteShortlistItemFromBackend(type, id);
    setShortlist(prev => {
      const updated = prev.filter(s => !(s.id === id && s.type === type));
      saveStoredShortlist(updated);
      return updated;
    });
  };

  const handleUpdateNotes = (id: string, type: string, notes: string) => {
    setShortlist(prev => {
      const updated = prev.map(s => {
        if (s.id === id && s.type === type) {
          const updatedItem = { ...s, userNotes: notes };
          apiService.syncShortlistItemToBackend(updatedItem);
          return updatedItem;
        }
        return s;
      });
      saveStoredShortlist(updated);
      return updated;
    });
  };

  const handleClearShortlist = () => {
    if (window.confirm('Are you sure you want to clear your shortlist?')) {
      setShortlist([]);
      saveStoredShortlist([]);
    }
  };

  const currentLevel = EDUCATION_LEVELS.find(l => l.id === currentLevelId) || EDUCATION_LEVELS[0];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden w-full max-w-full">
      {/* Top Navbar */}
      <Navbar
        currentLevel={currentLevel}
        onSelectLevel={setCurrentLevelId}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        shortlistCount={shortlist.length}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenShareModal={() => setIsShareOpen(true)}
        user={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Level Selector Banner (always present when on explore tab) */}
        {activeTab === 'explore' && (
          <LevelSelector
            currentLevel={currentLevel}
            onSelectLevel={setCurrentLevelId}
          />
        )}

        {/* Tab 1: Visual Branching Pathway Tree (F1, F2, F3) */}
        {activeTab === 'explore' && (
          <PathwayTree
            currentLevel={currentLevel}
            onSelectNode={(type, id) => setSelectedNode({ type, id })}
            shortlist={shortlist}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {/* Tab 2: Career-to-Routes Reverse Exploration (F4) */}
        {activeTab === 'career-to-routes' && (
          <CareerToRoutesView
            onSelectNode={(type, id) => setSelectedNode({ type, id })}
            shortlist={shortlist}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {/* Tab 3: Zero-Fear Switching Routes (F7) */}
        {activeTab === 'switching' && <SwitchingRoutesView />}

        {/* Tab 4: National Education & Career Directory (F6) */}
        {activeTab === 'directory' && (
          <DirectoryView
            onSelectNode={(type, id) => setSelectedNode({ type, id })}
            shortlist={shortlist}
            onToggleShortlist={handleToggleShortlist}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-slate-800 text-sm flex items-center justify-center md:justify-start gap-1.5">
              <Compass className="w-4 h-4 text-brand-600" />
              Education Pathway Explorer
            </div>
            <p className="text-slate-400 max-w-md">
              A student-first interactive map connecting courses, entrance exams, 21st-century careers, and switching paths across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span className="font-semibold text-slate-400">Official Portals:</span>
            <a href="https://jeemain.nta.nic.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 underline underline-offset-2">
              NTA JEE
            </a>
            <a href="https://cuetug.ntaonline.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 underline underline-offset-2">
              CUET-UG
            </a>
            <a href="https://www.uceed.iitb.ac.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 underline underline-offset-2">
              UCEED Design
            </a>
            <a href="https://upsc.gov.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 underline underline-offset-2">
              UPSC NDA
            </a>
            <a href="https://www.ncs.gov.in" target="_blank" rel="noreferrer" className="hover:text-brand-600 underline underline-offset-2">
              National Career Service
            </a>
          </div>
        </div>
      </footer>

      {/* Slide-over Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        selectedNode={selectedNode}
        onSelectNode={(type, id) => setSelectedNode({ type, id })}
        shortlist={shortlist}
        onToggleShortlist={handleToggleShortlist}
      />

      {/* Shortlist Curious Modal */}
      <ShortlistModal
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        shortlist={shortlist}
        onRemoveItem={handleRemoveShortlistItem}
        onUpdateNotes={handleUpdateNotes}
        onClearAll={handleClearShortlist}
        onSelectNode={(type, id) => setSelectedNode({ type, id })}
      />

      {/* Global Search Modal (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNode={(type, id) => setSelectedNode({ type, id })}
        onSelectSwitchingTab={() => setActiveTab('switching')}
      />

      {/* Share & Export Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        currentLevel={currentLevel}
        shortlist={shortlist}
      />

      {/* Authentication Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;
