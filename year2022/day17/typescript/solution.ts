import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string = file.toString();
const rocks: any[] = [{row:[['#','#','#','#']]},{row:[['.','#','.'],['#','#','#'],['.','#','.']]},{row:[['.','.','#'],['.','.','#'],['#','#','#']] },{row:[['#'],['#'],['#'],['#']]},{row:[['#','#'],['#','#']]}];
if(process.argv[2] === 'puzzle') {
  console.log(part_1());
  console.log(part_2());
}

export function part_1(): number {
  return simulate(2022);
}

export function part_2(): number {
  return simulate(1000000000000);
}

function isValidPosition(rock: string[][], chamber: string[][], rowId: number, colId: number): boolean {
    if (colId < 0 || colId + rock[0].length > chamber[0].length || rowId - (rock.length - 1) < 0) return false;
    for (let j = 0; j < rock.length; ++j) for (let k = 0; k < rock[j].length; ++k) if (rock[j][k] === '#' && chamber[rowId - j][colId + k] === '#') return false;
    return true;
}

function getPattern(chamber: string[][], n: number, rockId: number, jet: number): string {
  return chamber.slice(-n).map(row => row.join('')).join('') + '|' + rockId + '|' + jet;
}

function simulate(iterations: number): number {
  let [highest, jet, chamber, seen, added] = [-1, 0, [], {}, 0];
  for (let i = 0; i < iterations; ++i) {
    for (let j = rocks[i % rocks.length].row.length + 3 - (chamber.length - (highest + 1)); j > 0; --j) chamber.push(Array(7).fill('.'));
    let [rowId, colId] = [highest + 3 + rocks[i % rocks.length].row.length, 2]
    while (true) {
      let newColIdx = colId + ((input[jet] === '<') ? -1 : (input[jet] === '>') ? 1 : 0);
      [colId, jet] = [isValidPosition(rocks[i % rocks.length].row, chamber, rowId, newColIdx) ? newColIdx : colId, (jet + 1) % input.length]
      if (!isValidPosition(rocks[i % rocks.length].row, chamber, rowId - 1, colId)) break;
      --rowId;
    }
    highest = Math.max(highest, rowId);
    for (let j = 0; j < rocks[i % rocks.length].row.length; ++j) for (let k = 0; k < rocks[i % rocks.length].row[j].length; ++k) if (rocks[i % rocks.length].row[j][k] === '#') chamber[rowId - j][colId + k] = '#';
    const pattern = getPattern(chamber, 30, i % rocks.length, jet);
    if (pattern in seen) {
      added += (Math.floor((iterations - i) / (i - seen[pattern][0]))) * (highest - seen[pattern][1]);
      i += (Math.floor((iterations - i) / (i - seen[pattern][0]))) * (i - seen[pattern][0]);
    }
    seen[pattern] = [i, highest];
  }
  return added + highest + 1;
}