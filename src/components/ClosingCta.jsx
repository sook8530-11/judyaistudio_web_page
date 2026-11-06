import React from 'react';
import { MessageSquare, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ClosingCta({ onOpenConsulting }) {
  return (
    <section className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* 배경 장식 원형 블러 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-50/70 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* 상단 뱃지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-judiaistudio-royalBlueLight border border-blue-200 text-judiaistudio-royalBlue text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-judiaistudio-gold" />
          <span>망설이고 계신다면, 지금 문을 두드려주세요</span>
        </div>

        {/* 메인 타이틀 */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-judiaistudio-textMain leading-[1.25] tracking-tight">
          "과연 내 경험도 수익이 될 수 있을까?" <br />
          <span className="text-judiaistudio-royalBlue">주디 대표와 함께 답을 찾아보세요.</span>
        </h2>

        {/* 감성 카피 */}
        <p className="text-base sm:text-lg text-judiaistudio-textSub max-w-2xl mx-auto leading-relaxed">
          거창한 성공 스토리보다 값진 것은 당신이 묵묵히 버텨온 소중한 시간들입니다. 
          <br className="hidden sm:inline" />
          혼자 끙끙 앓지 마시고 편안하게 이야기를 들려주세요. 
          가장 정직하고 따뜻한 시선으로 가능성을 비춰드리겠습니다.
        </p>

        {/* 대형 CTA 버튼 */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenConsulting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-judiaistudio-royalBlue text-white font-bold text-lg shadow-xl shadow-judiaistudio-royalBlue/30 hover:bg-judiaistudio-royalBlueHover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <MessageSquare className="w-5 h-5 text-judiaistudio-gold" />
            <span>주디 대표에게 교육상담신청하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 안심 태그 */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>초기 사전 진단 100% 무료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>영업 전화 및 결제 유도 없음</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>24시간 내 대표 직접 회신</span>
          </div>
        </div>

      </div>
    </section>
  );
}

