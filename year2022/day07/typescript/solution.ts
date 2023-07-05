import { readFileSync } from 'fs';

const file:any = readFileSync('../puzzle.txt', 'utf-8');
const arr: string[] = file.toString().split('\n');
const filesystem: { [key: string]: number } = {};
setFileSystem();
console.log(part_1());
console.log(part_2());

function part_1(): number {
    return Object.values(filesystem)
            .filter((size: number) => size <= 100000)
            .reduce((acc: number, size: number) => acc + size, 0);
}

function part_2(): number {
    return Math.min(...Object.values(filesystem)
            .filter((size: number) => size >= (30000000 - (70000000 - filesystem['/']))));
}

function setFileSystem(): { [key: string]: number } {
    const visited: Set<string> = new Set();
    let current: string[] = [];
    arr.forEach(command => {
        if(command.match(/^\$ cd (.+)$/)) {
            current = command.split(' ')[2] === '..' ? current.slice(0, -1) : [...current, command.split(' ')[2]];
        } else if(command.match(/^(\d+) (.+)$/)) {
            let [size, name] = [parseInt(command.split(' ')[0]), command.split(' ')[1]];
            if(!visited.hasOwnProperty(current.toString() + '_' + name)) {
                visited.add(current.toString() + '_' + name);
                let dir: string[] = current;
                while (dir[0]) {
                    filesystem[dir.toString()] = (filesystem[dir.toString()] || 0) + size;                                  
                    dir = dir.slice(0, -1);
                }
            }
        }
    });
    return filesystem;
}