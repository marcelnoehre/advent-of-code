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
var arr = file.toString().split('\n\n');
var squares = [
    { x: 50, y: 0, wrap: [null, null, [4, 0], [5, 0]] },
    { x: 100, y: 0, wrap: [[3, 2], [2, 2], null, [5, 3]] },
    { x: 50, y: 50, wrap: [[1, 3], null, [4, 1], null] },
    { x: 50, y: 100, wrap: [[1, 2], [5, 2], null, null] },
    { x: 0, y: 100, wrap: [null, null, [0, 0], [2, 0]] },
    { x: 0, y: 150, wrap: [[3, 3], [1, 1], [0, 1], null] },
];
console.log(part_1());
console.log(part_2());
function part_1() {
    return password(wrap2D);
}
function part_2() {
    return password(wrap3D(50));
}
function wrap2D(maze, pos) {
    var _a;
    var _b;
    var _c = [[[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4].map(function (val) { return -val; }), __spreadArray([], pos, true)], opp = _c[0], wrap = _c[1];
    while (['.', '#'].includes((_b = maze[wrap[1] + opp[1]]) === null || _b === void 0 ? void 0 : _b[wrap[0] + opp[0]]))
        _a = [wrap[0] + opp[0], wrap[1] + opp[1]], wrap[0] = _a[0], wrap[1] = _a[1];
    return wrap;
}
function wrap3D(width) {
    return function (maze, pos) {
        var _a = [squares.find(function (sq) { return sq.x === pos[0] - pos[0] % width && sq.y === pos[1] - pos[1] % width; }).wrap[pos[2]], []], _b = _a[0], i = _b[0], dir = _b[1], nxt = _a[1];
        if (['02', '11', '33'].includes([pos[2], dir].sort().join('')))
            nxt = [pos[0] % width, width - pos[1] % width - 1];
        if (['00', '13', '22'].includes([pos[2], dir].sort().join('')))
            nxt = [width - pos[0] % width - 1, pos[1] % width];
        if (['03', '12'].includes([pos[2], dir].sort().join('')))
            nxt = [pos[1] % width, pos[0] % width];
        if (['01', '23'].includes([pos[2], dir].sort().join('')))
            nxt = [width - pos[1] % width - 1, width - pos[0] % width - 1];
        return [squares[i].x + nxt[0], squares[i].y + nxt[1], dir];
    };
}
function walk(maze, pos, steps, wrapLogic) {
    var _a, _b;
    for (; steps > 0; steps--) {
        var next = [pos[0] + [[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4][0], pos[1] + [[1, 0], [0, 1], [-1, 0], [0, -1]][pos[2] % 4][1], pos[2]];
        if (((_a = maze[next[1]]) === null || _a === void 0 ? void 0 : _a[next[0]]) !== '.' && ((_b = maze[next[1]]) === null || _b === void 0 ? void 0 : _b[next[0]]) !== '#')
            next = wrapLogic(maze, pos);
        if (maze[next[1]][next[0]] === '#')
            break;
        pos = next;
    }
    return pos;
}
function password(wrapLogic) {
    var _a = [[0, 0, 0], arr[0].split('\n').map(function (row) { return row.split(''); }), arr[1].replace(/(R|L)/g, ',$1,').split(',')], pos = _a[0], maze = _a[1], directions = _a[2];
    while (maze[pos[1]][pos[0]] != '.')
        pos[0]++;
    while (directions.length > 0) {
        var dir = directions.shift();
        pos = Number.isInteger(+dir) ? walk(maze, pos, +dir, wrapLogic) : [pos[0], pos[1], dir === 'R' ? (pos[2] + 1) % 4 : (4 + pos[2] - 1) % 4];
    }
    return (pos[1] + 1) * 1000 + (pos[0] + 1) * 4 + pos[2];
}
