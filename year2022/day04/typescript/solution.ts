import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][][] = file.toString().trim().split('\n').map((group) => group.split(',').map(tupel => tupel.split('-').map(num => parseInt(num, 10))));
console.log(part_1());
console.log(part_2());

function part_1() {
    return arr.filter(([pair1, pair2]) => overlaps(pair1, pair2)).length;
  }
  
function part_2() {
    return arr.filter(([pair1, pair2]) => contains(pair1, pair2)).length;
}
  
function overlaps(pair1, pair2) {
    return ((pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) || (pair2[0] <= pair1[0] && pair2[1] >= pair1[1]));
}
  
function contains(pair1, pair2) {
    return ((pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) || (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) || (pair1[1] <= pair2[1] && pair1[1] >= pair2[0]) || (pair2[1] <= pair1[1] && pair2[1] >= pair1[0]));
}
