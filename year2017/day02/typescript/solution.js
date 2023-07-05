"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (row) { return row.split('\t').map(function (number) { return parseInt(number, 10); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (acc, row) { return acc + Math.max.apply(Math, row) - Math.min.apply(Math, row); }, 0);
}
function part_2() {
    return arr.reduce(function (acc, row) {
        var even = row.reduce(function (pair, num, index) {
            var div = row.find(function (n, i) { return i !== index && n % num === 0; });
            return div ? [div, num] : pair;
        }, []);
        return acc + even[0] / even[1];
    }, 0);
}
