<template>
  <BaseCard>
    <div class="p-4">
      <BaseTextBig>Register</BaseTextBig>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="name">Name:</label>
          <BaseVisualFeedback :wFull="true">
            <BaseInput v-model="name" type="text" id="name" required autocomplete="name"/>
          </BaseVisualFeedback>
        </div>
        <div>
          <label for="email">Email:</label>
          <BaseVisualFeedback :wFull="true">
            <BaseInput v-model="email" type="email" id="email" required autocomplete="email"/>
          </BaseVisualFeedback>
        </div>
        <div>
          <label for="password">Password:</label>
          <BaseVisualFeedback :wFull="true">
            <BaseInput v-model="password" type="password" id="password" required autocomplete="current-password"/>
          </BaseVisualFeedback>
        </div>
        <BaseVisualFeedback>
          <BaseButtonNormal type="submit" class="mt-2">Register</BaseButtonNormal>
        </BaseVisualFeedback>
      </form>
    </div>
  </BaseCard>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'guests-only'
})

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
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