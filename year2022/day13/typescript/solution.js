"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n\n').map(function (pair) { return pair.split('\n').map(function (item) { return JSON.parse(item); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (sum, curr, i) { return compare(curr[0], curr[1]) ? sum + i + 1 : sum; }, 0);
}
function part_2() {
    var _a;
    var _b, _c;
    var tmp = (_a = [[[2]], [[6]]]).concat.apply(_a, arr).sort(function (a, b) { return compare(a, b) ? -1 : 1; });
    return ((_b = (tmp.findIndex(function (item) { return JSON.stringify(item) === JSON.stringify([[2]]); }) + 1)) !== null && _b !== void 0 ? _b : 1)
        * ((_c = (tmp.findIndex(function (item) { return JSON.stringify(item) === JSON.stringify([[6]]); }) + 1)) !== null && _c !== void 0 ? _c : 1);
}
function compare(a, b) {
    if (typeof a === 'number' && typeof b === 'number')
        return a < b ? true : a > b ? false : null;
    if (typeof a === 'number')
        a = [a];
    if (typeof b === 'number')
        b = [b];
    for (var i = 0; i < Math.min(a.length, b.length); i++) {
        if (compare(a[i], b[i]) !== null)
            return compare(a[i], b[i]);
    }
    return a.length < b.length ? true : a.length > b.length ? false : null;
}
