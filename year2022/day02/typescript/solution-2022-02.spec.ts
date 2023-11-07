import { part_1, part_2 } from './solution';

const RPS = {
  A: {shape: 'rock', score: 1, result: 'lose', nemesis: 'paper'},
  B: {shape: 'paper', score: 2, result: 'draw', nemesis: 'scissors'},
  C: {shape: 'scissors', score: 3, result: 'win', nemesis: 'rock'},
  X: {shape: 'rock', score: 1, result: 'lose', nemesis: 'paper'},
  Y: {shape: 'paper', score: 2, result: 'draw', nemesis: 'scissors'},
  Z: {shape: 'scissors', score: 3, result: 'win', nemesis: 'rock'}
}

describe('Advent of Code 2022, Day 02', () => {
  it('Part One', () => {
    expect(part_1(RPS)).toBe(15);
  });

  it('Part Two', () => {
    expect(part_2(RPS)).toBe(12);
  });
});
