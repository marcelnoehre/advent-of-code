import { part_1, part_2 } from './solution';

describe('Advent of Code 2023, Day 24', () => {
  it('Part One', () => {
    expect(part_1()).toBe(0);
  });

  it('Part Two', async () => {
    expect(await part_2()).toBe(47);
  });
});