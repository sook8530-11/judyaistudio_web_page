import React, { useEffect, useRef, useState } from 'react';

// 랜덤 헥스 컬러 생성 헬퍼
const randomColors = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

export default function TubesBackground({
  children,
  className = '',
  enableClickInteraction = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const tubesRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // @vite-ignore
        const module = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default;

        if (!mounted || !canvasRef.current) return;

        // 레퍼런스 원본의 환상적인 네온 발광 컬러 세팅
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#f967fb', '#53bc28', '#6958d5'],
            lights: {
              intensity: 200,
              colors: ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5'],
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load TubesCursor:', error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (tubesRef.current && typeof tubesRef.current.destroy === 'function') {
        tubesRef.current.destroy();
      }
      tubesRef.current = null;
    };
  }, []);

  const handleClick = (e) => {
    // 버튼, 링크, 입력창 클릭 시에는 색상 변경 방지
    if (e.target.closest('button, a, input, textarea, select')) return;
    if (!enableClickInteraction || !tubesRef.current) return;

    try {
      const colors = randomColors(3);
      const lightsColors = randomColors(4);

      tubesRef.current.tubes?.setColors?.(colors);
      tubesRef.current.tubes?.setLightsColors?.(lightsColors);
    } catch (err) {
      console.error('Failed to randomize colors:', err);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen min-h-[600px] overflow-hidden bg-black select-none ${className}`}
      onClick={handleClick}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
        style={{ touchAction: 'none' }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}
