export const usePlayerStore = defineStore('player', {
  state: () => ({ 
    lives: 3,
  }),
  actions: {
    setLives(n: number) {
      this.lives = n;
    },
    reset() {
      this.lives = 3;
    },
  },
});