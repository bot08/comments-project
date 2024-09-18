<template>
  <BaseCard>
    <div class="p-4">
      <BaseTextBig>Reg</BaseTextBig>
      
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
definePageMeta({
  middleware: 'guests-only'
})

const name = ref('')
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const localePath = useLocalePath()

const handleRegister = () => {
  authStore.register(name.value, email.value, password.value)
  .then(res => {
    console.log('Registered successfully:', res)
    navigateTo(localePath('/user/login'))
  })
}
</script>