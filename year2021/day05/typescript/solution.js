"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var arr = file.toString().trim().split('\n').map(function (row) { return row.split(' -> ').map(function (side) { return side.split(',').map(function (num) { return parseInt(num, 10); }); }); });
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a;
    var _b = [new Set(), new Set()], seen = _b[0], duplicated = _b[1];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var row = arr_1[_i];
        if (!(row[0][0] !== row[1][0] && row[0][1] !== row[1][1])) {
            _a = checkRow(iterate(row), seen, duplicated), seen = _a[0], duplicated = _a[1];
        }
    }
    ;
    return duplicated.size;
}
function part_2() {
    var _a;
    var _b = [new Set(), new Set()], seen = _b[0], duplicated = _b[1];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var row = arr_2[_i];
        _a = checkRow(iterate(row), seen, duplicated), seen = _a[0], duplicated = _a[1];
    }
    return duplicated.size;
}
function checkRow(iterator, seen, duplicated) {
    var iteration = iterator.next();
    while (!iteration.done) {
        var _a = iteration.value, x = _a[0], y = _a[1];
        var coordinate = "".concat(x, ",").concat(y);
        if (seen.has(coordinate)) {
            duplicated.add(coordinate);
        }
        seen.add(coordinate);
        iteration = iterator.next();
    }
    return [seen, duplicated];
}
function iterate(row) {
    var _a, dx, dy, _b, x, y;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [Math.sign(row[1][0] - row[0][0]), Math.sign(row[1][1] - row[0][1])], dx = _a[0], dy = _a[1];
                _b = [row[0][0], row[0][1]], x = _b[0], y = _b[1];
                return [4 /*yield*/, [x, y]];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                if (!(x !== row[1][0] || y !== row[1][1])) return [3 /*break*/, 4];
                if (x !== row[1][0]) {
                    x += dx;
                }
                if (y !== row[1][1]) {
                    y += dy;
                }
                return [4 /*yield*/, [x, y]];
            case 3:
                _c.sent();
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}
