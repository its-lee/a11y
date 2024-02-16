export const range = (length: number): number[] => Array.from({ length }).map((_, index) => index);

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(Math.min(value, max), min);
};

export const modularClamp = (value: number, min: number, max: number): number => {
  const diff = Math.abs(max - min);
  const based = value - min;
  const modded = based % diff;
  const corrected = modded < 0 ? modded + diff : modded;
  return min + corrected;
};
