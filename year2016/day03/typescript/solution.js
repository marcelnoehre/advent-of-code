"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(function (row) { return row.trim().split(/\s+/).map(function (number) { return Number(number); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.filter(function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
        return checkTriangle([a, b, c]);
    }).length;
}
function part_2() {
    var counter = 0;
    for (var i = 0; i < arr.length; i += 3) {
        for (var j = 0; j < 3; j++) {
            if (checkTriangle([arr[i][j], arr[i + 1][j], arr[i + 2][j]])) {
                counter++;
            }
        }
    }
    return counter;
}
function checkTriangle(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    return [a + b, a + c, b + c].every(function (sum) { return sum > (a + b + c - sum); });
}
