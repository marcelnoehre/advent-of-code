import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().split('\n').map((tupel) => tupel.split(' '));
export const RPS = {
  A: {shape: 'rock', score: 1, result: 'lose', nemesis: 'paper'},
  B: {shape: 'paper', score: 2, result: 'draw', nemesis: 'scissors'},
  C: {shape: 'scissors', score: 3, result: 'win', nemesis: 'rock'},
  X: {shape: 'rock', score: 1, result: 'lose', nemesis: 'paper'},
  Y: {shape: 'paper', score: 2, result: 'draw', nemesis: 'scissors'},
  Z: {shape: 'scissors', score: 3, result: 'win', nemesis: 'rock'}
}
console.log(part_1(RPS));
console.log(part_2(RPS));

export function part_1(RPS: Object):number {
  let sum = 0;
  input.forEach(round => {
    if(RPS[round[0]].shape === RPS[round[1]].shape) sum += 3;
    else if (RPS[round[1]].shape === RPS[round[0]].nemesis) sum += 6;
    sum += RPS[round[1]].score;
  });
  return sum;
}

export function part_2(RPS: Object):number {
  let sum = 0;
  input.forEach(round => {
    switch(RPS[round[1]].result) {
      case 'win':
        sum += 6 + ((RPS[round[0]].score + 1) % 3 == 0 ? 3 : (RPS[round[0]].score + 1) % 3);
        break;
      case 'draw':
        sum += 3 + RPS[round[0]].score;
        break;
      case 'lose':
        sum += RPS[round[0]].score - 1 >= 1 ? RPS[round[0]].score - 1 : 3;
    }
  });
  return sum;
}