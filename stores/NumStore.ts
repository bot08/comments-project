export const useNumStore = defineStore({
  id: 'numStore',
  state: () => ({
    num: 0 as Number,
  }),

  actions: {
    updNum(val: Number){
      this.num = val;
      console.log(this.num);
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNumStore, import.meta.hot));
}