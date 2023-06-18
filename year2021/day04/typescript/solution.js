"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n\r\n');
var numbers = arr[0].trim().split(",").map(Number);
var boards = arr.slice(1, arr.length).map(function (board) { return board.split('\r\n').map(function (row) { return row.trim().split(/\s+/).map(function (number) { return parseInt(number, 10); }); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var marked = new Set();
    for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
        var num = numbers_1[_i];
        marked.add(num);
        var _loop_1 = function (board) {
            if (board.some(function (row) { return row.every(function (x) { return marked.has(x); }); }) || board.some(function (_, columnIndex) { return board.every(function (row) { return marked.has(row[columnIndex]); }); })) {
                return { value: num * board.flat().reduce(function (total, x) { return (marked.has(x) ? total : total + x); }, 0) };
            }
        };
        for (var _a = 0, boards_1 = boards; _a < boards_1.length; _a++) {
            var board = boards_1[_a];
            var state_1 = _loop_1(board);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
}
function part_2() {
    var _a = [new Set(), new Set()], won = _a[0], marked = _a[1];
    for (var _i = 0, numbers_2 = numbers; _i < numbers_2.length; _i++) {
        var num = numbers_2[_i];
        marked.add(num);
        var _loop_2 = function (i) {
            if (won.has(i)) {
                return "continue";
            }
            var b = boards[i];
            if (b.some(function (row) { return row.every(function (x) { return marked.has(x); }); }) || b.some(function (_, columnIndex) { return b.every(function (row) { return marked.has(row[columnIndex]); }); })) {
                won.add(i);
                if (won.size === boards.length) {
                    return { value: num * b.flat().reduce(function (total, x) { return marked.has(x) ? total : total + x; }, 0) };
                }
            }
        };
        for (var i = 0; i < boards.length; i++) {
            var state_2 = _loop_2(i);
            if (typeof state_2 === "object")
                return state_2.value;
        }
    }
}
