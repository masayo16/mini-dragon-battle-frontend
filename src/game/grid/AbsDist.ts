export const absDist = (
  a: { x: number; y: number },
  b: { x: number; y: number },
): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
};
