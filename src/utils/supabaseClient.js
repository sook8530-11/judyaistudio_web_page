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

// Supabase 연결 상태 확인 함수
export async function checkSupabaseConnection() {
  try {
    const { error } = await supabase.from('subscribers').select('id').limit(1);
    if (!error) {
      return { connected: true, tablesReady: true, message: '클라우드 DB 정상 연결 및 테이블 준비 완료' };
    }
    // 테이블 미생성 오류 (PGRST205)
    if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
      return { connected: true, tablesReady: false, message: 'Supabase 연결 성공 (테이블 SQL 생성 필요)' };
    }
    return { connected: false, tablesReady: false, message: error.message };
  } catch (err) {
    return { connected: false, tablesReady: false, message: err.message };
  }
}
