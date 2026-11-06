import React from 'react';
import { 
  ArrowLeft, Check, Sparkles, MessageSquare, ShieldCheck, 
  Share2, Tag, Calendar 
} from 'lucide-react';

export default function ProductDetailView({ 
  product, 
  onBack, 
  onOpenConsulting 
}) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-judiaistudio-background p-4 text-center">
        <div className="space-y-4">
          <p className="text-slate-600">존재하지 않거나 삭제된 상품입니다.</p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-judiaistudio-royalBlue text-white text-sm font-bold"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('상품 링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      {/* 상단 서브 헤더 네비게이션 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-judiaistudio-royalBlue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 상품 목록으로</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="공유하기"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenConsulting}
            className="px-4 sm:px-5 py-2 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
          >
            {product.price === 0 ? '무료 다운로드 신청' : '1:1 수강·구매 상담'}
          </button>
        </div>
      </header>

      {/* 상품 헤더 히어로 (1:1 정사각 썸네일 & 기본 정보) */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* 1:1 정사각 썸네일 (aspect-square object-cover 완벽 적용) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 aspect-square">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 상품 타이틀 및 가격 정보 */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-judiaistudio-royalBlue">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {product.summary || '주디AI스튜디오에서 제공하는 검증된 실전 지식 비즈니스 프로그램입니다.'}
            </p>

            {/* 가격 박스 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
              {product.originalPrice > product.price && (
                <div className="text-xs text-slate-400 line-through font-mono">
                  정상가 {product.originalPrice.toLocaleString()}원
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-judiaistudio-royalBlue">
                  {product.price === 0 ? '0' : product.price.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-slate-900">원</span>
                {product.price === 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-2">
                    100% 무료 배포
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenConsulting}
                className="flex-1 py-4 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-sm shadow-lg shadow-judiaistudio-royalBlue/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
                <span>{product.price === 0 ? '무료 가이드북 즉시 신청' : '지금 바로 수강 신청하기'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 네이버 블로그 스타일 상세페이지 멀티미디어 본문 렌더링 */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          
          <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between text-xs text-slate-400">
            <span>주디AI스튜디오 공식 상세페이지</span>
            <span className="font-mono">{product.createdAt || '2026.11'}</span>
          </div>

          {/* 블록 렌더링 (블로그 포스팅 형식) */}
          {(!product.contentBlocks || product.contentBlocks.length === 0) ? (
            <p className="text-slate-500 py-8 text-center text-sm">등록된 상세 설명이 없습니다.</p>
          ) : (
            product.contentBlocks.map((b) => {
              // 정렬 클래스
              const alignClass = 
                b.align === 'center' ? 'text-center' :
                b.align === 'right' ? 'text-right' : 'text-left';

              // 형광펜 스타일
              const highlightStyle = 
                b.highlight === 'yellow' ? { backgroundColor: '#fef08a', padding: '0.15em 0.35em', borderRadius: '0.25em' } :
                b.highlight === 'green' ? { backgroundColor: '#bbf7d0', padding: '0.15em 0.35em', borderRadius: '0.25em' } : {};

              if (b.type === 'h1') {
                return (
                  <h2 key={b.id} className={`text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug my-6 ${alignClass}`}>
                    <span style={highlightStyle}>{b.text}</span>
                  </h2>
                );
              }

              if (b.type === 'h2') {
                return (
                  <h3 key={b.id} className={`text-xl sm:text-2xl font-bold text-slate-800 leading-snug mt-6 mb-3 ${alignClass}`}>
                    <span style={highlightStyle}>{b.text}</span>
                  </h3>
                );
              }

              if (b.type === 'image') {
                return (
                  <div key={b.id} className="my-8 text-center space-y-2">
                    <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-50">
                      <img src={b.url} alt={b.caption || '상세 이미지'} className="w-full h-auto object-cover max-h-[500px]" />
                    </div>
                    {b.caption && (
                      <p className="text-xs text-slate-500 font-medium italic">
                        {b.caption}
                      </p>
                    )}
                  </div>
                );
              }

              // 기본 본문 p (줄바꿈 지원)
              return (
                <div key={b.id} className={`text-base text-slate-700 leading-relaxed my-3 ${alignClass}`}>
                  <span style={highlightStyle} className="whitespace-pre-line">
                    {b.text}
                  </span>
                </div>
              );
            })
          )}

          {/* 블로그 하단 대표 약속 배너 */}
          <div className="mt-12 pt-8 border-t border-slate-100 bg-slate-50 rounded-2xl p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-judiaistudio-royalBlueLight text-judiaistudio-royalBlue mx-auto flex items-center justify-center font-bold">
              주디
            </div>
            <h4 className="text-base font-bold text-slate-900">
              "과장 없는 1:1 맞춤 소통으로 함께합니다"
            </h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              본 과정에 대해 더 궁금한 점이 있으시거나 내 상황에 맞는지 진단받고 싶으시다면, 언제든 부담 없이 1:1 상담을 요청해 주세요.
            </p>
            <button
              onClick={onOpenConsulting}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white text-xs font-bold shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-judiaistudio-gold" />
              <span>1:1 상담 신청하기</span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

