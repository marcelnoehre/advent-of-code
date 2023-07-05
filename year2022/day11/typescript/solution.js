"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n\n').map(function (row) { return row.split('\n'); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return simulate(20, setupMonkeys(arr), true);
}
function part_2() {
    return simulate(10000, setupMonkeys(arr), false);
}
function simulate(rounds, monkeys, trust) {
    var mod = monkeys.reduce(function (acc, curr) { return acc * curr[2]; }, 1);
    var monkeyMap = new Map(Array.from({ length: monkeys.length }, function (_, i) { return [i, 0]; }));
    for (var i = 0; i < rounds; i++) {
        for (var j = 0; j < monkeys.length; j++) {
            while (monkeys[j][0].length > 0) {
                monkeyMap.set(j, monkeyMap.get(j) + 1);
                var item = monkeys[j][0].shift();
                var newValue = new Function("return ".concat(monkeys[j][1].replace('old', String(item)).replace('old', String(item))))();
                newValue = trust ? Math.floor(newValue / 3) % mod : newValue % mod;
                monkeys[monkeys[j][newValue % monkeys[j][2] === 0 ? 3 : 4]][0].push(newValue);
            }
            ;
        }
        ;
    }
    return Array.from(monkeyMap.values()).sort(function (a, b) { return b - a; }).slice(0, 2).reduce(function (a, b) { return a * b; });
}
function setupMonkeys(input) {
    return input.map(function (monkey) { return [
        monkey[1].replace('Starting items:', '').trim().split(', ').map(Number),
        monkey[2].replace('Operation: new =', '').trim(),
        Number(monkey[3].replace('Test: divisible by', '').trim()),
        Number(monkey[4].replace('If true: throw to monkey', '').trim()),
        Number(monkey[5].replace('If false: throw to monkey', '').trim())
    ]; });
}
