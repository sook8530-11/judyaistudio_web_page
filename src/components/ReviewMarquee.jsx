import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function ReviewMarquee() {
  const reviews = [
    {
      name: '김○진 님 (30대 직장인)',
      role: '마케터 → AI 프롬프트 VOD 런칭',
      content: '직장 다니면서 퇴근 후 어떻게 부업을 시작해야 할지 막막했는데, 주디 대표님이 제 경험 속에서 돈이 되는 키워드를 1:1로 짚어주셔서 2주 만에 첫 전자책과 VOD를 완성했습니다. 첫 달 만에 부업 수익 180만 원을 달성했어요!',
      rating: 5,
      badge: '30대 직장인 부업'
    },
    {
      name: '이○호 님 (퇴사 6개월 차)',
      role: '인사팀 경력 → 이직/커리어 1:1 코칭 런칭',
      content: '오픈채팅과 인스타그램만으로는 신뢰를 주기 어려웠는데, 주디스튜디오 덕분에 저만의 독립 사이트를 세팅하고 예약 파이프라인을 만들었습니다. 이제 매주 3~4건씩 안정적으로 유료 코칭이 들어옵니다.',
      rating: 5,
      badge: '퇴사 후 독립 성공'
    },
    {
      name: '박○수 님 (50대 은퇴 준비자)',
      role: '30년 제조 현장 노하우 → 시니어 컨설팅 코스',
      content: '컴퓨터도 서툰 내가 AI로 지식 상품을 만들 수 있을까 걱정 많았는데, 과장 없이 하나하나 알려주신 덕분에 제 30년 경험이 멋진 VOD 강의로 재탄생했습니다. 새로운 2막을 열어주셔서 정말 감사합니다.',
      rating: 5,
      badge: '은퇴 후 제2막'
    },
    {
      name: '정○희 님 (1인 크리에이터)',
      role: '블로그 운영자 → 노코드 웹제작 올패스 수강',
      content: '과장된 광고에 속아 수백만 원짜리 강의 듣고 후회한 적이 많았어요. 주디스튜디오는 뜬구름 잡는 소리 없이 처음부터 끝까지 실전 위주라 너무 시원했습니다. 질문하면 대표님이 직접 답해주시는 게 최고예요.',
      rating: 5,
      badge: '실전 커리큘럼 만족'
    },
    {
      name: '최○현 님 (프리랜서 디자이너)',
      role: '디자인 외주 → 디자인 시스템 VOD 런칭',
      content: '남의 플랫폼 수수료 떼이고 나면 남는 게 없었는데, 내 이름으로 된 본진 사이트를 만드니 고객들이 저를 대하는 태도부터 달라졌습니다. 1:1 코칭 세션에서 카피라이팅 다듬어주신 게 결정적이었어요.',
      rating: 5,
      badge: '독립 본진 구축'
    }
  ];

  // 무한 롤링을 위해 배열 2벌 연결
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-judiaistudio-goldLight text-judiaistudio-gold text-xs font-bold font-mono tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 fill-judiaistudio-gold" />
          REAL REVIEWS & STORIES
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-judiaistudio-textMain tracking-tight">
          과장 없는 진심, <br className="hidden sm:block" />
          <span className="text-judiaistudio-royalBlue">선배 수강생들의 실제 변화 스토리</span>
        </h2>
        <p className="text-base text-judiaistudio-textSub mt-3">
          카드에 마우스를 올리면 슬라이드가 멈추어 편안하게 읽으실 수 있습니다.
        </p>
      </div>

      {/* 무한 마퀴 컨테이너 */}
      <div className="relative w-full overflow-hidden">
        {/* 좌우 그라디언트 페이드 효과 */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* 롤링 트랙 */}
        <div className="flex gap-6 w-max animate-marquee marquee-track py-4">
          {marqueeItems.map((rev, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[420px] bg-judiaistudio-background rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-judiaistudio-royalBlue/40 hover:-translate-y-1 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* 상단 별점 및 뱃지 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-judiaistudio-gold text-judiaistudio-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue">
                    {rev.badge}
                  </span>
                </div>

                {/* 후기 내용 */}
                <p className="text-sm text-judiaistudio-textMain leading-relaxed line-clamp-4">
                  "{rev.content}"
                </p>
              </div>

              {/* 하단 작성자 정보 */}
              <div className="pt-5 mt-5 border-t border-slate-200/70 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-judiaistudio-royalBlue/10 text-judiaistudio-royalBlue font-bold flex items-center justify-center text-sm font-mono">
                  {rev.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-judiaistudio-textMain">{rev.name}</div>
                  <div className="text-[11px] text-judiaistudio-textSub">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

