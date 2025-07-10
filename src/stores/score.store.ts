import { scoreRepository } from '~/repositories/score.repository';

export const useScoreStore = defineStore('score', {
  state: () => ({ value: 0 }),
  actions: {
    async add(n: number) {
      this.value += n;
      await scoreRepository.save(this.value);
    },
    async reset() {
      this.value = 0;
      await scoreRepository.reset();
    },
    async fetch() {
      this.value = await scoreRepository.get();
    },
  },
});
