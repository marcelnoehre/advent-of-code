"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n');
console.log(part_1());
console.log(part_2());
function part_1() {
    return validate([/^(?!.*ab)(?!.*cd)(?!.*pq)(?!.*xy).*$/, /^(.*[aeiou]){3}.*$/, /(.)\1/]);
}
function part_2() {
    return validate([/([a-z][a-z]).*\1/, /([a-z])[a-z]\1/]);
}
function validate(validators) {
    var counter = 0;
    arr.forEach(function (i) {
        if (validators.every(function (regex) { return regex.test(i.trim()); })) {
            counter++;
        }
    });
    return counter;
}
