module.exports = {
  root: true,
  env: { browser: true, node: true, es6: true },
  parserOptions: { parser: '@typescript-eslint/parser', sourceType: 'module' },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.ts', '.vue'] },
    },
  },
  rules: {
    'import/order': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/named': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-duplicates': 'off',

    'vue/attributes-order': 'off',
    'vue/order-in-components': 'off',

    'nuxt/no-env-in-hooks': 'off',

    'promise/param-names': 'error',

    'vue/multi-word-component-names': [
      'error',
      { ignores: ['default', 'index', 'active'] },
    ],
  },
}
