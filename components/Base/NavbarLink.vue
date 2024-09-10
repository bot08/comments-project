<template>
  <NuxtLink v-if="!Array.isArray(item)" :to="localePath(item.href)">
    <BaseVisualFeedback class="flex items-center">
      <component :is="item.icon" class="w-6 h-6 mr-2"/>
      <BaseMediumText>{{ item.name }}</BaseMediumText>
    </BaseVisualFeedback>
  </NuxtLink>
  <div v-else ref="linkContainer" class="relative">
    <button @click="isOpen = !isOpen">
      <BaseVisualFeedback class="flex items-center">
        <ChevronDownIcon :class="'w-6 h-6 mr-2 transition-transform ' + (isOpen && 'rotate-180')"/>
        <BaseMediumText>More</BaseMediumText>
      </BaseVisualFeedback>
    </button>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 scale-75 -translate-y-8"
      leave-active-class="transition ease-out duration-250"
      leave-to-class="opacity-0 scale-75 -translate-y-8"
    >
      <div v-if="isOpen" class="absolute left-1/2 -translate-x-1/2 w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-700">
        <BaseNavbarLink v-for="(item, index) in item" :key="index" :item="item"/>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const isOpen = ref(false)
const linkContainer = ref(null)

defineProps({
  item: {
    type: Object,
    required: true,
  }
})

const handleClickOutside = (event) => {
  if (linkContainer.value && !linkContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>