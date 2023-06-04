import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: number[][] = file.toString().trim().split('\r\n').map((row) => row.split('\t').map((number) => parseInt(number, 10)));
console.log(part_1(arr));
console.log(part_2(arr));

function part_1(spreadsheet: number[][]): number {
    let checksum: number = 0;
    for(let i = 0; i < spreadsheet.length; i++) {
        checksum += Math.max(...spreadsheet[i]) - Math.min(...spreadsheet[i]);
    }
    return checksum;
}

function part_2(spreadsheet: number[][]): number {
    let checksum: number = 0;
    for(let i = 0; i < spreadsheet.length; i++) {
        for(let j = 0; j < spreadsheet[i].length-1; j++) {
            for(let x = j+1; x < spreadsheet[i].length; x++) {
                let max: number = Math.max(spreadsheet[i][j], spreadsheet[i][x]);
                let min: number = Math.min(spreadsheet[i][j], spreadsheet[i][x]);
                if(max % min === 0) {
                    checksum += max/min;
                    j = spreadsheet[i].length;
                    x = spreadsheet[i].length;
                }
            }
        }
    }
    return checksum;
}