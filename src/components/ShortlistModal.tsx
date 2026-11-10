import React, { useState } from 'react';
import { ShortlistItem } from '../types';
import { exportShortlistAsMarkdown } from '../utils/storage';
import {
  X,
  BookmarkCheck,
  GraduationCap,
  Briefcase,
  BookOpen,
  Trash2,
  Copy,
  Check,
  Download,
  Share2,
  FileText,
  Edit3,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ShortlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortlist: ShortlistItem[];
  onRemoveItem: (id: string, type: string) => void;
  onUpdateNotes: (id: string, type: string, notes: string) => void;
  onClearAll: () => void;
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
}

export const ShortlistModal: React.FC<ShortlistModalProps> = ({
  isOpen,
  onClose,
  shortlist,
  onRemoveItem,
  onUpdateNotes,
  onClearAll,
  onSelectNode
}) => {
  const [copied, setCopied] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const courses = shortlist.filter(i => i.type === 'course');
  const careers = shortlist.filter(i => i.type === 'career');
  const exams = shortlist.filter(i => i.type === 'exam');

  const handleCopyMarkdown = () => {
    const md = exportShortlistAsMarkdown(shortlist);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShareLink = () => {
    const jsonStr = JSON.stringify(shortlist.map(s => ({ id: s.id, type: s.type })));
    const encoded = encodeURIComponent(btoa(jsonStr));
    const shareUrl = `${window.location.origin}${window.location.pathname}#shortlist=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 2000);
  };

  const handleDownload = () => {
    const md = exportShortlistAsMarkdown(shortlist);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Education-Pathway-Shortlist-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startEditNote = (item: ShortlistItem) => {
    setEditingId(`${item.type}_${item.id}`);
    setNoteText(item.userNotes || '');
  };

  const saveNote = (item: ShortlistItem) => {
    onUpdateNotes(item.id, item.type, noteText);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-3xl bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all relative border border-slate-200">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-amber-500/10 via-brand-50 to-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 shadow-sm">
                <BookmarkCheck className="w-5 h-5 fill-amber-500 text-amber-600" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  My Curious Shortlist
                </h3>
                <p className="text-xs text-slate-500">
                  {shortlist.length} saved options &bull; Review, annotate, or share with parents & counsellors.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar */}
          {shortlist.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {shareLinkCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download .md</span>
                </button>
              </div>

              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
              >
                Clear Shortlist
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {shortlist.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/50">
                  <BookmarkCheck className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your Shortlist is Empty</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse the Pathway Tree, Career-to-Routes, or Directory and click the "Mark Curious" bookmark icon on any option you want to evaluate.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* CAREERS SECTION */}
                {careers.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Curious Careers ({careers.length})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {careers.map(item => (
                        <div
                          key={`${item.type}_${item.id}`}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              onClick={() => {
                                onSelectNode(item.type, item.id);
                                onClose();
                              }}
                              className="cursor-pointer flex-1"
                            >
                              <div className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-slate-500">{item.subtitle}</div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEditNote(item)}
                                className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Add personal note"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => onRemoveItem(item.id, item.type)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Notes view/edit */}
                          {editingId === `${item.type}_${item.id}` ? (
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <input
                                type="text"
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                placeholder="Add note (e.g. Discuss with mentor, check cutoff)..."
                                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                              <button
                                onClick={() => saveNote(item)}
                                className="px-3 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : item.userNotes ? (
                            <div className="text-xs text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/50">
                              <span className="font-semibold text-amber-900">Note: </span>
                              {item.userNotes}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COURSES SECTION */}
                {courses.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Curious Degree Programs ({courses.length})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {courses.map(item => (
                        <div
                          key={`${item.type}_${item.id}`}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-brand-300 transition-all flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              onClick={() => {
                                onSelectNode(item.type, item.id);
                                onClose();
                              }}
                              className="cursor-pointer flex-1"
                            >
                              <div className="font-bold text-sm text-slate-900 hover:text-brand-700 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-slate-500">{item.subtitle}</div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEditNote(item)}
                                className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Add personal note"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => onRemoveItem(item.id, item.type)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {editingId === `${item.type}_${item.id}` ? (
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <input
                                type="text"
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                placeholder="Add note..."
                                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                              <button
                                onClick={() => saveNote(item)}
                                className="px-3 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : item.userNotes ? (
                            <div className="text-xs text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/50">
                              <span className="font-semibold text-amber-900">Note: </span>
                              {item.userNotes}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EXAMS SECTION */}
                {exams.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Entrance Exams on Radar ({exams.length})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {exams.map(item => (
                        <div
                          key={`${item.type}_${item.id}`}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 transition-all flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              onClick={() => {
                                onSelectNode(item.type, item.id);
                                onClose();
                              }}
                              className="cursor-pointer flex-1"
                            >
                              <div className="font-bold text-sm text-slate-900 hover:text-purple-700 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-slate-500">{item.subtitle}</div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEditNote(item)}
                                className="p-1.5 text-slate-400 hover:text-brand-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Add personal note"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => onRemoveItem(item.id, item.type)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {editingId === `${item.type}_${item.id}` ? (
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <input
                                type="text"
                                value={noteText}
                                onChange={e => setNoteText(e.target.value)}
                                placeholder="Add note..."
                                className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                              />
                              <button
                                onClick={() => saveNote(item)}
                                className="px-3 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700"
                              >
                                Save
                              </button>
                            </div>
                          ) : item.userNotes ? (
                            <div className="text-xs text-slate-600 bg-amber-50/70 p-2 rounded-xl border border-amber-200/50">
                              <span className="font-semibold text-amber-900">Note: </span>
                              {item.userNotes}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
