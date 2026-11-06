import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { addSubscriber } from '../utils/storage';

export default function NewsletterModal({ isOpen, onClose, onSubscriberAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('모든 필수 정보를 입력해 주세요.');
      return;
    }

    addSubscriber(formData);
    setSubmitted(true);
    if (onSubscriberAdded) onSubscriberAdded();
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-judiaistudio-textMain">
              구독이 완료되었습니다! 🎉
            </h3>
            <p className="text-sm text-judiaistudio-textSub leading-relaxed">
              <strong>{formData.name}</strong> 님, 주디AI스튜디오의 최신 지식 비즈니스 인사이트와 시크릿 칼럼을 입력하신 이메일({formData.email})로 가장 먼저 전해드릴게요.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
              * 구독 해지는 언제든 뉴스레터 하단 링크를 통해 가능합니다.
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue text-white font-bold text-sm shadow-md hover:bg-judiaistudio-royalBlueHover transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-9">
            {/* 상단 타이틀 */}
            <div className="mb-6 space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue mx-auto flex items-center justify-center shadow-sm">
                <Mail className="w-6 h-6 text-judiaistudio-royalBlue" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-judiaistudio-goldLight text-judiaistudio-gold text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 fill-judiaistudio-gold" />
                WEEKLY INSIGHT REPORT
              </div>
              <h3 className="text-2xl font-extrabold text-judiaistudio-textMain">
                주디AI 시크릿 뉴스레터 구독
              </h3>
              <p className="text-xs text-judiaistudio-textSub leading-relaxed max-w-xs mx-auto">
                과장 없는 현장 AI 툴 활용법과 실제 수익화 사례를 매주 목요일 아침 이메일로 무료 배달해 드립니다.
              </p>
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  이메일 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-sm shadow-lg shadow-judiaistudio-royalBlue/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-judiaistudio-gold" />
                  <span>무료로 즉시 구독하기</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                * 스팸 없이 실질적인 지식 비즈니스 인사이트만 보내드립니다.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

