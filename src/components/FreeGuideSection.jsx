import React, { useState } from 'react';
import { Download, CheckCircle, FileText, Sparkles, ArrowRight, Bell, ShieldCheck } from 'lucide-react';
import { addSubscriber } from '../utils/storage';

export default function FreeGuideSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // 브라우저 localStorage 구독자 관리 테이블에 안전하게 자동 저장
    try {
      addSubscriber({
        name: name.trim() || '가이드북 신청자',
        phone: '미입력(가이드북)',
        email: email.trim()
      });
    } catch (err) {
      console.error(err);
    }

    setDownloaded(true);
  };

  return (
    <section id="free-guide" className="py-20 bg-judiaistudio-royalBlue text-white relative overflow-hidden">
      {/* 배경 장식 원형 블러 */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-10">
          
          {/* 좌측: 책 표지 비주얼 메타포 */}
          <div className="w-full md:w-5/12 flex justify-center">
            <div className="relative w-56 h-72 bg-gradient-to-tr from-slate-900 to-judiaistudio-textMain rounded-2xl p-6 shadow-2xl border border-white/20 flex flex-col justify-between transform hover:-rotate-1 transition-transform">
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-judiaistudio-gold text-slate-900">
                  2026 EDITION · SPECIAL PDF
                </span>
                <div className="text-xl font-extrabold text-white leading-snug pt-2">
                  내 경험을 돈으로 바꾸는 <br />
                  <span className="text-judiaistudio-gold">AI 지식 비즈니스</span><br />
                  스타터 킷
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-slate-300">
                <span>주디 대표 직강 요약본</span>
                <span className="font-mono text-emerald-400 font-bold">얼리버드 무료</span>
              </div>
            </div>
          </div>

          {/* 우측: 안내 카피 및 사전 신청 폼 */}
          <div className="w-full md:w-7/12 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-judiaistudio-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1차 얼리버드 한정 특별 배포</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              출시 전 가치를 먼저 선점하세요. <br />
              실전 가이드북을 완성 즉시 무료로 보내드립니다.
            </h3>

            <p className="text-sm text-blue-100 leading-relaxed">
              아이디어 선별 체크리스트 7가지, 1일 만에 끝내는 커리큘럼 설계 공식, 
              실제 1:1 코칭 필수 템플릿을 최신 AI 트렌드에 맞춰 엄선 중입니다.
              지금 사전 신청하시면 1차 배포본을 이메일로 가장 먼저 받아보실 수 있습니다.
            </p>

            {downloaded ? (
              <div className="p-5 rounded-2xl bg-white/20 border border-white/30 text-white flex items-start gap-3 animate-fadeIn text-left">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <strong className="text-base text-white">🎉 사전 예약이 성공적으로 완료되었습니다!</strong>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    입력하신 <strong>{email}</strong> 주소로 우선 배포 명단에 등록되었습니다. 
                    가이드북 완성 즉시 가장 먼저 다운로드 링크를 보내드리겠습니다.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함 (선택)"
                    className="sm:w-1/3 px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-gold shadow-inner"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="가이드북을 받아보실 이메일 주소"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-gold shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-judiaistudio-gold hover:bg-judiaistudio-goldHover text-slate-950 font-black text-sm shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Bell className="w-4 h-4 text-slate-950" />
                  <span>1차 배포본 우선 예약 신청하기 (무료)</span>
                </button>
              </form>
            )}

            <div className="text-[11px] text-blue-200/80 flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>신청 정보는 안전하게 보관되며, 스팸 메일은 절대 발송하지 않습니다.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

