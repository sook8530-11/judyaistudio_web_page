import React, { useState, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, Menu, X, Mail, 
  LogIn, UserPlus, LogOut, User 
} from 'lucide-react';

export default function Header({ 
  viewMode = 'home',
  currentUser = null,
  onOpenAuth,
  onLogout,
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
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-judiaistudio-royalBlue to-blue-500 flex items-center justify-center text-white shadow-md shadow-judiaistudio-royalBlue/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-judiaistudio-gold animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black tracking-tight leading-none whitespace-nowrap ${
                isDarkHero ? 'text-white' : 'text-judiaistudio-textMain'
              }`}>
                JUDY <span className="text-judiaistudio-royalBlue font-extrabold">AI</span> STUDIO
              </span>
              <span className={`text-[10px] font-mono tracking-widest uppercase mt-0.5 whitespace-nowrap ${
                isDarkHero ? 'text-slate-300' : 'text-slate-500'
              }`}>
                Knowledge Business Lab
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          {viewMode === 'home' && (
            <nav className={`hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs font-semibold ${
              isDarkHero ? 'text-white/80' : 'text-slate-600'
            }`}>
              <a href="#philosophy" className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue transition-colors">주디의 철학</a>
              <a href="#portfolio" className="whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors font-bold text-amber-300 flex items-center gap-1">
                <span>작품 & 수상실적</span>
              </a>
              <a href="#programs" className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue transition-colors font-bold text-judiaistudio-royalBlue">
                프로그램
              </a>
              <a href="#reviews" className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue transition-colors">수강생 후기</a>
              <a href="#free-guide" className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue transition-colors">무료 가이드</a>
              <a href="#faq" className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue transition-colors">자주 묻는 질문</a>
              
              {/* 상단 뉴스레터 팝업 열기 버튼 */}
              <button
                type="button"
                onClick={onOpenNewsletter}
                className="whitespace-nowrap shrink-0 hover:text-judiaistudio-royalBlue flex items-center gap-1 transition-colors text-amber-400 font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>뉴스레터</span>
              </button>
            </nav>
          )}

          {/* Right Action Buttons: 교육상담 및 계정 영역 */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            
            {/* 교육상담신청 버튼 */}
            {viewMode === 'home' && (
              <button
                type="button"
                onClick={onOpenConsulting}
                className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                  scrolled
                    ? 'bg-judiaistudio-royalBlue text-white hover:bg-judiaistudio-royalBlueHover'
                    : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25'
                } hover:-translate-y-0.5 active:translate-y-0`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-judiaistudio-gold" />
                <span>교육상담신청</span>
              </button>
            )}

            {/* 로그인 & 회원가입 버튼 영역 (비로그인 상태) */}
            {!currentUser ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isDarkHero
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:text-judiaistudio-royalBlue hover:bg-slate-100'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>로그인</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isDarkHero
                      ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md'
                      : 'bg-slate-900 hover:bg-black text-white'
                  } hover:-translate-y-0.5 active:translate-y-0`}
                >
                  <UserPlus className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span>회원가입</span>
                </button>
              </div>
            ) : (
              /* 로그인 완료 상태: 상용 사이트 기준의 깔끔한 사용자 뱃지 및 로그아웃 (관리자 모드는 헤더에 절대 노출하지 않음) */
              <div className="flex items-center gap-2 shrink-0">
                <div className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  isDarkHero ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <User className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span className="text-xs font-semibold">
                    {currentUser.name ? currentUser.name.replace(' (관리자)', '').replace(' 대표', '') : '회원'}님
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className={`ml-2 pl-2 border-l text-[11px] transition-colors flex items-center gap-1 ${
                      isDarkHero ? 'border-white/20 text-white/70 hover:text-red-300' : 'border-slate-300 text-slate-500 hover:text-red-500'
                    }`}
                    title="로그아웃"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Mobile Menu Button & Quick Login/Logout */}
          <div className="md:hidden flex items-center gap-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-lg bg-judiaistudio-royalBlue text-white text-xs font-bold"
              >
                로그인
              </button>
            ) : (
              <button
                type="button"
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-medium"
              >
                로그아웃
              </button>
            )}

            <button
              type="button"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-6 py-6 animate-fadeIn text-white">
          <nav className="flex flex-col gap-4 text-sm font-semibold">
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1"
            >
              홈
            </a>
            <a 
              href="#philosophy" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1"
            >
              주디의 철학과 약속
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 py-1 text-amber-400 font-bold"
            >
              영화제 수상 & 작품 실적
            </a>
            <a 
              href="#programs" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1 font-bold text-judiaistudio-royalBlue"
            >
              실전 프로그램 라인업
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1"
            >
              수강생 후기
            </a>
            <a 
              href="#free-guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1"
            >
              무료 가이드북
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-judiaistudio-royalBlue py-1"
            >
              자주 묻는 질문
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewsletter();
              }}
              className="hover:text-amber-300 py-1 text-left flex items-center gap-1.5 text-amber-400 font-bold"
            >
              <Mail className="w-4 h-4" />
              <span>뉴스레터 구독 신청</span>
            </button>
          </nav>

          {/* 모바일 하단 액션 버튼 그룹 */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>로그인</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="py-3 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span>회원가입</span>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  👋 {currentUser.name ? currentUser.name.replace(' (관리자)', '').replace(' 대표', '') : '회원'}님
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-red-400 hover:underline text-xs"
                >
                  로그아웃
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsulting();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-judiaistudio-royalBlue text-white font-bold shadow-md text-xs"
            >
              <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
              <span>교육상담신청하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
