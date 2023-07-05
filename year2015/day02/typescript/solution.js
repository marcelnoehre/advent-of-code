"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (present) { return present.split('x').map(function (value) { return parseInt(value, 10); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.map(function (box) { return box.sort(function (a, b) { return a - b; }); }).reduce(function (total, _a) {
        var l = _a[0], w = _a[1], h = _a[2];
        return total + 2 * (l * w + l * h + w * h) + l * w;
    }, 0);
}
function part_2() {
    return arr.reduce(function (total, _a) {
        var l = _a[0], w = _a[1], h = _a[2];
        return total + (2 * (l + w) + l * w * h);
    }, 0);
}
