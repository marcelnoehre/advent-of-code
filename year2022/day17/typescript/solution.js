"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var jetPattern = file.toString();
var rocks = [{ row: [['#', '#', '#', '#']] }, { row: [['.', '#', '.'], ['#', '#', '#'], ['.', '#', '.']] }, { row: [['.', '.', '#'], ['.', '.', '#'], ['#', '#', '#']] }, { row: [['#'], ['#'], ['#'], ['#']] }, { row: [['#', '#'], ['#', '#']] }];
console.log(part_1());
console.log(part_2());
function part_1() {
    return simulate(2022);
}
function part_2() {
    return simulate(1000000000000);
}
function isValidPosition(rock, chamber, rowId, colId) {
    if (colId < 0 || colId + rock[0].length > chamber[0].length || rowId - (rock.length - 1) < 0)
        return false;
    for (var j = 0; j < rock.length; ++j)
        for (var k = 0; k < rock[j].length; ++k)
            if (rock[j][k] === '#' && chamber[rowId - j][colId + k] === '#')
                return false;
    return true;
}
function getPattern(chamber, n, rockId, jet) {
    return chamber.slice(-n).map(function (row) { return row.join(''); }).join('') + '|' + rockId + '|' + jet;
}
function simulate(iterations) {
    var _a = [-1, 0, [], {}, 0], highest = _a[0], jet = _a[1], chamber = _a[2], seen = _a[3], added = _a[4];
    for (var i = 0; i < iterations; ++i) {
        for (var j = rocks[i % rocks.length].row.length + 3 - (chamber.length - (highest + 1)); j > 0; --j)
            chamber.push(Array(7).fill('.'));
        var _b = [highest + 3 + rocks[i % rocks.length].row.length, 2], rowId = _b[0], colId = _b[1];
        while (true) {
            var newColIdx = colId + ((jetPattern[jet] === '<') ? -1 : (jetPattern[jet] === '>') ? 1 : 0);
            colId = isValidPosition(rocks[i % rocks.length].row, chamber, rowId, newColIdx) ? newColIdx : colId;
            jet = (jet + 1) % jetPattern.length;
            if (!isValidPosition(rocks[i % rocks.length].row, chamber, rowId - 1, colId))
                break;
            --rowId;
        }
        highest = Math.max(highest, rowId);
        for (var j = 0; j < rocks[i % rocks.length].row.length; ++j) {
            for (var k = 0; k < rocks[i % rocks.length].row[j].length; ++k) {
                if (rocks[i % rocks.length].row[j][k] === '#')
                    chamber[rowId - j][colId + k] = '#';
            }
        }
        var pattern = getPattern(chamber, 30, i % rocks.length, jet);
        if (pattern in seen) {
            added += (Math.floor((iterations - i) / (i - seen[pattern][0]))) * (highest - seen[pattern][1]);
            i += (Math.floor((iterations - i) / (i - seen[pattern][0]))) * (i - seen[pattern][0]);
        }
        seen[pattern] = [i, highest];
    }
    return added + highest + 1;
}
