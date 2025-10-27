import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// FLAT: desativa regras que conflitam com o Prettier
import eslintConfigPrettier from 'eslint-config-prettier';
// FLAT: plugin do Prettier para reportar diffs como erro
import prettierPlugin from 'eslint-plugin-prettier';

import prettierOptions from './.prettierrc.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', prettierOptions],
    },
  },
  eslintConfigPrettier,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
