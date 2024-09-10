<template>
  <NuxtLayout>
    {{ error.statusCode }}
    {{ error }}
  </NuxtLayout>
</template>


<script setup>
const props = defineProps({
  error: Object
})
</script>