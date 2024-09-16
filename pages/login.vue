<template>
  <BaseCard>
    <div class="p-4">
      <BaseBigText>Login</BaseBigText>
      
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>

        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  </BaseCard>
</template>


<script setup>
const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  const response = await authStore.login(email.value, password.value)
  console.log('Logged in successfully:', response)
}
</script>