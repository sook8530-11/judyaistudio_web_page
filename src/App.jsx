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
import AdminLoginModal from './components/AdminLoginModal';
import AuthModal from './components/AuthModal';
import { 
  getStoredProducts, updateProduct, deleteProduct, 
  getCurrentUser, setCurrentUser as saveCurrentUser, clearCurrentUser 
} from './utils/storage';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'admin' | 'product-detail'
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // 로그인 회원 상태 관리 (수강생 / 관리자)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return getCurrentUser();
    } catch {
      return null;
    }
  });

  // 관리자 인증 상태 (currentUser가 admin이거나 세션 스토리지 인증 시 활성화)
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const u = getCurrentUser();
      return u?.role === 'admin' || sessionStorage.getItem('judiaistudio_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  
  // 인증 모달 상태
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'signup'
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

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

  // 키보드 단축키 (Ctrl+Shift+A) 또는 URL ?admin=true 감지하여 관리자 로그인 모달 열기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setAuthModalTab('login');
        setAuthModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (window.location.search.includes('admin=true') || window.location.search.includes('admin=1')) {
      setAuthModalTab('login');
      setAuthModalOpen(true);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // [로그인 / 회원가입] 모달 열기
  const handleOpenAuth = (initialTab = 'login') => {
    setAuthModalTab(initialTab);
    setAuthModalOpen(true);
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    saveCurrentUser(user, true);
    setAuthModalOpen(false);

    if (user.role === 'admin') {
      setIsAdmin(true);
      sessionStorage.setItem('judiaistudio_admin_authenticated', 'true');
      setViewMode('admin');
      showToast(`🔓 ${user.name}님 환영합니다! (관리자 대시보드 진입)`);
    } else {
      showToast(`👋 ${user.name}님, 로그인되었습니다!`);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('judiaistudio_admin_authenticated');
    setViewMode('home');
    showToast('안전하게 로그아웃되었습니다.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 관리자 모드 토글 핸들러
  const handleToggleAdmin = () => {
    if (viewMode === 'admin') {
      setViewMode('home');
      refreshProducts();
    } else {
      if (!isAdmin && currentUser?.role !== 'admin') {
        setAuthModalTab('login');
        setAuthModalOpen(true);
      } else {
        setViewMode('admin');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 관리자 전용 팝업 인증 성공 핸들러
  const handleAdminLoginSuccess = () => {
    const adminUser = {
      id: 'user-admin',
      name: '주디 대표',
      email: 'admin@judiaistudio.com',
      role: 'admin'
    };
    handleLoginSuccess(adminUser);
    setIsAdminLoginOpen(false);
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

  // 전역 상품 수정 저장 핸들러 (관리자 대시보드 내부에서만 호출됨)
  const handleSaveProductEdit = (updatedProduct) => {
    updateProduct(updatedProduct.id, updatedProduct);
    refreshProducts();
    setEditingProduct(null);
    showToast(`✅ "${updatedProduct.title}" 수정사항이 안전하게 저장되었습니다.`);
  };

  // 전역 상품 삭제 확인 및 실행 핸들러 (관리자 대시보드 내부에서만 호출됨)
  const handleConfirmProductDelete = (id) => {
    const target = products.find(p => String(p.id) === String(id));
    const title = target?.title || '상품';
    deleteProduct(id);
    refreshProducts();
    setDeletingProduct(null);
    
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

      {/* 1. 상단 글로벌 네비게이션 헤더: 관리자 버튼 대신 [로그인], [회원가입] 버튼 배치 */}
      <Header
        viewMode={viewMode}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onToggleAdmin={handleToggleAdmin}
        onOpenConsulting={() => setIsConsultingOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* 2. 조건부 메인 뷰 렌더링 */}
      {viewMode === 'admin' ? (
        // [A] 관리자 대시보드 뷰 (인증된 관리자에게만 제공)
        <AdminDashboard
          onBackToHome={handleBackToHome}
          onSelectProductView={handleSelectProduct}
          onLogout={handleLogout}
        />
      ) : viewMode === 'product-detail' ? (
        // [B] 고객용 독립 상세페이지 뷰 (/products/:id, 수강생 화면: 관리자 버튼 완전 제거)
        <ProductDetailView
          product={selectedProduct}
          onBack={handleBackToHome}
          onOpenConsulting={() => setIsConsultingOpen(true)}
        />
      ) : (
        // [C] 일반 수강생/고객용 메인 홈 화면 (관리자 버튼 완전 은닉, 100% 수강생 전용 UI)
        <main className="flex-1">
          {/* 히어로 섹션 (React Bits LiquidEther 인터랙티브 배경) */}
          <HeroSection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 3대 철학 기둥 섹션 (대표 프로필 포함) */}
          <PhilosophySection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 실전 프로그램 라인업 (1:1 정사각 썸네일, 수강생에게는 수정/삭제 버튼 전혀 없는 순수 진열) */}
          <ProgramsPreview
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenConsulting={() => setIsConsultingOpen(true)}
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

      {/* 3. 푸터 (홈 및 상세페이지에서 렌더링, 최하단에 관리자 인증 비밀 링크 탑재) */}
      {viewMode !== 'admin' && (
        <Footer 
          onOpenNewsletter={() => setIsNewsletterOpen(true)} 
          onOpenAdminLogin={() => handleOpenAuth('login')}
        />
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

      {/* 6. [로그인] 및 [회원가입] 통합 모달 */}
      <AuthModal
        isOpen={authModalOpen}
        initialTab={authModalTab}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 7. 관리자 비밀번호 인증 로그인 모달 (단축키 또는 푸터 자물쇠) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* 8. 전역 상품 정보 및 상세페이지 수정 모달 (관리자 모드 전용) */}
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

      {/* 9. 전역 상품 삭제 확인 커스텀 모달 (관리자 모드 전용) */}
      <DeleteConfirmModal
        product={deletingProduct}
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmProductDelete}
      />

    </div>
  );
}
