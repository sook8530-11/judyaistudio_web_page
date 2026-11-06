import React, { useRef, useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, ImagePlus, Highlighter, Type, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { compressImage } from '../utils/storage';

export default function BlogEditor({ blocks, onChange }) {
  const fileInputRef = useRef(null);
  const [activeHighlightColor, setActiveHighlightColor] = useState('yellow'); // 'yellow' | 'green'
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [currentType, setCurrentType] = useState('p'); // 'h1' | 'h2' | 'p'
  const [currentAlign, setCurrentAlign] = useState('left'); // 'left' | 'center' | 'right'

  // 새 텍스트 블록 추가
  const addTextBlock = (type = 'p', align = 'left', highlight = 'none') => {
    const newBlock = {
      id: 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      text: '',
      align,
      highlight
    };
    onChange([...blocks, newBlock]);
  };

  // 블록 텍스트/속성 변경
  const updateBlock = (id, fields) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...fields } : b));
  };

  // 블록 삭제
  const removeBlock = (id) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  // 블록 순서 이동
  const moveBlock = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[newIndex];
    newBlocks[newIndex] = temp;
    onChange(newBlocks);
  };

  // 본문 이미지 업로드 처리 (자동 압축)
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 600, 0.7);
      const newBlock = {
        id: 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        type: 'image',
        url: compressed,
        caption: ''
      };
      onChange([...blocks, newBlock]);
    } catch (err) {
      alert(err.message || '이미지 압축 중 오류가 발생했습니다.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border border-slate-300 rounded-2xl bg-white overflow-hidden shadow-sm">
      {/* 1. 상단 네이버 블로그 스타일 고정 툴바 */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-100/90 border-b border-slate-200 text-slate-700 text-xs">
        
        {/* Tt 글자 크기 드롭다운 */}
        <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Type className="w-4 h-4 text-slate-500" />
          <select
            value={currentType}
            onChange={(e) => setCurrentType(e.target.value)}
            className="bg-transparent font-medium focus:outline-none cursor-pointer"
            title="글자 크기"
          >
            <option value="h1">대제목 (제목 1)</option>
            <option value="h2">중제목 (제목 2)</option>
            <option value="p">일반 본문</option>
          </select>
        </div>

        <div className="h-5 w-[1px] bg-slate-300 mx-1" />

        {/* 정렬 아이콘 3종 */}
        <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setCurrentAlign('left')}
            className={`p-1.5 rounded ${currentAlign === 'left' ? 'bg-blue-100 text-judiaistudio-royalBlue' : 'hover:bg-slate-100'}`}
            title="좌측 정렬"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentAlign('center')}
            className={`p-1.5 rounded ${currentAlign === 'center' ? 'bg-blue-100 text-judiaistudio-royalBlue' : 'hover:bg-slate-100'}`}
            title="중앙 정렬"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentAlign('right')}
            className={`p-1.5 rounded ${currentAlign === 'right' ? 'bg-blue-100 text-judiaistudio-royalBlue' : 'hover:bg-slate-100'}`}
            title="우측 정렬"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-5 w-[1px] bg-slate-300 mx-1" />

        {/* 형광펜 강조 아이콘 & 컬러 피커 */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => setShowHighlightMenu(!showHighlightMenu)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-slate-50"
              title="형광펜 강조"
            >
              <Highlighter className="w-4 h-4 text-amber-500" />
              <span
                className="w-3.5 h-3.5 rounded-full border border-slate-300"
                style={{ backgroundColor: activeHighlightColor === 'yellow' ? '#fef08a' : '#bbf7d0' }}
              />
            </button>
          </div>

          {showHighlightMenu && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-xl shadow-lg border border-slate-200 z-20 flex gap-2">
              <button
                type="button"
                onClick={() => { setActiveHighlightColor('yellow'); setShowHighlightMenu(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fef08a] text-slate-800 text-[11px] font-bold border border-amber-300"
              >
                파스텔 옐로우
              </button>
              <button
                type="button"
                onClick={() => { setActiveHighlightColor('green'); setShowHighlightMenu(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#bbf7d0] text-slate-800 text-[11px] font-bold border border-emerald-300"
              >
                파스텔 그린
              </button>
            </div>
          )}
        </div>

        {/* 📷 본문 이미지 업로드 버튼 */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-sm font-semibold transition-all ml-1"
          title="본문 이미지 추가 (최대 5MB, 자동 경량 압축)"
        >
          <ImagePlus className="w-4 h-4 text-emerald-600" />
          <span>본문 사진 추가</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          className="hidden"
        />

        {/* 텍스트 문단 추가 버튼 */}
        <button
          type="button"
          onClick={() => addTextBlock(currentType, currentAlign, activeHighlightColor)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-judiaistudio-royalBlue hover:bg-judiaistudio-royalBlueHover text-white shadow-sm font-semibold ml-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>문단 추가</span>
        </button>
      </div>

      {/* 2. 에디터 본문 작성 영역 (블록 기반 블로그 스타일) */}
      <div className="p-6 space-y-4 min-h-[360px] max-h-[550px] overflow-y-auto bg-slate-50/50">
        {blocks.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Type className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm">상단 툴바의 <strong>[문단 추가]</strong> 또는 <strong>[본문 사진 추가]</strong>를 눌러 네이버 블로그처럼 글을 작성해 보세요.</p>
          </div>
        ) : (
          blocks.map((block, idx) => (
            <div
              key={block.id}
              className="group relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all space-y-2"
            >
              {/* 블록 상단 조작 핸들 */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-100">
                <span className="font-mono font-semibold uppercase text-slate-500">
                  #{idx + 1} {block.type === 'image' ? '🖼️ 이미지 블록' : `📝 ${block.type === 'h1' ? '대제목' : block.type === 'h2' ? '중제목' : '본문'}`}
                </span>
                
                <div className="flex items-center gap-1">
                  {/* 형광펜 토글 (텍스트 블록일 때) */}
                  {block.type !== 'image' && (
                    <div className="flex items-center gap-1 mr-2">
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { highlight: block.highlight === 'yellow' ? 'none' : 'yellow' })}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${block.highlight === 'yellow' ? 'bg-[#fef08a] border-amber-300 text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                      >
                        노랑 형광펜
                      </button>
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { highlight: block.highlight === 'green' ? 'none' : 'green' })}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${block.highlight === 'green' ? 'bg-[#bbf7d0] border-emerald-300 text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                      >
                        초록 형광펜
                      </button>
                    </div>
                  )}

                  {/* 정렬 토글 */}
                  {block.type !== 'image' && (
                    <div className="flex items-center border border-slate-200 rounded mr-2">
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { align: 'left' })}
                        className={`p-1 ${block.align === 'left' ? 'bg-slate-200 text-slate-800' : 'text-slate-400'}`}
                      >
                        <AlignLeft className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { align: 'center' })}
                        className={`p-1 ${block.align === 'center' ? 'bg-slate-200 text-slate-800' : 'text-slate-400'}`}
                      >
                        <AlignCenter className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateBlock(block.id, { align: 'right' })}
                        className={`p-1 ${block.align === 'right' ? 'bg-slate-200 text-slate-800' : 'text-slate-400'}`}
                      >
                        <AlignRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* 순서 이동 */}
                  <button
                    type="button"
                    onClick={() => moveBlock(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 hover:text-slate-700 disabled:opacity-20"
                    title="위로 이동"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(idx, 1)}
                    disabled={idx === blocks.length - 1}
                    className="p-1 hover:text-slate-700 disabled:opacity-20"
                    title="아래로 이동"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* 삭제 */}
                  <button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="p-1 text-red-400 hover:text-red-600 ml-1"
                    title="블록 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 블록 본문 입력 */}
              {block.type === 'image' ? (
                <div className="space-y-2">
                  <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <img src={block.url} alt="본문 이미지" className="w-full h-auto object-cover max-h-64" />
                  </div>
                  <input
                    type="text"
                    value={block.caption || ''}
                    onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                    placeholder="사진 설명 (캡션)을 입력하세요 (선택)"
                    className="w-full text-center text-xs text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-judiaistudio-royalBlue focus:outline-none py-1"
                  />
                </div>
              ) : (
                <textarea
                  rows={block.type === 'p' ? 3 : 1}
                  value={block.text}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  placeholder={
                    block.type === 'h1' ? '대제목을 입력하세요...' :
                    block.type === 'h2' ? '중제목을 입력하세요...' :
                    '본문 내용을 입력하세요...'
                  }
                  style={{
                    textAlign: block.align || 'left',
                    backgroundColor:
                      block.highlight === 'yellow' ? '#fef08a' :
                      block.highlight === 'green' ? '#bbf7d0' : 'transparent'
                  }}
                  className={`w-full focus:outline-none resize-none transition-colors p-2 rounded-lg ${
                    block.type === 'h1' ? 'text-xl font-extrabold text-slate-900' :
                    block.type === 'h2' ? 'text-base font-bold text-slate-800' :
                    'text-sm text-slate-700 leading-relaxed'
                  }`}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* 3. 에디터 하단 미니 프리뷰 상태 표시 */}
      <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>총 {blocks.length}개의 블록으로 구성됨</span>
        <span>고객용 상세페이지에서 네이버 블로그 스타일로 완벽 렌더링됩니다</span>
      </div>
    </div>
  );
}
