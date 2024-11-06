<template>
  <div
    ref="slotContainer"
    :class="!props.wFull && 'max-w-max'"
    :style="computedStyle"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @mouseleave="isActive = false"
    @touchstart.passive="isActive = true"
    @touchend.passive="isActive = false"
    @touchcancel="isActive = false"
  >
    <slot/>
  </div>
</template>


<script setup lang="ts">
// todo: resize & make it more auto
const slotContainer = ref<null | object>(null)
const isActive = ref(false)
const reductionPx: number = 4

const originalWidth = ref(0)
const originalHeight = ref(0)

const props = defineProps({
  wFull: Boolean
})

interface computedStyleType {
  transform: string,
  transformOrigin: string,
  transition: string,
}

const computedStyle = computed<computedStyleType | undefined>(() => {
  if (!originalWidth.value || !originalHeight.value) {
    return undefined
  }

  const scaleX = isActive.value ? (originalWidth.value - reductionPx) / originalWidth.value : 1
  const scaleY = isActive.value ? (originalHeight.value - reductionPx) / originalHeight.value : 1

  return {
    transform: `scale(${Math.max(scaleX, scaleY)})`,
    transformOrigin: 'center',
    transition: 'transform 0.1s ease-out',
  }
})

onMounted(() => {
  if (slotContainer.value) {
    originalWidth.value = slotContainer.value.offsetWidth;
    originalHeight.value = slotContainer.value.offsetHeight;
  }
})
</script>