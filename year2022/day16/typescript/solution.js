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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var pattern = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/;
var arr = file.toString().split('\n').map(function (line) { return line.match(pattern).slice(1, 4); }).reduce(function (acc, line) { return (acc[line[0]] = [Number(line[1]), line[2].split(', '), {}], acc); }, {});
;
var sortedRooms = Object.keys(arr).filter(function (key) { return arr[key][0] !== 0; }).sort();
sortedRooms.concat(["AA"]).forEach(function (a) { return sortedRooms.filter(function (b) { return b !== a; }).forEach(function (b) { return arr[a][2][b] = search(arr[a][1], b); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return pressure(29, false);
}
function part_2() {
    return pressure(25, true);
}
function search(start, end) {
    return start.includes(end) ? 1 : 1 + search(__spreadArray([], __read(new Set(start.flatMap(function (room) { return arr[room][1]; }))), false), end);
}
function pressure(depth, assistant) {
    var max = 0;
    f(new Set(['AA']), 0, 'AA', depth, false, assistant);
    function f(opened, flowed, curr, depth, elephant, assistant) {
        max = Math.max(max, flowed);
        if (!opened.has(curr)) {
            f(new Set(__spreadArray(__spreadArray([], __read(opened), false), [curr], false)), flowed + arr[curr][0] * depth, curr, depth - 1, elephant, assistant);
            if (assistant && !elephant)
                f(new Set(__spreadArray([curr], __read(opened), false)), flowed + arr[curr][0] * depth, 'AA', 25, true, assistant);
        }
        else
            Object.keys(arr[curr][2]).filter(function (x) { return !opened.has(x); }).forEach(function (room) { return f(opened, flowed, room, depth - arr[curr][2][room], elephant, assistant); });
    }
    return max;
}
