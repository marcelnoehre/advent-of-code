import { part_1, part_2 } from './solution';
import { readFileSync } from 'fs';

const file: any = readFileSync('../example.txt', 'utf-8');
const input: number[] = file.toString().trim().split(',').map(Number);

describe('Advent of Code 2021, Day 06', () => {
  it('Part One', () => {
    expect(part_1(input)).toBe(5934);
  });

  it('Part Two', () => {
    expect(part_2(input)).toBe(28671831483421);
  });
});