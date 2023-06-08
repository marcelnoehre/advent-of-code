"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (group) { return group.split(',').map(function (tupel) { return tupel.split('-').map(function (num) { return parseInt(num, 10); }); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.filter(function (_a) {
        var range1 = _a[0], range2 = _a[1];
        return overlaps(range1, range2);
    }).length;
}
function part_2() {
    return arr.filter(function (_a) {
        var range1 = _a[0], range2 = _a[1];
        return contains(range1, range2);
    }).length;
}
function overlaps(range1, range2) {
    return ((range1[0] <= range2[0] && range1[1] >= range2[1]) ||
        (range2[0] <= range1[0] && range2[1] >= range1[1]));
}
function contains(range1, range2) {
    return ((range1[0] >= range2[0] && range1[0] <= range2[1]) ||
        (range2[0] >= range1[0] && range2[0] <= range1[1]) ||
        (range1[1] <= range2[1] && range1[1] >= range2[0]) ||
        (range2[1] <= range1[1] && range2[1] >= range1[0]));
}
