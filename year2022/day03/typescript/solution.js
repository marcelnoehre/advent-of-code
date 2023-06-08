"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n');
console.log(part_1());
console.log(part_2());
function part_1() {
    var sum = 0;
    arr.forEach(function (rucksack) {
        var compartments = rucksack.match(new RegExp(".{1,".concat(Math.floor(rucksack.length / 2), "}"), 'g'));
        sum += getCharValue(compartments[0].split('').find(function (c) { return compartments[1].includes(c); }));
    });
    return sum;
}
function part_2() {
    var groups = [];
    for (var i = 0; i < arr.length; i += 3) {
        groups.push(arr.slice(i, i + 3));
    }
    return groups.map(function (group) {
        return getCharValue(group[0].split('').find(function (c) { return group[1].includes(c) && group[2].includes(c); }));
    }).reduce(function (a, b) { return a + b; }, 0);
}
function getCharValue(c) {
    return c.charCodeAt(0) - (c.charCodeAt(0) > 96 ? 96 : 38);
}
