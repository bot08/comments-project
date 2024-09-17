export default defineNuxtPlugin((nuxtApp) => {
  useAuthStore().initializeStore()
});