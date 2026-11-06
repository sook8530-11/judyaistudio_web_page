import React, { useState } from 'react';
import { 
  X, Send, CheckCircle2, Sparkles, MessageSquare, 
  Building2, User, Mic2, Tent, Target, Briefcase, 
  Users, Calendar, Clock, Check, Phone, Mail 
} from 'lucide-react';
import { addConsultingRequest } from '../utils/storage';

export default function ConsultingModal({ isOpen, onClose }) {
  // 1. 교육 분야 / 형태
  const [category, setCategory] = useState('기업 교육');
  // 2. 교육 대상
  const [target, setTarget] = useState('기업 임직원 / 실무진');
  // 3. 예상 인원
  const [headcount, setHeadcount] = useState('6 ~ 20명 (팀/부서 단위)');
  const [customHeadcount, setCustomHeadcount] = useState('');
  // 4. 원하는 일정
  const [scheduleType, setScheduleType] = useState('협의 가능'); // '협의 가능' | '날짜 지정'
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('평일 오후 (13:00~18:00)');
  // 5. 신청자 정보
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  // 교육 분야 옵션
  const categoryOptions = [
    { label: '기업 교육', icon: Building2, desc: '사내 출강·B2B 맞춤 실무' },
    { label: '개인 수강', icon: User, desc: '1인 지식 창업·전자책' },
    { label: '맞춤 특강', icon: Mic2, desc: '키노트·컨퍼런스·세미나' },
    { label: 'AI 캠프', icon: Tent, desc: '1~2일 집중 해커톤·완성형' },
    { label: '1:1 코칭', icon: Target, desc: '주디 대표 프라이빗 밀착' },
    { label: '비즈니스 컨설팅', icon: Briefcase, desc: 'BM 설계·자동화 시스템' },
  ];

  // 교육 대상 옵션
  const targetOptions = [
    '기업 임직원 / 실무진',
    '스타트업 대표 / 창업팀',
    '직장인 / N잡러 / 프리랜서',
    '전문직 / 시니어 / 퇴직 예정자',
    '대학생 / 취업준비생',
    '기타 (상담 시 조율)'
  ];

  // 예상 인원 옵션
  const headcountOptions = [
    '1명 (1:1 개인)',
    '2 ~ 5명 (소수정예)',
    '6 ~ 20명 (팀/부서 단위)',
    '21 ~ 50명 (대규모 워크숍)',
    '50명 이상 (전사 특강/대강당)',
    '직접 입력'
  ];

  // 선호 시간대 옵션
  const timeOptions = [
    '평일 오전 (09:00~12:00)',
    '평일 오후 (13:00~18:00)',
    '평일 저녁 (19:00~22:00)',
    '주말 종일',
    '시간 무관 (협의)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('신청자(담당자) 성함을 입력해 주세요.');
    if (!phone.trim()) return alert('연락처(휴대폰 번호)를 입력해 주세요.');
    if (!email.trim()) return alert('이메일 주소를 입력해 주세요.');

    const finalHeadcount = headcount === '직접 입력' ? (customHeadcount || '협의 필요') : headcount;
    const finalDate = scheduleType === '협의 가능' ? '협의 가능 (빠른 조율)' : (preferredDate || '일정 협의');

    const requestPayload = {
      name,
      phone,
      email,
      organization: organization || '개인',
      category,
      target,
      headcount: finalHeadcount,
      schedulePreference: scheduleType,
      preferredDate: finalDate,
      preferredTime,
      message: message || '빠른 상담 요청드립니다.'
    };

    // localStorage에 누적 보관
    addConsultingRequest(requestPayload);

    setSubmittedData(requestPayload);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setName('');
    setPhone('');
    setEmail('');
    setOrganization('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 닫기 버튼 */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted && submittedData ? (
          /* ===================== 신청 완료 영수증 화면 ===================== */
          <div className="p-8 sm:p-12 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                교육상담신청이 성공적으로 접수되었습니다!
              </h3>
              <p className="text-sm text-slate-600">
                주디 대표가 직접 남겨주신 내용을 꼼꼼히 확인한 후, <br className="hidden sm:block" />
                <strong className="text-judiaistudio-royalBlue font-bold">24시간 이내</strong>에 입력하신 연락처({submittedData.phone})로 상세히 안내해 드립니다.
              </p>
            </div>

            {/* 신청 요약 카드 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200">
                접수된 교육상담신청 명세
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>• <strong>교육 분야:</strong> <span className="text-judiaistudio-royalBlue font-bold">{submittedData.category}</span></div>
                <div>• <strong>교육 대상:</strong> {submittedData.target}</div>
                <div>• <strong>예상 인원:</strong> {submittedData.headcount}</div>
                <div>• <strong>희망 일정:</strong> {submittedData.preferredDate}</div>
              </div>
              <div>• <strong>선호 시간:</strong> {submittedData.preferredTime}</div>
              <div>• <strong>신청자 / 소속:</strong> {submittedData.name}님 {submittedData.organization && `(${submittedData.organization})`}</div>
              {submittedData.message && (
                <div className="pt-1 text-slate-500 italic">
                  • <strong>요청사항:</strong> "{submittedData.message}"
                </div>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-4 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-judiaistudio-royalBlue/25 transition-all"
            >
              확인 및 메인 화면으로
            </button>
          </div>
        ) : (
          /* ===================== 교육상담신청 폼 ===================== */
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* 상단 헤더 */}
            <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue text-xs font-bold font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5 text-judiaistudio-gold" />
                <span>JUDY AI STUDIO CONSULTING</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                맞춤형 교육상담신청
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                기업 출강, 특강, AI 캠프부터 1:1 코칭·컨설팅까지 목적과 인원에 맞춘 최적의 커리큘럼을 제안해 드립니다.
              </p>
            </div>

            {/* 스크롤 가능한 입력 폼 */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
              <form id="consulting-form" onSubmit={handleSubmit} className="space-y-6">

                {/* 1. 교육 분야 / 형태 (기업, 개인, 특강, 캠프, 코칭, 컨설팅 버튼 칩) */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-800">
                    1. 교육 분야 / 형태를 선택해 주세요 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {categoryOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = category === opt.label;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setCategory(opt.label)}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-judiaistudio-royalBlue text-white border-judiaistudio-royalBlue shadow-md shadow-judiaistudio-royalBlue/20 scale-[1.02]'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-judiaistudio-royalBlue'}`} />
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold">{opt.label}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'} mt-0.5`}>
                              {opt.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 교육 대상 (누를 수 있는 칩) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    2. 교육 대상을 선택해 주세요 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {targetOptions.map((tgt) => (
                      <button
                        key={tgt}
                        type="button"
                        onClick={() => setTarget(tgt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          target === tgt
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {tgt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. 예상 인원 (누를 수 있는 칩) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    3. 예상 교육 인원을 선택해 주세요 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {headcountOptions.map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setHeadcount(cnt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          headcount === cnt
                            ? 'bg-judiaistudio-royalBlue text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                  {headcount === '직접 입력' && (
                    <input
                      type="text"
                      placeholder="예상 인원 수를 직접 적어주세요 (예: 약 35명)"
                      value={customHeadcount}
                      onChange={(e) => setCustomHeadcount(e.target.value)}
                      className="w-full mt-2 px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                    />
                  )}
                </div>

                {/* 4. 원하는 일정 (희망 일정 & 시간대 선택) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-judiaistudio-royalBlue" />
                    <span>4. 원하는 일정 및 선호 시간대를 선택해 주세요</span>
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setScheduleType('협의 가능')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        scheduleType === '협의 가능'
                          ? 'bg-white text-judiaistudio-royalBlue border border-judiaistudio-royalBlue shadow-sm'
                          : 'bg-slate-200/60 text-slate-600'
                      }`}
                    >
                      ⚡ 빠른 일정 협의 (협의 가능)
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleType('날짜 지정')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        scheduleType === '날짜 지정'
                          ? 'bg-white text-judiaistudio-royalBlue border border-judiaistudio-royalBlue shadow-sm'
                          : 'bg-slate-200/60 text-slate-600'
                      }`}
                    >
                      📅 희망 날짜 직접 지정
                    </button>
                  </div>

                  {scheduleType === '날짜 지정' && (
                    <div className="pt-1">
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500">선호 시간대</span>
                    <div className="flex flex-wrap gap-1.5">
                      {timeOptions.map((tm) => (
                        <button
                          key={tm}
                          type="button"
                          onClick={() => setPreferredTime(tm)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                            preferredTime === tm
                              ? 'bg-slate-800 text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {tm}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. 신청자(담당자) 연락처 정보 */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-800">
                    5. 신청자(담당자) 정보를 입력해 주세요 <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="성함 / 담당자명 *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="연락처 (휴대폰) *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="이메일 주소 *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue font-mono"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="기업 / 기관명 (개인이면 공란)"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows="2"
                      placeholder="구체적인 교육 고민, 달성하고 싶은 목표나 궁금한 점을 적어주시면 더욱 정밀한 맞춤 커리큘럼을 준비해 드립니다."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue resize-none"
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* 하단 고정 제출 버튼 */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white sticky bottom-0 z-10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                닫기
              </button>
              <button
                type="submit"
                form="consulting-form"
                className="flex-1 py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-judiaistudio-royalBlue/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 text-judiaistudio-gold" />
                <span>교육상담신청서 제출하기 (24시간 내 답변)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
