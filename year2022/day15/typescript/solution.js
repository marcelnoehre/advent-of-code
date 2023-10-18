"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var pattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
var arr = file.toString().split('\n').map(function (pos) { return pos.match(pattern).slice(1, 5).map(Number); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = [new Set(), new Set()], row = _a[0], beacons = _a[1];
    arr.forEach(function (tuple) {
        var dist = Math.abs(tuple[0] - tuple[2]) + Math.abs(tuple[1] - tuple[3]);
        for (var i = tuple[0] - (dist - Math.abs(tuple[1] - 2000000)); i <= tuple[0] + (dist - Math.abs(tuple[1] - 2000000)); i++)
            row.add(i);
        if (tuple[3] === 2000000)
            beacons.add(tuple[2]);
    });
    return Array.from(row).filter(function (x) { return !beacons.has(x); }).length;
}
function part_2() {
    var _a = [[], 0, 0, 4000000, 4000000], sensors = _a[0], minx = _a[1], miny = _a[2], maxx = _a[3], maxy = _a[4];
    arr.forEach(function (tuple) { return sensors.push([tuple[0], tuple[1], Math.abs(tuple[0] - tuple[2]) + Math.abs(tuple[1] - tuple[3])]); });
    for (var _i = 0, sensors_1 = sensors; _i < sensors_1.length; _i++) {
        var sensor = sensors_1[_i];
        var _loop_1 = function (x, y) {
            if (minx <= x && x <= maxx && miny <= y && y <= maxy && sensors.every(function (_a) {
                var sx = _a[0], sy = _a[1], diff = _a[2];
                return Math.abs(x - sx) + Math.abs(y - sy) > diff;
            })) {
                return { value: x * 4000000 + y };
            }
        };
        for (var _b = 0, _c = generateField(sensor); _b < _c.length; _b++) {
            var _d = _c[_b], x = _d[0], y = _d[1];
            var state_1 = _loop_1(x, y);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    ;
}
function generateField(line) {
    var field = [];
    [[line[0], line[1] - line[2] - 1, line[0] + line[2] + 1, line[1]], [line[0] + line[2] + 1, line[1], line[0], line[1] + line[2] + 1],
        [line[0], line[1] + line[2] + 1, line[0] - line[2] - 1, line[1]], [line[0] - line[2] - 1, line[1], line[0], line[1] - line[2] - 1]
    ].forEach(function (row) {
        var xrow = row[0] < row[2] ? Array.from({ length: row[2] - row[0] + 1 }, function (_, index) { return row[0] + index; }) : Array.from({ length: row[0] - row[2] + 1 }, function (_, index) { return row[0] - index; });
        var yrow = row[1] < row[3] ? Array.from({ length: row[3] - row[1] + 1 }, function (_, index) { return row[1] + index; }) : Array.from({ length: row[1] - row[3] + 1 }, function (_, index) { return row[1] - index; });
        if (row[0] === row[2]) {
            for (var _i = 0, yrow_1 = yrow; _i < yrow_1.length; _i++) {
                var y = yrow_1[_i];
                field.push[row[0], y];
            }
        }
        else if (row[1] === row[3]) {
            for (var _a = 0, xrow_1 = xrow; _a < xrow_1.length; _a++) {
                var x = xrow_1[_a];
                field.push([x, row[1]]);
            }
        }
        else {
            for (var i = 0; i < Math.min(xrow.length, yrow.length); i++)
                field.push([xrow[i], yrow[i]]);
        }
    });
    return field;
}
