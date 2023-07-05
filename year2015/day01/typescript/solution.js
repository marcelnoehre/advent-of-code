"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8').toString().trim();
console.log(part_1());
console.log(part_2());
function part_1() {
    return file.split('').reduce(function (acc, char) { return acc + (char === '(' ? 1 : -1); }, 0);
}
function part_2() {
    return file.split('').findIndex(function (_, i, a) { return a.slice(0, i + 1).reduce(function (s, c) { return s + (c === '(' ? 1 : -1); }, 0) === -1; }) + 1;
}
