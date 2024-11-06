<template>
  <div ref="langContainer" class="relative">
    <BaseVisualFeedback>
      <button @click="toggleOpen" class="hidden md:flex items-center">
        <LanguageIcon class="w-6 h-6"/>
      </button>
    </BaseVisualFeedback>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 scale-75 -translate-y-8"
      leave-active-class="transition ease-out duration-250"
      leave-to-class="opacity-0 scale-75 -translate-y-8"
    >
      <div v-if="isOpen" class="absolute left-1/2 -translate-x-1/2 w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-700">
        <BaseVisualFeedback v-for="lang in languages" :key="lang.code">
          <button @click="setLocale(lang.code)" class="block">{{ lang.name }}</button>
        </BaseVisualFeedback>
      </div>
    </transition>
  </div>
</template>


<script setup lang="ts">
import { LanguageIcon } from '@heroicons/vue/24/solid'
const { setLocale } = useI18n()

const isOpen = ref<boolean>(false)
const langContainer = ref<null | object>(null)

interface languagesType {
  code: string,
  name: string
}

const languages = ref<languagesType[]>([
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' },
  { code: 'ja', name: '日本語' }
])

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  useBlurStore().updBlur(isOpen.value);
}

const handleClickOutside = (event) => {
  if (langContainer.value && !langContainer.value.contains(event.target) && isOpen.value) {
    isOpen.value = false;
    useBlurStore().updBlur(false);
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>