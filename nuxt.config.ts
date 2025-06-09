// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      ignore: ['/login'],
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/test-utils/module', '@pinia/nuxt'],

  plugins: ['~/plugins/firebase.client'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    },
  },
  compatibilityDate: '2024-11-01',
  typescript: { typeCheck: true },
});
