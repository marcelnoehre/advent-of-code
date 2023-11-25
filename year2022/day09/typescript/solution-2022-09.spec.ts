import { part_1, part_2 } from './solution';
import { readFileSync } from 'fs';

const file: any = readFileSync('../example.txt', 'utf-8');
const input: string[][] = file.toString().trim().split('\n').map((pair) => pair.split(' '));

describe('Advent of Code 2022, Day 09', () => {
  it('Part One', () => {
    expect(part_1(input)).toBe(88);
  });

  it('Part Two', () => {
    expect(part_2(input)).toBe(36);
  });
});