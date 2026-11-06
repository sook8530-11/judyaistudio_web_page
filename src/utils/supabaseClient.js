import { createClient } from '@supabase/supabase-js';

// Supabase 접속 정보 (환경 변수 또는 기본값)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://oaxxrsadopwhvgklmcva.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OBLJzK0drOXsmJpUWFvIcA_F0iaLtfT';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// DB 데이터 <-> 프론트엔드 포맷 양방향 변환 유틸리티
export function formatProductFromDb(row) {
  if (!row) return null;
  let contentBlocks = [];
  if (row.detail_content) {
    try {
      const parsed = JSON.parse(row.detail_content);
      if (Array.isArray(parsed)) {
        contentBlocks = parsed;
      } else {
        contentBlocks = [{ id: 'b1', type: 'p', text: String(row.detail_content), align: 'left' }];
      }
    } catch {
      contentBlocks = [{ id: 'b1', type: 'p', text: String(row.detail_content), align: 'left' }];
    }
  }

  return {
    id: String(row.id),
    category: row.category || 'VOD',
    title: row.title || '',
    price: Number(row.price) || 0,
    originalPrice: Number(row.price) || 0,
    description: row.description || '',
    summary: row.description || '',
    image_url: row.image_url || '',
    thumbnail: row.image_url || '',
    detail_content: row.detail_content || '',
    contentBlocks: contentBlocks,
    badge: row.category === '무료배포' ? '무료' : '추천',
    createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '',
    created_at: row.created_at
  };
}

// 1. Supabase 상품 목록 비동기 조회 (Select / Read)
export async function fetchProductsFromDb() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchProductsFromDb warning:', error.message);
      return null;
    }
    return data ? data.map(formatProductFromDb) : [];
  } catch (err) {
    console.warn('Supabase fetchProductsFromDb network note:', err);
    return null;
  }
}

// 2. Supabase 상품 단일 비동기 조회 (Select by ID)
export async function fetchProductByIdFromDb(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetchProductByIdFromDb warning:', error.message);
      return null;
    }
    return data ? formatProductFromDb(data) : null;
  } catch (err) {
    console.warn('Supabase fetchProductByIdFromDb network note:', err);
    return null;
  }
}

// 3. Supabase 신규 상품 등록 (Insert)
export async function insertProductToDb(productInput) {
  // 본문 텍스트/블록 직렬화
  let detailContent = '';
  if (typeof productInput.detail_content === 'string' && productInput.detail_content.trim()) {
    detailContent = productInput.detail_content;
  } else if (Array.isArray(productInput.contentBlocks)) {
    detailContent = JSON.stringify(productInput.contentBlocks);
  } else if (typeof productInput.description === 'string') {
    detailContent = productInput.description;
  }

  const payload = {
    category: productInput.category || 'VOD',
    title: productInput.title || '',
    price: Number(productInput.price) || 0,
    description: productInput.description || productInput.summary || '',
    image_url: productInput.image_url || productInput.thumbnail || '',
    detail_content: detailContent
  };

  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`상품 등록 실패: ${error.message}`);
  }

  return formatProductFromDb(data);
}

// 4. Supabase 상품 수정 (Update)
export async function updateProductInDb(id, updatedFields) {
  const payload = {};
  if (updatedFields.category !== undefined) payload.category = updatedFields.category;
  if (updatedFields.title !== undefined) payload.title = updatedFields.title;
  if (updatedFields.price !== undefined) payload.price = Number(updatedFields.price) || 0;
  if (updatedFields.description !== undefined || updatedFields.summary !== undefined) {
    payload.description = updatedFields.description || updatedFields.summary || '';
  }
  if (updatedFields.image_url !== undefined || updatedFields.thumbnail !== undefined) {
    payload.image_url = updatedFields.image_url || updatedFields.thumbnail || '';
  }
  if (updatedFields.detail_content !== undefined) {
    payload.detail_content = typeof updatedFields.detail_content === 'string' 
      ? updatedFields.detail_content 
      : JSON.stringify(updatedFields.detail_content);
  } else if (updatedFields.contentBlocks !== undefined) {
    payload.detail_content = JSON.stringify(updatedFields.contentBlocks);
  }

  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`상품 수정 실패: ${error.message}`);
  }

  return formatProductFromDb(data);
}

// 5. Supabase 상품 삭제 (Delete)
export async function deleteProductFromDb(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`상품 삭제 실패: ${error.message}`);
  }

  return true;
}

// 6. 뉴스레터 및 무료 가이드북 구독자 비동기 등록 (newsletter_subscribers)
export async function insertNewsletterSubscriber({ name, phone, email }) {
  const payload = {
    name: name || '',
    phone: phone || '',
    email: email || ''
  };

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.warn('insertNewsletterSubscriber error:', error.message);
    return null;
  }

  return data;
}

// 7. 뉴스레터 구독자 목록 조회
export async function fetchNewsletterSubscribers() {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

// 8. 뉴스레터 구독자 삭제
export async function deleteNewsletterSubscriber(id) {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// 9. Supabase 연결 및 테이블 스키마 준비 상태 검증 함수
export async function checkSupabaseConnection() {
  try {
    const [productsRes, subscribersRes] = await Promise.all([
      supabase.from('products').select('id').limit(1),
      supabase.from('newsletter_subscribers').select('id').limit(1)
    ]);

    const isProductsTableReady = !productsRes.error;
    const isSubscribersTableReady = !subscribersRes.error;

    if (isProductsTableReady && isSubscribersTableReady) {
      return { 
        connected: true, 
        tablesReady: true, 
        message: 'Supabase 원격 DB 연결 및 테이블(products, newsletter_subscribers) 준비 완료' 
      };
    }

    const missingTables = [];
    if (!isProductsTableReady) missingTables.push('products');
    if (!isSubscribersTableReady) missingTables.push('newsletter_subscribers');

    return { 
      connected: true, 
      tablesReady: false, 
      missingTables,
      message: `Supabase 연결 성공 (setup.sql 실행 필요: ${missingTables.join(', ')})` 
    };
  } catch (err) {
    return { connected: false, tablesReady: false, message: err.message };
  }
}
