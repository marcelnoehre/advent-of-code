"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (acc, mass) { return acc + Math.floor(mass / 3) - 2; }, 0);
}
function part_2() {
    var sum = 0;
    arr.forEach(function (mass) {
        var fuel = (Math.floor(mass / 3) - 2);
        while (fuel > 0) {
            sum += fuel;
            fuel = (Math.floor(fuel / 3) - 2);
        }
    });
    return sum;
}
