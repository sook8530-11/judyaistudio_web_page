import React, { useState } from 'react';
import { PlayCircle, MessageCircle, Calendar, Check, ArrowRight, Tag, Clock, Layers } from 'lucide-react';

export default function ProgramsPreview({ onOpenConsulting }) {
  const [membershipDays, setMembershipDays] = useState(30);

  const curriculumList = [
    { step: '01단계', title: '경험 발굴 & 킬러 컨셉 정의', desc: '내 커리어와 취미에서 돈이 되는 핵심 키워드 도출' },
    { step: '02단계', title: 'AI 기반 지식 콘텐츠 기획', desc: 'ChatGPT·Claude를 활용한 고효율 강의 교안 및 전자책 완성' },
    { step: '03단계', title: '독립형 브랜드 홈 구축', desc: '남의 플랫폼 의존 없이 내 도메인으로 1일 만에 사이트 세팅' },
    { step: '04단계', title: '신뢰 기반 자동 결제 & 런칭', desc: '토스페이먼츠 연동과 1:1 상담 파이프라인으로 첫 결제 창출' },
  ];

  return (
    <section id="programs" className="py-24 bg-judiaistudio-background border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue text-xs font-bold font-mono tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5 text-judiaistudio-gold" />
            CURRICULUM & SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiaistudio-textMain tracking-tight">
            내 상황에 맞게 선택하는 <br className="hidden sm:block" />
            <span className="text-judiaistudio-royalBlue">실전 프로그램 라인업</span>
          </h2>
          <p className="text-base sm:text-lg text-judiaistudio-textSub">
            이론만 늘어놓는 강의는 이제 그만. 결과물이 손에 잡히는 검증된 코스로 시작하세요.
          </p>
        </div>

        {/* 3열 프로그램 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. VOD 실전 마스터 코스 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-judiaistudio-royalBlue/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue flex items-center gap-1">
                  <PlayCircle className="w-3.5 h-3.5" />
                  VOD 동영상 코스
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold font-mono bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  얼리버드 30%
                </span>
              </div>

              <h3 className="text-2xl font-bold text-judiaistudio-textMain mb-2">
                AI 지식 비즈니스 실전 마스터 코스
              </h3>
              <p className="text-xs text-judiaistudio-textSub mb-6">
                아이디어 발굴부터 독립 홈페이지 런칭까지 한 번에 끝내는 평생 소장 VOD
              </p>

              {/* 가격 영역 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <div className="text-xs text-judiaistudio-textSub line-through font-mono">
                  정가 350,000원
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold font-mono text-judiaistudio-royalBlue">
                    245,000
                  </span>
                  <span className="text-sm font-bold text-judiaistudio-textMain">원</span>
                  <span className="text-xs text-emerald-600 font-semibold ml-auto">평생 무제한 시청</span>
                </div>
              </div>

              {/* 핵심 커리큘럼 목차 */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-judiaistudio-textMain flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-judiaistudio-gold" />
                  <span>실전 4단계 핵심 커리큘럼</span>
                </div>
                {curriculumList.map((c, i) => (
                  <div key={i} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-mono font-bold text-judiaistudio-royalBlue mr-1.5">{c.step}</span>
                    <strong className="text-slate-800">{c.title}</strong>
                    <p className="text-slate-500 mt-0.5 text-[11px]">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenConsulting}
              className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-sm shadow-md shadow-judiaistudio-royalBlue/20 transition-all flex items-center justify-center gap-2"
            >
              <span>VOD 코스 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. 1:1 맞춤 코칭/컨설팅 (가장 인기 & 추천) */}
          <div className="relative bg-white rounded-3xl p-8 border-2 border-judiaistudio-royalBlue shadow-xl shadow-judiaistudio-royalBlue/10 flex flex-col justify-between">
            {/* 상단 뱃지 */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-judiaistudio-royalBlue text-white text-xs font-bold shadow-md tracking-wider">
              🔥 가장 빠른 실행 & 추천
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-judiaistudio-goldLight text-judiaistudio-gold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  1:1 밀착 코칭
                </span>
                <span className="text-xs text-judiaistudio-textSub font-mono">
                  월 선착순 5팀 한정
                </span>
              </div>

              <h3 className="text-2xl font-bold text-judiaistudio-textMain mb-2">
                지식 비즈니스 1:1 프라이빗 코칭
              </h3>
              <p className="text-xs text-judiaistudio-textSub mb-6">
                주디 대표가 1:1로 직접 내 비즈니스 컨셉을 진단하고 설계해 주는 90분 집중 세션
              </p>

              {/* 가격 영역 */}
              <div className="p-4 rounded-2xl bg-judiaistudio-royalBlueLight/50 border border-blue-100 mb-6">
                <div className="text-xs text-judiaistudio-textSub line-through font-mono">
                  정가 300,000원
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-extrabold font-mono text-judiaistudio-royalBlue">
                    190,000
                  </span>
                  <span className="text-sm font-bold text-judiaistudio-textMain">원</span>
                  <span className="text-xs text-judiaistudio-royalBlue font-semibold ml-auto">사전 설문 포함</span>
                </div>
              </div>

              {/* 코칭 혜택 목록 */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold text-judiaistudio-textMain">세션 포함 혜택</div>
                <ul className="space-y-2.5 text-xs text-judiaistudio-textSub">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>사전 정밀 설문지</strong>를 통한 개인별 백그라운드 분석</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>1:1 Zoom 90분 심층 컨설팅</strong> (녹화본 평생 제공)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>내 경험에 딱 맞춘 <strong>지식 상품 기획서 & 카피라이팅 템플릿</strong> 증정</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>세션 후 2주간 1:1 질의응답 피드백 채널 제공</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={onOpenConsulting}
              className="w-full py-3.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-sm shadow-lg shadow-judiaistudio-royalBlue/25 transition-all flex items-center justify-center gap-2"
            >
              <span>1:1 코칭 예약 상담 신청</span>
              <ArrowRight className="w-4 h-4 text-judiaistudio-gold" />
            </button>
          </div>

          {/* 3. 주디AI 올패스 이용권 (반복 일회성 멤버십) */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-judiaistudio-royalBlue/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  기간 이용권 멤버십
                </span>
                <span className="text-xs text-slate-500 font-mono">자동결제 없음</span>
              </div>

              <h3 className="text-2xl font-bold text-judiaistudio-textMain mb-2">
                주디AI 올패스 멤버십
              </h3>
              <p className="text-xs text-judiaistudio-textSub mb-6">
                모든 VOD 및 신규 업데이트 강의를 원하는 기간 동안 자유롭게 수강하는 패스
              </p>

              {/* 기간 선택 토글 */}
              <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
                <button
                  onClick={() => setMembershipDays(30)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    membershipDays === 30
                      ? 'bg-white text-judiaistudio-royalBlue shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  30일(1개월) 이용권
                </button>
                <button
                  onClick={() => setMembershipDays(90)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    membershipDays === 90
                      ? 'bg-white text-judiaistudio-royalBlue shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  90일(3개월) 이용권 <span className="text-[10px] text-amber-600 font-bold">15%할인</span>
                </button>
              </div>

              {/* 가격 영역 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-judiaistudio-royalBlue">
                    {membershipDays === 30 ? '49,000' : '125,000'}
                  </span>
                  <span className="text-sm font-bold text-judiaistudio-textMain">원</span>
                  <span className="text-xs text-slate-500 ml-auto">
                    {membershipDays}일 동안 무제한 접근
                  </span>
                </div>
                <div className="text-[11px] text-judiaistudio-textSub mt-2 pt-2 border-t border-slate-200/60">
                  ⚠️ 자동 연장되지 않으며, 만료 7일 전 안내 메일로 직접 연장 여부를 결정합니다.
                </div>
              </div>

              <div className="space-y-2.5 mb-6 text-xs text-judiaistudio-textSub">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>스튜디오 내 모든 VOD 강의 무제한 재생</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>신규 강의 및 템플릿 업데이트 즉시 열람</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>수강생 전용 커뮤니티 Q&A 열람 권한</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenConsulting}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{membershipDays}일 이용권 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

