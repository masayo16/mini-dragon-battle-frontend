// @ts-check

import prettier from 'eslint-config-prettier/flat';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt()
  .append({
    files: ['src/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  })
  .append(prettier);
// Your custom configs here
