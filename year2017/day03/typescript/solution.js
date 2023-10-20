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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)('../puzzle.txt', 'utf-8');
var input = Number(file.toString());
console.log(part_1());
console.log(part_2());
function part_1() {
    var _a = __read([Infinity,
        Math.pow(((Math.floor(Math.sqrt(input - 1) / 2) + 1) * 2 - 1), 2),
        Math.pow(((Math.floor(Math.sqrt(input - 1) / 2) + 1) * 2 + 1), 2)], 3), steps = _a[0], x = _a[1], y = _a[2];
    for (var i = 0; i < 4; i++) {
        steps = Math.min(steps, Math.abs(input - ((1 - (i / 4 + 0.125)) * x + (i / 4 + 0.125) * y)));
    }
    return steps + (Math.floor(Math.sqrt(input - 1) / 2) + 1);
}
function part_2() {
    var e_1, _a;
    var grid = {};
    var _loop_1 = function (x, y) {
        var value = [-1, 0, 1].reduce(function (sum, i) {
            return sum + [-1, 0, 1].reduce(function (iSum, j) {
                if (!(i === 0 && j === 0))
                    iSum += grid["".concat(x + i, ",").concat(y + j)] || 0;
                return iSum;
            }, 0);
        }, 0) || 1;
        if (value > input)
            return { value: value };
        grid["".concat(x, ",").concat(y)] = value;
    };
    try {
        for (var _b = __values(generateField()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), x = _d[0], y = _d[1];
            var state_1 = _loop_1(x, y);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function generateField() {
    var _a, x, y, dx, dy, s, i;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = __read([0, 0, 1, 0, 0, 1], 6), x = _a[0], y = _a[1], dx = _a[2], dy = _a[3], s = _a[4], i = _a[5];
                _d.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, [x, y]];
            case 2:
                _d.sent();
                _b = __read([i + 1, x + dx, y + dy], 3), i = _b[0], x = _b[1], y = _b[2];
                if (i >= Math.pow((s * 2 + 1), 2))
                    s += 1;
                if (Math.abs(x + dx) > s || Math.abs(y + dy) > s)
                    _c = __read([dy, -dx], 2), dx = _c[0], dy = _c[1];
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
