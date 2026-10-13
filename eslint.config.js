import js from './frontend/node_modules/@eslint/js/src/index.js'
import globals from './frontend/node_modules/globals/index.js'
import reactHooks from './frontend/node_modules/eslint-plugin-react-hooks/index.js'
import reactRefresh from './frontend/node_modules/eslint-plugin-react-refresh/index.js'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      'frontend/dist/**',
    ],
  },
  // Backend config - Node environment
  {
    files: ['backend/**/*.{js,mjs}'],
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  // Frontend config - Browser & React environment
  {
    files: ['frontend/**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },
]

