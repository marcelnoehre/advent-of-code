"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n');
console.log(part_1());
console.log(part_2());
function part_1() {
    return checkTrees(3);
}
function part_2() {
    return [1, 3, 5, 7].reduce(function (acc, step) { return acc * checkTrees(step); }, 1) * checkTrees(1, 1);
}
function checkTrees(step, skip) {
    var _a = [0, 0], index = _a[0], counter = _a[1];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].charAt(index) === '#')
            counter++;
        index = (index + step) % arr[i].length;
        i = skip ? i + skip : i;
    }
    ;
    return counter;
}
