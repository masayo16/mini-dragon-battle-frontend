import { describe, expect, it } from 'vitest';
import { parseLevel } from '@/game/grid/LevelLoader';

describe('parseLevel()', () => {
  it('壁の解析', () => {
    const result = parseLevel('#.\n.#');
    expect(result.walls.has('0,0')).toBe(true);
    expect(result.walls.has('1,1')).toBe(true);
  });
  it('ドットの解析', () => {
    const result = parseLevel('#.\n#.');
    expect(result.dots).toEqual([
      { col: 1, row: 0 },
      { col: 1, row: 1 },
    ]);
  });
  it('パワーの解析', () => {
    const result = parseLevel('#o\n#.');
    expect(result.powers).toEqual([{ col: 1, row: 0 }]);
  });
  it('空白の処理', () => {
    const result = parseLevel('# \n#.');
    expect(result.walls.has('0,0')).toBe(true);
    expect(result.dots).toEqual([{ col: 1, row: 1 }]);
    expect(result.powers).toEqual([]);
  });
});
