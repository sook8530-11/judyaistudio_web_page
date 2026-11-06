// 브라우저 localStorage 기반 통합 데이터 관리 & 이미지 압축 엔진

const PRODUCTS_KEY = 'judiaistudio_products';
const SUBSCRIBERS_KEY = 'judiaistudio_subscribers';
const CONSULTING_KEY = 'judiaistudio_consulting_requests';
const ORDERS_KEY = 'judiaistudio_orders';

// 초기 샘플 주문/결제 내역 데이터
const DEFAULT_ORDERS = [
  {
    id: 'ORD-20261106-9182',
    productId: 'prod-1',
    productTitle: 'AI 지식 비즈니스 실전 마스터 코스',
    category: 'VOD',
    amount: 245000,
    paymentMethod: '토스페이 / 신용카드',
    customerName: '김민수',
    customerEmail: 'minsu.kim@example.com',
    customerPhone: '010-3841-9281',
    status: '결제완료',
    paidAt: '2026-11-06 14:15'
  }
];

// 초기 교육 상담 신청 샘플 데이터
const DEFAULT_CONSULTING_REQUESTS = [
  {
    id: 'req-1',
    name: '최현우',
    organization: '(주)퓨처테크 HR팀',
    phone: '010-5821-3912',
    email: 'hw.choi@futuretech.io',
    category: '기업 교육',
    target: '기업 임직원 / 실무진',
    headcount: '21 ~ 50명 (대규모 워크숍)',
    schedulePreference: '구체적 날짜 지정',
    preferredDate: '2026-11-20',
    preferredTime: '평일 오후 (14:00~18:00)',
    message: '사내 마케팅/기획팀 대상 실전 생성형 AI 활용 지식 자동화 4시간 집중 워크숍 제안서를 받아보고 싶습니다.',
    createdAt: '2026-11-05 15:30'
  },
  {
    id: 'req-2',
    name: '정유진',
    organization: '개인 (퇴직 준비)',
    phone: '010-8912-4410',
    email: 'yujin.jung@gmail.com',
    category: '1:1 코칭',
    target: '전문직 / 시니어 / 퇴직 예정자',
    headcount: '1명 (1:1 개인)',
    schedulePreference: '빠른 일정 협의',
    preferredDate: '협의 가능',
    preferredTime: '주말 종일',
    message: '20년간 쌓은 인사 컨설팅 경험을 AI 기반 전자책 및 VOD 강좌로 패키징하는 1:1 코칭을 희망합니다.',
    createdAt: '2026-11-06 11:20'
  }
];

