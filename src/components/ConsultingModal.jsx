import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';

export default function ConsultingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '직장인 부업 준비',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: '직장인 부업 준비',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 닫기 버튼 */}
        <button
          onClick={handleResetAndClose}
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
              상담 요청이 잘 접수되었습니다!
            </h3>
            <p className="text-sm text-judiaistudio-textSub leading-relaxed">
              남겨주신 소중한 고민을 주디 대표가 직접 꼼꼼히 확인한 후, <br />
              <strong>24시간 이내</strong>에 입력하신 연락처({formData.phone || formData.email})로 직접 연락드리겠습니다.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 text-left space-y-1">
              <div>• <strong>신청자:</strong> {formData.name} 님</div>
              <div>• <strong>관심 분야:</strong> {formData.category}</div>
              <div>• <strong>남겨주신 메시지:</strong> "{formData.message || '상담받고 싶어요^^'}"</div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue text-white font-bold text-sm shadow-md hover:bg-judiaistudio-royalBlueHover transition-colors"
            >
              확인
            </button>
          </div>
        ) : (
          <div className="p-7 sm:p-9">
            {/* 상단 타이틀 */}
            <div className="mb-6 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue text-xs font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>주디 대표 직통 1:1 진단 상담</span>
              </div>
              <h3 className="text-2xl font-extrabold text-judiaistudio-textMain">
                "상담받고 싶어요"
              </h3>
              <p className="text-xs text-judiaistudio-textSub">
                부담 없이 가벼운 마음으로 남겨주세요. 대표가 직접 정직하게 안내해 드립니다.
              </p>
            </div>

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 <span className="text-red-500">*</span>
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
                    이메일 (선택)
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  현재 상황 / 관심 분야
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue bg-white"
                >
                  <option value="직장인 부업 준비">직장인 부업 및 제2의 파이프라인</option>
                  <option value="퇴사 후 지식 상품 런칭">퇴사 후 전문 강의/전자책 런칭</option>
                  <option value="은퇴 후 2막 코칭">은퇴 후 시니어 컨설팅/코칭</option>
                  <option value="독립 브랜드 홈페이지 구축">나만의 독립 브랜드 본진 제작</option>
                  <option value="기타">기타 자유 상담</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  현재 가장 큰 고민이나 궁금한 점
                </label>
                <textarea
                  rows="3"
                  placeholder="예: 제 경력으로도 강의나 코칭을 열 수 있을지, 어떤 주제가 좋을지 상담받고 싶어요."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-sm shadow-md shadow-judiaistudio-royalBlue/25 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4 text-judiaistudio-gold" />
                <span>상담 신청서 제출하기</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

