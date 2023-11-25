import { part_1, part_2, RPS } from './solution';

describe('Advent of Code 2022, Day 02', () => {
  it('Part One', () => {
    expect(part_1(RPS)).toBe(15);
  });

  it('Part Two', () => {
    expect(part_2(RPS)).toBe(12);
  });
});