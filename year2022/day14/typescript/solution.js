"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var _a = setupRocks(file.toString().split('\n').map(function (row) { return row.split(' -> ').map(function (pair) { return pair.split(',').map(Number); }); })), rocks = _a[0], top = _a[1];
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = [new Set(), null], sand = _a[0], xy = _a[1];
    while ((xy = simulate(500, 0, function (x, y) { return !Array.from(rocks).some(function (pt) { return pt[0] === x && pt[1] === y; }) && !sand.has("".concat(x, ",").concat(y)); }, top)) !== null) {
        sand.add("".concat(xy[0], ",").concat(xy[1]));
    }
    return sand.size;
}
function part_2() {
    var sand = new Set();
    while (!sand.has('500,0')) {
        sand.add("".concat(simulate(500, 0, function (x, y) { return y < top + 2 && !Array.from(rocks).some(function (point) { return point[0] === x && point[1] === y; }) && !sand.has("".concat(x, ",").concat(y)); }, top + 2).join(',')));
    }
    return sand.size;
}
function setupRocks(arr) {
    var _a = [new Set(), 0], rocks = _a[0], max = _a[1];
    arr.forEach(function (structure) {
        for (var i = 0; i < structure.length - 1; i++) {
            if (structure[i][0] === structure[i + 1][0]) {
                for (var y = Math.min(structure[i][1], structure[i + 1][1]); y <= Math.max(structure[i][1], structure[i + 1][1]); y++) {
                    rocks.add([structure[i][0], y]);
                }
            }
            else if (structure[i][1] === structure[i + 1][1]) {
                for (var x = Math.min(structure[i][0], structure[i + 1][0]); x <= Math.max(structure[i][0], structure[i + 1][0]); x++) {
                    rocks.add([x, structure[i + 1][1]]);
                }
                max = Math.max(structure[i + 1][1], max);
            }
        }
    });
    return [rocks, max];
}
function simulate(x, y, air, top) {
    var _a, _b;
    while (y <= top) {
        if (air(x, y + 1)) {
            y += 1;
        }
        else if (air(x - 1, y + 1)) {
            _a = [x - 1, y + 1], x = _a[0], y = _a[1];
        }
        else if (air(x + 1, y + 1)) {
            _b = [x + 1, y + 1], x = _b[0], y = _b[1];
        }
        else {
            return [x, y];
        }
    }
    return null;
}
