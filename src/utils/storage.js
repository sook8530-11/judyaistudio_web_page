// 브라우저 localStorage 기반 통합 데이터 관리 & 이미지 압축 엔진

const PRODUCTS_KEY = 'judiaistudio_products';
const SUBSCRIBERS_KEY = 'judiaistudio_subscribers';

// 초기 기본 상품 데이터 (기획서 기반)
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'AI 지식 비즈니스 실전 마스터 코스',
    category: 'VOD',
    price: 245000,
    originalPrice: 350000,
    badge: '얼리버드 30%',
    summary: '아이디어 발굴부터 독립 홈페이지 런칭까지 한 번에 끝내는 평생 소장 VOD',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-01',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '당신의 30년 경험이 가장 강력한 자산이 됩니다', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '남의 플랫폼에서 수수료 떼이고 고객 명단도 잃어버리는 일은 이제 그만하세요. 주디AI스튜디오는 ChatGPT와 Claude를 활용해 혼자서도 1일 만에 나만의 독립 강의 본진을 구축하는 실전 노하우를 전달합니다.', align: 'left', highlight: 'none' },
      { id: 'b3', type: 'image', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80', caption: '실전 커리큘럼 화면' },
      { id: 'b4', type: 'h2', text: '검증된 4단계 실무 커리큘럼', align: 'left', highlight: 'green' },
      { id: 'b5', type: 'p', text: '01단계: 경험 발굴 및 킬러 컨셉 정의\n02단계: AI 기반 지식 콘텐츠 및 전자책 기획\n03단계: 독립형 브랜드 홈 구축 및 결제 세팅\n04단계: 1:1 상담 파이프라인으로 첫 결제 창출', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-2',
    title: '지식 비즈니스 1:1 프라이빗 코칭 (90분)',
    category: '1:1코칭',
    price: 190000,
    originalPrice: 300000,
    badge: '월 선착순 5팀',
    summary: '주디 대표가 1:1로 직접 내 비즈니스 컨셉을 진단하고 설계해 주는 90분 집중 세션',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-02',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '밀착 진단으로 헤매는 시간 1년을 아껴드립니다', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '사전 정밀 설문지를 바탕으로 주디 대표가 수강생님의 백그라운드를 분석한 뒤, 90분간 1:1 줌 세션으로 만납니다. 뜬구름 잡는 조언이 아닌 현장에서 바로 사용할 카피와 커리큘럼을 함께 완성합니다.', align: 'left', highlight: 'none' },
      { id: 'b3', type: 'h2', text: '코칭 세션 4대 특전', align: 'left', highlight: 'green' },
      { id: 'b4', type: 'p', text: '• 사전 정밀 설문지 분석 보고서\n• Zoom 90분 세션 녹화본 평생 소장\n• 지식 상품 기획서 & 카피라이팅 템플릿 증정\n• 세션 종료 후 2주간 1:1 Q&A 채널 오픈', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-3',
    title: '내 경험을 돈으로 바꾸는 AI 지식 스타터킷 (PDF)',
    category: '무료배포',
    price: 0,
    originalPrice: 50000,
    badge: '100% 무료',
    summary: '아이디어 선별 체크리스트 7가지와 VOD 커리큘럼 설계 공식이 담긴 특별 리포트',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-03',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '결제 전에 가치를 먼저 무료로 확인하세요', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '42페이지 분량의 핵심 요약본입니다. 내 경험 중 어떤 것이 실제 시장에서 결제되는지 자가 진단할 수 있는 7가지 체크리스트와 프롬프트 가이드를 무료로 다운로드하실 수 있습니다.', align: 'left', highlight: 'none' }
    ]
  }
];

// 초기 구독자 데이터
const DEFAULT_SUBSCRIBERS = [
  { id: 'sub-1', name: '김민수', phone: '010-3841-9281', email: 'minsu.kim@example.com', date: '2026-11-04 10:25' },
  { id: 'sub-2', name: '이서연', phone: '010-9124-5512', email: 'seoyeon.lee@gmail.com', date: '2026-11-05 14:12' },
  { id: 'sub-3', name: '박진우', phone: '010-4492-1083', email: 'jinwoo.park@naver.com', date: '2026-11-06 09:30' }
];

// 1. 상품 관리 함수들
export function getStoredProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredProducts error:', e);
    return DEFAULT_PRODUCTS;
  }
}

export function saveStoredProducts(products) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('judiaistudio_products_updated', { detail: products }));
    }
  } catch (e) {
    console.error('saveStoredProducts error:', e);
    alert('저장 공간(localStorage) 용량이 부족하거나 오류가 발생했습니다.');
  }
}

export function addProduct(product) {
  const current = getStoredProducts();
  const newItem = {
    ...product,
    id: 'prod-' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newItem, ...current];
  saveStoredProducts(updated);
  return newItem;
}

