<template>
  <NuxtLayout>
    <BaseCard class="p-4">
      <BaseTextBig>
        {{ error.statusCode }}
      </BaseTextBig>
      <BaseTextBase>
        {{ error }}
      </BaseTextBase>
    </BaseCard>
  </NuxtLayout>
</template>


<script setup>
const props = defineProps({
  error: Object
})
</script>