// 초기 기본 상품 데이터 (주디 대표 실제 포트폴리오 및 기획서 연동)
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    title: '동화집 《모두의 식탁》 & AI 동화작가 양성 실전 마스터',
    category: '전자책',
    price: 35000,
    originalPrice: 50000,
    badge: '교보문고 정식 출간',
    summary: '교보문고 출간 작가 주디PD가 직접 전수하는 생성형 AI 동화책·스토리텔링 기획부터 출판 유통까지의 전 과정',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-01',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '누구나 나만의 이야기를 가진 동화 작가가 될 수 있습니다', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '교보문고, 예스24 등 전국 서점에 정식 출간된 동화집 《모두의 식탁》의 기획부터 생성형 AI 삽화 제작, 스토리텔링 구조화, 출판 등록까지의 모든 실전 노하우를 담았습니다. 초보자도 1주일 만에 나만의 동화책을 완성할 수 있습니다.', align: 'left', highlight: 'none' },
      { id: 'b3', type: 'image', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', caption: '실제 출간 동화책 샘플' },
      { id: 'b4', type: 'h2', text: '동화작가 양성 코스 4대 커리큘럼', align: 'left', highlight: 'green' },
      { id: 'b5', type: 'p', text: '01단계: 감성 스토리 발굴 및 플롯 설계 (AI 질문법)\n02단계: Midjourney / DALL-E 스타일 일관성 유지 삽화 생성\n03단계: 오디오북 더빙 및 전자책(EPUB/PDF) 변환\n04단계: ISBN 발급 및 정식 서점 유통·수익화 로드맵', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-2',
    title: '박일 감독 × 주디PD의 스마트폰 영화제 수상작 메이킹 마스터클래스',
    category: 'VOD',
    price: 189000,
    originalPrice: 280000,
    badge: '영화제 6관왕 실전비법',
    summary: '예천국제스마트폰영화제 작품상 <지각결혼식>, 본선작 <북촌나들이>, <꽃할배>, <빈좌석>의 AI 음악 작곡 및 영상 총편집 비법 VOD',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-02',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '장비 0원, 스마트폰과 AI만으로 영화제 수상작을 만듭니다', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '2023년부터 80대 시니어 거장 박일 감독님과 함께 탄생시킨 예천국제스마트폰영화제 작품상 수상작 <지각결혼식>(패럴영화제 개막작), 본선 진출작 <북촌나들이>, 장려상 수상작 <AI가수 꽃할배> 및 <빈좌석>, 서울국제노인영화제 본선 진출작 <독립운동가 김향화가 말하다>의 실제 제작 워크플로우를 아낌없이 공개합니다.', align: 'left', highlight: 'none' },
      { id: 'b3', type: 'h2', text: 'VOD 핵심 수강 혜택', align: 'left', highlight: 'green' },
      { id: 'b4', type: 'p', text: '• 스마트폰 단편영화 및 뮤직비디오 실전 콘티 양식\n• AI 작곡(Suno/Udio)으로 맞춤 영화 OST 및 BGM 뽑기\n• 시네마틱 프롬프트 사전 50선 제공\n• 실제 영화제 출품 요령 및 수상 전략 가이드북 증정', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-3',
    title: '이경숙 대표의 인생 2막 1:1 맞춤형 AI 지식창업 코칭 (90분)',
    category: '1:1코칭',
    price: 220000,
    originalPrice: 350000,
    badge: '월 선착순 5팀',
    summary: '구글 제미나이 티쳐 트레이너 주디PD가 1:1로 직접 내 경험을 분석하고 나만의 지식 상품 본진을 설계해 드립니다',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-03',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '주디; 주인공을 디자인하다 — 당신의 인생 2막을 함께 설계합니다', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '사전 정밀 설문지를 통해 수강생님의 20~30년 경력과 관심사를 면밀히 분석한 후, 90분간 1:1 Zoom 세션으로 진행됩니다. "무엇을 팔아야 할지", "어떻게 브랜딩해야 할지" 막막했던 안개를 단 90분 만에 걷어내 드립니다.', align: 'left', highlight: 'none' },
      { id: 'b3', type: 'h2', text: '1:1 밀착 코칭 특전', align: 'left', highlight: 'green' },
      { id: 'b4', type: 'p', text: '• 사전 배경 분석 리포트 및 맞춤형 지식 상품 기획안\n• 90분 줌 녹화본 평생 소장\n• 세션 종료 후 2주간 주디PD 카카오톡 1:1 Q&A 직통 채널 제공', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-4',
    title: '《푸른 별을 되찾은 어린왕자와 사막여우》 오디오북 & 컬러링북',
    category: '전자책',
    price: 19000,
    originalPrice: 30000,
    badge: '인기 멀티미디어',
    summary: 'AI 일러스트 삽화와 고품질 오디오 더빙, 컬러링북이 하나로 융합된 감성 디지털 교육 콘텐츠',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-04',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: 'AI와 인간의 따뜻한 교감이 빚어낸 융합 동화', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '생성형 AI로 구현한 동화 삽화와 오디오 더빙, 직접 색칠할 수 있는 컬러링북 도안이 포함된 패키지입니다. 학교와 도서관, 복지관 등에서 뜨거운 반응을 얻은 교육용 융합 작품입니다.', align: 'left', highlight: 'none' }
    ]
  },
  {
    id: 'prod-5',
    title: '내 경험을 돈으로 바꾸는 AI 지식 비즈니스 스타터킷 2026',
    category: '무료배포',
    price: 0,
    originalPrice: 50000,
    badge: '1차 한정 무료배포',
    summary: '아이디어 선별 7대 체크리스트와 커리큘럼 공식, 프롬프트 10선이 담긴 공식 1차 배포본 PDF',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    createdAt: '2026-11-05',
    contentBlocks: [
      { id: 'b1', type: 'h1', text: '결제 전에 가치를 먼저 무료로 확인하세요', align: 'center', highlight: 'yellow' },
      { id: 'b2', type: 'p', text: '주디 대표가 집필한 1차 한정 배포본 전문입니다. 내 경험 중 어떤 것이 실제 시장에서 팔릴 수 있는지 검증하는 7가지 체크리스트와 즉시 복사해 쓸 수 있는 프롬프트 10선을 제공합니다.', align: 'left', highlight: 'none' }
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

// 2-2. 교육상담신청 (기업, 개인, 특강, 캠프, 코칭, 컨설팅) 데이터 관리
export function getStoredConsultingRequests() {
  try {
    const raw = localStorage.getItem(CONSULTING_KEY);
    if (!raw) {
      localStorage.setItem(CONSULTING_KEY, JSON.stringify(DEFAULT_CONSULTING_REQUESTS));
      return DEFAULT_CONSULTING_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredConsultingRequests error:', e);
    return DEFAULT_CONSULTING_REQUESTS;
  }
}

export function addConsultingRequest(data) {
  const current = getStoredConsultingRequests();
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newReq = {
    id: 'req-' + Date.now(),
    ...data,
    createdAt: dateStr
  };
  const updated = [newReq, ...current];
  localStorage.setItem(CONSULTING_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('judiaistudio_consulting_updated', { detail: updated }));
  }
  return newReq;
}

export function deleteConsultingRequest(id) {
  const current = getStoredConsultingRequests();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(CONSULTING_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('judiaistudio_consulting_updated', { detail: updated }));
  }
  return updated;
}

// 2-3. 토스페이먼츠 결제 완료 주문 내역 관리
export function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('getStoredOrders error:', e);
    return DEFAULT_ORDERS;
  }
}

export function addOrder(orderData) {
  const current = getStoredOrders();
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newOrder = {
    id: orderData.id || ('ORD-' + Date.now().toString().slice(-8)),
    ...orderData,
    status: '결제완료',
    paidAt: dateStr
  };
  const updated = [newOrder, ...current];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('judiaistudio_orders_updated', { detail: updated }));
  }
  return newOrder;
}

export function deleteOrder(id) {
  const current = getStoredOrders();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('judiaistudio_orders_updated', { detail: updated }));
  }
  return updated;
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

