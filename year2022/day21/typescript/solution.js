"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = Object.fromEntries(file.toString().split('\n').map(function (line) { return [line.split(' ')[0].slice(0, -1), line.split(':')[1].split(' ').slice(1, 4)]; }));
console.log(part_1());
console.log(part_2());
function part_1() {
    return Math.floor(yell('root', -1));
}
function part_2() {
    var _a;
    var _b = yell(arr['root'][2], 0) !== yell(arr['root'][0], 1) ? [arr['root'][0], arr['root'][2]] : [arr['root'][2], arr['root'][0]], p1 = _b[0], p2 = _b[1];
    var _c = [0, 1e20], low = _c[0], high = _c[1];
    while (low + 1 < high)
        _a = yell(p2, 0) - yell(p1, Math.floor((low + high) / 2)) <= 0 ? [Math.floor((low + high) / 2), high] : [low, Math.floor((low + high) / 2)], low = _a[0], high = _a[1];
    return low;
}
function yell(name, num) {
    if (name === 'humn' && num >= 0)
        return num;
    if (!isNaN(Number(arr[name][0])))
        return Number(arr[name][0]);
    return eval("yell(arr[name][0], num) ".concat(arr[name][1], " yell(arr[name][2], num)"));
}
