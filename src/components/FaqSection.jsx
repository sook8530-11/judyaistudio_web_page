import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0); // 첫 번째 항목 기본 열림

  const faqs = [
    {
      q: '컴퓨터나 AI를 잘 모르는 초보자도 지식 상품을 만들 수 있나요?',
      a: '네, 가능합니다. 주디스튜디오의 교육은 복잡한 코딩이나 어려운 엔지니어링을 가르치지 않습니다. 일상적인 한국어로 ChatGPT, Claude와 대화하며 여러분이 가진 30년 현장 경험, 직무 노하우, 취미 전문성을 구조화된 VOD와 1:1 코칭으로 패키징하는 실전 프로세스를 다룹니다.'
    },
    {
      q: '1:1 프라이빗 코칭 세션은 어떻게 진행되나요?',
      a: '결제 완료 후 사전 정밀 설문지를 작성해 주시면, 주디 대표가 설문 내용을 미리 분석한 뒤 1:1 온라인(Zoom) 90분 심층 세션으로 만납니다. 뜬구름 잡는 조언이 아닌, 수강생 맞춤형 강의 목차와 카피라이팅, 독립 사이트 런칭 로드맵을 현장에서 즉시 완성해 드립니다.'
    },
    {
      q: '올패스 멤버십은 기간이 끝나면 자동으로 카드가 결제되나요?',
      a: '아닙니다. 주디AI스튜디오는 원치 않는 자동 카드 출금(빌링키)을 절대 사용하지 않습니다. 30일 또는 90일 이용 기간이 끝나기 7일 전에 정갈한 안내 메일을 보내드리며, 수강생 본인이 직접 연장 버튼을 눌러 결제할 때만 연장되는 안전한 반복 일회성 결제 방식입니다.'
    },
    {
      q: '수강 신청 후 환불 규정은 어떻게 되나요?',
      a: 'VOD 동영상 강의의 경우 결제 후 영상 시청 이력이 없는 상태라면 7일 이내 100% 전액 환불해 드립니다. 1:1 코칭 세션은 예약 일정 24시간 전까지 취소 시 전액 환불되며, 일정 변경은 1회 무료로 가능합니다.'
    },
    {
      q: '남의 플랫폼(클래스101, 크몽 등)과 내 독립 사이트의 차이가 무엇인가요?',
      a: '기존 플랫폼은 최대 20~50%의 높은 수수료를 떼어갈 뿐만 아니라 고객 DB를 내 것으로 축적할 수 없습니다. 주디AI스튜디오가 돕는 독립 브랜드 사이트는 내 도메인 위에 구축되어 수수료 부담이 없고, 찾아온 고객과 1:1로 직접 소통하며 장기적인 신뢰 자산을 쌓을 수 있습니다.'
    },
    {
      q: '어떤 과정을 선택해야 할지 고민됩니다. 어떻게 해야 할까요?',
      a: '혼자 고민하지 마시고 우측 상단의 [교육상담신청] 버튼을 눌러 교육 분야와 희망 일정, 인원을 선택해 주세요. 주디 대표가 내용을 직접 확인하고, 기업 또는 개인의 현재 상황에 가장 적합한 방향을 솔직하고 정직하게 무료로 짚어드립니다.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-judiaistudio-background border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue text-xs font-bold font-mono tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-judiaistudio-gold" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiaistudio-textMain tracking-tight">
            자주 묻는 질문
          </h2>
          <p className="text-base text-judiaistudio-textSub">
            궁금하신 점을 투명하고 명쾌하게 정리해 두었습니다.
          </p>
        </div>

        {/* 아코디언 리스트 */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg text-judiaistudio-textMain flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-judiaistudio-royalBlue">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-judiaistudio-textSub transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-judiaistudio-royalBlue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-judiaistudio-textSub leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="font-mono font-bold text-judiaistudio-gold mr-1 mt-0.5">A.</span>
                      <p className="flex-1">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

