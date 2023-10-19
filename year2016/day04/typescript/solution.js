"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var pattern = /^([a-z\-]+)-(\d+)\[([a-z]+)\]$/;
var arr = file.toString().split('\n').map(function (room) { return room.match(pattern).slice(1, 4); });
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.reduce(function (acc, room) { return acc + (sortChars(room[0].replace(/-/g, '')).slice(0, 5).join('') === room[2] ? Number(room[1]) : 0); }, 0);
}
function part_2() {
    return Number(arr.find(function (room) { return (room[0] = room[0].replace(/-/g, ' ').split('').map(function (c) { return String.fromCharCode((c.charCodeAt(0) - 0x61 + Number(room[1])) % 26 + 0x61); }).join("")).includes("north"); })[1]);
}
function sortChars(inputString) {
    var count = {};
    inputString.split('').forEach(function (char) { return count[char] = (count[char] || 0) + 1; });
    return Object.keys(count).sort(function (a, b) { return count[b] - count[a] || a.localeCompare(b); });
}