export function updateProduct(id, updatedFields) {
  const current = getStoredProducts();
  const updated = current.map(item => String(item.id) === String(id) ? { ...item, ...updatedFields } : item);
  saveStoredProducts(updated);
  return updated;
}

export function deleteProduct(id) {
  const current = getStoredProducts();
  const updated = current.filter(item => String(item.id) !== String(id));
  saveStoredProducts(updated);
  return updated;
}

export function resetDefaultProducts() {
  saveStoredProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

// 2. 뉴스레터 구독자 관리 함수들
export function getStoredSubscribers() {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_KEY);
    if (!raw) {
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(DEFAULT_SUBSCRIBERS));
      return DEFAULT_SUBSCRIBERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredSubscribers error:', e);
    return DEFAULT_SUBSCRIBERS;
  }
}

export function addSubscriber({ name, phone, email }) {
  const current = getStoredSubscribers();
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newSub = {
    id: 'sub-' + Date.now(),
    name,
    phone,
    email,
    date: dateStr
  };
  const updated = [newSub, ...current];
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(updated));
  return newSub;
}

export function deleteSubscriber(id) {
  const current = getStoredSubscribers();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(updated));
}

// 3. HTML5 Canvas 초경량 이미지 압축 엔진 (최대 600px, JPEG 70% 압축 -> 30KB~50KB 내외 Base64)
export function compressImage(file, maxDimension = 600, quality = 0.7) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('파일이 없습니다.'));
    
    // 파일 용량 검사 (최대 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return reject(new Error('파일 크기가 5MB를 초과합니다. 5MB 이하의 이미지를 올려주세요.'));
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 종횡비 유지하며 최대 600px로 축소
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // 부드러운 이미지 스케일링 설정
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 70% 품질로 압축 변환
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// 4. 수강생 및 관리자 회원 데이터 관리
const USERS_KEY = 'judiaistudio_users';
const CURRENT_USER_KEY = 'judiaistudio_current_user';

const DEFAULT_USERS = [
  {
    id: 'user-admin',
    name: '주디 대표',
    email: 'admin@judiaistudio.com',
    password: 'judy1234',
    role: 'admin',
    phone: '010-0000-0000',
    joinedAt: '2026-11-01'
  },
  {
    id: 'user-sample',
    name: '김지식 수강생',
    email: 'student@example.com',
    password: '1234',
    role: 'student',
    phone: '010-1234-5678',
    joinedAt: '2026-11-05'
  }
];

export function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredUsers error:', e);
    return DEFAULT_USERS;
  }
}

export function registerUser({ name, email, password, phone }) {
  const users = getStoredUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('이미 등록된 이메일 주소입니다.');
  }

  const newUser = {
    id: 'user-' + Date.now(),
    name,
    email,
    password,
    phone: phone || '',
    role: (email === 'admin' || email === 'admin@judiaistudio.com') ? 'admin' : 'student',
    joinedAt: new Date().toISOString().split('T')[0]
  };

  const updated = [newUser, ...users];
  localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  return newUser;
}

export function authenticateUser(emailOrId, password) {
  const users = getStoredUsers();
  const trimmed = emailOrId.trim().toLowerCase();
  
  // 빠른 관리자 단축키 지원 (아이디가 admin 또는 judy1234인 경우)
  if ((trimmed === 'admin' || trimmed === 'admin@judiaistudio.com') && (password === 'judy1234' || password === '1234')) {
    return {
      id: 'user-admin',
      name: '주디 대표 (관리자)',
      email: 'admin@judiaistudio.com',
      role: 'admin'
    };
  }

  // 빠른 수강생 체험 지원
  if (trimmed === 'student' && (password === '1234' || password === 'student1234')) {
    return {
      id: 'user-sample',
      name: '김지식 수강생',
      email: 'student@example.com',
      role: 'student'
    };
  }

  const found = users.find(u => 
    (u.email.toLowerCase() === trimmed || u.id === trimmed) && u.password === password
  );

  if (!found) {
    throw new Error('이메일(아이디) 또는 비밀번호가 일치하지 않습니다.');
  }

  return {
    id: found.id,
    name: found.name,
    email: found.email,
    role: found.role || 'student'
  };
}

export function getCurrentUser() {
  try {
    const raw = sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user, remember = false) {
  try {
    const data = JSON.stringify(user);
    if (remember) {
      localStorage.setItem(CURRENT_USER_KEY, data);
    }
    sessionStorage.setItem(CURRENT_USER_KEY, data);
  } catch (e) {
    console.error('setCurrentUser error:', e);
  }
}

export function clearCurrentUser() {
  try {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem('judiaistudio_admin_authenticated');
  } catch (e) {
    console.error('clearCurrentUser error:', e);
  }
}

