import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Check, Trash2, UploadCloud, Link as LinkIcon, 
  Sparkles, Edit3, Image as ImageIcon, Save 
} from 'lucide-react';
import BlogEditor from './BlogEditor';
import { compressImage } from '../utils/storage';

export default function ProductEditModal({ product, isOpen, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState(null);
  const [thumbnailTab, setThumbnailTab] = useState('upload'); // 'upload' | 'url'
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  // 모달이 열릴 때 선택된 상품 데이터로 폼 동기화
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        title: product.title || '',
        category: product.category || 'VOD',
        badge: product.badge || '',
        price: product.price ?? 0,
        originalPrice: product.originalPrice ?? product.price ?? 0,
        summary: product.summary || '',
        thumbnail: product.thumbnail || '',
        createdAt: product.createdAt,
        contentBlocks: product.contentBlocks && product.contentBlocks.length > 0
          ? JSON.parse(JSON.stringify(product.contentBlocks))
          : [
              { id: 'b-init-1', type: 'h1', text: product.title || '상품 소개', align: 'left', highlight: 'yellow' },
              { id: 'b-init-2', type: 'p', text: product.summary || '상세 내용을 작성해 주세요.', align: 'left', highlight: 'none' }
            ]
      });
      setThumbnailUrlInput('');
    }
  }, [product, isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !formData) return null;

  // 1:1 대표 썸네일 이미지 파일 압축 업로드 핸들러
  const handleThumbnailFile = async (file) => {
    if (!file) return;
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file, 600, 0.7);
      setFormData((prev) => ({ ...prev, thumbnail: compressed }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('상품명을 입력해 주세요.');
      return;
    }
    if (!formData.thumbnail) {
      alert('대표 썸네일 이미지를 등록해 주세요.');
      return;
    }

    onSave({
      ...formData,
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="px-6 py-4 border-b border-slate-700/80 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>상품 정보 및 상세페이지 수정</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {formData.category}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                제목, 가격, 대표 이미지, 상세페이지 블로그 내용을 모두 실시간으로 수정할 수 있습니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 본문 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
          <form id="edit-product-form" onSubmit={handleSubmit} className="space-y-6">

            {/* 1. 카테고리, 뱃지, 상품명 */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 2. 판매가, 정상가, 한 줄 요약 */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  판매 가격 (원) <span className="text-emerald-400 text-[10px]">(0원이면 무료)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">정상 가격 (할인 전, 원)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">한 줄 요약 (카드 노출 문구)</label>
                <input
                  type="text"
                  placeholder="고객의 눈길을 사로잡는 핵심 혜택 1줄 요약"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 3. 1:1 대표 썸네일 수정 (드롭존 & 웹 링크 듀얼 탭) */}
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-200">
                    대표 썸네일 이미지 (1:1 정사각 비율) <span className="text-red-400">*</span>
                  </label>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    어떤 크기의 사진을 올려도 HTML5 Canvas가 600px 30~50KB 초경량으로 자동 압축합니다.
                  </p>
                </div>

                {/* 듀얼 탭 버튼 */}
                <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setThumbnailTab('upload')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      thumbnailTab === 'upload'
                        ? 'bg-blue-600 text-white shadow'
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
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>웹 링크</span>
                  </button>
                </div>
              </div>

              {/* 썸네일 미리보기 & 변경 영역 */}
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {formData.thumbnail ? (
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-md group aspect-square flex-shrink-0">
                    <img src={formData.thumbnail} alt="썸네일 미리보기" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnail: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                      title="썸네일 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-center text-emerald-300 py-1 font-mono">
                      1:1 압축 저장됨
                    </div>
                  </div>
                ) : null}

                <div className="flex-1 w-full">
                  {thumbnailTab === 'upload' ? (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 transition-all space-y-2"
                    >
                      <UploadCloud className="w-7 h-7 text-emerald-400 mx-auto" />
                      <div className="text-xs font-bold text-slate-200">
                        {isCompressing ? '이미지를 600px로 초경량 압축 중...' : '클릭하거나 새 이미지를 여기로 드래그하세요'}
                      </div>
                      <p className="text-[10px] text-slate-400">
                        최대 5MB 지원 • 브라우저 캔버스가 자동 리사이징 & 압축합니다.
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleThumbnailFile(e.target.files?.[0])}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={thumbnailUrlInput}
                          onChange={(e) => setThumbnailUrlInput(e.target.value)}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!thumbnailUrlInput.trim()) return alert('이미지 URL을 입력하세요.');
                            setFormData({ ...formData, thumbnail: thumbnailUrlInput.trim() });
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold whitespace-nowrap"
                        >
                          적용하기
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400">웹 상의 이미지 주소(URL)를 복사하여 붙여넣으세요.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. 상세페이지 네이버 블로그 스타일 상단 툴바 에디터 */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-200">
                  상세페이지 멀티미디어 내용 수정 (네이버 블로그 스타일 툴바 탑재)
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  상단 미니 툴바의 Tt(크기), 정렬, 형광펜, 📷본문 이미지 삽입 기능으로 고객용 상세페이지를 멋지게 꾸며보세요.
                </p>
              </div>

              <BlogEditor
                blocks={formData.contentBlocks}
                onChange={(newBlocks) => setFormData({ ...formData, contentBlocks: newBlocks })}
              />
            </div>

          </form>
        </div>

        {/* 모달 하단 액션 버튼 바 */}
        <div className="px-6 py-4 border-t border-slate-700/80 bg-slate-900/95 flex items-center justify-between gap-4 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={() => onDelete(formData)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-all"
            title="이 상품 완전히 삭제하기"
          >
            <Trash2 className="w-4 h-4" />
            <span>이 상품 삭제</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              form="edit-product-form"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>수정사항 저장하기</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
