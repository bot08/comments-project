<template>
  <div ref="langContainer" class="relative">
    <BaseVisualFeedback>
      <button @click="isOpen = !isOpen" class="hidden md:flex items-center">
        <LanguageIcon class="w-6 h-6 mr-2"/>
        <BaseMediumText>Lang switch</BaseMediumText>
      </button>
    </BaseVisualFeedback>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 scale-75 -translate-y-8 translate-x-2"
      leave-active-class="transition ease-out duration-250"
      leave-to-class="opacity-0 scale-75 -translate-y-8 translate-x-2"
    >
      <div v-if="isOpen" class="absolute right-0 w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-700">
        <BaseVisualFeedback v-for="lang in languages" :key="lang.code">
          <button @click="setLocale(lang.code)" class="block">{{ lang.name }}</button>
        </BaseVisualFeedback>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { LanguageIcon } from '@heroicons/vue/24/solid'
const { setLocale } = useI18n()

const isOpen = ref(false)
const langContainer = ref(null)

const languages = ref([
  { code: 'en', name: 'English' },
  { code: 'uk', name: 'Українська' },
  { code: 'ja', name: '日本語' }
])

const handleClickOutside = (event) => {
  if (langContainer.value && !langContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>