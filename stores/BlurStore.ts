export const useBlurStore = defineStore({
  id: 'blurStore',
  state: () => ({
    isBlur: 0 as number,
  }),

  actions: {
    updBlur(state: boolean){
      state ? this.isBlur+=1 : this.isBlur-=1;
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlurStore, import.meta.hot));
}