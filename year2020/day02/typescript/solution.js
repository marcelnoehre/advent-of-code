"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (password) { return password.split(' '); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return __spreadArray([], arr, true).filter(function (_a) {
        var borders = _a[0], char = _a[1], password = _a[2];
        var _b = borders.split('-').map(Number), min = _b[0], max = _b[1];
        var count = password.split(char.replace(':', '')).length - 1;
        return min <= count && count <= max;
    }).length;
}
function part_2() {
    return arr.filter(function (_a) {
        var borders = _a[0], char = _a[1], password = _a[2];
        var _b = borders.split('-').map(Number), first = _b[0], second = _b[1];
        return (password[first - 1] === char.replace(':', '')) !== (password[second - 1] === char.replace(':', ''));
    }).length;
}
