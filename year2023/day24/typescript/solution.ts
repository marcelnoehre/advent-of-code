import { readFileSync } from 'fs';
import { init } from 'z3-solver';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][] = file.toString().split('\n').map((line) => line.match(/-?\d+/g).map(Number));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  part_2().then(console.log);
}

export function part_1(): number {
  for (var i = 0, acc = 0; i < input.length - 1; i++) {
    const [x1, y1, _z1, vx1, vy1, _vz1] = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const [x2, y2, _z2, vx2, vy2, _vz2] = input[j];
      const [x, y, range] = [x2 + vx2 * (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1), y2 + vy2 * (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1), [200000000000000, 400000000000000]];
      if ((y2 - y1 + (vy2 * (x1 - x2)) / vx2) / (vy1 - (vy2 * vx1) / vx2) > 0 && (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1) > 0 && x >= range[0] && x <= range[1] && y >= range[0] && y <= range[1]) acc++;
    }
  }
  return acc;
}

export async function part_2(): Promise<number> {
  const { Context, em } = await init();
  const Z3 = Context('main');
  const solver = new Z3.Solver();
  for (let i = 0; i < 3; i++) ['x','y','z'].forEach((char, idx) => {solver.add(Z3.Int.const(char).add(Z3.Int.const('v'+char).mul(Z3.Int.const(`t${i}`))).eq(Z3.Int.const(`t${i}`).mul(input[i][idx+3]).add(input[i][idx])))})
  await solver.check();
  em.PThread.terminateAllThreads();
  return [Z3.Int.const('x'), Z3.Int.const('y'), Z3.Int.const('z')].map((p) => +solver.model().get(p).toString()).reduce((acc, n) => acc + n);
}