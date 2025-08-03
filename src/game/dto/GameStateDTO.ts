export type EntityDTO = {
  id: number;
  x: number;
  y: number;
};

export type GameStateDTO = {
  player: EntityDTO;
  dots: EntityDTO[];
  powers: EntityDTO[];
  score: number;
};
