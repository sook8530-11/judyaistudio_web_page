import React, { useState, useEffect } from 'react';
import { 
  X, LogIn, UserPlus, Mail, Lock, User, Phone, CheckCircle2, 
  Sparkles, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { authenticateUser, registerUser } from '../utils/storage';

export default function AuthModal({ isOpen, initialTab = 'login', onClose, onLoginSuccess }) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'signup'
  
  // 로그인 폼 상태
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginError, setLoginError] = useState('');

  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: true
  });
  const [signupError, setSignupError] = useState('');

  useEffect(() => {
    setTab(initialTab);
    setLoginError('');
    setSignupError('');
  }, [initialTab, isOpen]);

  // ESC 키 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 1. 로그인 제출 핸들러
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const user = authenticateUser(loginId, loginPw);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setLoginError(err.message || '로그인에 실패했습니다.');
    }
  };

  // 2. 회원가입 제출 핸들러
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');

    if (signupForm.password !== signupForm.passwordConfirm) {
      setSignupError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (signupForm.password.length < 4) {
      setSignupError('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }
    if (!signupForm.agreeTerms) {
      setSignupError('이용약관 및 개인정보 수집에 동의해 주세요.');
      return;
    }

    try {
      const newUser = registerUser({
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password
      });

      alert(`🎉 ${newUser.name}님, 주디AI스튜디오 회원가입이 완료되었습니다!\n웰컴 10% 할인 쿠폰이 발급되었습니다.`);
      onLoginSuccess(newUser);
      onClose();
    } catch (err) {
      setSignupError(err.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  // 3. 소셜 원클릭 간편 로그인 체험
  const handleSocialQuickLogin = (provider) => {
    const socialUser = {
      id: `user-${provider}-${Date.now().toString().slice(-4)}`,
      name: provider === 'kakao' ? '카카오 수강생' : provider === 'naver' ? '네이버 수강생' : '구글 수강생',
      email: `${provider}_user@example.com`,
      role: 'student'
    };
    onLoginSuccess(socialUser);
    onClose();
  };

  // 4. 빠른 관리자 계정 채우기
  const fillAdminAccount = () => {
    setLoginId('admin');
    setLoginPw('judy1234');
    setLoginError('');
  };

  // 5. 빠른 수강생 계정 채우기
  const fillStudentAccount = () => {
    setLoginId('student');
    setLoginPw('1234');
    setLoginError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6 animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="닫기 (ESC)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 로고 & 모달 타이틀 */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-judiaistudio-gold text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            JUDY AI STUDIO
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {tab === 'login' ? '수강생 로그인' : '무료 회원가입'}
          </h3>
          <p className="text-xs text-slate-400">
            {tab === 'login' 
              ? '강의 수강, 코칭 일정 예약, 맞춤 학습 자료를 확인하세요.' 
              : '지금 가입하고 AI 지식 비즈니스 실전 리포트를 무료로 받아보세요.'}
          </p>
        </div>

        {/* 탭 전환 버튼: [로그인] vs [회원가입] */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab('login'); setLoginError(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              tab === 'login'
                ? 'bg-judiaistudio-royalBlue text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>로그인</span>
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setSignupError(''); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              tab === 'signup'
                ? 'bg-judiaistudio-royalBlue text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>회원가입</span>
          </button>
        </div>

        {/* ===================== TAB 1: 로그인 ===================== */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">이메일 또는 아이디</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="이메일 또는 admin 입력"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">비밀번호</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="비밀번호 입력"
                    value={loginPw}
                    onChange={(e) => setLoginPw(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-judiaistudio-royalBlue/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>로그인하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 빠른 체험 로그인 버튼 (원클릭) */}
            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 text-center">
                ⚡ 빠른 테스트 계정 자동 입력
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={fillStudentAccount}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-center border border-slate-700 text-[11px]"
                >
                  🎓 수강생 체험 (student)
                </button>
                <button
                  type="button"
                  onClick={fillAdminAccount}
                  className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-center border border-amber-500/30 text-[11px]"
                >
                  🛠️ 관리자 체험 (admin)
                </button>
              </div>
            </div>

            {/* 간편 소셜 로그인 */}
            <div className="space-y-2 pt-2">
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                <span className="relative bg-slate-900 px-3 text-[11px] text-slate-500 font-medium">SNS 1초 간편 로그인</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleSocialQuickLogin('kakao')}
                  className="py-2.5 px-3 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>카카오로 시작</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialQuickLogin('google')}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all border border-slate-200"
                >
                  <span>Google로 시작</span>
                </button>
              </div>
            </div>

          </form>
        )}

        {/* ===================== TAB 2: 회원가입 ===================== */}
        {tab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  이름 (실명) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  이메일 주소 (아이디) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">휴대폰 번호 (선택)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={signupForm.phone}
                    onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">비밀번호</label>
                  <input
                    type="password"
                    required
                    placeholder="4자 이상"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">비밀번호 확인</label>
                  <input
                    type="password"
                    required
                    placeholder="비밀번호 재입력"
                    value={signupForm.passwordConfirm}
                    onChange={(e) => setSignupForm({ ...signupForm, passwordConfirm: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 혜택 안내 배너 */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>신규 회원 가입 즉시 웰컴 10% 수강 할인 쿠폰 자동 지급</span>
            </div>

            {signupError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-xs text-red-300">
                {signupError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>무료 회원가입 완료</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
