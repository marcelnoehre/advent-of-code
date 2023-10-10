"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (line) { return line.split(','); });
var directions = {
    'L': [-1, 0],
    'R': [1, 0],
    'U': [0, 1],
    'D': [0, -1]
};
var _a = [decodeWire(arr[0]), decodeWire(arr[1])], wire1 = _a[0], wire2 = _a[1];
var panel = wire1.filter(function (x) { return wire2.some(function (y) { return x[0] === y[0] && x[1] === y[1]; }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return Math.min.apply(Math, panel.map(function (_a) {
        var x = _a[0], y = _a[1];
        return Math.abs(x) + Math.abs(y);
    }));
}
function part_2() {
    return Math.min.apply(Math, panel.map(function (_a) {
        var x = _a[0], y = _a[1];
        return wire1.findIndex(function (_a) {
            var a = _a[0], b = _a[1];
            return a === x && b === y;
        })
            + wire2.findIndex(function (_a) {
                var a = _a[0], b = _a[1];
                return a === x && b === y;
            });
    })) + 2;
}
function decodeWire(wire) {
    var visited = [];
    var _a = [0, 0], x = _a[0], y = _a[1];
    wire.forEach(function (cmd) {
        for (var i = 0; i < Number(cmd.substring(1)); i++) {
            x += directions[cmd.charAt(0)][0];
            y += directions[cmd.charAt(0)][1];
            visited.push([x, y]);
        }
    });
    return visited;
}
