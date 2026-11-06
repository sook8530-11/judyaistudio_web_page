import React, { useState } from 'react';
import { 
  PlayCircle, MessageCircle, ArrowRight, Tag, Eye, Layers, Sparkles 
} from 'lucide-react';

export default function ProgramsPreview({ 
  products, 
  onSelectProduct, 
  onOpenConsulting,
  onPurchaseProduct 
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { key: 'ALL', label: '전체 보기' },
    { key: 'VOD', label: 'VOD 강의' },
    { key: '1:1코칭', label: '1:1 프라이빗 코칭' },
    { key: '전자책', label: '전자책' },
    { key: '무료배포', label: '무료 배포' },
  ];

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="programs" className="py-24 bg-judiaistudio-background border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-judiaistudio-royalBlue text-xs font-bold font-mono tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5 text-judiaistudio-gold" />
            PROGRAMS & COURSES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-judiaistudio-textMain tracking-tight">
            내 상황에 맞게 선택하는 <br className="hidden sm:block" />
            <span className="text-judiaistudio-royalBlue">실전 프로그램 라인업</span>
          </h2>
          <p className="text-base sm:text-lg text-judiaistudio-textSub">
            이론만 늘어놓는 강의는 이제 그만. 결과물이 손에 잡히는 검증된 코스로 시작하세요.
          </p>
        </div>

        {/* 카테고리 필터 탭 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-judiaistudio-royalBlue text-white shadow-md shadow-judiaistudio-royalBlue/20 scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
              }`}
            >
              {cat.label}
              {cat.key !== 'ALL' && (
                <span className="ml-1.5 opacity-70">
                  ({products.filter(p => p.category === cat.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 상품 카드 그리드: 모든 카드 썸네일에 1:1 정사각(aspect-square) 적용 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-judiaistudio-royalBlue/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 1:1 정사각 썸네일 (aspect-square & object-cover 완벽 적용) */}
                <div className="relative w-full aspect-square bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(p.id)}>
                  <img
                    src={p.thumbnail || p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                      <Eye className="w-3.5 h-3.5" />
                      <span>자세히 보기</span>
                    </span>
                  </div>

                  {/* 뱃지 */}
                  <div className="absolute top-4 left-4 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-judiaistudio-royalBlue shadow-md">
                      {p.category}
                    </span>
                    {p.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* 본문 정보 */}
                <div className="p-6 space-y-3">
                  <h3 
                    onClick={() => onSelectProduct(p.id)}
                    className="text-xl font-bold text-judiaistudio-textMain group-hover:text-judiaistudio-royalBlue transition-colors line-clamp-2 cursor-pointer"
                  >
                    {p.title}
                  </h3>

                  <p className="text-xs text-judiaistudio-textSub line-clamp-2 leading-relaxed">
                    {p.summary || p.description || '주디AI스튜디오에서 제공하는 검증된 실무 지식 비즈니스 프로그램입니다.'}
                  </p>

                  {/* 가격 */}
                  <div className="pt-2 flex items-baseline gap-2">
                    {p.originalPrice > p.price && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {p.originalPrice.toLocaleString()}원
                      </span>
                    )}
                    <span className="text-2xl font-extrabold font-mono text-judiaistudio-royalBlue">
                      {p.price === 0 ? '무료' : `${p.price.toLocaleString()}원`}
                    </span>
                  </div>
                </div>
              </div>

              {/* 카드 하단 액션 버튼 그룹 */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => onSelectProduct(p.id)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>자세히 보기</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (p.price === 0) {
                      onOpenConsulting();
                    } else if (onPurchaseProduct) {
                      onPurchaseProduct(p);
                    } else {
                      onOpenConsulting();
                    }
                  }}
                  className="flex-1 py-3 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white font-bold text-xs shadow-md shadow-judiaistudio-royalBlue/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{p.price === 0 ? '무료 다운로드' : '구매하기'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
