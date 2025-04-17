// @ts-check

import prettier from 'eslint-config-prettier/flat';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt().append(prettier);
// Your custom configs here
