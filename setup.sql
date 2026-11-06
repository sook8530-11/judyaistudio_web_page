-- ========================================================
-- 주디AI스튜디오 (Judy AI Studio) 데이터베이스 스키마 생성 스크립트 (setup.sql)
-- Supabase 대시보드 > SQL Editor 에서 전체 복사 후 [Run]을 실행하십시오.
-- ========================================================

-- 1. uuid 확장이 활성화되어 있는지 확인
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. 'products' 테이블 생성
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC DEFAULT 0,
    description TEXT,
    image_url TEXT,
    detail_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 'newsletter_subscribers' 테이블 생성
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 5. 외부 클라이언트 (Anon Role) 접근 권한 허용 정책 (Insert / Read / Update / Delete)
-- (1) products 테이블 정책
DROP POLICY IF EXISTS "Allow anon read products" ON public.products;
CREATE POLICY "Allow anon read products" ON public.products 
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow anon insert products" ON public.products;
CREATE POLICY "Allow anon insert products" ON public.products 
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update products" ON public.products;
CREATE POLICY "Allow anon update products" ON public.products 
    FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete products" ON public.products;
CREATE POLICY "Allow anon delete products" ON public.products 
    FOR DELETE TO anon USING (true);

-- (2) newsletter_subscribers 테이블 정책
DROP POLICY IF EXISTS "Allow anon read newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon read newsletter_subscribers" ON public.newsletter_subscribers 
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow anon insert newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon insert newsletter_subscribers" ON public.newsletter_subscribers 
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon update newsletter_subscribers" ON public.newsletter_subscribers 
    FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon delete newsletter_subscribers" ON public.newsletter_subscribers 
    FOR DELETE TO anon USING (true);

-- 6. 초기 기본 상품 시드(Seed) 데이터 주입 (중복 방지 삽입)
INSERT INTO public.products (category, title, price, description, image_url, detail_content)
SELECT 
    '전자책',
    '동화집 《모두의 식탁》 & AI 동화작가 양성 실전 마스터',
    35000,
    '교보문고 출간 작가 주디PD가 직접 전수하는 생성형 AI 동화책·스토리텔링 기획부터 출판 유통까지의 전 과정',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    '교보문고, 예스24 등 전국 서점에 정식 출간된 동화집 《모두의 식탁》의 기획부터 생성형 AI 삽화 제작, 스토리텔링 구조화, 출판 등록까지의 모든 실전 노하우를 담았습니다. 초보자도 1주일 만에 나만의 동화책을 완성할 수 있습니다.'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE title = '동화집 《모두의 식탁》 & AI 동화작가 양성 실전 마스터');

INSERT INTO public.products (category, title, price, description, image_url, detail_content)
SELECT 
    'VOD',
    '박일 감독 × 주디PD의 스마트폰 영화제 수상작 메이킹 마스터클래스',
    189000,
    '예천국제스마트폰영화제 작품상 <지각결혼식>, 본선작 <북촌나들이>, <꽃할배>, <빈좌석>의 AI 음악 작곡 및 영상 총편집 비법 VOD',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80',
    '2023년부터 80대 시니어 거장 박일 감독님과 함께 탄생시킨 예천국제스마트폰영화제 작품상 수상작 <지각결혼식>(패럴영화제 개막작), 본선 진출작 <북촌나들이>, 장려상 수상작 <AI가수 꽃할배> 및 <빈좌석>, 서울국제노인영화제 본선 진출작 <독립운동가 김향화가 말하다>의 실제 제작 워크플로우를 아낌없이 공개합니다.'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE title = '박일 감독 × 주디PD의 스마트폰 영화제 수상작 메이킹 마스터클래스');

INSERT INTO public.products (category, title, price, description, image_url, detail_content)
SELECT 
    '1:1코칭',
    '이경숙 대표의 인생 2막 1:1 맞춤형 AI 지식창업 코칭 (90분)',
    220000,
    '구글 제미나이 티쳐 트레이너 주디PD가 1:1로 직접 내 경험을 분석하고 나만의 지식 상품 본진을 설계해 드립니다',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    '사전 정밀 설문지를 통해 수강생님의 20~30년 경력과 관심사를 면밀히 분석한 후, 90분간 1:1 Zoom 세션으로 진행됩니다. "무엇을 팔아야 할지", "어떻게 브랜딩해야 할지" 막막했던 안개를 단 90분 만에 걷어내 드립니다.'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE title = '이경숙 대표의 인생 2막 1:1 맞춤형 AI 지식창업 코칭 (90분)');

INSERT INTO public.products (category, title, price, description, image_url, detail_content)
SELECT 
    '전자책',
    '《푸른 별을 되찾은 어린왕자와 사막여우》 오디오북 & 컬러링북',
    19000,
    'AI 일러스트 삽화와 고품질 오디오 더빙, 컬러링북이 하나로 융합된 감성 디지털 교육 콘텐츠',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    '생성형 AI로 구현한 동화 삽화와 오디오 더빙, 직접 색칠할 수 있는 컬러링북 도안이 포함된 패키지입니다. 학교와 도서관, 복지관 등에서 뜨거운 반응을 얻은 교육용 융합 작품입니다.'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE title = '《푸른 별을 되찾은 어린왕자와 사막여우》 오디오북 & 컬러링북');

INSERT INTO public.products (category, title, price, description, image_url, detail_content)
SELECT 
    '무료배포',
    '내 경험을 돈으로 바꾸는 AI 지식 비즈니스 스타터킷 2026',
    0,
    '아이디어 선별 7대 체크리스트와 커리큘럼 공식, 프롬프트 10선이 담긴 공식 1차 배포본 PDF',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    '주디 대표가 집필한 1차 한정 배포본 전문입니다. 내 경험 중 어떤 것이 실제 시장에서 팔릴 수 있는지 검증하는 7가지 체크리스트와 즉시 복사해 쓸 수 있는 프롬프트 10선을 제공합니다.'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE title = '내 경험을 돈으로 바꾸는 AI 지식 비즈니스 스타터킷 2026');

