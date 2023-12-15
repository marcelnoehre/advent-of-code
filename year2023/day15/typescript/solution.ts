import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: any[][] = file.toString().split(',').map(row => ([row.split(/[=-]/)[0], row.replaceAll(/[a-z1-9]/g, ""), parseInt(row.replaceAll(/[a-z=-]/g, "")) || null, row, hash(row), hash(row.split(/[=-]/)[0])]));
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.map(e => e[4]).reduce((a, b) => a + b, 0);
}

export function part_2(): number {
  const b = [...Array(256).keys()].map(_ => ([]));
  input.forEach(e => {
    if (e[1] === "=") {
      if (b[e[5]].find(b => b[0] === e[0])) b[e[5]].find(b => b[0] === e[0])[1] = e[2];
      else b[e[5]].push([e[0], e[2]]);
    } else b[e[5]] = b[e[5]].filter(lens => lens[0] !== e[0]);
  });
  return b.map((bx, bxi) => bx.map((i, li) => (bxi + 1) * (li + 1) * (i[1]))).flat().reduce((a, b) => a + b, 0);
}

function hash(hash: string) {
  return hash.split("").reduce((h, c) => ((h + c.charCodeAt(0)) * 17) % 256, 0);
}