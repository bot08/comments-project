<template>
  <BaseCard>
    <div class="p-4">
      <BaseBigText>Reg</BaseBigText>
      
      <form @submit.prevent="handleRegister">
        <div>
          <label for="name">Name:</label>
          <input v-model="name" type="text" id="name" required />
        </div>

        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>

        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  </BaseCard>
</template>


<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleRegister = async () => {
  const response = await authStore.register(name.value, email.value, password.value)
  console.log('Registered successfully:', response)
}
</script>