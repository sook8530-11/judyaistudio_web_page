import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import ProgramsPreview from './components/ProgramsPreview';
import ReviewMarquee from './components/ReviewMarquee';
import FreeGuideSection from './components/FreeGuideSection';
import FaqSection from './components/FaqSection';
import ClosingCta from './components/ClosingCta';
import Footer from './components/Footer';
import ConsultingModal from './components/ConsultingModal';

export default function App() {
  const [isConsultingOpen, setIsConsultingOpen] = useState(false);

  const openConsulting = () => setIsConsultingOpen(true);
  const closeConsulting = () => setIsConsultingOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-judiaistudio-background text-judiaistudio-textMain font-sans selection:bg-judiaistudio-royalBlue selection:text-white">
      {/* 1. 글로벌 헤더 (네비게이션 & CTA) */}
      <Header onOpenConsulting={openConsulting} />

      <main className="flex-1">
        {/* 2. 히어로 섹션 (마우스 패럴랙스 & 대표 프로필 & 메인 카피) */}
        <HeroSection onOpenConsulting={openConsulting} />

        {/* 3. 신뢰와 약속 섹션 (3대 철학 기둥 카드) */}
        <PhilosophySection />

        {/* 4. 실전 프로그램 라인업 (VOD 실전 코스, 1:1 맞춤 코칭, 올패스 멤버십) */}
        <ProgramsPreview onOpenConsulting={openConsulting} />

        {/* 5. 수강생 후기 무한 마퀴 롤링 섹션 (Infinite Marquee) */}
        <ReviewMarquee />

        {/* 6. 무료 스타터킷 가이드북 다운로드 섹션 */}
        <FreeGuideSection />

        {/* 7. 자주 묻는 질문 FAQ 아코디언 */}
        <FaqSection />

        {/* 8. 최하단 진솔한 클로징 CTA */}
        <ClosingCta onOpenConsulting={openConsulting} />
      </main>

      {/* 9. 푸터 (사업자 정보 & 환불/약관 모달) */}
      <Footer />

      {/* 10. 1:1 상담 신청 팝업 모달 */}
      <ConsultingModal isOpen={isConsultingOpen} onClose={closeConsulting} />
    </div>
  );
}

