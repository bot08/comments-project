<template>
  <div ref="container" class="relative">
    <button @click="toggleOpen" class="block md:hidden">
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
        <div v-if="isOpen" class="absolute right-0 translate-x-8 origin-top-right w-40 p-4 mt-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-700">
          <BaseNavbarLink v-for="(item, index) in items" :key="index" :item="item"/>
          <BaseNavbarUser/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars4Icon } from '@heroicons/vue/24/solid'

const isOpen = ref<boolean>(false)
const container = ref<null | object>(null)

defineProps({
  items: {
    type: Object,
    required: true,
  }
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  useBlurStore().updBlur(isOpen.value);
}

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target) && isOpen.value) {
    isOpen.value = false;
    useBlurStore().updBlur(false);
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>