"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(function (claim) { return claim.match(/\d+/g).map(Number); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = [Array.from({ length: 1000 }, function () { return Array(1000).fill(0); }), 0], fabric = _a[0], overlaps = _a[1];
    arr.forEach(function (_a) {
        var _ = _a[0], x = _a[1], y = _a[2], w = _a[3], h = _a[4];
        for (var i = Number(x); i < Number(x + w); i++) {
            for (var j = Number(y); j < Number(y + h); j++) {
                if (fabric[i][j]++ === 1)
                    overlaps++;
            }
        }
    });
    return overlaps;
}
function part_2() {
    var _a = [Array.from({ length: 1000 }, function () { return Array(1000).fill(0); }), new Set()], fabric = _a[0], noOverlap = _a[1];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var _b = arr_1[_i], id = _b[0], x = _b[1], y = _b[2], w = _b[3], h = _b[4];
        noOverlap.add(Number(id));
        for (var i = Number(x); i < Number(x + w); i++) {
            for (var j = Number(y); j < Number(y + h); j++) {
                fabric[i][j] === 0 ? fabric[i][j] = Number(id) : (noOverlap.delete(Number(id)), noOverlap.delete(fabric[i][j]));
            }
        }
    }
    return Number(Array.from(noOverlap).join(','));
}
