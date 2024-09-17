export default defineNuxtRouteMiddleware((to, from) => {
  const localePath = useLocalePath()
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo(localePath('/user/login'))
  }
})