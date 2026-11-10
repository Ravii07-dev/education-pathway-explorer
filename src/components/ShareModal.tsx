import React, { useState } from 'react';
import { ShortlistItem, EducationLevel } from '../types';
import { exportShortlistAsMarkdown } from '../utils/storage';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Link2
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: EducationLevel;
  shortlist: ShortlistItem[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  shortlist
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const jsonStr = JSON.stringify(shortlist.map(s => ({ id: s.id, type: s.type })));
    const encoded = encodeURIComponent(btoa(jsonStr));
    const url = `${window.location.origin}${window.location.pathname}#level=${currentLevel.id}&shortlist=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySummary = () => {
    const md = exportShortlistAsMarkdown(shortlist);
    navigator.clipboard.writeText(md);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-md bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all relative border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Share2 className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">Share or Export</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Share this personalized pathway session with your parents, teachers, or friends to discuss your next educational moves.
          </p>

          <div className="space-y-2.5">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-all text-xs font-semibold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <Link2 className="w-4 h-4 text-brand-600" />
                <span>Shareable Link with Saved State</span>
              </div>
              {copiedLink ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <span className="text-slate-400 group-hover:text-brand-600">Copy</span>
              )}
            </button>

            {/* Copy Text Summary */}
            <button
              onClick={handleCopySummary}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-all text-xs font-semibold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <Copy className="w-4 h-4 text-purple-600" />
                <span>Copy Shortlist as Formatted Text</span>
              </div>
              {copiedSummary ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <span className="text-slate-400 group-hover:text-purple-600">Copy</span>
              )}
            </button>

            {/* Print Friendly */}
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition-all text-xs font-semibold text-slate-800 group"
            >
              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Print or Save to PDF</span>
              </div>
              <span className="text-slate-400 group-hover:text-emerald-600">Print</span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
            Current Stage: <strong className="text-slate-700">{currentLevel.name}</strong> &bull; {shortlist.length} item(s) in shortlist.
          </div>
        </div>
      </div>
    </div>
  );
};
