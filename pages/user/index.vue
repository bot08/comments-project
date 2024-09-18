<template>
  <BaseCard>
    <div class="p-4">
      <BaseTextBig>User page test</BaseTextBig>
      
      <div v-if="authStore.user">
        <h1>User Profile</h1>
        <p><strong>ID:</strong> {{ authStore.user._id }}</p>
        <p><strong>Name:</strong> {{ authStore.user.name }}</p>
        <p><strong>Email:</strong> {{ authStore.user.email }}</p>
        <p><strong>Active:</strong> {{ authStore.user.isActive ? 'Yes' : 'No' }}</p>
        <p><strong>Role:</strong> {{ authStore.user.role }}</p>
        <button @click="logOut">LOG OUT</button>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>
  </BaseCard>
</template>


<script setup>
definePageMeta({
  middleware: 'auth-only'
})

const authStore = useAuthStore()
const localePath = useLocalePath()

onMounted(() => {
  authStore.fetchUser()
  .catch(error => {
    logOut();
  });
})

const logOut = () => {
  authStore.logout()
  navigateTo(localePath('/user/login'))
}
</script>