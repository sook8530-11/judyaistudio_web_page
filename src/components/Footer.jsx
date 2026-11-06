import React, { useState } from 'react';
import { Sparkles, Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | 'refund' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단 푸터 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-judiaistudio-royalBlue text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-judiaistudio-gold" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                주디AI스튜디오
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              과장 없는 정직한 안내와 1:1 맞춤 소통으로 시작하는 나만의 AI 지식 비즈니스 본진. 당신의 소중한 경험을 세상에 통하는 자산으로 바꿉니다.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col sm:flex-row justify-between gap-6">
            <div>
              <div className="text-white font-bold mb-3 text-sm">바로가기</div>
              <ul className="space-y-2">
                <li><a href="#philosophy" className="hover:text-white transition-colors">철학과 약속</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors">VOD & 코칭 프로그램</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">수강생 후기</a></li>
                <li><a href="#free-guide" className="hover:text-white transition-colors">무료 스타터킷 다운로드</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-3 text-sm">신뢰 정책 & 약관</div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setActiveModal('refund')} className="hover:text-white transition-colors text-amber-400 font-semibold">
                    투명한 환불 정책
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">
                    서비스 이용약관
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">
                    개인정보처리방침
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold mb-3 text-sm">고객 지원 & 상담</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                평일 10:00 - 18:00 (주말/공휴일 휴무)<br />
                상담 문의: support@judiaistudio.com<br />
                카카오톡: @주디AI스튜디오
              </p>
            </div>
          </div>
        </div>

        {/* 하단 사업자 정보 및 카피라이트 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="space-y-1 text-center sm:text-left">
            <div>
              상호: 주디AI스튜디오 | 대표자: 주디 | 사업자등록번호: 000-00-00000 | 통신판매업신고: 제2026-서울강남-0000호
            </div>
            <div>
              주소: 서울특별시 강남구 테헤란로 000 주디AI스튜디오 | 개인정보보호책임자: 주디
            </div>
            <div className="pt-1 text-slate-400">
              Copyright © 2026 주디AI스튜디오 (Judy AI Studio). All rights reserved.
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 flex-shrink-0"
            title="맨 위로 가기"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-xs font-semibold">TOP</span>
          </button>
        </div>

      </div>

      {/* 약관/환불 모달 */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn text-slate-800">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h4 className="text-lg font-bold text-slate-900 border-b pb-2">
              {activeModal === 'refund' && '🛡️ 투명한 환불 정책 안내'}
              {activeModal === 'terms' && '서비스 이용약관'}
              {activeModal === 'privacy' && '개인정보처리방침'}
            </h4>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2 max-h-60 overflow-y-auto">
              {activeModal === 'refund' && (
                <>
                  <p><strong>1. VOD 동영상 강의:</strong> 결제일로부터 7일 이내이며 영상 재생 이력이 없는 경우 100% 전액 환불됩니다. 1강 이상 시청 시에는 잔여 비율에 따라 환불됩니다.</p>
                  <p><strong>2. 1:1 밀착 코칭 세션:</strong> 예약 일정 시작 24시간 전까지 취소 시 100% 전액 환불 가능합니다. 24시간 이내 취소 시에는 1회 무료 일정 변경을 지원합니다.</p>
                  <p><strong>3. 기간 이용권(올패스):</strong> 구매 후 콘텐츠 열람 이력이 없는 경우 7일 이내 환불 가능합니다. 본 이용권은 자동 연장 결제되지 않습니다.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <p>본 약관은 주디AI스튜디오가 제공하는 온라인 강의, VOD, 1:1 코칭 및 관련 제반 서비스의 이용 조건과 권리·의무를 규정합니다. 회원은 관련 법령과 공서양속을 준수하여 서비스를 성실히 이용해야 합니다.</p>
              )}
              {activeModal === 'privacy' && (
                <p>주디AI스튜디오는 회원의 개인정보를 소중히 보호하며, 서비스 제공 및 상담 목적 이외의 용도로 사용하거나 동의 없이 제3자에게 제공하지 않습니다. 수집 항목: 이름, 연락처, 이메일.</p>
              )}
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

