export interface IScoreRepository {
  save(v: number): Promise<void>;
  reset(): Promise<void>;
  get(): Promise<number>;
}

export class InMemoryScoreRepository implements IScoreRepository {
  private score: number = 0;
  async save(v: number) {
    this.score = v;
  }
  async reset() {
    this.score = 0;
  }
  async get() {
    return this.score;
  }
}

export const scoreRepository: IScoreRepository = new InMemoryScoreRepository();
