<template>
  <div class="my-4 flex items-center space-x-4">
    <div class="relative h-10 w-10">
      <transition 
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-10"
        leave-active-class="transition ease-out duration-500"
        leave-to-class="opacity-0 translate-y-10"
      >
        <MusicalNoteIcon v-if="slotState == 1" class="absolute h-10 w-10"/>
        <NewspaperIcon v-else-if="slotState == 2" class="absolute h-10 w-10"/>
        <RadioIcon v-else-if="slotState == 3" class="absolute h-10 w-10"/>
      </transition>
    </div>
    <!-- TODO 3 -->
    <!-- <div class="relative h-10 w-10">
      <transition 
        enter-active-class="transition ease-out duration-500"
        enter-from-class="opacity-0 -translate-y-10"
        leave-active-class="transition ease-out duration-500"
        leave-to-class="opacity-0 translate-y-10"
      >
        <MusicalNoteIcon v-if="slotState == 1" class="absolute h-10 w-10"/>
        <NewspaperIcon v-else-if="slotState == 2" class="absolute h-10 w-10"/>
        <RadioIcon v-else-if="slotState == 3" class="absolute h-10 w-10"/>
      </transition>
    </div> -->
  </div>
  <BaseVisualFeedback>
    <button @click="spin">Spin</button>
  </BaseVisualFeedback>
</template>


<script setup>
import { MusicalNoteIcon, NewspaperIcon, RadioIcon } from '@heroicons/vue/24/solid'

const slotState = ref(1)
let interval

const startRandomSlot = () => {
  // first time without timer
  slotState.value = slotState.value < 3 ? slotState.value + 1 : 1
  interval = setInterval(() => {
    slotState.value = slotState.value = slotState.value < 3 ? slotState.value + 1 : 1
  }, 300);
}

const spin = () => {
  if (interval) return

  startRandomSlot();
  setTimeout(() => {
    clearInterval(interval);
    interval = null;
  }, Math.floor(Math.random() * 1800) + 2000);
}

onBeforeUnmount(() => {
  clearInterval(interval);
})
</script>
