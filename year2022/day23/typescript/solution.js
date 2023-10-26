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
var _a = __read([new Set(), ['N', 'S', 'W', 'E']], 2), elves = _a[0], directions = _a[1];
console.log(part_1());
console.log(part_2());
function part_1() {
    file.toString().split('\n').map(function (row, y) { return row.split('').map(function (dir, x) { if (dir === '#')
        elves.add("".concat(x, ",").concat(y)); }); });
    __spreadArray([], __read(Array(10)), false).map(round);
    var keys = __spreadArray([], __read(elves.keys()), false).map(function (key) { return key.split(','); });
    var _a = __read([keys.map(function (key) { return +key[0]; }).sort(function (a, b) { return b - a; }), keys.map(function (key) { return +key[1]; }).sort(function (a, b) { return b - a; })], 2), xs = _a[0], ys = _a[1];
    return (xs.at(0) - xs.at(-1) + 1) * (ys.at(0) - ys.at(-1) + 1) - elves.size;
}
function part_2() {
    var _a;
    _a = __read([new Set(), ['N', 'S', 'W', 'E']], 2), elves = _a[0], directions = _a[1];
    file.toString().split('\n').map(function (row, y) { return row.split('').map(function (dir, x) { if (dir === '#')
        elves.add("".concat(x, ",").concat(y)); }); });
    var i = 1;
    for (i; round() > 0; i++)
        ;
    return i;
}
function direction(check, key) {
    var _a = __read(key.split(',').map(function (n) { return +n; }), 2), x = _a[0], y = _a[1];
    if (check === 'N')
        return [x, x - 1, x + 1].map(function (x) { return "".concat(x, ",").concat(y - 1); });
    if (check === 'S')
        return [x, x - 1, x + 1].map(function (x) { return "".concat(x, ",").concat(y + 1); });
    if (check === 'W')
        return [y, y - 1, y + 1].map(function (y) { return "".concat(x - 1, ",").concat(y); });
    if (check === 'E')
        return [y, y - 1, y + 1].map(function (y) { return "".concat(x + 1, ",").concat(y); });
}
function move(elves, proposals) {
    var e_1, _a;
    try {
        for (var _b = __values(proposals.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (proposals.get(key).length === 1) {
                elves.delete(proposals.get(key)[0]);
                elves.add(key);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Array.from(proposals.keys()).filter(function (key) { return proposals.get(key).length === 1; }).length;
}
function round() {
    var e_2, _a;
    var moves = new Map();
    var _loop_1 = function (key) {
        var e_3, _d;
        if (directions.flatMap(function (check) { return direction(check, key); }).every(function (opt) { return !elves.has(opt); }))
            return "continue";
        try {
            for (var directions_1 = (e_3 = void 0, __values(directions)), directions_1_1 = directions_1.next(); !directions_1_1.done; directions_1_1 = directions_1.next()) {
                var check = directions_1_1.value;
                if (direction(check, key).every(function (opt) { return !elves.has(opt); })) {
                    moves.set(direction(check, key)[0], (moves.get(direction(check, key)[0]) || []).concat(key));
                    break;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (directions_1_1 && !directions_1_1.done && (_d = directions_1.return)) _d.call(directions_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    try {
        for (var _b = __values(elves.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            _loop_1(key);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    directions.push(directions.shift());
    return move(elves, moves);
}
