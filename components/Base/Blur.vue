<template>
  <transition
    enter-active-class="transition ease-out duration-250"
    enter-from-class="opacity-0"
    leave-active-class="transition ease-out duration-250"
    leave-to-class="opacity-0"
  >
    <div v-if="blurStore.isBlur" class="fixed z-10 backdrop-blur inset-0 bg-white/25 dark:bg-black/25"></div>
  </transition>
</template>


<script setup lang="ts">
const blurStore = useBlurStore();
</script>