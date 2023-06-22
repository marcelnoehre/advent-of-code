"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = [[0, 0], [0, 0], file.split('\r\n').map(function (row) { return row.split(''); })], start = _a[0], end = _a[1], chars = _a[2];
    chars.forEach(function (row, i) {
        row.forEach(function (char, j) {
            var _a, _b;
            if (char === 'E')
                _a = [[i, j], 'z'], end = _a[0], chars[i][j] = _a[1];
            if (char === 'S')
                _b = [[i, j], 'a'], start = _b[0], chars[i][j] = _b[1];
        });
    });
    return findShortestPass(chars, start, end, chars.length * chars[0].length);
}
function part_2() {
    var _a = [[], [0, 0], file.split('\r\n').map(function (row) { return row.split(''); })], starts = _a[0], end = _a[1], chars = _a[2];
    chars.forEach(function (row, i) {
        row.forEach(function (char, j) {
            var _a;
            if (char === 'a')
                starts.push([i, j]);
            if (char === 'E')
                _a = [[i, j], 'z'], end = _a[0], chars[i][j] = _a[1];
            if (char === 'S') {
                chars[i][j] = 'a';
                starts.push([i, j]);
            }
        });
    });
    var length = chars.length * chars[0].length;
    starts.forEach(function (start) { length = findShortestPass(chars, start, end, length); });
    return length;
}
function findShortestPass(chars, start, end, length) {
    var seen = chars.map(function (row) { return row.map(function () { return false; }); });
    var Q = [[start[0], start[1], 0]];
    while (Q.length > 0) {
        var curr = Q.shift();
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var direction = directions_1[_i];
            var _a = [curr[0] + direction[0], curr[1] + direction[1]], dx = _a[0], dy = _a[1];
            if (dx < 0 || dy < 0 || dx >= chars.length || dy >= chars[0].length)
                continue;
            if (seen[dx][dy] || chars[dx][dy].charCodeAt(0) - chars[curr[0]][curr[1]].charCodeAt(0) > 1)
                continue;
            if (dx === end[0] && dy === end[1])
                length = curr[2] + 1 < length ? curr[2] + 1 : length;
            seen[dx][dy] = true;
            Q.push([dx, dy, curr[2] + 1]);
        }
    }
    return length;
}
