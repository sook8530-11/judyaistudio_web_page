import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ product, isOpen, onClose, onConfirm }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl space-y-5 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 경고 아이콘 & 헤더 */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">상품 삭제 확인</h3>
            <p className="text-xs text-slate-400">삭제 후에는 즉시 목록과 메인 홈에서 제거됩니다.</p>
          </div>
        </div>

        {/* 삭제 대상 상품 미리보기 카드 */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-600/60 flex-shrink-0 aspect-square">
            {product.thumbnail ? (
              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No img</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {product.category || '상품'}
            </span>
            <h4 className="text-sm font-bold text-white truncate mt-1">{product.title}</h4>
            <p className="text-xs font-mono text-emerald-400 font-bold mt-0.5">
              {product.price === 0 ? '무료' : `${Number(product.price).toLocaleString()}원`}
            </p>
          </div>
        </div>

        {/* 경고 안내문 */}
        <p className="text-xs text-slate-300 bg-red-950/40 border border-red-800/40 p-3 rounded-xl leading-relaxed">
          ⚠️ 정말로 이 상품을 삭제하시겠습니까?<br />
          이 작업은 되돌릴 수 없으며, 고객이 보는 메인 홈 화면에서도 즉시 제외됩니다.
        </p>

        {/* 하단 액션 버튼 */}
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>예, 삭제합니다</span>
          </button>
        </div>

      </div>
    </div>
  );
}
