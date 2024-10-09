<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" 
    class="block w-full p-2.5 rounded-lg
          bg-gray-100 dark:bg-neutral-800 
            text-base text-black dark:text-white
            border border-gray-300 dark:border-neutral-600
            transition-colors"
    />
</template>


<script setup>
const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue'])
</script>