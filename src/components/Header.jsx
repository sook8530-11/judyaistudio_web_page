import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Menu, X } from 'lucide-react';

export default function Header({ onOpenConsulting }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3 text-slate-800'
          : 'bg-transparent py-5 text-white'
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
                scrolled ? 'text-judiaistudio-textMain' : 'text-white'
              }`}>
                주디AI스튜디오
              </span>
              <span className={`text-[10px] font-mono tracking-wider uppercase -mt-0.5 transition-colors ${
                scrolled ? 'text-judiaistudio-textSub' : 'text-slate-300'
              }`}>
                Judy AI Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${
            scrolled ? 'text-judiaistudio-textSub' : 'text-slate-200'
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
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenConsulting}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all ${
                scrolled
                  ? 'bg-judiaistudio-royalBlue text-white hover:bg-judiaistudio-royalBlueHover shadow-judiaistudio-royalBlue/25'
                  : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 shadow-black/20'
              } hover:-translate-y-0.5 active:translate-y-0`}
            >
              <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
              <span>1:1 상담 신청</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'text-slate-700' : 'text-white'
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
          <a
            href="#free-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            무료 가이드
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            자주 묻는 질문
          </a>
          <div className="pt-2">
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
          </div>
        </div>
      )}
    </header>
  );
}
