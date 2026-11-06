import React, { useState } from 'react';
import { 
  X, BookOpen, Printer, Download, Sparkles, Check, 
  ChevronRight, ArrowLeft, Bookmark, Share2, Copy 
} from 'lucide-react';
import { GUIDEBOOK_DATA } from '../data/guidebookData';

export default function GuidebookViewerModal({ isOpen, onClose }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const currentChapter = GUIDEBOOK_DATA.chapters[activeChapterIndex];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 툴바 헤더 */}
        <header className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-judiaistudio-gold flex items-center justify-center text-slate-950 shadow">
              <BookOpen className="w-4 h-4 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-600/40 text-blue-300 border border-blue-500/30">
                  {GUIDEBOOK_DATA.edition}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-white truncate max-w-md">
                {GUIDEBOOK_DATA.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700"
              title="브라우저 인쇄를 통해 PDF로 저장할 수 있습니다"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">PDF 인쇄/저장</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 메인 뷰어 바디 (좌측 챕터 네비게이션 + 우측 리딩 본문) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
          
          {/* 좌측 챕터 목차 사이드바 */}
          <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 overflow-y-auto flex-shrink-0 space-y-1.5 max-h-48 md:max-h-full">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              목차 (TABLE OF CONTENTS)
            </div>

            {GUIDEBOOK_DATA.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-start gap-2.5 ${
                  activeChapterIndex === idx
                    ? 'bg-judiaistudio-royalBlue text-white shadow-md shadow-judiaistudio-royalBlue/20 scale-[1.02]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={`text-[10px] font-mono mt-0.5 ${activeChapterIndex === idx ? 'text-amber-300' : 'text-slate-400'}`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{ch.title}</div>
                  <div className={`text-[10px] truncate mt-0.5 ${activeChapterIndex === idx ? 'text-blue-100' : 'text-slate-400'}`}>
                    {ch.number}
                  </div>
                </div>
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 p-2 leading-relaxed">
              💡 <strong>저자 안내:</strong> 주디AI스튜디오 대표 주디가 수강생들과 1:1 코칭을 진행하며 검증한 실전 가이드입니다.
            </div>
          </aside>

          {/* 우측 리딩 본문 뷰어 */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white">
            <article className="max-w-2xl mx-auto space-y-8 print:p-0">
              
              {/* 챕터 헤더 */}
              <div className="border-b border-slate-200 pb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-judiaistudio-royalBlue text-xs font-mono font-bold">
                  <Bookmark className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span>{currentChapter.number}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                  {currentChapter.title}
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  {currentChapter.summary}
                </p>
              </div>

              {/* 챕터 본문 (마크다운 스타일 렌더링) */}
              <div className="text-sm leading-relaxed text-slate-800 space-y-5 font-sans">
                {currentChapter.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // H3 제목
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={pIdx} className="text-lg font-black text-slate-900 pt-4 border-l-4 border-judiaistudio-royalBlue pl-3">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }

                  // H4 제목
                  if (trimmed.startsWith('#### ')) {
                    return (
                      <h4 key={pIdx} className="text-base font-bold text-slate-900 pt-2 text-judiaistudio-royalBlue">
                        {trimmed.replace('#### ', '')}
                      </h4>
                    );
                  }

                  // 코드 블록 또는 프롬프트 박스
                  if (trimmed.startsWith('```')) {
                    const codeText = trimmed.replace(/```[a-z]*\n?/g, '').trim();
                    return (
                      <div key={pIdx} className="relative my-4 rounded-2xl bg-slate-900 text-slate-100 p-5 font-mono text-xs overflow-x-auto shadow-md">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                          <span>실전 AI 프롬프트 템플릿</span>
                          <button
                            onClick={() => handleCopyText(codeText)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-sans font-bold transition-colors"
                          >
                            {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedPrompt ? '복사 완료!' : '프롬프트 복사'}</span>
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap leading-relaxed">{codeText}</pre>
                      </div>
                    );
                  }

                  // 인용구 / 조언 블록
                  if (trimmed.startsWith('> ')) {
                    return (
                      <div key={pIdx} className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm leading-relaxed">
                        {trimmed.replace('> ', '')}
                      </div>
                    );
                  }

                  // 일반 본문 문단
                  return (
                    <p key={pIdx} className="leading-relaxed whitespace-pre-line text-slate-700">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* 하단 챕터 이동 네비게이션 */}
              <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ◀ 이전 챕터
                </button>

                <span className="text-xs font-mono text-slate-400">
                  {activeChapterIndex + 1} / {GUIDEBOOK_DATA.chapters.length}
                </span>

                <button
                  disabled={activeChapterIndex === GUIDEBOOK_DATA.chapters.length - 1}
                  onClick={() => setActiveChapterIndex(prev => Math.min(GUIDEBOOK_DATA.chapters.length - 1, prev + 1))}
                  className="px-4 py-2.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white text-xs font-bold shadow-md disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  다음 챕터 ▶
                </button>
              </div>

            </article>
          </main>

        </div>
      </div>
    </div>
  );
}

