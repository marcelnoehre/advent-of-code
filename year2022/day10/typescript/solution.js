"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\r\n').map(function (row) { return row.split(' '); });
var stages = [20, 60, 100, 140, 180, 220];
console.log(part_1());
console.log(part_2());
function part_1() {
    var cycle = 0;
    var sum = 0;
    var x = 1;
    arr.forEach(function (instruction) {
        cycle++;
        if (stages.includes(cycle)) {
            sum += cycle * x;
        }
        if (instruction.length === 2) {
            cycle++;
            if (stages.includes(cycle)) {
                sum += cycle * x;
            }
            x += parseInt(instruction[1], 10);
        }
    });
    return sum;
}
function part_2() {
    stages = stages.map(function (num) { return num + 20; });
    var sprite = [0, 1, 2];
    var cycle = 1;
    var row = '';
    var x = 1;
    arr.forEach(function (instruction) {
        if (stages.includes(cycle - 1)) {
            row += '\n';
        }
        row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
        cycle++;
        if (instruction.length === 2) {
            if (stages.includes(cycle - 1)) {
                row += '\n';
            }
            row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
            x += parseInt(instruction[1], 10);
            sprite = [x - 1, x, x + 1];
            cycle++;
        }
    });
    return row;
}
