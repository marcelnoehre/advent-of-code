"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('-').map(Number);
console.log(part_1());
console.log(part_2());
function part_1() {
    return Array.from({ length: arr[1] - arr[0] + 1 }, function (_, index) { return (arr[0] + index).toString(); }).filter(function (pw) { return /(.)\1/.test(pw) && pw === pw.split('').sort().join(''); }).length;
}
function part_2() {
    return Array.from({ length: arr[1] - arr[0] + 1 }, function (_, index) { return (arr[0] + index).toString(); }).filter(function (pw) { return pw === pw.split('').sort().join('') && pw.split('').sort().some(function (x, i, a) { return x === a[i + 1] && x !== a[i + 2] && x !== a[i - 1]; }); }).length;
}
