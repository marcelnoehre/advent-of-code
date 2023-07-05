"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (num) { return parseInt(num, 10); });
var elves = [];
setElves();
console.log(part_1());
console.log(part_2());
function part_1() {
    return Math.max.apply(Math, elves);
}
function part_2() {
    elves.sort(function (a, b) { return b - a; });
    return elves.slice(0, 3).reduce(function (acc, curr) { return acc + curr; }, 0);
}
function setElves() {
    var sum = 0;
    arr.forEach(function (calory) {
        if (isNaN(calory)) {
            elves.push(sum);
            sum = 0;
        }
        else {
            sum += calory;
        }
    });
}
