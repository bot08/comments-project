<template>
  <NuxtLink v-if="!Array.isArray(item)" :to="localePath(item.href)">
    <BaseVisualFeedback class="flex items-center">
      <component :is="item.icon" class="w-6 h-6 mr-2"/>
      <BaseTextMedium>{{ item.name }}</BaseTextMedium>
    </BaseVisualFeedback>
  </NuxtLink>
  <div v-else ref="linkContainer" class="relative">
    <button @click="toggleOpen">
      <BaseVisualFeedback class="flex items-center">
        <ChevronDownIcon :class="'w-6 h-6 mr-2 transition-transform ' + (isOpen && 'rotate-180')"/>
        <BaseTextMedium>More</BaseTextMedium>
      </BaseVisualFeedback>
    </button>
    <transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 scale-75 -translate-y-8"
      leave-active-class="transition ease-out duration-250"
      leave-to-class="opacity-0 scale-75 -translate-y-8"
    >
      <div v-if="isOpen" class="absolute left-1/2 -translate-x-1/2 w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-700">
        <BaseNavbarLink v-for="(item, index) in item" :key="index" :item="item"/>
      </div>
    </transition>
  </div>
</template>


<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const isOpen = ref<boolean>(false)
const linkContainer = ref<null | object>(null)

defineProps({
  item: {
    type: Object,
    required: true,
  }
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  useBlurStore().updBlur(isOpen.value);
}

const handleClickOutside = (event) => {
  if (linkContainer.value && !linkContainer.value.contains(event.target) && isOpen.value) {
    isOpen.value = false;
    useBlurStore().updBlur(false);
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>