import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  // 開発環境用のフォールバック設定
  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.FIREBASE_API_KEY || 'dummy-api-key-for-development',
    authDomain: config.public.FIREBASE_AUTH_DOMAIN || 'dummy-project.firebaseapp.com',
    projectId: config.public.FIREBASE_PROJECT_ID || 'dummy-project',
  };

  // 本番環境では適切な設定が必要であることを警告
  if (process.env.NODE_ENV === 'production' && firebaseConfig.apiKey === 'dummy-api-key-for-development') {
    throw new Error('Production environment requires proper Firebase configuration');
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return {
    provide: {
      firebase: {
        auth,
      },
    },
  };
});
