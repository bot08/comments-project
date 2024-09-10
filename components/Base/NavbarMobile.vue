<template>
  <div ref="container" class="relative">
    <button @click="isOpen = !isOpen" class="block md:hidden">
      <BaseVisualFeedback>
        <Bars4Icon class="h-8 w-8"/>
      </BaseVisualFeedback>
    </button>

    <div class="absolute">
      <transition
        enter-active-class="transition ease-out duration-250"
        enter-from-class="opacity-0 scale-75 -translate-y-8"
        leave-active-class="transition ease-out duration-250"
        leave-to-class="opacity-0 scale-75 -translate-y-8"
      >
        <div v-if="isOpen" class="absolute right-0 translate-x-8 origin-top-right w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-700">
          <BaseNavbarLink v-for="(item, index) in items" :key="index" :item="item"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { Bars4Icon } from '@heroicons/vue/24/solid'

const isOpen = ref(false)
const container = ref(null)

defineProps({
  items: {
    type: Object,
    required: true,
  }
})

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>