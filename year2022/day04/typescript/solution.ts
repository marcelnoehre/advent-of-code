import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][][] = file.toString().trim().split('\r\n').map((group) => group.split(',').map(tupel => tupel.split('-').map(num => parseInt(num, 10))));
console.log(part_1());
console.log(part_2());

function part_1() {
    return arr.filter(([range1, range2]) => overlaps(range1, range2)).length;
  }
  
  function part_2() {
    return arr.filter(([range1, range2]) => contains(range1, range2)).length;
  }
  
  function overlaps(range1, range2) {
    return (
      (range1[0] <= range2[0] && range1[1] >= range2[1]) ||
      (range2[0] <= range1[0] && range2[1] >= range1[1])
    );
  }
  
  function contains(range1, range2) {
    return (
      (range1[0] >= range2[0] && range1[0] <= range2[1]) ||
      (range2[0] >= range1[0] && range2[0] <= range1[1]) ||
      (range1[1] <= range2[1] && range1[1] >= range2[0]) ||
      (range2[1] <= range1[1] && range2[1] >= range1[0])
    );
  }
