import React from 'react';
import { Eye, HeartHandshake, CheckCircle2, Shield, Star, ShieldCheck, ArrowRight, Award, BookOpen, GraduationCap } from 'lucide-react';

export default function PhilosophySection({ onOpenConsulting }) {
  const pillars = [
    {
      icon: Eye,
      title: '과장 없는 정직한 설명과 투명한 공개',
      subtitle: 'HONEST & TRANSPARENT',
      desc: '자극적인 매출 수치나 뜬구름 잡는 환상을 심지 않습니다. 대표의 실제 얼굴과 본명(이경숙), 9년간의 실전 포트폴리오를 투명하게 공개하여 수강생의 막연한 불안을 단단한 확신으로 바꿉니다.',
      tag: '투명성 100%'
    },
    {
      icon: HeartHandshake,
      title: '한 사람 한 사람과의 진심 어린 눈맞춤 교육',
      subtitle: '1:1 AUTHENTIC CONNECTION',
      desc: '기계적으로 동영상만 파는 곳이 아닙니다. 시작 전 진단 상담부터 1:1 맞춤 코칭까지, 수강생이 마주한 구체적인 삶의 경험과 고민에 귀 기울이며 인생 2막의 주인공이 되도록 함께 뜁니다.',
      tag: '진솔한 소통'
    },
    {
      icon: CheckCircle2,
      title: '영화제 6관왕·출간 작가로 검증된 실전 품질',
      subtitle: 'VERIFIED PRACTICAL QUALITY',
      desc: '이론만 읊는 AI 강의는 사양합니다. 국내외 영화제 극본상·작품상 수상작과 교보문고 정식 출간 도서로 입증된 고품격 미디어아트 및 출판 창작 노하우만을 압축하여 당장 손에 잡히는 결과물로 증명합니다.',
      tag: '실전 결과물'
    }
  ];

  return (
    <section id="philosophy" className="py-24 bg-white border-t border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. 이경숙 (Judy PD) 대표 프로필 & 진솔한 철학 카드 */}
        <div className="bg-judiaistudio-background rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-judiaistudio-royalBlue via-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-judiaistudio-royalBlue/25 border-4 border-white">
                주디PD
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="1:1 상담 가능">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-judiaistudio-textMain">이경숙 (Judy PD)</h3>
            <p className="text-xs text-judiaistudio-royalBlue font-bold mt-1">감성 콘텐츠 프로듀서 · AI융합교육학 연구자</p>
            <p className="text-[11px] text-slate-500 mt-0.5">구글 제미나이 공인 티쳐 트레이너 · NCS 확인강사</p>

            <div className="flex items-center gap-1 mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>상담 및 연수 만족도 99.8%</span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue text-xs font-bold font-mono">
              <Shield className="w-3.5 h-3.5 text-judiaistudio-gold" />
              DIRECTOR'S PHILOSOPHY
            </div>

            <blockquote className="text-base sm:text-lg font-medium text-judiaistudio-textMain leading-relaxed italic bg-white p-5 rounded-2xl border-l-4 border-judiaistudio-royalBlue shadow-sm">
              “AI는 인간을 대신하는 기술이 아니라, 인간의 의미를 세상과 연결하는 따뜻한 동반자입니다.<br className="hidden sm:inline" />
              교육과 창작의 경계를 허물고, 여러분이 AX(AI 전환) 시대의 당당한 주인공이 되도록 가장 가까이에서 손을 잡겠습니다.”
            </blockquote>

            {/* 대표 약력 뱃지 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-judiaistudio-textSub pt-1">
              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">국내외 영화제 6관왕</div>
                  <div className="text-[10px] text-slate-500">박일 감독 협업 파트너 (2023~)</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">교보문고 출간 작가</div>
                  <div className="text-[10px] text-slate-500">동화집 《모두의 식탁》 정식 유통</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <GraduationCap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">구글 제미나이 트레이너</div>
                  <div className="text-[10px] text-slate-500">전국 교육청 교사연수 채택</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">의미중심 교육창업학</div>
                  <div className="text-[10px] text-slate-500">학술 논문 발표 연구자</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 3대 기둥 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue text-xs font-bold font-mono tracking-wider">
            OUR CORE VALUES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiaistudio-textMain tracking-tight">
            어떤 상황에서도 타협하지 않는 <br className="hidden sm:block" />
            <span className="text-judiaistudio-royalBlue">주디AI스튜디오의 3대 약속</span>
          </h2>
          <p className="text-base sm:text-lg text-judiaistudio-textSub">
            [주디; 주인공을 디자인하다] — 누구나 스스로의 가능성을 깨우고 AI로 창작과 수익을 실현하는 길을 안내합니다.
          </p>
        </div>

        {/* 3대 기둥 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-judiaistudio-background rounded-3xl p-8 border border-slate-200/80 hover:border-judiaistudio-royalBlue/40 hover:bg-white hover:shadow-xl hover:shadow-judiaistudio-royalBlue/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-judiaistudio-royalBlue group-hover:bg-judiaistudio-royalBlue group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-white text-slate-500 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold text-judiaistudio-gold uppercase tracking-wider mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-judiaistudio-textMain mb-3 group-hover:text-judiaistudio-royalBlue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-judiaistudio-textSub leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
