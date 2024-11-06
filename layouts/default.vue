<template>
  <BaseNavbar/>
  <div class="pt-20 md:pt-24 mx-auto max-w-screen-2xl">
    <slot/>
  </div>
 <BaseBlur/>
</template>


<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

useSeoMeta({
  //title: 'My Amazing Site',
  //ogTitle: 'My Amazing Site',
  //description: 'This is my amazing site, let me tell you all about it.',
  //ogDescription: 'This is my amazing site, let me tell you all about it.',
  //ogImage: 'https://example.com/image.png',
  //twitterCard: 'summary_large_image',
})

useHead({
  titleTemplate: (title: string) => `${title} - ${t('base.sitename')}`,
  title: () => route.meta.title as string,
  meta: [
    { name: 'theme-color', content: import.meta.client ? (() => useColorMode().value != 'dark' ? '#fff' : '#3f3f46') : '' }
  ],
  htmlAttrs: {
    lang: locale.value as string
  },
  bodyAttrs: {
    class: 'min-h-dvh overflow-y-scroll bg-gray-200 dark:bg-neutral-900 transition-colors'
  },
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

</script>