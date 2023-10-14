"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().split('\n\n').map(function (passport) { return passport.split(/\s+/); });
var required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
console.log(part_1());
console.log(part_2());
function part_1() {
    return arr.filter(function (passport) { return required.every(function (field) { return new Set(passport.map(function (seq) { return seq.split(":")[0]; })).has(field); }); }).length;
}
function part_2() {
    return arr.filter(function (passport) { return validate(Object.fromEntries(passport.map(function (seq) { return seq.split(':'); }))); }).length;
}
function validate(dict) {
    if (!(dict.hasOwnProperty('byr') && 1920 <= Number(dict['byr']) && Number(dict['byr']) <= 2002))
        return;
    if (!(dict.hasOwnProperty('iyr') && 2010 <= Number(dict['iyr']) && Number(dict['iyr']) <= 2020))
        return;
    if (!(dict.hasOwnProperty('eyr') && 2020 <= Number(dict['eyr']) && Number(dict['eyr']) <= 2030))
        return;
    if (!(dict.hasOwnProperty('hcl') && /^#[0-9a-f]{6}$/.test(dict['hcl'])))
        return;
    if (!(dict.hasOwnProperty('ecl') && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(dict['ecl'])))
        return;
    if (!(dict.hasOwnProperty('pid') && /^\d{9}$/.test(dict['pid'])))
        return;
    if (dict.hasOwnProperty('hgt') && dict['hgt'].slice(-2) === 'cm' && 150 <= Number(dict['hgt'].slice(0, -2)) && Number(dict['hgt'].slice(0, -2)) <= 193)
        return true;
    if (dict.hasOwnProperty('hgt') && dict['hgt'].slice(-2) === 'in' && 59 <= Number(dict['hgt'].slice(0, -2)) && Number(dict['hgt'].slice(0, -2)) <= 76)
        return true;
}
