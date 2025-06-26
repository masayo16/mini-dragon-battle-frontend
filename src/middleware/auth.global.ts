export default defineNuxtRouteMiddleware(to => {
  const user = useGoogleAuth().user;

  if (!user.value && to.path !== '/login' && to.path !== '/') {
    return navigateTo('/login');
  }
});
