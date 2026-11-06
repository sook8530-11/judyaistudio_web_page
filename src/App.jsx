import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import PortfolioShowcaseSection from './components/PortfolioShowcaseSection';
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
import TossPaymentModal from './components/TossPaymentModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import { 
  getStoredProducts, saveStoredProducts, updateProduct, deleteProduct, 
  getCurrentUser, setCurrentUser as saveCurrentUser, clearCurrentUser 
} from './utils/storage';
import { fetchProductsFromDb, fetchProductByIdFromDb } from './utils/supabaseClient';
import { CheckCircle, Settings } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'admin' | 'product-detail'
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // 토스페이먼츠 결제 모달 상태
  const [purchasingProduct, setPurchasingProduct] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  
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

  // 동적 상품 데이터 상태 (Supabase 원격 DB 비동기 로딩 + LocalStorage 캐시)
  const [products, setProducts] = useState(getStoredProducts);

  const refreshProducts = async () => {
    setProducts(getStoredProducts());
    try {
      const cloudProds = await fetchProductsFromDb();
      if (cloudProds && cloudProds.length > 0) {
        setProducts(cloudProds);
      }
    } catch (e) {
      console.warn('refreshProducts note:', e);
    }
  };

  // 1. Supabase 원격 DB 'products' 테이블 비동기 Select 가져오기 및 URL 해시 라우팅 감지
  useEffect(() => {
    let isMounted = true;
    fetchProductsFromDb().then((cloudProds) => {
      if (isMounted && cloudProds && cloudProds.length > 0) {
        setProducts(cloudProds);
        saveStoredProducts(cloudProds);
      }
    }).catch(err => console.warn('Supabase initial fetch notice:', err));

    // URL 해시 기반 라우팅 (#/products/:id, #admin 등) 감지
    const checkHashRoute = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || window.location.pathname === '/admin') {
        const u = getCurrentUser();
        const authed = u?.role === 'admin' || sessionStorage.getItem('judiaistudio_admin_authenticated') === 'true';
        if (authed) {
          setViewMode('admin');
        } else {
          setAuthModalTab('login');
          setAuthModalOpen(true);
        }
        return;
      }
      const match = window.location.hash.match(/#\/?products\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        setSelectedProductId(match[1]);
        setViewMode('product-detail');
      }
    };
    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);

    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', checkHashRoute);
    };
  }, []);

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

  const handleSelectProduct = async (id) => {
    setSelectedProductId(id);
    setViewMode('product-detail');
    window.location.hash = `/products/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Supabase 원격 DB에서 최신 데이터 비동기 단일 조회 (Select by ID)
    try {
      const cloudItem = await fetchProductByIdFromDb(id);
      if (cloudItem) {
        setProducts((prev) => {
          const exists = prev.some((p) => String(p.id) === String(id));
          if (exists) {
            return prev.map((p) => (String(p.id) === String(id) ? cloudItem : p));
          }
          return [cloudItem, ...prev];
        });
      }
    } catch (e) {
      console.warn('fetchProductById note:', e);
    }
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setSelectedProductId(null);
    if (window.location.hash.includes('/products/') || window.location.hash.includes('admin')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
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

      {/* 1. 상단 글로벌 네비게이션 헤더: 관리자 대시보드에서는 숨기고 고객 화면(홈, 상세페이지)에서만 상용 기준의 클린 헤더 노출 */}
      {viewMode !== 'admin' && (
        <Header
          viewMode={viewMode}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          onToggleAdmin={handleToggleAdmin}
          onOpenConsulting={() => setIsConsultingOpen(true)}
          onOpenNewsletter={() => setIsNewsletterOpen(true)}
        />
      )}

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
          onPurchaseProduct={(p) => setPurchasingProduct(p)}
        />
      ) : (
        // [C] 일반 수강생/고객용 메인 홈 화면 (관리자 버튼 완전 은닉, 100% 수강생 전용 UI)
        <main className="flex-1">
          {/* 히어로 섹션 (React Bits LiquidEther 인터랙티브 배경) */}
          <HeroSection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 3대 철학 기둥 섹션 (대표 프로필 포함) */}
          <PhilosophySection onOpenConsulting={() => setIsConsultingOpen(true)} />

          {/* 영화제 수상 & 교보문고 출간작 포트폴리오 쇼케이스 섹션 */}
          <PortfolioShowcaseSection />

          {/* 실전 프로그램 라인업 (1:1 정사각 썸네일, 수강생에게는 수정/삭제 버튼 전혀 없는 순수 진열) */}
          <ProgramsPreview
            products={products}
            onSelectProduct={handleSelectProduct}
            onOpenConsulting={() => setIsConsultingOpen(true)}
            onPurchaseProduct={(p) => setPurchasingProduct(p)}
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

      {/* 3-1. 관리자 전용 플로팅 퀵 버튼 (일반 방문자에게는 절대 보이지 않으며, 관리자 로그인 상태에서 고객 홈을 열람할 때만 우측 하단에 조용히 플로팅) */}
      {isAdmin && viewMode !== 'admin' && (
        <aside 
          aria-label="관리자 제어 패널"
          className="fixed bottom-6 right-6 z-50 animate-fadeIn"
        >
          <button
            type="button"
            onClick={handleToggleAdmin}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/95 text-amber-300 border border-amber-400/50 shadow-2xl backdrop-blur-md hover:bg-black hover:border-amber-300 hover:scale-105 transition-all text-xs font-bold group cursor-pointer"
            title="관리자 대시보드로 이동"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Settings className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
            <span>관리자 대시보드</span>
          </button>
        </aside>
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

      {/* 10. 토스페이먼츠 안전 결제 모달 (테스트 위젯 모드) */}
      <TossPaymentModal
        isOpen={!!purchasingProduct}
        product={purchasingProduct}
        currentUser={currentUser}
        onClose={() => setPurchasingProduct(null)}
        onSuccess={(order) => {
          setCompletedOrder(order);
          refreshProducts();
          showToast(`💳 "${order.productTitle}" 주문 및 결제가 안전하게 승인되었습니다!`);
        }}
      />

      {/* 11. 결제 완료 승인 영수증 알림 모달 */}
      <PaymentSuccessModal
        isOpen={!!completedOrder}
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

    </div>
  );
}
