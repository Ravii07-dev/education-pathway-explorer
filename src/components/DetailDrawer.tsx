import React from 'react';
import { Course, Career, EntranceExam, ShortlistItem } from '../types';
import { COURSES, CAREERS, ENTRANCE_EXAMS } from '../data/pathwayData';
import {
  X,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  GraduationCap,
  Briefcase,
  BookOpen,
  IndianRupee,
  Clock,
  Compass,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  FileText,
  AlertCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: {
    type: 'course' | 'career' | 'exam';
    id: string;
  } | null;
  onSelectNode: (type: 'course' | 'career' | 'exam', id: string) => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: Omit<ShortlistItem, 'dateAdded'>) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  isOpen,
  onClose,
  selectedNode,
  onSelectNode,
  shortlist,
  onToggleShortlist
}) => {
  if (!isOpen || !selectedNode) return null;

  const isShortlisted = shortlist.some(
    s => s.id === selectedNode.id && s.type === selectedNode.type
  );

  let course: Course | undefined;
  let career: Career | undefined;
  let exam: EntranceExam | undefined;

  if (selectedNode.type === 'course') {
    course = COURSES.find(c => c.id === selectedNode.id);
  } else if (selectedNode.type === 'career') {
    career = CAREERS.find(c => c.id === selectedNode.id);
  } else if (selectedNode.type === 'exam') {
    exam = ENTRANCE_EXAMS.find(e => e.id === selectedNode.id);
  }

  const handleToggle = () => {
    if (course) {
      onToggleShortlist({
        id: course.id,
        type: 'course',
        title: course.code,
        subtitle: course.name,
        domain: course.domains[0]
      });
    } else if (career) {
      onToggleShortlist({
        id: career.id,
        type: 'career',
        title: career.title,
        subtitle: career.domain,
        domain: career.domain
      });
    } else if (exam) {
      onToggleShortlist({
        id: exam.id,
        type: 'exam',
        title: exam.name,
        subtitle: exam.fullName
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col transform transition-all duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
                  selectedNode.type === 'course'
                    ? 'bg-blue-100 text-blue-700'
                    : selectedNode.type === 'career'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {selectedNode.type === 'course' && <GraduationCap className="w-3.5 h-3.5" />}
                {selectedNode.type === 'career' && <Briefcase className="w-3.5 h-3.5" />}
                {selectedNode.type === 'exam' && <BookOpen className="w-3.5 h-3.5" />}
                {selectedNode.type} Details
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isShortlisted
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title={isShortlisted ? 'Saved in shortlist' : 'Add to Curious List'}
              >
                {isShortlisted ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Curious (Saved)</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-500" />
                    <span>Mark Curious</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* COURSE VIEW */}
            {course && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
                    {course.degreeType} &bull; {course.duration}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                    {course.name}
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                      <Clock className="w-3.5 h-3.5 text-brand-500" />
                      Duration
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{course.duration}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                      <Compass className="w-3.5 h-3.5 text-emerald-500" />
                      Domain
                    </div>
                    <div className="text-sm font-semibold text-slate-800 truncate">
                      {course.domains.join(', ')}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                      <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
                      Govt / Subsidized Fee
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{course.costRangeGovt}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                      <IndianRupee className="w-3.5 h-3.5 text-purple-500" />
                      Private College Fee
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{course.costRangePrivate}</div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                        Eligibility Criteria
                      </h4>
                      <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        {course.eligibility}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Entrance Exams Required */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    Entrance Exams for Admission
                  </h3>
                  <div className="space-y-2">
                    {course.examIds.map(eid => {
                      const examObj = ENTRANCE_EXAMS.find(e => e.id === eid);
                      if (!examObj) return null;
                      return (
                        <div
                          key={eid}
                          onClick={() => onSelectNode('exam', eid)}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/40 cursor-pointer transition-all group"
                        >
                          <div>
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-700">
                              {examObj.name}
                            </div>
                            <div className="text-xs text-slate-500">{examObj.fullName}</div>
                          </div>
                          <span className="text-xs font-medium text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                            Details <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Careers Unlocked */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    Direct Careers Unlocked ({course.careerIds.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.careerIds.map(cid => {
                      const careerObj = CAREERS.find(c => c.id === cid);
                      if (!careerObj) return null;
                      return (
                        <button
                          key={cid}
                          onClick={() => onSelectNode('career', cid)}
                          className="text-left p-3 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group"
                        >
                          <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                            {careerObj.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            {careerObj.salaryEntry}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Key Core Subjects & Practical Exposure
                  </h3>
                  <ul className="space-y-1.5">
                    {course.curriculumHighlights.map((curr, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 mt-0.5 shrink-0" />
                        <span>{curr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Further Study Options */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    Higher Study & Master's Options
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {course.furtherStudies.map((fs, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium"
                      >
                        {fs}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CAREER VIEW */}
            {career && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                      {career.domain}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <Sparkles className="w-3 h-3" />
                      {career.growthOutlook} Growth
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                    {career.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {career.shortDesc}
                  </p>
                </div>

                {/* Salary Snapshot */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <div className="text-xs text-emerald-700 font-medium mb-1">
                      Starting Salary (0-2 Yrs)
                    </div>
                    <div className="text-base font-bold text-emerald-900">{career.salaryEntry}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                    <div className="text-xs text-blue-700 font-medium mb-1">
                      Experienced (5-8+ Yrs)
                    </div>
                    <div className="text-base font-bold text-blue-900">{career.salaryMid}</div>
                  </div>
                </div>

                {/* Why It's Growing */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
                    Market Growth Outlook
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {career.growthReason}
                  </p>
                </div>

                {/* Day-to-Day Responsibilities */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-600" />
                    What This Person Does Day-to-Day
                  </h3>
                  <ul className="space-y-2">
                    {career.dayToDay.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <span className="w-4 h-4 rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Needed */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Key Technical & Professional Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {career.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education Routes Leading To It */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-purple-600" />
                    Education Routes That Lead To This Career ({career.routes.length})
                  </h3>
                  <div className="space-y-3">
                    {career.routes.map((rt, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-800">{rt.title}</span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              rt.type === 'Direct / Traditional'
                                ? 'bg-blue-100 text-blue-700'
                                : rt.type === 'Alternative Route'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {rt.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                          {rt.description}
                        </p>
                        <div className="text-[11px] text-slate-500 space-y-1 bg-white p-2.5 rounded-lg border border-slate-100">
                          <div>
                            <span className="font-semibold text-slate-700">Duration:</span> {rt.typicalDuration}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-700">Prep / Exams:</span>{' '}
                            {rt.requiredExamsOrPrep}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relevant Qualifying Degrees */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Undergraduate Degrees That Qualify
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {career.courseIds.map(cid => {
                      const cObj = COURSES.find(c => c.id === cid);
                      if (!cObj) return null;
                      return (
                        <button
                          key={cid}
                          onClick={() => onSelectNode('course', cid)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-colors flex items-center gap-1"
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          {cObj.code}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* EXAM VIEW */}
            {exam && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
                    {exam.conductingBody} &bull; Difficulty: {exam.difficulty}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                    {exam.name}
                  </h2>
                  <div className="text-sm font-medium text-slate-700 mt-1">
                    {exam.fullName}
                  </div>
                </div>

                {/* Key Exam Facts */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium mb-1">Frequency</div>
                    <div className="text-xs font-semibold text-slate-800">{exam.frequency}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium mb-1">Exam Months</div>
                    <div className="text-xs font-semibold text-slate-800">{exam.examMonths}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium mb-1">Applications Open</div>
                    <div className="text-xs font-semibold text-slate-800">{exam.applicationMonths}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium mb-1">Conducting Body</div>
                    <div className="text-xs font-semibold text-slate-800">{exam.conductingBody}</div>
                  </div>
                </div>

                {/* Exam Pattern */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-600" />
                    Exam Pattern & Format
                  </h3>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                    {exam.patternSummary}
                  </div>
                </div>

                {/* Preparation Tips */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-900 uppercase tracking-wide">
                        Preparation Strategy & Pro Tips
                      </h4>
                      <p className="text-xs text-brand-800 mt-1 leading-relaxed">
                        {exam.keyTips}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Degrees Unlocked */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    Courses Admitted Via This Exam
                  </h3>
                  <div className="space-y-2">
                    {exam.unlockedCourseIds.map(cid => {
                      const cObj = COURSES.find(c => c.id === cid);
                      if (!cObj) return null;
                      return (
                        <div
                          key={cid}
                          onClick={() => onSelectNode('course', cid)}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/40 cursor-pointer transition-all group"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-brand-700">
                              {cObj.code}
                            </div>
                            <div className="text-xs text-slate-500">{cObj.name}</div>
                          </div>
                          <span className="text-xs font-medium text-brand-600 flex items-center gap-1">
                            Explore <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Official Website Link */}
                <div className="pt-2">
                  <a
                    href={exam.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 text-white font-medium text-xs hover:bg-brand-700 shadow-sm transition-colors"
                  >
                    <span>Visit Official Exam Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Always refer to the official conducting body website for dates and syllabus notifications.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
