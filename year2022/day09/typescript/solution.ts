import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[][] = file.toString().trim().split('\n').map((pair) => pair.split(' '));
const directions = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0]
}
console.log(part_1(input));
console.log(part_2(input));

export function part_1(list: string[][]):number {
  let [tailPositions, head, tail] = [[[0,0]], [0,0], [0,0]]
  list.forEach(pair => {
    for(let i = 0; i < parseInt(pair[1]); i++) {
      head[0] += directions[pair[0]][0];
      head[1] += directions[pair[0]][1];
      if(Math.max(Math.abs(tail[0] - head[0]), Math.abs(tail[1] - head[1])) > 1) {
        tail = [Math.abs(head[0] - tail[0]) === 2 ? (tail[0] + (head[0] - tail[0]) / 2) : (tail[0] + (head[0] - tail[0])), Math.abs(head[1] - tail[1]) === 2 ? (tail[1] + (head[1] - tail[1]) / 2): (tail[1] + (head[1] - tail[1]))];
        if(checkTailPosition(tailPositions, tail[0], tail[1])) tailPositions.push(tail);
      }
    }
  });
  return tailPositions.length;
}

export function part_2(list: string[][]):number {
  let [tailPositions, head, tail] = [[[0,0]], [0,0], Array.from({ length: 9 }, () => [0, 0])];
  list.forEach(pair => {
    for(let i = 0; i < parseInt(pair[1]); i++) {
      head[0] += directions[pair[0]][0];
      head[1] += directions[pair[0]][1];
      for(let j = 0; j < 9; j++) {
        let ref: number[] = j === 0 ? head : tail[j - 1];
        if(Math.max(Math.abs(tail[j][0] - ref[0]), Math.abs(tail[j][1] - ref[1])) > 1) tail[j] = [Math.abs(ref[0] - tail[j][0]) === 2 ? (tail[j][0] + (ref[0] - tail[j][0]) / 2) : (tail[j][0] + (ref[0] - tail[j][0])), Math.abs(ref[1] - tail[j][1]) === 2 ? (tail[j][1] + (ref[1] - tail[j][1]) / 2) : (tail[j][1] + (ref[1] - tail[j][1]))];
      }
      if(checkTailPosition(tailPositions, tail[8][0], tail[8][1])) tailPositions.push(tail[8]);
    }
  });
  return tailPositions.length;
}

function checkTailPosition(tailPositions: number[][], start: number, end: number): boolean {
  return !tailPositions.some(pos => pos[0] === start && pos[1] === end);
}