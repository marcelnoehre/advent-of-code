import { readFileSync } from 'fs';

const file: any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') + '.txt', 'utf-8');
const input: Map<number, number[]> = setup(file.toString().trim().split('\n').sort());
if(process.argv[2] === 'puzzle') {
    console.log(part_1());
    console.log(part_2());
}

export function part_1(): number {
    let [sGuard, sTotal] = [0, 0];
    for (let [guard, record] of input.entries()) if (record.reduce((x, y) => x + y, 0) > sTotal) [sGuard, sTotal]  = [guard, record.reduce((x, y) => x + y, 0)];
    let [sMin, sRecord] = [0, input.get(sGuard)!];
    for (let minute = 0; minute < 60; minute++) if (sRecord[minute] > sRecord[sMin]) sMin = minute;
    return sGuard * sMin;
}

export function part_2(): number {
    let [sMin, sFreq, sGuard] = [0, 0, 0];
    for (let [guard, record] of input.entries()) for (let minute = 0; minute < 60; minute++) if (record[minute] > sFreq) [sMin, sFreq, sGuard] = [minute, record[minute], guard];
    return sGuard * sMin;
}

function setup(lines: string[]): Map<number, number[]> {
    let [records, currentGuard, sleepStart] = [new Map<number, number[]>(), 0, 0];
    for (let line of lines) {
      const [_, minute, guard, fallsAsleep, wakesUp] = line.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] (?:Guard #(\d+) begins shift|(falls asleep)|(wakes up))$/) || [];
      if (guard) {
        currentGuard = Number(guard);
        if (!records.has(currentGuard)) records.set(currentGuard, new Array(60).fill(0));
      }
      if (fallsAsleep) sleepStart = parseInt(minute, 10);
      if (wakesUp) for (let i = sleepStart; i < Number(minute); i++) records.get(currentGuard)[i] = (records.get(currentGuard)[i] || 0) + 1;
    }
    return records;
}