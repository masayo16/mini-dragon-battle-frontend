export default defineNuxtRouteMiddleware(to => {
  // 開発環境では認証をスキップ（ダミーAPIキーの場合）
  const config = useRuntimeConfig();
  if (config.public.FIREBASE_API_KEY === 'dummy-api-key-for-development') {
    return;
  }

  const user = useGoogleAuth().user;

  if (!user.value && to.path !== '/login' && to.path !== '/') {
    return navigateTo('/login');
  }
});
