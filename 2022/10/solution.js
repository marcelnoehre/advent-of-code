"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().split('\r\n').map(function (row) { return row.split(' '); });
console.log(part_1(arr));
part_2(arr);
function part_1(list) {
    var stages = [20, 60, 100, 140, 180, 220];
    var cycle = 0;
    var sum = 0;
    var x = 1;
    list.forEach(function (instruction) {
        cycle++;
        if (stages.includes(cycle)) {
            sum += cycle * x;
        }
        if (instruction.length == 2) {
            cycle++;
            if (stages.includes(cycle)) {
                sum += cycle * x;
            }
            x += parseInt(instruction[1], 10);
        }
    });
    return sum;
}
function part_2(list) {
    var stages = [40, 80, 120, 160, 200, 240];
    var cycle = 1;
    var sprite = [0, 1, 2];
    var x = 1;
    var row = '';
    list.forEach(function (instruction) {
        if (stages.includes(cycle - 1)) {
            console.log(row);
            row = '';
        }
        row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
        cycle++;
        if (instruction.length == 2) {
            if (stages.includes(cycle - 1)) {
                console.log(row);
                row = '';
            }
            row += sprite.includes((cycle - 1) % 40) ? '#' : '.';
            x += parseInt(instruction[1], 10);
            sprite = [x - 1, x, x + 1];
            cycle++;
        }
    });
    console.log(row);
}
