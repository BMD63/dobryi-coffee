export default {
  // Global page headers
  head: {
    titleTemplate: '%s — Добрый кофе',
    title: 'Добрый кофе',
    htmlAttrs: { lang: 'ru' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }, // 👈 фикс
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' }
    ]
  },

  // Global CSS
  css: ['~/assets/scss/main.scss'],

  // Plugins
  plugins: ['~/plugins/api.ts'],

  // Auto import components
  components: true,

  // Dev/build modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // Nuxt modules
  modules: [],

  // Vuetify configuration
  vuetify: {
  customVariables: ['~/assets/scss/_tokens.scss'], //  токены
  treeShake: true,
  theme: {
    dark: false,
    themes: {
      light: { background: '#FFFFFF', primary: '#FFFFFF', secondary: '#EEEEEE', accent: '#FFD166', info: '#787878', text: '#000000' },
      dark:  { background: '#121212', primary: '#1e1e1e', secondary: '#2a2a2a', accent: '#FFD166', info: '#9e9e9e', text: '#FFFFFF' }
    },
    options: { customProperties: true }
  }
},

  // Build configuration
  build: {}
}
