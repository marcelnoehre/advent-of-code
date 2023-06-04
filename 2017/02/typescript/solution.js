"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\r\n').map(function (row) { return row.split('\t').map(function (number) { return parseInt(number, 10); }); });
console.log(part_1(arr));
console.log(part_2(arr));
function part_1(spreadsheet) {
    var checksum = 0;
    for (var i = 0; i < spreadsheet.length; i++) {
        checksum += Math.max.apply(Math, spreadsheet[i]) - Math.min.apply(Math, spreadsheet[i]);
    }
    return checksum;
}
function part_2(spreadsheet) {
    var checksum = 0;
    for (var i = 0; i < spreadsheet.length; i++) {
        for (var j = 0; j < spreadsheet[i].length - 1; j++) {
            for (var x = j + 1; x < spreadsheet[i].length; x++) {
                var max = Math.max(spreadsheet[i][j], spreadsheet[i][x]);
                var min = Math.min(spreadsheet[i][j], spreadsheet[i][x]);
                if (max % min === 0) {
                    checksum += max / min;
                    j = spreadsheet[i].length;
                    x = spreadsheet[i].length;
                }
            }
        }
    }
    return checksum;
}
