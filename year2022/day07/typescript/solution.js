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
var arr = file.toString().split('\n');
var filesystem = {};
setFileSystem();
console.log(part_1());
console.log(part_2());
function part_1() {
    return Object.values(filesystem)
        .filter(function (size) { return size <= 100000; })
        .reduce(function (acc, size) { return acc + size; }, 0);
}
function part_2() {
    return Math.min.apply(Math, Object.values(filesystem)
        .filter(function (size) { return size >= (30000000 - (70000000 - filesystem['/'])); }));
}
function setFileSystem() {
    var visited = new Set();
    var current = [];
    arr.forEach(function (command) {
        if (command.match(/^\$ cd (.+)$/)) {
            current = command.split(' ')[2] === '..' ? current.slice(0, -1) : __spreadArray(__spreadArray([], current, true), [command.split(' ')[2]], false);
        }
        else if (command.match(/^(\d+) (.+)$/)) {
            var _a = [parseInt(command.split(' ')[0]), command.split(' ')[1]], size = _a[0], name_1 = _a[1];
            if (!visited.hasOwnProperty(current.toString() + '_' + name_1)) {
                visited.add(current.toString() + '_' + name_1);
                var dir = current;
                while (dir[0]) {
                    filesystem[dir.toString()] = (filesystem[dir.toString()] || 0) + size;
                    dir = dir.slice(0, -1);
                }
            }
        }
    });
    return filesystem;
}
