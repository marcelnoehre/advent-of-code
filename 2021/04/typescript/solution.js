"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n\r\n');
var numbers = arr[0].trim().split(',').map(function (num) { return parseInt(num, 10); });
var boards = arr.slice(1, arr.length).map(function (board) { return board.split('\r\n').map(function (row) { return row.trim().split(/\s+/).map(function (number) { return parseInt(number, 10); }); }); });
console.log(part_1(numbers, boards));
console.log(part_2(numbers, boards));
function part_1(numbers, boards) {
    var drawn = [];
    var latest;
    for (var i = 0; i < numbers.length; i++) {
        drawn.push(numbers[i]);
        latest = numbers[i];
        for (var x = 0; x < boards.length; x++) {
            if (drawn.length >= 5) {
                var bingo = false;
                for (var y = 0; y < 5; y++) {
                    var horizontal = true;
                    for (var z = 0; z < 5; z++) {
                        if (!drawn.includes(boards[x][y][z])) {
                            horizontal = false;
                            z = 5;
                        }
                    }
                    if (horizontal) {
                        bingo = true;
                        y = 5;
                    }
                }
                if (!bingo) {
                    for (var z = 0; z < 5; z++) {
                        var vertical = true;
                        for (var y = 0; y < 5; y++) {
                            if (!drawn.includes(boards[x][y][z])) {
                                vertical = false;
                                y = 5;
                            }
                        }
                        if (vertical) {
                            bingo = true;
                            z = 5;
                        }
                    }
                }
                if (bingo) {
                    var sum = 0;
                    for (var y = 0; y < 5; y++) {
                        for (var z = 0; z < 5; z++) {
                            if (!drawn.includes(boards[x][y][z])) {
                                sum += boards[x][y][z];
                            }
                        }
                    }
                    return sum * latest;
                }
            }
        }
    }
}
function part_2(numbers, boards) {
    var drawn = [];
    var done = [];
    var latest;
    for (var i = 0; i < numbers.length; i++) {
        drawn.push(numbers[i]);
        latest = numbers[i];
        for (var x = 0; x < boards.length; x++) {
            if (!done.includes(x)) {
                if (drawn.length >= 5) {
                    var bingo = false;
                    for (var y = 0; y < 5; y++) {
                        var horizontal = true;
                        for (var z = 0; z < 5; z++) {
                            if (!drawn.includes(boards[x][y][z])) {
                                horizontal = false;
                                z = 5;
                            }
                        }
                        if (horizontal) {
                            bingo = true;
                            y = 5;
                        }
                    }
                    if (!bingo) {
                        for (var z = 0; z < 5; z++) {
                            var vertical = true;
                            for (var y = 0; y < 5; y++) {
                                if (!drawn.includes(boards[x][y][z])) {
                                    vertical = false;
                                    y = 5;
                                }
                            }
                            if (vertical) {
                                bingo = true;
                                z = 5;
                            }
                        }
                    }
                    if (bingo) {
                        if (done.length == boards.length - 1) {
                            var sum = 0;
                            for (var y = 0; y < 5; y++) {
                                for (var z = 0; z < 5; z++) {
                                    if (!drawn.includes(boards[x][y][z])) {
                                        sum += boards[x][y][z];
                                    }
                                }
                            }
                            return sum * latest;
                        }
                        else {
                            done.push(x);
                        }
                    }
                }
            }
        }
    }
}
