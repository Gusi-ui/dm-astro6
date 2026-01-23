import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import astroEslintParser from 'astro-eslint-parser';

export default [
  // Configuración base de Astro (incluye soporte para .astro y typescript dentro de astro)
  ...eslintPluginAstro.configs.recommended,

  // Configuración base de TypeScript
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    // Configuración específica para archivos de configuración
    files: ['**/*.config.mjs', '**/*.config.js', '**/*.config.cjs', 'eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/', '.wrangler/', 'src/lib/node-mock.mjs'],
  },
];
