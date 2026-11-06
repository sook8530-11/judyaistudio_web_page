import React from 'react';
import { Eye, HeartHandshake, CheckCircle2, Shield, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PhilosophySection({ onOpenConsulting }) {
  const pillars = [
    {
      icon: Eye,
      title: '과장 없는 정직한 설명과 투명한 공개',
      subtitle: 'HONEST & TRANSPARENT',
      desc: '자극적인 매출 수치나 뜬구름 잡는 환상을 심지 않습니다. 대표의 실제 얼굴과 이름을 내걸고, 커리큘럼과 가격을 투명하게 공개하여 방문자의 의심을 단단한 확신으로 바꿉니다.',
      tag: '투명성 100%'
    },
    {
      icon: HeartHandshake,
      title: '한 사람 한 사람과의 진심 어린 1:1 소통',
      subtitle: '1:1 AUTHENTIC CONNECTION',
      desc: '기계적으로 동영상만 파는 곳이 아닙니다. 시작 전 진단 상담부터 1:1 맞춤 코칭까지, 수강생이 마주한 구체적인 고민과 상황에 맞춰 가장 현실적인 길을 함께 찾습니다.',
      tag: '진솔한 소통'
    },
    {
      icon: CheckCircle2,
      title: '현장에서 검증된 타협 없는 실전 품질',
      subtitle: 'VERIFIED PRACTICAL QUALITY',
      desc: '어디서나 볼 수 있는 흔한 이론은 뺍니다. 실제 AI 툴과 지식 상품화 현장에서 직접 부딪치며 검증된 실무 노하우만을 압축하여 당장 내일 써먹을 수 있는 결과물을 만듭니다.',
      tag: '실전 적용'
    }
  ];

  return (
    <section id="philosophy" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. 주디 대표 프로필 & 진솔한 약속 카드 */}
        <div className="bg-judiaistudio-background rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-judiaistudio-royalBlue via-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-xl shadow-judiaistudio-royalBlue/25 border-4 border-white">
                주디
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="1:1 상담 가능">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-judiaistudio-textMain">주디 대표</h3>
            <p className="text-xs text-judiaistudio-textSub mt-1">AI 지식 비즈니스 아키텍트 & 1:1 멘토</p>
            <div className="flex items-center gap-1 mt-2 text-judiaistudio-gold text-xs font-semibold">
              <Star className="w-4 h-4 fill-judiaistudio-gold text-judiaistudio-gold" />
              <span>상담 만족도 99.4%</span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue text-xs font-bold font-mono">
              <Shield className="w-3.5 h-3.5 text-judiaistudio-gold" />
              DIRECTOR'S PLEDGE
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-judiaistudio-textMain leading-relaxed italic bg-white p-5 rounded-2xl border-l-4 border-judiaistudio-royalBlue shadow-sm">
              "남의 플랫폼에서 휘둘리지 않고, 나만의 경험이 가장 강력한 자산이 되도록 가장 가까이에서 정직하게 돕겠습니다. 과장 없이, 오직 결과로 증명합니다."
            </blockquote>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-judiaistudio-textSub">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>30대·퇴사·은퇴 맞춤 로드맵</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>검증된 실전 VOD 커리큘럼</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>수강 전 취소 100% 전액 환불</span>
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
            SNS와 오픈채팅의 일회성을 넘어, 여러분이 평생 믿고 기댈 수 있는 단단한 비즈니스 파트너가 되겠습니다.
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
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-judiaistudio-royalBlue group-hover:bg-judiaistudio-royalBlue group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-judiaistudio-goldLight text-judiaistudio-gold">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono font-bold tracking-wider text-judiaistudio-textSub uppercase mb-1">
                    {item.subtitle}
                  </div>

                  <h3 className="text-xl font-bold text-judiaistudio-textMain mb-3 group-hover:text-judiaistudio-royalBlue transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-judiaistudio-textSub leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-judiaistudio-royalBlue">
                  <span className="w-2 h-2 rounded-full bg-judiaistudio-gold"></span>
                  <span>주디 대표 약속 원칙 #{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
