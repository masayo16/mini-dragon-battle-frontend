import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    include: ['tests/**/*.spec.ts', 'tests/**/*.nuxt.spec.ts'],
    setupFiles: ['./tests/setup.ts'],
    environmentOptions: {
      nuxt: {
        overrides: {
          plugins: ['./tests/mocks/firebase.plugin.ts'],
        },
      },
    },
  },
});
