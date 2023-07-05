"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (line) { return [line.split(' ')[0], parseInt(line.split(' ')[1], 10)]; });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (_a, _b) {
        var h = _a[0], d = _a[1];
        var ac = _b[0], v = _b[1];
        return ac === 'forward' ? [h + v, d] : ac === 'down' ? [h, d + v] : [h, d - v];
    }, [0, 0]).reduce(function (a, b) { return a * b; });
}
function part_2() {
    return arr.reduce(function (_a, _b) {
        var h = _a[0], d = _a[1], a = _a[2];
        var ac = _b[0], v = _b[1];
        return (ac === 'forward' ? [h + v, d + a * v, a] : ac === 'down' ? [h, d, a + v] : [h, d, a - v]);
    }, [0, 0, 0]).slice(0, 2).reduce(function (a, b) { return a * b; });
}
