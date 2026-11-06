import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Check, CreditCard, Smartphone, Building, 
  Sparkles, Lock, ArrowRight, Loader2, CheckCircle2 
} from 'lucide-react';
import { addOrder } from '../utils/storage';

export default function TossPaymentModal({ isOpen, product, currentUser, onClose, onSuccess }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('toss_pay'); // 'toss_pay' | 'card' | 'kakao' | 'naver' | 'virtual_account' | 'phone'
  const [selectedCard, setSelectedCard] = useState('신한카드');
  const [agreeAll, setAgreeAll] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // 모달이 열릴 때 사용자 정보 자동 채우기
  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || '');
      setCustomerEmail(currentUser.email || '');
      setCustomerPhone(currentUser.phone || '010-1234-5678');
    } else {
      setCustomerName('김지식 (수강생)');
      setCustomerEmail('student@example.com');
      setCustomerPhone('010-1234-5678');
    }
  }, [currentUser, isOpen]);

  // ESC 키 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || !product) return null;

  // 카드 목록
  const cardList = ['현대카드', '삼성카드', '신한카드', 'KB국민카드', '롯데카드', '우리카드', '하나카드', 'NH농협'];

  // 결제 수단 명칭 매핑
  const getMethodName = () => {
    switch (paymentMethod) {
      case 'toss_pay': return '토스페이 간편결제';
      case 'card': return `신용/체크카드 (${selectedCard})`;
      case 'kakao': return '카카오페이';
      case 'naver': return '네이버페이';
      case 'virtual_account': return '가상계좌 (무통장입금)';
      case 'phone': return '휴대폰 결제';
      default: return '토스페이먼츠 간편결제';
    }
  };

  // 결제 요청 처리 (테스트 모드 가상 위젯 연동)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!agreeAll) {
      alert('결제 진행 필수 약관에 동의해 주세요.');
      return;
    }

    setIsProcessing(true);

    // 토스페이먼츠 안전 통신 및 승인 시뮬레이션 (1.2초)
    setTimeout(() => {
      const orderPayload = {
        id: 'ORD-' + Date.now().toString().slice(-8),
        productId: product.id,
        productTitle: product.title,
        category: product.category || '강의',
        amount: Number(product.price) || 0,
        paymentMethod: getMethodName(),
        customerName: customerName.trim() || '수강생',
        customerEmail: customerEmail.trim() || 'student@example.com',
        customerPhone: customerPhone.trim() || '010-1234-5678',
      };

      // 1. 주문 내역 저장
      const savedOrder = addOrder(orderPayload);
      setIsProcessing(false);

      // 2. 부모 컴포넌트에 결제 성공 전달
      onSuccess(savedOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 토스페이먼츠 브랜드 헤더 */}
        <div className="px-6 py-4 bg-[#0064FF] text-white flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-black text-[#0064FF] text-sm shadow">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight">Toss Payments</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 border border-white/30 text-white font-mono">
                  가상 테스트 결제창
                </span>
              </div>
              <p className="text-[10px] text-white/80">안전한 128bit SSL 암호화 결제 세션</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 결제 진행 중 로딩 오버레이 */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
            <Loader2 className="w-12 h-12 text-[#0064FF] animate-spin" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">토스페이먼츠 안전 결제 승인 중...</h3>
              <p className="text-xs text-slate-500">
                테스트 모드 가상 결제를 처리하고 있습니다. 잠시만 기다려 주세요.
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-50 text-[#0064FF] text-xs font-mono font-bold">
              결제 금액: {product.price === 0 ? '0' : Number(product.price).toLocaleString()}원
            </div>
          </div>
        )}

        {/* 결제 모달 본문 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          <form id="toss-payment-form" onSubmit={handlePaymentSubmit} className="space-y-6">

            {/* 1. 상품 정보 요약 (실시간 연동 데이터 표시) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-square flex-shrink-0">
                <img 
                  src={product.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300'} 
                  alt={product.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-judiaistudio-royalBlue">
                  {product.category || 'VOD'}
                </span>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-1">
                  {product.title}
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  주디AI스튜디오 공식 라이선스 즉시 발급
                </div>
              </div>

              {/* 실시간 연동 결제 금액 */}
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] text-slate-400">결제 금액</div>
                <div className="text-xl font-black font-mono text-[#0064FF]">
                  {product.price === 0 ? '무료' : `${Number(product.price).toLocaleString()}원`}
                </div>
              </div>
            </div>

            {/* 2. 토스페이먼츠 결제 수단 선택 위젯 */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  결제 수단 선택
                </label>
                <span className="text-[11px] text-slate-400">토스페이먼츠 간편위젯</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {/* 토스페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('toss_pay')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'toss_pay'
                      ? 'bg-blue-50/70 border-[#0064FF] text-[#0064FF] shadow-sm ring-1 ring-[#0064FF]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm text-[#0064FF]">toss pay</span>
                    {paymentMethod === 'toss_pay' && <Check className="w-3.5 h-3.5 text-[#0064FF]" />}
                  </div>
                  <span className="text-xs font-bold">토스페이</span>
                </button>

                {/* 신용/체크카드 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50/70 border-[#0064FF] text-[#0064FF] shadow-sm ring-1 ring-[#0064FF]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                    {paymentMethod === 'card' && <Check className="w-3.5 h-3.5 text-[#0064FF]" />}
                  </div>
                  <span className="text-xs font-bold">카드 결제</span>
                </button>

                {/* 카카오페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('kakao')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'kakao'
                      ? 'bg-[#FEE500]/20 border-amber-400 text-slate-900 shadow-sm ring-1 ring-amber-400'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-[#3C1E1E]">kakao</span>
                    {paymentMethod === 'kakao' && <Check className="w-3.5 h-3.5 text-slate-900" />}
                  </div>
                  <span className="text-xs font-bold">카카오페이</span>
                </button>

                {/* 네이버페이 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('naver')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'naver'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-[#03C75A]">N pay</span>
                    {paymentMethod === 'naver' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <span className="text-xs font-bold">네이버페이</span>
                </button>

                {/* 가상계좌 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('virtual_account')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'virtual_account'
                      ? 'bg-blue-50/70 border-[#0064FF] text-[#0064FF] shadow-sm ring-1 ring-[#0064FF]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Building className="w-4 h-4 text-slate-600" />
                    {paymentMethod === 'virtual_account' && <Check className="w-3.5 h-3.5 text-[#0064FF]" />}
                  </div>
                  <span className="text-xs font-bold">가상계좌</span>
                </button>

                {/* 휴대폰 결제 */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('phone')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'phone'
                      ? 'bg-blue-50/70 border-[#0064FF] text-[#0064FF] shadow-sm ring-1 ring-[#0064FF]'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Smartphone className="w-4 h-4 text-slate-600" />
                    {paymentMethod === 'phone' && <Check className="w-3.5 h-3.5 text-[#0064FF]" />}
                  </div>
                  <span className="text-xs font-bold">휴대폰 결제</span>
                </button>
              </div>

              {/* 신용카드 선택 시 카드사 드롭다운 */}
              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                  <span className="text-xs font-bold text-slate-700">카드사 선택</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cardList.map((card) => (
                      <button
                        key={card}
                        type="button"
                        onClick={() => setSelectedCard(card)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedCard === card
                            ? 'bg-[#0064FF] text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {card}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. 구매자 정보 */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800">구매자 정보</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="구매자 성함"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0064FF]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="휴대폰 번호"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0064FF] font-mono"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="영수증 수신 이메일 주소"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0064FF] font-mono"
                />
              </div>
            </div>

            {/* 4. 약관 동의 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={agreeAll}
                  onChange={(e) => setAgreeAll(e.target.checked)}
                  className="w-4 h-4 text-[#0064FF] rounded focus:ring-0"
                />
                <span>결제 진행 및 구매 조건에 모두 동의합니다.</span>
              </label>
              <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                전자금융거래 이용약관 및 개인정보 제공·수집에 동의하며, 7일 이내 미이용 시 100% 전액 환불 정책이 적용됩니다.
              </p>
            </div>

          </form>
        </div>

        {/* 하단 결제하기 버튼 바 */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-[11px] text-slate-500">최종 승인 금액</div>
            <div className="text-2xl font-black font-mono text-[#0064FF]">
              {product.price === 0 ? '0' : Number(product.price).toLocaleString()}
              <span className="text-sm font-bold text-slate-800 ml-1">원</span>
            </div>
          </div>

          <button
            type="submit"
            form="toss-payment-form"
            disabled={isProcessing}
            className="flex-1 py-4 px-6 rounded-2xl bg-[#0064FF] hover:bg-blue-600 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-white" />
            <span>
              {product.price === 0 ? '무료 다운로드 신청' : `${Number(product.price).toLocaleString()}원 안전 결제하기`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
