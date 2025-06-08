export default defineNuxtRouteMiddleware(to => {
  const user = useGoogleAuth().user;
  console.log('auth.global.ts', user.value, to.path);
  if (!user.value && to.path !== '/login' && to.path !== '/') {
    return navigateTo('/login');
  }
});
