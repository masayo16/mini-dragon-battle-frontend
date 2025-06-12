// @ts-check

import prettier from 'eslint-config-prettier/flat';
import withNuxt from './.nuxt/eslint.config.mjs';
import vitest from 'eslint-plugin-vitest';

export default withNuxt()
  .append({
    files: ['src/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  })
  .append({
    name: 'vitest',
    files: [
      'tests/**/*.spec.{js,ts,vue}',
      'tests/**/*.test.{js,ts,vue}',
      '__mocks__/**/*.spec.{js,ts}',
      '__mocks__/**/*.test.{js,ts}',
    ],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/no-focused-tests': 'error',
    },
  })
  .append(prettier);
// Your custom configs here
