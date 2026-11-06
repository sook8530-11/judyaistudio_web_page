import React, { useState } from 'react';
import { 
  Trophy, BookOpen, Film, Music, Sparkles, ExternalLink, 
  Award, CheckCircle, GraduationCap, Globe, Heart, Play, Clapperboard, Video
} from 'lucide-react';

export default function PortfolioShowcaseSection() {
  // 박일 감독님 X 주디PD 협업 영화 및 주요 필모그래피
  const films = [
    {
      id: 'film-1',
      title: '영화 《지각결혼식》',
      year: '2025 / 2024',
      festival: '제7회 예천국제스마트폰영화제 시니어부 작품상 수상',
      subFestival: '2024 패럴스마트폰영화제 공식 개막작 선정',
      director: '박일 감독',
      role: '이경숙 (주디PD) · 편집 & AI OST 작곡 및 사운드 총괄',
      story: '장애인 자립생활센터에서 영화 수업 중 알게 된 늦깎이 커플(권홍민·소다희)의 감동적인 사연을 영화 촬영과 연계해 따뜻한 결혼식을 선물하는 가슴 뭉클한 실화 재구성작.',
      youtubeUrl: 'https://www.youtube.com/watch?v=m3zheRF44LE',
      tag: '작품상 수상작',
      color: 'border-blue-500/40 bg-blue-950/30 text-blue-300'
    },
    {
      id: 'film-2',
      title: '영화 《북촌나들이》',
      year: '2026',
      festival: '제8회 예천국제스마트폰영화제 시니어부 본선 진출 및 수상',
      subFestival: '2026년 10월 영화제 공식 초청 상영작',
      director: '박일 감독',
      role: '이경숙 (주디PD) · AI 미디어아트, 사운드 디자인 및 편집 총괄',
      story: '북촌 한옥마을의 고즈넉한 정취 속에서 노년의 우정과 지나온 삶의 궤적을 스마트폰 카메라와 따뜻한 AI 감성으로 포착한 시니어 힐링 시네마.',
      youtubeUrl: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      tag: '2026 최신 본선진출작',
      color: 'border-amber-500/40 bg-amber-950/30 text-amber-300'
    },
    {
      id: 'film-3',
      title: '영화 《AI가수 꽃할배》',
      year: '2024',
      festival: '제7회 예천국제스마트폰영화제 시니어부 장려상 수상',
      subFestival: '시니어의 꿈과 AI 음악의 만남',
      director: '박일 감독',
      role: '이경숙 (주디PD) · 주연 출연, AI 음악 작곡 및 영화 총편집',
      story: '가수의 꿈을 품은 시니어 주인공이 생성형 AI 음악 기술을 만나 무대에 서며 제2의 인생을 노래하는 유쾌하고 벅찬 음악 단편영화.',
      youtubeUrl: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      tag: '장려상 수상작',
      color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
    },
    {
      id: 'film-4',
      title: '영화 《빈좌석》',
      year: '2023',
      festival: '제6회 예천국제스마트폰영화제 시니어부 장려상 수상',
      subFestival: '박일 감독 X 주디PD 파트너십의 첫 결실',
      director: '박일 감독',
      role: '이경숙 (주디PD) · 출연 및 AI 미디어 편집',
      story: '노년의 일상 속 떠나간 이들의 빈자리를 담담하게 응시하며, 남겨진 기억과 그리움의 온기를 조명한 서정적 드라마.',
      youtubeUrl: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      tag: '2023 파트너십 첫 수상',
      color: 'border-purple-500/40 bg-purple-950/30 text-purple-300'
    },
    {
      id: 'film-5',
      title: '영화 《독립운동가 김향화가 말하다》',
      year: '2025',
      festival: '서울국제노인영화제(SISFF) 한국단편경쟁 본선 진출',
      subFestival: '역사적 인물 조명 시니어 시네마',
      director: '시니어 영화제작 커뮤니티 (박일 감독, 주디PD 참여)',
      role: '이경숙 (주디PD) · 주연 출연 및 영화 제작·편집 주도',
      story: '3·1 만세운동 당시 수원 기생들을 이끌고 독립운동을 주도했던 기생 출신 여성독립운동가 김향화의 생애와 서대문형무소 옥고의 역사를 기리는 역사 극영화.',
      youtubeUrl: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      tag: '국제노인영화제 본선',
      color: 'border-rose-500/40 bg-rose-950/30 text-rose-300'
    },
    {
      id: 'film-6',
      title: '영화 《그리움》',
      year: '2024 / 2025',
      festival: '이태리·로마 국제영화제 극본상 수상 & 2025 시청자미디어대상 수상',
      subFestival: '글로벌 국제영화제 공식 초청',
      director: '주디PD 총괄',
      role: '이경숙 (주디PD) · 극본 집필, AI 음악 작곡 및 영상 총편집',
      story: '시간을 초월한 가족의 사랑과 그리움을 AI 사운드스케이프와 감각적인 컷 편집으로 완성하여 해외 영화제 심사위원들의 극찬을 받은 수작.',
      youtubeUrl: 'https://www.youtube.com/@%EC%A3%BC%EB%94%94AI%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4',
      tag: '글로벌 극본상 & 정부포상',
      color: 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
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
      linkText: '교보문고 도서 구매 및 리뷰 보기',
      tag: '정식 출간 도서',
      icon: BookOpen
    },
    {
      id: 'p2',
      type: 'BOOKS',
      title: '《푸른 별을 되찾은 어린왕자와 사막여우》',
      category: '전자책 & 오디오북 & 컬러링북',
      desc: '생성형 AI로 구현한 고품격 삽화와 오디오 더빙, 컬러링북이 결합된 멀티미디어 융합 콘텐츠.',
      link: 'https://mybestedu.ai/gallery/k97f9vtdtjfz00en3jdwdnr8yh7fds8a?version=1746523894317',
      linkText: '오디오북 갤러리 감상하기',
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
      linkText: '유튜브 채널에서 뮤비 감상',
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
      linkText: '날씨 웹앱 직접 체험하기',
      tag: 'AI 웹 인터랙션',
      icon: Globe
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-900 text-white relative overflow-hidden font-sans">
      {/* 배경 장식 글로우 */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* 1. 섹션 메인 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-judiaistudio-gold text-xs font-bold font-mono tracking-wider shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            MAJOR WORKS & FILM FESTIVAL AWARDS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            이론을 넘어 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">실제 영화와 작품으로</span> <br />
            가치를 증명합니다
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            80대 시니어 거장 박일 감독님과의 2023년부터 이어진 영화제 파트너십부터, <br className="hidden sm:inline" />
            교보문고 정식 출간 도서와 AI 뮤직비디오까지 — 주디PD(이경숙)의 살아있는 창작 필모그래피입니다.
          </p>
        </div>

        {/* 2. 핵심 권위 및 자격 뱃지 바 (4개 기둥) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">구글 제미나이</div>
            <div className="text-[11px] text-blue-300 font-mono">공인 티쳐 트레이너</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">국내외 영화제 6관왕</div>
            <div className="text-[11px] text-amber-300 font-mono">예천·로마·노인영화제 등</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">교보문고 정식 출간</div>
            <div className="text-[11px] text-emerald-300 font-mono">《모두의 식탁》 외 5종</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">전국 교육청 교사연수</div>
            <div className="text-[11px] text-purple-300 font-mono">NCS 확인강사 채택</div>
          </div>
        </div>

        {/* 3. [특별 기획] 박일 감독 X 주디PD 시네마틱 파트너십 하이라이트 배너 */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                <span>CINEMATIC PARTNERSHIP (2023 - 2026)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                박일 감독 × 주디PD의 영화 창작 여정
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                80대 원로 방송작가 박일 감독님의 깊이 있는 시나리오와 연출, 그리고 주디PD의 감성 AI 작곡·사운드 믹싱·영상 총편집이 만나 
                예천국제스마트폰영화제 작품상·장려상 및 국제영화제 극본상 등 수많은 기적을 함께 일궈냈습니다.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://www.youtube.com/watch?v=m3zheRF44LE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>《지각결혼식》 작품영상 보기</span>
              </a>
            </div>
          </div>

          {/* 6편의 대표 영화 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {films.map((film) => (
              <div
                key={film.id}
                className="rounded-2xl p-6 bg-slate-900/90 border border-slate-800 hover:border-slate-600 transition-all space-y-4 flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{film.year}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${film.color}`}>
                      {film.tag}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {film.title}
                  </h4>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-blue-300 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{film.festival}</span>
                    </div>
                    {film.subFestival && (
                      <div className="text-[11px] text-slate-400 pl-5">{film.subFestival}</div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
                    <div><strong>연출:</strong> {film.director}</div>
                    <div><strong>담당:</strong> {film.role}</div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {film.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={film.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 group-hover:underline"
                  >
                    <span>관련 영상 / 기록 보기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">박일 × 주디</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 대표 출간 도서 & 미디어 작품 쇼케이스 (교보문고 링크 연동) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>정식 출간 도서 및 주요 미디어 프로젝트</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                실제 교보문고 서점과 오디오북 갤러리에서 독자들과 만나는 주디 대표의 작품들입니다.
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

        {/* 5. [주디; 주인공을 디자인하다] 브랜드 선언 배너 */}
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
