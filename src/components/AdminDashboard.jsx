import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit3, Trash2, UploadCloud, Link as LinkIcon, 
  Layers, Users, CheckCircle, ArrowLeft, Image as ImageIcon,
  Download, FileSpreadsheet, Eye, Sparkles, AlertTriangle, RotateCcw,
  LogOut 
} from 'lucide-react';
import { 
  getStoredProducts, addProduct, updateProduct, deleteProduct, 
  getStoredSubscribers, deleteSubscriber, compressImage, resetDefaultProducts,
  getStoredConsultingRequests, deleteConsultingRequest 
} from '../utils/storage';
import BlogEditor from './BlogEditor';
import ProductEditModal from './ProductEditModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function AdminDashboard({ onBackToHome, onSelectProductView, onLogout }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'new-product' | 'subscribers' | 'consulting'
  const [products, setProducts] = useState(getStoredProducts);
  const [subscribers, setSubscribers] = useState(getStoredSubscribers);
  const [consultingRequests, setConsultingRequests] = useState(getStoredConsultingRequests);

  // 모달 상태: 수정 모달 & 커스텀 삭제 확인 모달
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // 알림 토스트 상태
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 실시간 동기화 리스너
  useEffect(() => {
    const syncData = () => {
      setProducts(getStoredProducts());
      setSubscribers(getStoredSubscribers());
      setConsultingRequests(getStoredConsultingRequests());
    };
    window.addEventListener('judiaistudio_products_updated', syncData);
    window.addEventListener('judiaistudio_consulting_updated', syncData);
    window.addEventListener('storage', syncData);
    return () => {
      window.removeEventListener('judiaistudio_products_updated', syncData);
      window.removeEventListener('judiaistudio_consulting_updated', syncData);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  // 신규 상품 등록 폼 상태
  const [form, setForm] = useState({
    title: '',
    category: 'VOD',
    price: '',
    originalPrice: '',
    badge: 'NEW',
    summary: '',
    thumbnail: '',
    contentBlocks: [
      { id: 'b-init-1', type: 'h1', text: '상품의 핵심 가치와 한 줄 요약', align: 'left', highlight: 'yellow' },
      { id: 'b-init-2', type: 'p', text: '여기에 네이버 블로그처럼 상품 소개와 커리큘럼, 기대 효과를 자유롭게 작성해 보세요.', align: 'left', highlight: 'none' }
    ]
  });

  // 신규 썸네일 업로드 듀얼 탭 상태
  const [thumbnailTab, setThumbnailTab] = useState('upload'); // 'upload' | 'url'
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  // 1. 신규 썸네일 파일 업로드 및 Canvas 자동 압축
  const handleThumbnailFile = async (file) => {
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, 600, 0.7);
      setForm((prev) => ({ ...prev, thumbnail: compressed }));
    } catch (err) {
      alert(err.message || '이미지 압축 중 오류가 발생했습니다.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleThumbnailFile(file);
  };

  // 2. 신규 상품 등록 제출
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('상품명을 입력해 주세요.');
      return;
    }
    if (!form.thumbnail) {
      alert('대표 썸네일 이미지를 업로드하거나 웹 링크를 등록해 주세요.');
      return;
    }

    const newProd = addProduct({
      ...form,
      price: Number(form.price) || 0,
      originalPrice: Number(form.originalPrice) || Number(form.price) || 0
    });

    setProducts(getStoredProducts());
    showToast('✨ 새 상품이 성공적으로 등록되었습니다!');
    setActiveTab('products'); // 등록 완료 후 목록 탭으로 자동 이동

    // 폼 초기화
    setForm({
      title: '',
      category: 'VOD',
      price: '',
      originalPrice: '',
      badge: 'NEW',
      summary: '',
      thumbnail: '',
      contentBlocks: [
        { id: 'b-init-1', type: 'h1', text: '새 상품 소개', align: 'left', highlight: 'yellow' },
        { id: 'b-init-2', type: 'p', text: '본문 내용을 작성해 주세요.', align: 'left', highlight: 'none' }
      ]
    });
    setThumbnailUrlInput('');
  };

  // 3. 상품 수정 저장 핸들러
  const handleSaveProductEdit = (updatedProduct) => {
    updateProduct(updatedProduct.id, updatedProduct);
    setProducts(getStoredProducts());
    setEditingProduct(null);
    showToast(`✅ "${updatedProduct.title}" 수정사항이 저장되었습니다.`);
  };

  // 4. 상품 삭제 확인 후 실행 핸들러
  const handleConfirmDeleteProduct = (id) => {
    const target = products.find(p => String(p.id) === String(id));
    const title = target?.title || '상품';
    deleteProduct(id);
    setProducts(getStoredProducts());
    setDeletingProduct(null);
    if (editingProduct && String(editingProduct.id) === String(id)) {
      setEditingProduct(null);
    }
    showToast(`🗑️ "${title}" 상품이 안전하게 삭제되었습니다.`);
  };

  // 5. 기본 샘플 상품 데이터 복원
  const handleResetDefaultData = () => {
    if (window.confirm('기본 샘플 3개 상품으로 데이터를 초기화하시겠습니까? 현재 추가된 내용은 덮어씌워집니다.')) {
      const resetList = resetDefaultProducts();
      setProducts(resetList);
      showToast('🔄 기본 샘플 상품 데이터로 복원되었습니다.');
    }
  };

  // 6. 구독자 삭제
  const handleDeleteSubscriber = (id) => {
    if (window.confirm('해당 구독자를 목록에서 삭제하시겠습니까?')) {
      deleteSubscriber(id);
      setSubscribers(getStoredSubscribers());
      showToast('구독자가 목록에서 삭제되었습니다.');
    }
  };

  // 7. 구독자 CSV 다운로드
  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      alert('내보낼 구독자 데이터가 없습니다.');
      return;
    }
    const headers = ['ID,이름,전화번호,이메일,신청일시'];
    const rows = subscribers.map(s => `"${s.id}","${s.name}","${s.phone}","${s.email}","${s.date}"`);
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `judiaistudio_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 구독자 CSV 파일이 다운로드되었습니다.');
  };

  // 8. 교육상담신청 내역 삭제
  const handleDeleteConsulting = (id) => {
    if (window.confirm('해당 교육상담신청 내역을 삭제하시겠습니까?')) {
      deleteConsultingRequest(id);
      setConsultingRequests(getStoredConsultingRequests());
      showToast('교육상담신청 내역이 삭제되었습니다.');
    }
  };

  // 9. 교육상담신청 내역 CSV 다운로드
  const exportConsultingCSV = () => {
    if (consultingRequests.length === 0) {
      alert('내보낼 교육상담신청 내역이 없습니다.');
      return;
    }
    const headers = ['ID,성함,기업/기관명,연락처,이메일,교육분야,교육대상,예상인원,희망일정,선호시간,문의내용,신청일시'];
    const rows = consultingRequests.map(r => 
      `"${r.id}","${r.name}","${r.organization || ''}","${r.phone}","${r.email}","${r.category}","${r.target}","${r.headcount}","${r.preferredDate}","${r.preferredTime}","${(r.message || '').replace(/"/g, '""')}","${r.createdAt}"`
    );
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `judiaistudio_consulting_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 교육상담신청 CSV 파일이 다운로드되었습니다.');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-32">
      
      {/* 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 상단 글로벌 관리자 네비게이션 */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>고객 홈으로 돌아가기</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <h1 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
            <span className="p-1 rounded-lg bg-judiaistudio-royalBlue text-white text-xs">ADMIN</span>
            <span>주디AI스튜디오 통합 백엔드 대시보드</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="font-mono text-emerald-400">LocalStorage 실시간 연동 중</span>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-all"
              title="관리자 세션 로그아웃"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>관리자 로그아웃</span>
            </button>
          )}
        </div>
      </header>

      {/* 메인 대시보드 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 상단 통합 탭 네비게이션: 3개 탭 명확화 */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            
            {/* 탭 1: 등록된 상품 목록 & 수정/삭제 관리 */}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-judiaistudio-royalBlue text-white shadow-lg shadow-judiaistudio-royalBlue/30 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>등록된 상품 목록 & 수정/삭제 ({products.length})</span>
            </button>

            {/* 탭 2: 새 상품 등록 */}
            <button
              onClick={() => setActiveTab('new-product')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'new-product'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Plus className="w-4 h-4 text-white" />
              <span>➕ 새 상품 등록하기</span>
            </button>

            {/* 탭 3: 뉴스레터 구독자 관리 */}
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'subscribers'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span>뉴스레터 구독자 ({subscribers.length})</span>
            </button>

            {/* 탭 4: 교육상담신청 내역 */}
            <button
              onClick={() => setActiveTab('consulting')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'consulting'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-300" />
              <span>교육상담신청 접수 내역 ({consultingRequests.length})</span>
            </button>
          </div>

          {/* 우측 퀵 액션: 샘플 복원 */}
          <button
            onClick={handleResetDefaultData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors border border-slate-700"
            title="초기 샘플 데이터 3개로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">샘플 데이터 복원</span>
          </button>
        </div>

        {/* ===================== TAB 1: 등록된 상품 목록 & 수정/삭제 관리 (기본 탭) ===================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 상품 목록 헤더 & 액션 바 */}
            <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>현재 등록된 상품 라인업 ({products.length}개)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  각 상품의 <strong className="text-blue-400">[수정하기]</strong>를 눌러 제목·가격·상세페이지 블로그 내용을 변경하거나, <strong className="text-red-400">[삭제]</strong>로 제외할 수 있습니다.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('new-product')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>새 상품 추가 등록하기</span>
              </button>
            </div>

            {/* 상품이 없을 때 */}
            {products.length === 0 ? (
              <div className="text-center py-20 bg-slate-800/40 rounded-3xl border border-dashed border-slate-700 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-300">현재 등록된 상품이 없습니다.</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  새 상품을 등록하거나, 기본 샘플 데이터를 복원하여 테스트해 보세요.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('new-product')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    새 상품 등록하기
                  </button>
                  <button
                    onClick={handleResetDefaultData}
                    className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                  >
                    샘플 3종 복원하기
                  </button>
                </div>
              </div>
            ) : (
              /* 상품 카드 그리드: 직관적이고 큼직한 1:1 썸네일과 수정/삭제 액션 버튼 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-slate-600 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* 1:1 정사각 썸네일 */}
                      <div className="relative w-full aspect-square bg-slate-950 overflow-hidden border-b border-slate-700/60">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* 뱃지 */}
                        <div className="absolute top-3.5 left-3.5 flex gap-1.5">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 backdrop-blur-md text-blue-300 border border-blue-400/30">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950">
                              {p.badge}
                            </span>
                          )}
                        </div>

                        {/* 우측 상단 등록일 */}
                        <div className="absolute top-3.5 right-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-900/80 text-slate-400">
                            {p.createdAt || '등록됨'}
                          </span>
                        </div>
                      </div>

                      {/* 정보 영역 */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                          {p.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {p.summary || '한 줄 요약이 등록되지 않은 상품입니다.'}
                        </p>

                        {/* 가격 표시 */}
                        <div className="pt-2 flex items-baseline gap-2 border-t border-slate-700/50">
                          {p.originalPrice > p.price && (
                            <span className="text-xs text-slate-500 line-through font-mono">
                              {p.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span className="text-lg font-extrabold font-mono text-emerald-400">
                            {p.price === 0 ? '무료 배포' : `${p.price.toLocaleString()}원`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 카드 하단 수정 / 삭제 / 미리보기 3단 액션 버튼 바 */}
                    <div className="p-4 pt-0 border-t border-slate-700/50 mt-2 flex items-center gap-2">
                      {/* 미리보기 버튼 */}
                      <button
                        onClick={() => onSelectProductView(p.id)}
                        className="p-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="고객용 상세페이지 미리보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* 수정하기 버튼 (명확한 파란색 버튼) */}
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>수정하기</span>
                      </button>

                      {/* 삭제하기 버튼 (명확한 빨간색 버튼) */}
                      <button
                        onClick={() => setDeletingProduct(p)}
                        className="py-2.5 px-3.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                        title="상품 영구 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>삭제</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ===================== TAB 2: 새 상품 등록 폼 ===================== */}
        {activeTab === 'new-product' && (
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6 animate-fadeIn">
            <div className="border-b border-slate-700 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-400" />
                  <span>새 지식 비즈니스 상품 등록</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  1:1 캔버스 자동 압축 썸네일과 네이버 블로그 스타일 상단 툴바 에디터로 상품을 등록합니다.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('products')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                목록으로 돌아가기
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              
              {/* 기본 정보 3분할 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">카테고리</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="VOD">VOD 강의</option>
                    <option value="1:1코칭">1:1 프라이빗 코칭</option>
                    <option value="전자책">전자책 (PDF)</option>
                    <option value="무료배포">무료 배포</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">강조 뱃지 (선택)</label>
                  <input
                    type="text"
                    placeholder="예: 얼리버드 30%, 베스트셀러"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    상품명 (제목) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: AI 지식 비즈니스 실전 마스터 코스"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 가격 및 한 줄 요약 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    판매 가격 (원) <span className="text-emerald-400 text-[10px]">(0원이면 무료)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="245000"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">정상 가격 (원)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="350000"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">한 줄 요약 문구</label>
                  <input
                    type="text"
                    placeholder="메인 홈 카드에 노출될 매력적인 1줄 요약"
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 대표 썸네일 드롭존 & 압축 엔진 (듀얼 탭) */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-200">
                      대표 썸네일 이미지 (1:1 정사각 비율) <span className="text-red-400">*</span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      HTML5 Canvas가 자동으로 600px 30~50KB 초경량 압축하여 브라우저 용량을 아껴줍니다.
                    </p>
                  </div>

                  <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setThumbnailTab('upload')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        thumbnailTab === 'upload'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>파일 업로드</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setThumbnailTab('url')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        thumbnailTab === 'url'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>웹 링크 입력</span>
                    </button>
                  </div>
                </div>

                {thumbnailTab === 'upload' && (
                  <div>
                    {form.thumbnail ? (
                      <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-md aspect-square">
                        <img src={form.thumbnail} alt="썸네일 미리보기" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, thumbnail: '' })}
                          className="absolute top-2 right-2 p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                          title="썸네일 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-center text-emerald-300 py-1 font-mono">
                          1:1 압축 완료
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all space-y-3"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 text-emerald-400 mx-auto flex items-center justify-center">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div className="text-sm font-semibold text-slate-200">
                          {isCompressing ? '이미지를 600px로 초경량 압축 중입니다...' : '클릭하거나 이미지를 여기로 드래그하세요'}
                        </div>
                        <p className="text-xs text-slate-500">
                          최대 5MB 지원 • HTML5 Canvas가 600px 30~50KB 초경량으로 자동 압축합니다.
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleThumbnailFile(e.target.files?.[0])}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                )}

                {thumbnailTab === 'url' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={thumbnailUrlInput}
                        onChange={(e) => setThumbnailUrlInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!thumbnailUrlInput.trim()) return alert('이미지 URL을 입력하세요.');
                          setForm({ ...form, thumbnail: thumbnailUrlInput.trim() });
                        }}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold whitespace-nowrap"
                      >
                        적용하기
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 네이버 블로그 스타일 상세페이지 에디터 */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-200">
                  상세페이지 멀티미디어 에디터 (네이버 블로그 스타일 툴바 탑재)
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  상단 미니 툴바를 이용해 제목 크기, 정렬, 형광펜 강조 및 본문 이미지를 삽입할 수 있습니다.
                </p>
                <BlogEditor
                  blocks={form.contentBlocks}
                  onChange={(newBlocks) => setForm({ ...form, contentBlocks: newBlocks })}
                />
              </div>

              {/* 등록 제출 버튼 */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 hover:-translate-y-0.5 transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>새 상품 등록 및 메인 홈 즉시 진열</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ===================== TAB 3: 뉴스레터 구독자 관리 ===================== */}
        {activeTab === 'subscribers' && (
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>뉴스레터 구독 신청자 목록 ({subscribers.length}명)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  메인 홈 화면 및 팝업 모달에서 고객이 신청한 데이터가 실시간으로 안전하게 누적됩니다.
                </p>
              </div>

              {/* CSV 다운로드 버튼 */}
              <button
                onClick={exportSubscribersCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all self-start sm:self-auto"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>CSV / 엑셀 다운로드 (구글 시트 연동용)</span>
              </button>
            </div>

            {subscribers.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                아직 구독 신청자가 없습니다. 메인 홈 화면의 뉴스레터 버튼을 통해 신청을 받아보세요.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">번호</th>
                      <th className="py-3 px-4">고객 이름</th>
                      <th className="py-3 px-4">전화번호</th>
                      <th className="py-3 px-4">이메일 주소</th>
                      <th className="py-3 px-4">신청 일시</th>
                      <th className="py-3 px-4 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-sans">
                    {subscribers.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-500">#{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-white">{sub.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-300">{sub.phone}</td>
                        <td className="py-3 px-4 font-mono text-blue-300">{sub.email}</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{sub.date}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="p-1.5 rounded-lg bg-red-600/70 hover:bg-red-600 text-white transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 4: 교육상담신청 접수 내역 관리 ===================== */}
        {activeTab === 'consulting' && (
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <span>맞춤형 교육상담신청 접수 목록 ({consultingRequests.length}건)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  기업 출강, 특강, AI 캠프, 1:1 코칭, 컨설팅 등 고객이 제출한 교육상담 데이터가 실시간으로 보관됩니다.
                </p>
              </div>

              {/* CSV 다운로드 버튼 */}
              <button
                onClick={exportConsultingCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all self-start sm:self-auto"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>CSV / 엑셀 다운로드 (상담 명세)</span>
              </button>
            </div>

            {consultingRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                아직 접수된 교육상담신청 내역이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-3">번호</th>
                      <th className="py-3 px-3">교육 분야</th>
                      <th className="py-3 px-3">대상 및 인원</th>
                      <th className="py-3 px-3">희망 일정 / 시간</th>
                      <th className="py-3 px-3">신청자 (기업/기관)</th>
                      <th className="py-3 px-3">연락처 및 이메일</th>
                      <th className="py-3 px-3 max-w-xs">요청 및 문의사항</th>
                      <th className="py-3 px-3">신청일시</th>
                      <th className="py-3 px-3 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-sans">
                    {consultingRequests.map((req, idx) => (
                      <tr key={req.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="py-3 px-3 font-mono text-slate-500">#{idx + 1}</td>
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                            {req.category}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{req.target}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{req.headcount}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-mono font-bold text-emerald-400">{req.preferredDate}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{req.preferredTime}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{req.name}</div>
                          {req.organization && (
                            <div className="text-[11px] text-blue-300 mt-0.5">{req.organization}</div>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono">
                          <div className="text-white">{req.phone}</div>
                          <div className="text-slate-400 text-[11px]">{req.email}</div>
                        </td>
                        <td className="py-3 px-3 max-w-xs truncate text-slate-300" title={req.message}>
                          {req.message || '-'}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                          {req.createdAt}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleDeleteConsulting(req.id)}
                            className="p-1.5 rounded-lg bg-red-600/70 hover:bg-red-600 text-white transition-colors"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ===================== 상품 정보 및 상세페이지 수정 풀스크린 모달 ===================== */}
      <ProductEditModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveProductEdit}
        onDelete={(p) => setDeletingProduct(p)}
      />

      {/* ===================== 커스텀 삭제 확인 모달 ===================== */}
      <DeleteConfirmModal
        product={deletingProduct}
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDeleteProduct}
      />

    </div>
  );
}
