import type { GridPos } from '../grid/Grid';

export type LevelData = {
  walls: Set<string>; // NOTE: "col,row" 高速lookup用
  dots: GridPos[]; // NOTE: 順次処理用
  powers: GridPos[];
};

export function parseLevel(levelText: string): LevelData {
  const walls: Set<string> = new Set();
  const dots: GridPos[] = [];
  const powers: GridPos[] = [];

  levelText.split('\n').forEach((line, row) => {
    [...line].forEach((char, col) => {
      switch (char) {
        case '#':
          walls.add(`${col},${row}`);
          break;
        case '.':
          dots.push({ col, row });
          break;
        case 'o':
          powers.push({ col, row });
          break;
      }
    });
  });
  return { walls, dots, powers };
}
