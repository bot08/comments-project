// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  build: {
    transpile: ['@heroicons/vue']
  },

  runtimeConfig: {
    mongodbUri: '<mongodb_uri>',
    jwtSecret: '<jwt_secret>',
  },

  vite:{
    build: {
      target: 'es2022',
    },
    // esbuild: {
    //   drop: ["console"],
    // },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    "@nuxtjs/i18n",
    '@nuxt/image'
  ],

  css: [
    '~/assets/css/style.css',
    '~/assets/css/inter.css'
  ],

  colorMode: {
    classSuffix: '',
    storageKey: 'theme',
    fallback: 'light',
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'uk', language: 'uk-UA', file: 'uk.json' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix',
  },

  routeRules: {
    // '/': { static: true },
    // '/page2': { swr: true },
    // cache rules
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=86400' } },
    '/font/**': { headers: { 'cache-control': 's-maxage=86400' } },
    // redirects
    //'/page1': { redirect: '/page2' },
  }
})