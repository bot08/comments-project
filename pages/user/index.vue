<template>
  <BaseCard>
    <div class="p-4">
      <BaseTextBig>User page test</BaseTextBig>
      <div v-if="authStore.user">
        <BaseTextNormal>
          <strong>ID:</strong> {{ authStore.user._id }}
        </BaseTextNormal>
        <BaseTextNormal>
          <strong>Name:</strong> {{ authStore.user.name }}
        </BaseTextNormal>
        <BaseTextNormal>
          <strong>Email:</strong> {{ authStore.user.email }}
        </BaseTextNormal>
        <BaseTextNormal>
          <strong>Active:</strong> {{ authStore.user.isActive ? 'Yes' : 'No' }}
        </BaseTextNormal>
        <BaseTextNormal>
          <strong>Role:</strong> {{ authStore.user.role }}
        </BaseTextNormal>
        <BaseVisualFeedback>
          <BaseButtonNormal @click="logOut" class="mt-2">Log out</BaseButtonNormal>
        </BaseVisualFeedback>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>
  </BaseCard>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'auth-only'
})

const authStore = useAuthStore()
const localePath = useLocalePath()

onMounted(() => {
  authStore.fetchUser()
  .catch(error => {
    navigateTo(localePath('/user/login'))
  });
})

const logOut = () => {
  navigateTo(localePath('/user/login'))
  authStore.logout()
}
</script>