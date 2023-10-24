"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n').map(function (row) { return row.split(',').map(Number); });
var neighbors = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
var Pts = new Set(__spreadArray([], __read(arr), false).map(String));
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (exposedSides, point) { return exposedSides + neighbors.filter(function (delta) { return !arr.some(function (p) { return p.every(function (coord, index) { return coord === point[index] + delta[index]; }); }); }).length; }, 0);
}
function part_2() {
    return arr.reduce(function (result, _a) {
        var _b = __read(_a, 3), x = _b[0], y = _b[1], z = _b[2];
        return result + neighbors.filter(function (_a) {
            var _b = __read(_a, 3), dx = _b[0], dy = _b[1], dz = _b[2];
            return outside(x + dx, y + dy, z + dz);
        }).length;
    }, 0);
}
function outside(x, y, z) {
    var e_1, _a;
    var _b = __read([new Set(), [[x, y, z]]], 2), seen = _b[0], queue = _b[1];
    while (queue.length > 0) {
        var _c = __read(queue.shift(), 3), x_1 = _c[0], y_1 = _c[1], z_1 = _c[2];
        if (seen.has(String([x_1, y_1, z_1])) || Pts.has(String([x_1, y_1, z_1])))
            continue;
        seen.add(String([x_1, y_1, z_1]));
        if (seen.size > 4000)
            return true;
        try {
            for (var neighbors_1 = (e_1 = void 0, __values(neighbors)), neighbors_1_1 = neighbors_1.next(); !neighbors_1_1.done; neighbors_1_1 = neighbors_1.next()) {
                var _d = __read(neighbors_1_1.value, 3), dx = _d[0], dy = _d[1], dz = _d[2];
                queue.push([x_1 + dx, y_1 + dy, z_1 + dz]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (neighbors_1_1 && !neighbors_1_1.done && (_a = neighbors_1.return)) _a.call(neighbors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return false;
}
