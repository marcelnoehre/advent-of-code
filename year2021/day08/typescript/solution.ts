import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: any = file.toString().split(/\r/).join('').split('\n');
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return input.map(x => x.split(" | ")[1].split(' ')).flatMap(i => i).filter(d => [2, 3, 4, 7].includes(d.length)).length;
}

export function part_2(): number {
  let [a, dO, dI, w, dt, res, i] = [["a", "b", "c", "d", "e", "f", "g"], ["012456", "25", "02346", "02356", "1235", "01356", "013456", "025", "0123456", "012356"], new Array(9).fill(""), input.map(x => x.split(" | ")[0].split(" ")), input.map(x => x.split(" | ")[1].split(" ")), 0, 0];
  for(const iD of w) {
    const [out, fs, ss] = [{}, [], []];
    iD.forEach(d => d.length == 2 ? dI[1] = d : d.length == 3 ? dI[7] = d : d.length == 4 ? dI[4] = d : d.length == 5 && !fs.includes(d) ? fs.push(d) : d.length == 6 && !ss.includes(d) ? ss.push(d) : null);
    for(const l of dI[7].split("")) if(!dI[1].split("").includes(l)) out[0] = l;
    fs[0].split("").forEach(l => {
      if (fs.every(five => five.includes(l))) {
        if (dI[4].includes(l)) out[3] = l;
        else if (out[0] !== l) out[6] = l;
      }
    });
    ss.forEach(l => {
      if (new Set(l).has(dI[1][0]) && new Set(l).has(dI[1][1]) && new Set(l).has(out[3])) out[4] = a.find(le => !new Set(l).has(le));
      else if (new Set(l).has(out[3])) out[2] = a.find(le => !new Set(l).has(le));
    });
    out[5] = fs.find(l => { return new Set(l).has(out[0]) && new Set(l).has(out[2]) && new Set(l).has(out[3]) && new Set(l).has(out[6]) && !new Set(l).has(out[4])}).split("").filter(char => ![out[0], out[2], out[3], out[6]].includes(char))[0];
    out[1] = a.filter(l => !Object.values(out).includes(l))[0];
    for(const pos in out) out[out[pos]] = parseInt(pos);
    let [ns, ds, nc] = ["", dt[i], []];
    for (const letters of ds) {
      for (const letter of letters) nc.push(out[letter]);
      [ns, nc] = [ns + dO.indexOf(nc.sort((a, b) => a - b).join("")).toString(), []];
    }
    [res, i] = [res + parseInt(ns), i + 1];
  };
  return res;
}