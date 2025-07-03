export const useScoreStore = defineStore('score', {
  state: () => ({ value: 0 }),
  actions: {
    add(n: number) {
      this.value += n;
    },
  },
});
