export const useGameStore = defineStore('game', {
  state: () => ({
    isGameOver: false,
    isGameCleared: false,
    isPlaying: false,
  }),
  actions: {
    startGame() {
      this.isPlaying = true;
      this.isGameOver = false;
      this.isGameCleared = false;
    },
    gameOver() {
      this.isGameOver = true;
      this.isPlaying = false;
    },
    gameClear() {
      this.isGameCleared = true;
      this.isPlaying = false;
    },
    reset() {
      this.isGameOver = false;
      this.isGameCleared = false;
      this.isPlaying = false;
    },
  },
});