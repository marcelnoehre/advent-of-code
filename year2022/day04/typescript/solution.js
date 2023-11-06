"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (group) { return group.split(',').map(function (tupel) { return tupel.split('-').map(function (num) { return parseInt(num, 10); }); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.filter(function (_a) {
        var pair1 = _a[0], pair2 = _a[1];
        return overlaps(pair1, pair2);
    }).length;
}
function part_2() {
    return arr.filter(function (_a) {
        var pair1 = _a[0], pair2 = _a[1];
        return contains(pair1, pair2);
    }).length;
}
function overlaps(pair1, pair2) {
    return ((pair1[0] <= pair2[0] && pair1[1] >= pair2[1]) || (pair2[0] <= pair1[0] && pair2[1] >= pair1[1]));
}
function contains(pair1, pair2) {
    return ((pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) || (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) || (pair1[1] <= pair2[1] && pair1[1] >= pair2[0]) || (pair2[1] <= pair1[1] && pair2[1] >= pair1[0]));
}
