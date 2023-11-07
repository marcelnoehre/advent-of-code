import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: string[] = file.toString().split('\n');
const filesystem: { [key: string]: number } = {};
setFileSystem();
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    return Object.values(filesystem)
            .filter((size: number) => size <= 100000)
            .reduce((acc: number, size: number) => acc + size, 0);
}

export function part_2(): number {
    return Math.min(...Object.values(filesystem)
            .filter((size: number) => size >= (30000000 - (70000000 - filesystem['/']))));
}

function setFileSystem(): { [key: string]: number } {
    const visited: Set<string> = new Set();
    let current: string[] = [];
    input.forEach(command => {
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