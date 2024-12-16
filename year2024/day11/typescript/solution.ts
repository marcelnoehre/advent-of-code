import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: Map<string, number> = file.toString().split(/\s+/).reduce((map, s) => map.set(s, (map.get(s) ?? 0) + 1), new Map<string, number>());
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return calc(new Map(input), 25);
}

export function part_2(): number {
  return calc(new Map(input), 75);
}

function calc(nums: Map<string, number>, fin: number): number {
  for (let i = 0; i < fin; i++) {
    const ns = new Map<string, number>();
    for (const [n, c] of nums.entries()) {
      if (c > 0) {
        if (Number(n) === 0) ns.set("1", (ns.get("1") ?? 0) + c);
        else if (n.length % 2 === 0) {
          const [l, r] = [Number(n.slice(0, n.length / 2)).toString(), Number(n.slice(n.length / 2)).toString()];
          ns.set(l, (ns.get(l) ?? 0) + c); ns.set(r, (ns.get(r) ?? 0) + c);
        } else ns.set((Number(n) * 2024).toString(), (ns.get((Number(n) * 2024).toString()) ?? 0) + c);
        nums.set(n, 0);
      }
    }
    for (const [k, v] of ns.entries()) nums.set(k, (nums.get(k) ?? 0) + v);
  }
  return Array.from(nums.values()).reduce((acc, v) => acc + v, 0);
}