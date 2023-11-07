import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: number[][][] = file.toString().trim().split('\n').map((group) => group.split(',').map(tupel => tupel.split('-').map(Number)));
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1() {
    return input.filter(([pair1, pair2]) => overlaps(pair1, pair2)).length;
  }
  
export function part_2() {
    return input.filter(([pair1, pair2]) => contains(pair1, pair2)).length;
}
  
function overlaps(pair1, pair2) {
    return ((pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) || (pair2[0] <= pair1[0] && pair2[1] >= pair1[1]));
}
  
function contains(pair1, pair2) {
    return ((pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) || (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) || (pair1[1] <= pair2[1] && pair1[1] >= pair2[0]) || (pair2[1] <= pair1[1] && pair2[1] >= pair1[0]));
}
