import React, { useState, useRef } from 'react';
import { 
  Plus, Edit3, Trash2, UploadCloud, Link as LinkIcon, 
  Layers, Users, CheckCircle, ArrowLeft, Image as ImageIcon,
  Download, FileSpreadsheet, Eye, Sparkles
} from 'lucide-react';
import { 
  getStoredProducts, addProduct, updateProduct, deleteProduct, 
  getStoredSubscribers, deleteSubscriber, compressImage 
} from '../utils/storage';
import BlogEditor from './BlogEditor';

export default function AdminDashboard({ onBackToHome, onSelectProductView }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'subscribers'
  const [products, setProducts] = useState(getStoredProducts);
  const [subscribers, setSubscribers] = useState(getStoredSubscribers);

  // 상품 등록 폼 상태
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

  // 썸네일 업로드 듀얼 탭
  const [thumbnailTab, setThumbnailTab] = useState('upload'); // 'upload' | 'url'
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  // 수정 모달 상태
  const [editingProduct, setEditingProduct] = useState(null); // 수정 중인 상품 객체 또는 null

  // 1. 썸네일 파일 업로드 및 Canvas 자동 압축
  const handleThumbnailFile = async (file) => {
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, 600, 0.7);
      if (editingProduct) {
        setEditingProduct({ ...editingProduct, thumbnail: compressed });
      } else {
        setForm({ ...form, thumbnail: compressed });
      }
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
    if (!form.title) {
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
    alert('상품이 성공적으로 등록되었습니다! 메인 화면 및 목록에 실시간 진열됩니다.');

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

  // 3. 상품 삭제
  const handleDeleteProduct = (id) => {
    if (window.confirm('정말 이 상품을 삭제하시겠습니까? 메인 화면에서도 즉시 제외됩니다.')) {
      deleteProduct(id);
      setProducts(getStoredProducts());
    }
  };

  // 4. 상품 수정 모달 저장
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      ...editingProduct,
      price: Number(editingProduct.price) || 0,
      originalPrice: Number(editingProduct.originalPrice) || 0
    });

    setProducts(getStoredProducts());
    setEditingProduct(null);
    alert('상품 수정이 완료되었습니다!');
  };

  // 5. 구독자 삭제
  const handleDeleteSubscriber = (id) => {
    if (window.confirm('해당 구독자를 목록에서 삭제하시겠습니까?')) {
      deleteSubscriber(id);
      setSubscribers(getStoredSubscribers());
    }
  };

  // 6. 구독자 CSV 다운로드 (구글 시트 연동 대비)
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
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-24">
      {/* 1. 대시보드 글로벌 상단 헤더 */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-judiaistudio-royalBlue text-white flex items-center justify-center font-bold shadow-md">
            🛠️
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              주디AI스튜디오 통합 관리자 대시보드
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                localStorage DB 연동
              </span>
            </h1>
            <p className="text-xs text-slate-400">외부 서버 없이 브라우저 로컬 저장소로 안전하고 신속하게 관리합니다.</p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>홈 화면으로 돌아가기</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 2. 대시보드 탭 메뉴 (상품 관리 vs 뉴스레터 구독자) */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-judiaistudio-royalBlue text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-judiaistudio-royalBlue" />
            <span>상품 등록 및 진열 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'subscribers'
                ? 'border-judiaistudio-gold text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-judiaistudio-gold" />
            <span>뉴스레터 구독자 명단 ({subscribers.length})</span>
          </button>
        </div>

        {/* ===================== TAB 1: 상품 등록 및 관리 ===================== */}
        {activeTab === 'products' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* 상품 등록 폼 카드 */}
            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-judiaistudio-royalBlue" />
                    새 상품 등록하기
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    등록된 상품은 메인 홈 화면의 해당 카테고리(VOD / 전자책 / 코칭 / 무료배포)에 즉시 1:1 정사각 카드로 진열됩니다.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitProduct} className="space-y-6">
                
                {/* 기본 정보 3열 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      상품 카테고리 <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue"
                    >
                      <option value="VOD">VOD (동영상 강의)</option>
                      <option value="전자책">전자책 (디지털 PDF)</option>
                      <option value="1:1코칭">1:1 프라이빗 코칭</option>
                      <option value="무료배포">무료 배포 리포트</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      상품명 (제목) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: AI 지식 비즈니스 실전 마스터 코스"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* 가격 및 배지 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      판매 가격 (원) <span className="text-slate-400 font-normal">(무료는 0)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="245000"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      정상 가격 (원) <span className="text-slate-400 font-normal">(할인 취소선 표기용)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="350000"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      강조 뱃지 텍스트
                    </label>
                    <input
                      type="text"
                      placeholder="예: 얼리버드 30% / BEST / NEW"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* 상품 한 줄 요약 */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    상품 한 줄 요약
                  </label>
                  <input
                    type="text"
                    placeholder="카드 목록에 노출될 매력적인 한 줄 설명입니다."
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500"
                  />
                </div>

                {/* 썸네일 이미지 등록 구역 (듀얼 탭 UI + 드롭존 + 초경량 압축) */}
                <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      <span>대표 썸네일 등록 (1:1 정사각 최적화)</span>
                      <span className="text-red-400">*</span>
                    </label>

                    {/* 듀얼 탭 전환 버튼 */}
                    <div className="flex bg-slate-800 p-1 rounded-xl text-xs">
                      <button
                        type="button"
                        onClick={() => setThumbnailTab('upload')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                          thumbnailTab === 'upload' ? 'bg-judiaistudio-royalBlue text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>파일 업로드 (드롭존)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setThumbnailTab('url')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                          thumbnailTab === 'url' ? 'bg-judiaistudio-royalBlue text-white shadow-sm' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>웹 링크 입력</span>
                      </button>
                    </div>
                  </div>

                  {/* 탭 1: 파일 업로드 드롭존 (Canvas 자동 압축) */}
                  {thumbnailTab === 'upload' && (
                    <div>
                      {form.thumbnail ? (
                        <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-md group">
                          <img src={form.thumbnail} alt="썸네일 미리보기" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, thumbnail: '' })}
                            className="absolute top-2 right-2 p-2 rounded-xl bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-lg"
                            title="썸네일 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-center text-emerald-300 py-1">
                            압축 저장 완료 (1:1)
                          </div>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-600 hover:border-judiaistudio-royalBlue rounded-2xl p-8 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 transition-all space-y-3"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-slate-700 text-slate-300 mx-auto flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="text-sm font-semibold text-slate-200">
                            {isCompressing ? '이미지를 600px로 초경량 압축 중입니다...' : '클릭하거나 이미지를 여기로 드래그하세요'}
                          </div>
                          <p className="text-xs text-slate-400">
                            최대 5MB 용량 지원 • HTML5 Canvas가 600px 30~50KB 초경량으로 자동 압축하여 localStorage 용량을 아껴줍니다.
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

                  {/* 탭 2: 웹 링크 URL 입력 */}
                  {thumbnailTab === 'url' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={thumbnailUrlInput}
                          onChange={(e) => setThumbnailUrlInput(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-judiaistudio-royalBlue placeholder-slate-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!thumbnailUrlInput) return alert('이미지 URL을 입력하세요.');
                            setForm({ ...form, thumbnail: thumbnailUrlInput });
                          }}
                          className="px-4 py-2.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white text-xs font-bold"
                        >
                          적용하기
                        </button>
                      </div>
                      {form.thumbnail && (
                        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-700">
                          <img src={form.thumbnail} alt="미리보기" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => { setForm({ ...form, thumbnail: '' }); setThumbnailUrlInput(''); }}
                            className="absolute top-1 right-1 p-1.5 rounded-lg bg-red-600 text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 네이버 블로그 스타일 상세페이지 에디터 (상단 툴바 UI) */}
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
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-judiaistudio-royalBlue/30 hover:-translate-y-0.5 transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                    <span>새 상품 등록 및 메인 화면 즉시 진열</span>
                  </button>
                </div>

              </form>
            </div>

            {/* 등록된 상품 목록 테이블 */}
            <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-judiaistudio-gold" />
                  <span>현재 등록된 상품 목록 ({products.length}개)</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">썸네일 (1:1)</th>
                      <th className="py-3 px-4">카테고리</th>
                      <th className="py-3 px-4">상품명</th>
                      <th className="py-3 px-4">판매 가격</th>
                      <th className="py-3 px-4">등록일</th>
                      <th className="py-3 px-4 text-center">관리 (상세보기/수정/삭제)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-sans">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-700/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 aspect-square">
                            <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-white max-w-xs truncate">
                          {p.title}
                          {p.badge && (
                            <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                              {p.badge}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                          {p.price === 0 ? '무료' : `${p.price.toLocaleString()}원`}
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono">
                          {p.createdAt || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => onSelectProductView(p.id)}
                              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                              title="고객용 상세페이지 미리보기"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition-colors"
                              title="상품 수정"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                              title="상품 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: 뉴스레터 구독자 관리 ===================== */}
        {activeTab === 'subscribers' && (
          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-judiaistudio-gold" />
                  <span>뉴스레터 구독 신청자 목록 ({subscribers.length}명)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  메인 홈 화면 및 팝업 모달에서 고객이 신청한 데이터가 실시간으로 안전하게 누적됩니다.
                </p>
              </div>

              {/* CSV 다운로드 버튼 (구글 시트 연동 대비) */}
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

      </div>

      {/* ===================== 상품 수정 풀스크린 / 대형 모달 ===================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-400" />
                <span>상품 정보 수정: {editingProduct.title}</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
              >
                닫기 (ESC)
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">카테고리</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  >
                    <option value="VOD">VOD</option>
                    <option value="전자책">전자책</option>
                    <option value="1:1코칭">1:1코칭</option>
                    <option value="무료배포">무료배포</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">상품명</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">판매가</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">정상가</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">뱃지</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">한 줄 요약</label>
                <input
                  type="text"
                  value={editingProduct.summary || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm"
                />
              </div>

              {/* 썸네일 수정 */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">대표 썸네일 (1:1 비율)</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-square flex-shrink-0">
                    <img src={editingProduct.thumbnail} alt="수정 썸네일" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleThumbnailFile(e.target.files?.[0])}
                      className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs"
                    />
                    <input
                      type="url"
                      placeholder="또는 이미지 URL 직접 입력"
                      value={editingProduct.thumbnail}
                      onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 상세페이지 블로그 툴바 에디터 */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">상세페이지 내용 수정 (블로그 툴바)</label>
                <BlogEditor
                  blocks={editingProduct.contentBlocks || []}
                  onChange={(newBlocks) => setEditingProduct({ ...editingProduct, contentBlocks: newBlocks })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-judiaistudio-royalBlue hover:bg-blue-600 text-white text-xs font-bold shadow-md"
                >
                  수정사항 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
