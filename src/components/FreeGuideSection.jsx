import React, { useState } from 'react';
import { Download, CheckCircle, FileText, Sparkles, ArrowRight } from 'lucide-react';

export default function FreeGuideSection() {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
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
                  SPECIAL PDF GUIDE
                </span>
                <div className="text-xl font-extrabold text-white leading-snug pt-2">
                  내 경험을 돈으로 바꾸는 <br />
                  <span className="text-judiaistudio-gold">AI 지식 비즈니스</span><br />
                  스타터 킷
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-slate-300">
                <span>주디AI스튜디오 편저</span>
                <span className="font-mono">PDF 42 Pages</span>
              </div>
            </div>
          </div>

          {/* 우측: 안내 카피 및 다운로드 폼 */}
          <div className="w-full md:w-7/12 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-judiaistudio-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% 무료 배포 리포트</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              결제 전에 가치를 먼저 확인하세요. <br />
              실전 가이드북을 무료로 보내드립니다.
            </h3>

            <p className="text-sm text-blue-100 leading-relaxed">
              아이디어 선별 체크리스트 7가지, 1일 만에 끝내는 VOD 커리큘럼 설계 공식, 
              실제 1:1 코칭에서 사용하는 필수 템플릿을 아낌없이 담았습니다.
            </p>

            {downloaded ? (
              <div className="p-5 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center gap-3 animate-fadeIn">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div className="text-sm">
                  <strong>신청이 완료되었습니다!</strong>
                  <p className="text-xs text-blue-100 mt-0.5">
                    입력하신 {email} 주소로 가이드북 PDF 다운로드 링크를 발송했습니다.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="가이드북을 받아보실 이메일 주소"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-gold shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-judiaistudio-gold hover:bg-judiaistudio-goldHover text-slate-950 font-bold text-sm shadow-lg shadow-black/20 flex items-center justify-center gap-2 transition-all flex-shrink-0"
                >
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>즉시 무료 다운로드</span>
                </button>
              </form>
            )}

            <div className="text-[11px] text-blue-200/80">
              * 스팸 메일은 절대 발송하지 않으며, 언제든 수신 거부하실 수 있습니다.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

