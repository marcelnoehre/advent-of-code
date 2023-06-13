"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(function (instruction) { return instruction.replace('\r', '').split(' '); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var lights = Array.from({ length: 1000 }, function () { return new Array(1000).fill(0); });
    arr.forEach(function (instruction) {
        var toggle = instruction[0] === 'toggle' ? -1 : 0;
        toggleLights(lights, instruction[2 + toggle].split(',').map(function (num) { return parseInt(num, 10); }), instruction[4 + toggle].split(',').map(function (num) { return parseInt(num, 10); }), toggle === -1 ? toggle : instruction[1] === 'on' ? 1 : 0, true);
    });
    return lights.flatMap(function (row) { return row.filter(function (light) { return light === 1; }); }).length;
}
function part_2() {
    var lights = Array.from({ length: 1000 }, function () { return new Array(1000).fill(0); });
    arr.forEach(function (instruction) {
        var toggle = instruction[0] === 'toggle' ? 0 : 1;
        toggleLights(lights, instruction[1 + toggle].split(',').map(function (num) { return parseInt(num, 10); }), instruction[3 + toggle].split(',').map(function (num) { return parseInt(num, 10); }), toggle === 0 ? toggle : instruction[1] === 'on' ? 1 : -1, false);
    });
    return lights.reduce(function (acc, row) { return acc + row.reduce(function (sum, brightness) { return sum + brightness; }, 0); }, 0);
}
function toggleLights(array, start, end, newState, first) {
    for (var x = start[0]; x <= end[0]; x++) {
        for (var y = start[1]; y <= end[1]; y++) {
            if (first) {
                array[x][y] = newState === -1 ? (array[x][y] + 1) % 2 : newState;
            }
            else {
                array[x][y] += newState === 0 ? 2 : array[x][y] + newState < 0 ? 0 : newState;
            }
        }
    }
}
