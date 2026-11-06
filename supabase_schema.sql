-- ========================================================
-- 주디AI스튜디오 (Judy AI Studio) Supabase DB 테이블 생성 스크립트
-- Supabase 대시보드 > SQL Editor 에 복사하여 'Run' 버튼을 누르면 즉시 생성됩니다.
-- ========================================================

-- 1. 뉴스레터 및 무료 가이드북 구독자/신청자 테이블
CREATE TABLE IF NOT EXISTS public.subscribers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    type TEXT DEFAULT 'newsletter',
    date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 1:1 코칭 및 교육 컨설팅 신청 내역 테이블
CREATE TABLE IF NOT EXISTS public.consulting_requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    organization TEXT,
    phone TEXT,
    email TEXT,
    category TEXT,
    target TEXT,
    headcount TEXT,
    schedule_preference TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    message TEXT,
    status TEXT DEFAULT '신규접수',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 토스페이먼츠 결제 주문 내역 테이블
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    product_title TEXT,
    category TEXT,
    amount NUMERIC,
    payment_method TEXT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    status TEXT DEFAULT '결제완료',
    paid_at TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VOD 및 지식 상품 테이블
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    price NUMERIC DEFAULT 0,
    original_price NUMERIC DEFAULT 0,
    badge TEXT,
    summary TEXT,
    thumbnail TEXT,
    content_blocks JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) 활성화
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 익명 방문자(anon) 및 모든 사용자에 대한 정책 설정
DROP POLICY IF EXISTS "Allow anon all subscribers" ON public.subscribers;
CREATE POLICY "Allow anon all subscribers" ON public.subscribers FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all consulting_requests" ON public.consulting_requests;
CREATE POLICY "Allow anon all consulting_requests" ON public.consulting_requests FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all orders" ON public.orders;
CREATE POLICY "Allow anon all orders" ON public.orders FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all products" ON public.products;
CREATE POLICY "Allow anon all products" ON public.products FOR ALL TO anon USING (true) WITH CHECK (true);
