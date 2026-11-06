import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Menu, X, Settings, Home, Mail } from 'lucide-react';

export default function Header({ 
  viewMode = 'home',
  onToggleAdmin, 
  onOpenConsulting, 
  onOpenNewsletter 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHero = viewMode === 'home' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || viewMode !== 'home'
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3 text-slate-800'
          : 'bg-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-judiaistudio-royalBlue text-white flex items-center justify-center shadow-lg shadow-judiaistudio-royalBlue/30 group-hover:scale-105 transition-transform border border-white/20">
              <Sparkles className="w-5 h-5 text-judiaistudio-gold" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                isDarkHero ? 'text-white' : 'text-judiaistudio-textMain'
              }`}>
                주디AI스튜디오
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase -mt-0.5 transition-colors ${
                isDarkHero ? 'text-slate-300' : 'text-judiaistudio-textSub'
              }`}>
                Judy AI Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          {viewMode === 'home' && (
            <nav className={`hidden md:flex items-center gap-7 text-sm font-medium transition-colors ${
              isDarkHero ? 'text-slate-200' : 'text-judiaistudio-textSub'
            }`}>
              <a href="#philosophy" className="hover:text-judiaistudio-royalBlue transition-colors">
                철학과 약속
              </a>
              <a href="#programs" className="hover:text-judiaistudio-royalBlue transition-colors">
                VOD & 코칭
              </a>
              <a href="#reviews" className="hover:text-judiaistudio-royalBlue transition-colors">
                수강생 후기
              </a>
              <a href="#free-guide" className="hover:text-judiaistudio-royalBlue transition-colors">
                무료 가이드
              </a>
              <a href="#faq" className="hover:text-judiaistudio-royalBlue transition-colors">
                자주 묻는 질문
              </a>
              <button
                onClick={onOpenNewsletter}
                className="hover:text-judiaistudio-royalBlue flex items-center gap-1 transition-colors text-amber-400 font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>뉴스레터 구독</span>
              </button>
            </nav>
          )}

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {viewMode === 'home' && (
              <button
                onClick={onOpenConsulting}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
                  scrolled
                    ? 'bg-judiaistudio-royalBlue text-white hover:bg-judiaistudio-royalBlueHover'
                    : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25'
                } hover:-translate-y-0.5 active:translate-y-0`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-judiaistudio-gold" />
                <span>1:1 상담 신청</span>
              </button>
            )}

            {/* ⭐ 상단 관리자 모드 토글 버튼 (가장 중요) */}
            <button
              onClick={onToggleAdmin}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm ${
                viewMode === 'admin'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20'
                  : isDarkHero
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 border-amber-300/40 backdrop-blur-sm'
                    : 'bg-slate-900 hover:bg-black text-amber-300 border-slate-800'
              } hover:scale-105 active:scale-95`}
              title="관리자 모드 / 고객 모드 전환"
            >
              {viewMode === 'admin' ? (
                <>
                  <Home className="w-3.5 h-3.5" />
                  <span>🏠 고객 모드</span>
                </>
              ) : (
                <>
                  <Settings className="w-3.5 h-3.5" />
                  <span>🛠️ 관리자 모드</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleAdmin}
              className="p-2 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold"
              title="관리자 전환"
            >
              {viewMode === 'admin' ? '🏠' : '🛠️'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkHero ? 'text-white' : 'text-slate-700'
              }`}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fadeIn text-white">
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            철학과 약속
          </a>
          <a
            href="#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            VOD & 코칭
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            수강생 후기
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenNewsletter(); }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:bg-slate-800 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>뉴스레터 무료 구독하기</span>
          </button>
          
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsulting();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-judiaistudio-royalBlue text-white font-semibold shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
              <span>1:1 상담 신청하기</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-amber-300 font-bold border border-slate-700"
            >
              <span>{viewMode === 'admin' ? '🏠 일반 고객 화면으로' : '🛠️ 관리자 대시보드로'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
