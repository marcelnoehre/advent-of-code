"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (row) { return row.split('').map(function (num) { return parseInt(num, 10); }); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(board) {
    var sum = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (i === 0 || j === 0 || i === board.length - 1 || j === board[i].length - 1) {
                sum++;
            }
            else {
                var up = true;
                var down = true;
                var left = true;
                var right = true;
                for (var x = 0; x < board.length; x++) {
                    if (board[i][j] <= board[i][x]) {
                        if (x < j) {
                            up = false;
                        }
                        else if (x > j) {
                            down = false;
                        }
                    }
                }
                if (!up && !down) {
                    for (var x = 0; x < board[i].length; x++) {
                        if (board[i][j] <= board[x][j]) {
                            if (x < i) {
                                left = false;
                            }
                            else if (x > i) {
                                right = false;
                            }
                        }
                    }
                }
                if (up || down || left || right) {
                    sum++;
                }
            }
        }
    }
    return sum;
}
function part_2(board) {
    var result = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j];
            var up = 0;
            for (var x = i - 1; x >= 0; x--) {
                up++;
                if (board[x][j] >= board[i][j]) {
                    x = -1;
                }
            }
            var down = 0;
            for (var x = i + 1; x < board.length; x++) {
                down++;
                if (board[x][j] >= board[i][j]) {
                    x = board.length;
                }
            }
            var left = 0;
            for (var x = j - 1; x >= 0; x--) {
                left++;
                if (board[i][x] >= board[i][j]) {
                    x = -1;
                }
            }
            var right = 0;
            for (var x = j + 1; x < board[i].length; x++) {
                right++;
                if (board[i][x] >= board[i][j]) {
                    x = board[i].length;
                }
            }
            result = (up * down * left * right) > result ? (up * down * left * right) : result;
        }
    }
    return result;
}
