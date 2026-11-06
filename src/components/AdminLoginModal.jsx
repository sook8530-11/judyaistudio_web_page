import React, { useState } from 'react';
import { Lock, KeyRound, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // 기본 관리자 비밀번호: judy1234
    if (password === 'judy1234' || password === '1234') {
      setErrorMsg('');
      setPassword('');
      onSuccess();
    } else {
      setErrorMsg('비밀번호가 올바르지 않습니다. (초기 비밀번호: judy1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-sm p-6 sm:p-7 shadow-2xl space-y-5 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 상단 아이콘 및 안내 */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">관리자 전용 인증</h3>
          <p className="text-xs text-slate-400">
            수강생 접근 방지를 위해 관리자 인증 후 대시보드가 열립니다.
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              관리자 비밀번호
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                autoFocus
                placeholder="비밀번호 입력 (초기: judy1234)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
              />
            </div>
            {errorMsg ? (
              <p className="text-[11px] text-red-400 mt-1.5 font-medium">{errorMsg}</p>
            ) : (
              <p className="text-[10px] text-slate-500 mt-1.5">
                💡 초기 기본 비밀번호는 <span className="font-mono text-amber-300">judy1234</span> 입니다.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-judiaistudio-royalBlue/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>관리자 모드 접속하기</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            일반 수강생 화면으로 돌아가기
          </button>
        </div>

      </div>
    </div>
  );
}
