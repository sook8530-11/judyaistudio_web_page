import React, { useState, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, Menu, X, Settings, Home, Mail, 
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
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-judiaistudio-royalBlue to-blue-500 flex items-center justify-center text-white shadow-md shadow-judiaistudio-royalBlue/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-judiaistudio-gold animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-black tracking-tight leading-none ${
                isDarkHero ? 'text-white' : 'text-judiaistudio-textMain'
              }`}>
                JUDY <span className="text-judiaistudio-royalBlue font-extrabold">AI</span> STUDIO
              </span>
              <span className={`text-[10px] font-mono tracking-widest uppercase mt-0.5 ${
                isDarkHero ? 'text-slate-300' : 'text-slate-500'
              }`}>
                Knowledge Business Lab
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          {viewMode === 'home' && (
            <nav className={`hidden lg:flex items-center gap-7 text-xs font-semibold ${
              isDarkHero ? 'text-white/80' : 'text-slate-600'
            }`}>
              <a href="#hero" className="hover:text-judiaistudio-royalBlue transition-colors">홈</a>
              <a href="#philosophy" className="hover:text-judiaistudio-royalBlue transition-colors">3대 철학</a>
              <a href="#programs" className="hover:text-judiaistudio-royalBlue transition-colors font-bold text-judiaistudio-royalBlue">
                프로그램 라인업
              </a>
              <a href="#reviews" className="hover:text-judiaistudio-royalBlue transition-colors">수강생 후기</a>
              <a href="#free-guide" className="hover:text-judiaistudio-royalBlue transition-colors">무료 가이드</a>
              <a href="#faq" className="hover:text-judiaistudio-royalBlue transition-colors">자주 묻는 질문</a>
              
              {/* 상단 뉴스레터 팝업 열기 버튼 */}
              <button
                type="button"
                onClick={onOpenNewsletter}
                className="hover:text-judiaistudio-royalBlue flex items-center gap-1 transition-colors text-amber-400 font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>뉴스레터 구독</span>
              </button>
            </nav>
          )}

          {/* Right Action Buttons: 관리자모드 대신 [로그인], [회원가입] 버튼 배치 */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* 1:1 상담 신청 버튼 */}
            {viewMode === 'home' && (
              <button
                type="button"
                onClick={onOpenConsulting}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                  scrolled
                    ? 'bg-judiaistudio-royalBlue text-white hover:bg-judiaistudio-royalBlueHover'
                    : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25'
                } hover:-translate-y-0.5 active:translate-y-0`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-judiaistudio-gold" />
                <span>1:1 상담 신청</span>
              </button>
            )}

            {/* ⭐ 로그인 & 회원가입 버튼 영역 (비로그인 상태) */}
            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
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
              /* 로그인 완료 상태: 사용자 정보 및 로그아웃 (관리자일 때만 관리자 모드 토글 노출) */
              <div className="flex items-center gap-2">
                
                {currentUser.role === 'admin' && (
                  <button
                    type="button"
                    onClick={onToggleAdmin}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm ${
                      viewMode === 'admin'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/20'
                        : isDarkHero
                          ? 'bg-slate-800/90 text-amber-300 border-amber-300/40'
                          : 'bg-slate-900 text-amber-300 border-slate-800'
                    }`}
                    title="관리자 대시보드 / 고객 홈 전환"
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
                )}

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                  isDarkHero ? 'bg-slate-900/60 border-slate-700/60 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <User className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span className="text-xs font-bold">{currentUser.name}님</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="ml-1 text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                    title="로그아웃"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Mobile Menu Button & Quick Login */}
          <div className="md:hidden flex items-center gap-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 rounded-lg bg-judiaistudio-royalBlue text-white text-xs font-bold"
              >
                로그인
              </button>
            ) : currentUser.role === 'admin' ? (
              <button
                type="button"
                onClick={onToggleAdmin}
                className="p-2 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold"
                title="관리자 전환"
              >
                {viewMode === 'admin' ? '🏠' : '🛠️'}
              </button>
            ) : null}

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
              3대 철학
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
                <span className="font-bold text-white">👋 {currentUser.name}님 접속 중</span>
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
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-judiaistudio-royalBlue text-white font-semibold shadow-md text-xs"
            >
              <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
              <span>1:1 상담 신청하기</span>
            </button>

            {currentUser?.role === 'admin' && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <span>{viewMode === 'admin' ? '🏠 일반 고객 화면으로' : '🛠️ 관리자 대시보드로'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
