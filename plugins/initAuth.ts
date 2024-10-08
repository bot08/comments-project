export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  authStore.initializeStore()
  if(import.meta.client) {
    //authStore.isAuthenticated && authStore.fetchUser()
  }
});