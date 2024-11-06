<template>
  <NuxtLink v-if="!authStore.isAuthenticated" :to="localePath('/user/login')" class="block">
    <BaseVisualFeedback class="flex items-center">
      <ArrowRightEndOnRectangleIcon class="w-6 h-6 mr-2"/>
      <BaseTextMedium>Login</BaseTextMedium>
    </BaseVisualFeedback>
  </NuxtLink>
  <NuxtLink v-else :to="localePath('/user')" class="block">
    <BaseVisualFeedback class="flex items-center">
      <UserIcon class="w-6 h-6 mr-2"/>
      <BaseTextMedium>{{ authStore.user?.name }}</BaseTextMedium>
    </BaseVisualFeedback>
  </NuxtLink>
</template>


<script setup lang="ts">
import { ArrowRightEndOnRectangleIcon, UserIcon } from '@heroicons/vue/24/solid'

const authStore = useAuthStore()
</script>