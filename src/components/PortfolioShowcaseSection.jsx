import React, { useState } from 'react';
import { 
  Trophy, BookOpen, Film, Music, Sparkles, ExternalLink, 
  Award, CheckCircle, GraduationCap, Globe, Heart 
} from 'lucide-react';

export default function PortfolioShowcaseSection() {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'AWARDS' | 'BOOKS' | 'MEDIA'

  // 영화제 수상 경력
  const awards = [
    {
      year: '2025',
      title: '시청자미디어대상 최종 수상',
      work: '영화 <그리움>',
      role: 'AI 음악 & 총편집 및 극본',
      badge: '대통령령 정부포상',
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    },
    {
      year: '2025',
      title: '시니어부 작품상 수상',
      work: '영화 <지각결혼식>',
      role: '2024 패럴스마트폰영화제 개막작 · 편집 & AI OST 총괄',
      badge: '작품상',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
      year: '2024',
      title: '이태리·로마 국제영화제 극본상',
      work: '영화 <그리움>',
      role: '국제 영화제 공식 초청 및 극본상 수상',
      badge: '글로벌 수상',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    },
    {
      year: '2024',
      title: '제7회 예천스마트폰영화제 시니어부 장려상',
      work: '영화 <AI가수 꽃할배>',
      role: '출연, AI 음악 및 총편집',
      badge: '스마트폰 영화제',
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    },
    {
      year: '2023',
      title: '제6회 예천스마트폰영화제 시니어부 장려상',
      work: '영화 <빈좌석>',
      role: '출연 및 AI 미디어 편집',
      badge: '스마트폰 영화제',
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    },
    {
      year: '2025',
      title: '국제노인영화제 공식 본선 진출',
      work: '영화 <여성독립운동가 김향화가 말하다>',
      role: '출연 및 기획 참여',
      badge: '본선 진출',
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
    }
  ];

  // 실제 출간 도서 및 주요 프로젝트
  const projects = [
    {
      id: 'p1',
      type: 'BOOKS',
      title: '동화집 《모두의 식탁》',
      category: '교보문고 정식 출간 (전자&종이책)',
      desc: '세대와 계층을 넘어 따뜻한 온기를 나누는 감성 스토리. 교보문고, 예스24 등 전국 서점 정식 유통.',
      link: 'http://product.kyobobook.co.kr/detail/S000219388169',
      linkText: '교보문고 도서 보기',
      tag: '출간 도서',
      icon: BookOpen
    },
    {
      id: 'p2',
      type: 'BOOKS',
      title: '《푸른 별을 되찾은 어린왕자와 사막여우》',
      category: '전자책 & 오디오북 & 컬러링북',
      desc: '생성형 AI로 구현한 고품격 삽화와 오디오 더빙, 컬러링북이 결합된 멀티미디어 융합 콘텐츠.',
      link: 'https://mybestedu.ai/gallery/k97f9vtdtjfz00en3jdwdnr8yh7fds8a?version=1746523894317',
      linkText: '오디오북 갤러리 감상',
      tag: '오디오북 & 전자책',
      icon: Sparkles
    },
    {
      id: 'p3',
      type: 'MEDIA',
      title: '뮤직비디오 <0과 1 사이>',
      category: 'AI가수 zero & one (혼성)',
      desc: 'AI 작곡과 디지털 휴먼 보컬, 3D 영상 생성을 결합한 감성 AI 미디어아트 대표 창작물.',
      link: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      linkText: '유튜브 채널 감상',
      tag: 'AI 뮤직비디오',
      icon: Music
    },
    {
      id: 'p4',
      type: 'MEDIA',
      title: '전 세계 날씨 인터랙티브 웹앱',
      category: '노코드 & AI 앱 제작',
      desc: '여행자가 가고 싶은 나라의 실시간 기상 정보와 여행 가이드를 제공하는 감성 인터랙티브 웹 프로젝트.',
      link: 'https://closed-cheer-98309856.figma.site/',
      linkText: '웹앱 직접 체험하기',
      tag: 'AI 웹 인터랙션',
      icon: Globe
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* 배경 장식 글로우 */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-judiaistudio-gold text-xs font-bold font-mono tracking-wider shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            MAJOR WORKS & CREDENTIALS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            이론을 넘어 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">실제 작품과 수상으로</span> <br />
            가치를 증명합니다
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            2017년부터 9년간 쌓아 올린 2D·3D 그래픽과 감성 AI 미디어 제작 노하우. <br className="hidden sm:inline" />
            국내외 영화제 수상작부터 교보문고 출간 도서까지, 주디 대표가 직접 창작한 살아있는 포트폴리오입니다.
          </p>
        </div>

        {/* 1. 핵심 권위 및 자격 뱃지 바 (4개 기둥) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">구글 제미나이</div>
            <div className="text-[11px] text-blue-300 font-mono">공인 티쳐 트레이너</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">국내외 영화제 6관왕</div>
            <div className="text-[11px] text-amber-300 font-mono">로마 국제영화제 극본상 등</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">교보문고 정식 출간</div>
            <div className="text-[11px] text-emerald-300 font-mono">《모두의 식탁》 외 5종</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">전국 교육청 교사연수</div>
            <div className="text-[11px] text-purple-300 font-mono">NCS 확인강사 채택</div>
          </div>
        </div>

        {/* 2. 영화제 수상 명예의 전당 (타임라인 카드) */}
        <div className="bg-slate-800/50 rounded-3xl p-6 sm:p-10 border border-slate-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>국내외 영화제 및 정부포상 수상 연혁</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                AI 음악 작곡, 시나리오 극본, 영상 총편집으로 증명된 스토리텔링 파워
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">2023 - 2025 HONORS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-600 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">{award.year}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${award.color}`}>
                    {award.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{award.title}</h4>
                  <div className="text-xs text-blue-300 font-semibold mt-0.5">{award.work}</div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                  {award.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 대표 출간 도서 & 미디어 작품 쇼케이스 (실제 외부 링크 연결) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>출간 도서 및 주요 미디어 프로젝트</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                실제 교보문고 서점과 오디오북 갤러리에서 서비스 중인 주디 대표의 작품들입니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={proj.id}
                  className="group bg-slate-800/70 hover:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700/80 hover:border-judiaistudio-royalBlue/50 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-judiaistudio-royalBlue/20 text-blue-300 border border-blue-500/30">
                        {proj.tag}
                      </span>
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-judiaistudio-gold transition-colors" />
                    </div>

                    <h4 className="text-xl font-black text-white group-hover:text-blue-200 transition-colors">
                      {proj.title}
                    </h4>

                    <div className="text-xs font-semibold text-judiaistudio-gold">
                      {proj.category}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-700/60">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 group-hover:underline"
                    >
                      <span>{proj.linkText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. [주디; 주인공을 디자인하다] 브랜드 선언 배너 */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/30 text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300 border border-white/20">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>주디AI스튜디오 슬로건 선언</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
            “주디(Judy); 주인공을 디자인하다”
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            <strong>Meaning makes Intelligence.</strong> AI는 인간을 대신하는 차가운 기계가 아니라, 
            인간의 감정과 이야기를 담아내는 가장 따뜻한 창작의 동반자입니다. <br />
            초고령화 시대와 급변하는 AX(AI 전환) 시대, 여러분이 인생의 진정한 주인공이 되도록 주디PD가 함께 뜁니다.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://sites.google.com/view/digitalportfolio-judy/%ED%99%88?authuser=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>구글 공식 포트폴리오 원본 보기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://litt.ly/judyaistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-judiaistudio-gold hover:bg-amber-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5"
            >
              <span>리틀리(Litt.ly) 프로필 링크</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
