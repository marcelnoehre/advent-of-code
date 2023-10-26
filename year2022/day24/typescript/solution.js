"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n');
var serialize = function (map) { return Object.keys(map).sort().map(function (key) { return "".concat(key, ":").concat(map[key].join('')); }).join(','); };
var _a = [{ x: 1, y: 0, steps: 0 }, { x: arr[0].length - 2, y: arr.length - 1, steps: 0 }, []], start = _a[0], end = _a[1], maps = _a[2];
setup();
console.log(part_1());
console.log(part_2());
function part_1() {
    return simulate(maps, start, end);
}
function part_2() {
    return simulate(maps, start, end, simulate(maps, end, start, simulate(maps, start, end, 0)));
}
function setup() {
    var _a;
    var map = (_a = {}, _a["".concat(start.x, ",").concat(start.y - 1)] = ['#'], _a["".concat(end.x, ",").concat(end.y + 1)] = ['#'], _a);
    arr.forEach(function (line, y) { line.split('').map(function (cell, x) { if (cell !== '.')
        map["".concat(x, ",").concat(y)] = (map["".concat(x, ",").concat(y)] || []).concat([cell]); }); });
    var serialized = serialize(map);
    var _loop_1 = function () {
        maps.push(map);
        var nxt = {};
        Object.keys(map).forEach(function (key) {
            var _a = key.split(',').map(function (n) { return +n; }), x = _a[0], y = _a[1];
            map[key].forEach(function (dir) {
                var pos = key;
                if (dir === '>')
                    pos = "".concat(x === arr[0].length - 2 ? 1 : x + 1, ",").concat(y);
                if (dir === '<')
                    pos = "".concat(x === 1 ? arr[0].length - 2 : x - 1, ",").concat(y);
                if (dir === 'v')
                    pos = "".concat(x, ",").concat(y === arr.length - 2 ? 1 : y + 1);
                if (dir === '^')
                    pos = "".concat(x, ",").concat(y === 1 ? arr.length - 2 : y - 1);
                nxt[pos] = (nxt[pos] || []).concat([dir]);
            });
        });
        map = nxt;
    };
    do {
        _loop_1();
    } while (serialize(map) !== serialized);
}
function neighbors(maps, _a) {
    var x = _a.x, y = _a.y, steps = _a.steps;
    return [{ x: x - 1, y: y, steps: steps + 1 }, { x: x + 1, y: y, steps: steps + 1 }, { x: x, y: y - 1, steps: steps + 1 }, { x: x, y: y + 1, steps: steps + 1 }, { x: x, y: y, steps: steps + 1 }
    ].filter(function (pos) { return !(maps[(steps + 1) % maps.length]["".concat(pos.x, ",").concat(pos.y)] && maps[(steps + 1) % maps.length]["".concat(pos.x, ",").concat(pos.y)].length); });
}
function simulate(maps, start, end, steps) {
    if (steps === void 0) { steps = 0; }
    var queue = [__assign(__assign({}, start), { steps: steps })];
    var visited = new Set();
    while (queue.length > 0) {
        var next = queue.shift();
        if (next.x === end.x && next.y === end.y)
            return next.steps;
        neighbors(maps, next).forEach(function (pos) {
            if (!visited.has("".concat(pos.x, ",").concat(pos.y, ",").concat(pos.steps % maps.length))) {
                visited.add("".concat(pos.x, ",").concat(pos.y, ",").concat(pos.steps % maps.length));
                queue.push(pos);
            }
        });
    }
}
