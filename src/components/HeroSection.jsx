import React, { useState, useEffect } from 'react';
import { MousePointer2, ExternalLink, ArrowDown, Sparkles } from 'lucide-react';
import LiquidEther from './LiquidEther';

export default function HeroSection({ onOpenConsulting }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 보라색·파란색·연두색 빛 팔레트
  // 보라: #8b5cf6, #7c3aed
  // 파랑: #2563eb, #1d4ed8, #38bdf8
  // 연두: #22c55e, #4ade80, #84cc16
  const etherColors = ['#8b5cf6', '#2563eb', '#4ade80', '#7c3aed', '#1d4ed8', '#22c55e'];

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-slate-950 font-sans select-none">
      
      {/* 1. React Bits Liquid Ether 인터랙티브 3D 액체/연기 배경 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <LiquidEther
          colors={etherColors}
          intensity={1.25}
          mouseForce={isMobile ? 18 : 28}
          cursorSize={isMobile ? 85 : 110}
          persistence={0.88}      // 긴 연기처럼 은은하게 남아 흐르는 효과
          viscosity={18}           // 부드러운 액체의 점성
          resolution={isMobile ? 0.35 : 0.55} // 모바일 성능 최적화 해상도
          maxDevicePixelRatio={isMobile ? 1 : 1.5}
          autoDemo={true}          // 멈추면 천천히 스스로 흐름
          autoSpeed={0.35}         // 천천히 자연스러운 유속
          autoIntensity={2.0}
          autoResumeDelay={700}
          clickBurst={true}        // 클릭/터치 시 소용돌이 버스트
          backgroundColor="#020617"
          className="w-full h-full"
        />
      </div>

      {/* 2. 가독성을 위한 은은한 다크 비네팅 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80 pointer-events-none z-[1]" />

      {/* 3. 콘텐츠 오버레이 (포인터 이벤트는 자식 버튼에만 auto) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        
        {/* 상단 미니 뱃지 */}
        <div className="pointer-events-auto cursor-default mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium text-white/95 shadow-lg tracking-wide transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>경험을 수익으로 바꾸는 AI 지식 비즈니스 본진</span>
          </div>
        </div>

        {/* 웅장한 메인 타이틀 */}
        <div className="space-y-1 sm:space-y-2 pointer-events-auto cursor-default">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] select-none">
            JUDI AI
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white/90 drop-shadow-[0_0_25px_rgba(0,0,0,0.9)] select-none -mt-2 sm:-mt-4">
            STUDIO
          </h2>
        </div>

        {/* 서브 카피 & 액션 버튼 */}
        <div className="mt-5 flex flex-col items-center gap-5 pointer-events-auto max-w-lg">
          <p className="text-white/85 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] px-4 font-normal">
            30대 직장인부터 퇴사자·은퇴자까지. <br />
            남의 플랫폼에 기대지 않고 내 이름으로 시작하는 <br className="hidden sm:inline" />
            과장 없는 실전 VOD와 1:1 밀착 코칭
          </p>

          {/* 알약 형태의 글래스모피즘 버튼 그룹 */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenConsulting}
              className="flex items-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold shadow-xl transition-all duration-300 group hover:scale-105 active:scale-95"
            >
              <span>1:1 상담 신청하기</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-300" />
            </button>

            <a
              href="#philosophy"
              className="flex items-center gap-2 px-6 py-3.5 bg-judiaistudio-royalBlue/80 hover:bg-judiaistudio-royalBlue backdrop-blur-md border border-blue-400/40 rounded-full text-white text-sm font-semibold shadow-xl transition-all duration-300 group hover:scale-105 active:scale-95"
            >
              <span>주디의 약속 둘러보기</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 하단 중앙 인터랙션 힌트 (모바일 터치 / PC 마우스 대응) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-pulse pointer-events-none select-none">
          <MousePointer2 className="w-5 h-5 text-emerald-400" />
          <span className="text-[11px] uppercase tracking-widest font-mono">
            {isMobile ? 'Touch & drag to swirl the fluid' : 'Move cursor to swirl • Stop to drift'}
          </span>
        </div>

      </div>
    </section>
  );
}
