<template>
  <div class="fixed inset-x-0 z-40 shadow bg-white dark:bg-neutral-700 text-black-700 dark:text-white transition-colors">
    <div class="px-6 md:px-12 mx-auto max-w-screen-2xl h-16">
      <div class="flex justify-between items-center h-full">
        <!-- Left part -->
        <div class="flex items-center space-x-4">
          <NuxtLink :to="localePath('/')">
            <BaseVisualFeedback class="flex items-center space-x-4">
            <img class="h-8 w-8" src="/favicon.ico" alt="logo"/>
            <BaseTextMedium>{{ $t('base.sitename') }}</BaseTextMedium>
            </BaseVisualFeedback>
          </NuxtLink>
        </div>
        <!-- Central -->
        <div class="md:flex hidden items-center space-x-4">
          <BaseNavbarLink v-for="(item, index) in navigation" :key="index" :item="item"/>
        </div>
        <!-- Right part -->
        <div class="flex items-center space-x-4">
          <!-- Theme -->
          <button @click="changeTheme()" class="w-6 h-6">
            <ClientOnly fallbackTag="div">
              <Transition appear enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-75">
                <BaseVisualFeedback>
                  <ComputerDesktopIcon v-if="$colorMode.preference === 'system'" class="h-6 w-6"/>
                  <SunIcon v-if="$colorMode.preference === 'light'" class="h-6 w-6"/>
                  <MoonIcon v-if="$colorMode.preference === 'dark'" class="h-6 w-6"/>
                </BaseVisualFeedback>
              </Transition>
            </ClientOnly>
          </button>
          <div>
            <BaseNavbarMobile :items="navigation"/>
            <BaseNavbarLang/>
          </div>
          <BaseNavbarUser class="hidden md:block"/>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ComputerDesktopIcon, SunIcon, MoonIcon, HomeIcon, BookOpenIcon, RectangleGroupIcon } from '@heroicons/vue/24/solid'

interface navLink {
  name: string,
  href: string,
  icon: Component
}

const navigation: navLink[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Docs', href: '/docs', icon: BookOpenIcon },
  { name: 'Widget', href: '/widget', icon: RectangleGroupIcon },
  // goofy test
  // [
  //   { name: 'Index))', href: '/', icon: HomeIcon },
  //   { name: 'SPINS !', href: '/page2', icon: HomeModernIcon },
  //   [
  //     { name: 'Why a?', href: '/', icon: HomeIcon },
  //     { name: 'B??????', href: '/page2', icon: HomeModernIcon },
  //     [
  //       { name: 'asdasdsa?', href: '/', icon: HomeIcon },
  //       { name: 'aaaasasss!', href: '/page2', icon: HomeModernIcon },
  //     ]
  //   ]
  // ]
]

function changeTheme() {
  if (useColorMode().preference === 'system') {
    useColorMode().preference = 'light';
  } else if (useColorMode().preference === 'light') {
    useColorMode().preference = 'dark';
  } else if (useColorMode().preference === 'dark') {
    useColorMode().preference = 'system';
  }
}
</script>