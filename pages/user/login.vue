<template>
  <BaseCard>
    <div class="p-4">
      <BaseTextBig>Login</BaseTextBig>
      <form @submit.prevent="handleLogin">
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
          <BaseButtonNormal type="submit" class="mt-2">Login</BaseButtonNormal>
        </BaseVisualFeedback>
      </form>
    </div>
  </BaseCard>
</template>


<script setup>
definePageMeta({
  middleware: 'guests-only'
})

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const localePath = useLocalePath()

const handleLogin = () => {
  authStore.login(email.value, password.value)
  .then(res => {
    navigateTo(localePath('/user'))
  })
}
</script>