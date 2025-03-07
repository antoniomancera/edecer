export const environment = {
  production: true,
  BASE_URL: 'https://apprendre-backend.onrender.com',
  SUPABASE_URL: typeof window !== 'undefined' ? window['SUPABASE_URL'] : '',
  SUPABASE_KEY: typeof window !== 'undefined' ? window['SUPABASE_KEY'] : '',
};
