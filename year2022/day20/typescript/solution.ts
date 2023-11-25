import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[] = file.toString().split('\n').map(Number);
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return iterate(1);
}

export function part_2(): number {
  return iterate(2);
}

function iterate(part: number): number {
  const numbers = part === 1 ? input : input.map(x => x * 811589153);
  let [q, c] = [numbers.slice().map((v, i) => [i, v]), 0];
  for (let m = 0; m < (part === 2 ? 10 : 1); m++) {
    for (let i = 0; i < q.length; i++) {
      for (let j = 0; j < q.length; j++) if (q[j][0] === i) break;
      while (q[0][0] !== i) q.push(q.shift()!);
      const val = q.shift()!;
      let toPop = val[1] % q.length;
      if (toPop < 0) toPop += q.length;
      for (let k = 0; k < toPop; k++) q.push(q.shift()!);
      q.push(val);
    }
  }
  for (c; c < q.length; c++) if (q[c][1] === 0) break;
  return q[(c + 1000) % q.length][1] + q[(c + 2000) % q.length][1] + q[(c + 3000) % q.length][1];
}