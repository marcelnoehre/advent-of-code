"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\r\n\r\n');
console.log(part_1(arr[0].toString().split('\r\n'), arr[1].toString().split('\r\n').map(function (row) { return row.split(' ').map(function (element) { return parseInt(element); }); })));
console.log(part_2(arr[0].toString().split('\r\n'), arr[1].toString().split('\r\n').map(function (row) { return row.split(' ').map(function (element) { return parseInt(element); }); })));
function part_1(initStacks, instructions) {
    var stacks = [[], [], [], [], [], [], [], [], []];
    var positions = [1, 5, 9, 13, 17, 21, 25, 29, 33];
    for (var i = initStacks.length - 2; i >= 0; i--) {
        for (var s = 0; s < positions.length; s++) {
            if (initStacks[i].charAt(positions[s]) !== ' ') {
                stacks[s].push(initStacks[i].charAt(positions[s]));
            }
        }
        ;
    }
    instructions.forEach(function (instruction) {
        for (var i = 0; i < instruction[1]; i++) {
            stacks[instruction[5] - 1].push(stacks[instruction[3] - 1].pop());
        }
    });
    var key = '';
    for (var i = 0; i < positions.length; i++) {
        key += stacks[i].pop();
    }
    return key;
}
function part_2(initStacks, instructions) {
    var stacks = [[], [], [], [], [], [], [], [], []];
    var positions = [1, 5, 9, 13, 17, 21, 25, 29, 33];
    for (var i = initStacks.length - 2; i >= 0; i--) {
        for (var s = 0; s < positions.length; s++) {
            if (initStacks[i].charAt(positions[s]) !== ' ') {
                stacks[s].push(initStacks[i].charAt(positions[s]));
            }
        }
        ;
    }
    instructions.forEach(function (instruction) {
        var tmp = [];
        for (var i = 0; i < instruction[1]; i++) {
            tmp.push(stacks[instruction[3] - 1].pop());
        }
        for (var i = tmp.length - 1; i >= 0; i--) {
            stacks[instruction[5] - 1].push(tmp[i]);
        }
    });
    var key = '';
    for (var i = 0; i < positions.length; i++) {
        key += stacks[i].pop();
    }
    return key;
}
