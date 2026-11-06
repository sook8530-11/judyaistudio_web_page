import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import ProgramsPreview from './components/ProgramsPreview';
import ReviewMarquee from './components/ReviewMarquee';
import FreeGuideSection from './components/FreeGuideSection';
import FaqSection from './components/FaqSection';
import ClosingCta from './components/ClosingCta';
import Footer from './components/Footer';
import ConsultingModal from './components/ConsultingModal';
import NewsletterModal from './components/NewsletterModal';
import AdminDashboard from './components/AdminDashboard';
import ProductDetailView from './components/ProductDetailView';
import ProductEditModal from './components/ProductEditModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { getStoredProducts, updateProduct, deleteProduct } from './utils/storage';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'admin' | 'product-detail'
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // 모달 상태
  const [isConsultingOpen, setIsConsultingOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  // 전역 상품 수정 및 삭제 모달 상태
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // 전역 토스트 알림 상태
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 동적 상품 데이터 상태 (localStorage 실시간 연동)
  const [products, setProducts] = useState(getStoredProducts);

  const refreshProducts = () => {
    setProducts(getStoredProducts());
  };

  // localStorage 변경 및 커스텀 이벤트 실시간 감지
  useEffect(() => {
    const handleStorageChange = () => {
      refreshProducts();
    };
    window.addEventListener('judiaistudio_products_updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('judiaistudio_products_updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 화면 전환 핸들러
  const handleToggleAdmin = () => {
    if (viewMode === 'admin') {
      setViewMode('home');
      refreshProducts();
    } else {
      setViewMode('admin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setViewMode('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setSelectedProductId(null);
    refreshProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 전역 상품 수정 저장 핸들러
  const handleSaveProductEdit = (updatedProduct) => {
    updateProduct(updatedProduct.id, updatedProduct);
    refreshProducts();
    setEditingProduct(null);
    showToast(`✅ "${updatedProduct.title}" 수정사항이 안전하게 저장되었습니다.`);
  };

  // 전역 상품 삭제 확인 및 실행 핸들러
  const handleConfirmProductDelete = (id) => {
    const target = products.find(p => String(p.id) === String(id));
    const title = target?.title || '상품';
    deleteProduct(id);
    refreshProducts();
    setDeletingProduct(null);
    
    // 만약 현재 삭제된 상품의 상세페이지를 보고 있었다면 홈으로 이동
    if (String(selectedProductId) === String(id)) {
      setSelectedProductId(null);
      setViewMode('home');
    }
    
    showToast(`🗑️ "${title}" 상품이 안전하게 삭제되었습니다.`);
  };

  const selectedProduct = products.find(p => String(p.id) === String(selectedProductId));

  return (
    <div className="min-h-screen flex flex-col bg-judiaistudio-background text-judiaistudio-textMain font-sans selection:bg-judiaistudio-royalBlue selection:text-white">
      
      {/* 전역 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. 상단 글로벌 네비게이션 헤더 */}
      <Header
        viewMode={viewMode}
        onToggleAdmin={handleToggleAdmin}
        onOpenConsulting={() => setIsConsultingOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* 2. 조건부 메인 뷰 렌더링 */}
      {viewMode === 'admin' ? (
        // [A] 관리자 대시보드 뷰
        <AdminDashboard
          onBackToHome={handleBackToHome}
          onSelectProductView={handleSelectProduct}
        />
      ) : viewMode === 'product-detail' ? (
        // [B] 고객용 독립 상세페이지 뷰 (/products/:id)
        <ProductDetailView
          product={selectedProduct}
          onBack={handleBackToHome}
          onOpenConsulting={() => setIsConsultingOpen(true)}
          onEditProduct={(p) => setEditingProduct(p)}
          onDeleteProduct={(p) => setDeletingProduct(p)}
        />
      ) : (
        // [C] 일반 고객용 메인 홈 화면 (롱스크롤)
        <main className="flex-1">
          {/* 히어로 섹션 (React Bits LiquidEther 인터랙티브 배경) */}
          <HeroSection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 3대 철학 기둥 섹션 (대표 프로필 포함) */}
          <PhilosophySection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 실전 프로그램 라인업 (1:1 정사각 썸네일 & 즉시 수정/삭제 퀵액션 연동) */}
          <ProgramsPreview
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenConsulting={() => setIsConsultingOpen(true)}
            onEditProduct={(p) => setEditingProduct(p)}
            onDeleteProduct={(p) => setDeletingProduct(p)}
          />

          {/* 수강생 후기 무한 마퀴 롤링 섹션 */}
          <ReviewMarquee />

          {/* 무료 가이드북 다운로드 리드마그넷 */}
          <FreeGuideSection />

          {/* 자주 묻는 질문 FAQ 아코디언 */}
          <FaqSection />

          {/* 최하단 클로징 CTA 배너 */}
          <ClosingCta onOpenConsulting={() => setIsConsultingOpen(true)} />
        </main>
      )}

      {/* 3. 푸터 (홈 및 상세페이지에서 렌더링) */}
      {viewMode !== 'admin' && (
        <Footer onOpenNewsletter={() => setIsNewsletterOpen(true)} />
      )}

      {/* 4. 1:1 상담 신청 모달 */}
      <ConsultingModal
        isOpen={isConsultingOpen}
        onClose={() => setIsConsultingOpen(false)}
      />

      {/* 5. 팝업형 뉴스레터 구독 모달 */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        onSubscriberAdded={refreshProducts}
      />

      {/* 6. 전역 상품 정보 및 상세페이지 수정 모달 */}
      <ProductEditModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveProductEdit}
        onDelete={(p) => {
          setEditingProduct(null);
          setDeletingProduct(p);
        }}
      />

      {/* 7. 전역 상품 삭제 확인 커스텀 모달 */}
      <DeleteConfirmModal
        product={deletingProduct}
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmProductDelete}
      />

    </div>
  );
}
