import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().trim().split('\n\n');
const numbers: number[] = input[0].trim().split(",").map(Number);
const boards: number[][][] = input.slice(1, input.length).map((board) => board.split('\n').map((row) => row.trim().split(/\s+/).map(Number)))
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    const marked: Set<number> = new Set<number>();
    for(const num of numbers) {
        marked.add(num);
        for(const board of boards) {
            if (board.some((row) => row.every((x) => marked.has(x))) || board.some((_, columnIndex) => board.every((row) => marked.has(row[columnIndex])))) {
                return num * board.flat().reduce((total, x) => (marked.has(x) ? total : total + x), 0);
            }
        }
    }
}

export function part_2(): number {
    const [won, marked] = [new Set<number>(), new Set<number>()];
    for (const num of numbers) {
        marked.add(num);
        for (let i = 0; i < boards.length; i++) {
            if (won.has(i)) {
                continue;
            }
            const b = boards[i];
            if (b.some((row) => row.every((x) => marked.has(x))) || b.some((_, columnIndex) => b.every((row) => marked.has(row[columnIndex])))) {
                won.add(i);
                if (won.size === boards.length) {
                    return num * b.flat().reduce((total, x) => marked.has(x) ? total : total + x, 0);
                }
            }
        }
    }
}