/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        judiaistudio: {
          royalBlue:   '#1e40af',  // 핵심 브랜드 컬러
          royalBlueHover: '#1d4ed8',
          royalBlueLight: '#eff6ff',
          gold:        '#d97706',  // 품격 포인트 컬러
          goldHover:   '#b45309',
          goldLight:   '#fffbeb',
          background:  '#f8fafc',  // 메인 소프트 화이트 배경
          surface:     '#ffffff',  // 카드 및 모달 배경
          surfaceSub:  '#f1f5f9',  // 카드 서브 배경
          textMain:    '#0f172a',  // 메인 타이틀 및 본문
          textSub:     '#64748b',  // 서브 타이틀 및 보조 설명
          border:      '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}

