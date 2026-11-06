import React from 'react';
import { CheckCircle, Sparkles, X, Download, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function PaymentSuccessModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6 animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 축하 배너 */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-judiaistudio-royalBlue mx-auto shadow-inner">
            <CheckCircle className="w-9 h-9 text-judiaistudio-royalBlue" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>토스페이먼츠 안전 결제 승인 완료</span>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 tracking-tight pt-1">
              결제가 완료되었습니다! 감사합니다.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              주디AI스튜디오와 함께하는 새로운 도전을 진심으로 환영하고 응원합니다.
            </p>
          </div>
        </div>

        {/* 영수증 명세 카드 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">결제 승인 내역</span>
            <span className="font-mono text-slate-500">주문번호: {order.id}</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">구매 상품</span>
              <span className="font-bold text-slate-900 max-w-[220px] truncate text-right">{order.productTitle}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600">결제 수단</span>
              <span className="font-medium text-slate-800">{order.paymentMethod || '토스페이 / 카드'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600">구매자</span>
              <span className="font-medium text-slate-800">{order.customerName} {order.customerEmail ? `(${order.customerEmail})` : ''}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600">결제 일시</span>
              <span className="font-mono text-slate-600">{order.paidAt}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-800 text-sm">최종 결제 금액</span>
              <span className="text-2xl font-black font-mono text-judiaistudio-royalBlue">
                {order.amount === 0 ? '0' : Number(order.amount).toLocaleString()}
                <span className="text-sm font-bold text-slate-900 ml-1">원</span>
              </span>
            </div>
          </div>
        </div>

        {/* 수강 및 안내 알림 */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
          <FileText className="w-4 h-4 text-judiaistudio-royalBlue flex-shrink-0 mt-0.5" />
          <div>
            <strong>안내:</strong> 입력하신 이메일로 수강 등록 완료 안내 및 영수증이 발송되었습니다. 1:1 코칭의 경우 주디 대표가 24시간 내 유선으로 일정을 조율해 드립니다.
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-judiaistudio-royalBlue/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <span>확인 및 메인 홈으로 돌아가기</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
