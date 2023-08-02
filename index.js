"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.SpeedExtractor = exports.LTHRZonesPercentage = exports.LTHRZone = exports.LTHRZones = exports.HeartRateExtractor = exports.TheoricalMaxHeartRate = void 0;
var TheoricalMaxHeartRate = function (age, gender) {
    switch (String(gender).toLocaleLowerCase()) {
        case 'm':
            return 220 - age;
        case 'f':
            return 226 - age;
        default:
            return 223 - age;
    }
};
exports.TheoricalMaxHeartRate = TheoricalMaxHeartRate;
var HeartRateExtractor = function (contenido) { return __awaiter(void 0, void 0, void 0, function () {
    var fitDecoder, data, json, hrArray, arr_1;
    return __generator(this, function (_a) {
        try {
            fitDecoder = require('fit-decoder');
            data = new TextEncoder().encode(contenido);
            json = fitDecoder.parseRecords(fitDecoder.fit2json(data.buffer));
            hrArray = fitDecoder.getRecordFieldValue(json, 'record', 'heart_rate');
            arr_1 = [];
            hrArray.forEach(function (elem) {
                if (elem != undefined)
                    arr_1.push(elem);
            });
            return [2 /*return*/, arr_1];
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); };
exports.HeartRateExtractor = HeartRateExtractor;
var LTHRZones = function (age, gender, sport) {
    var maxHeartRate = (0, exports.TheoricalMaxHeartRate)(age, gender);
    if (String(sport).toLocaleLowerCase() === 'c') {
        return {
            "zone1": (maxHeartRate * 0.56).toFixed(0),
            "zone2": (maxHeartRate * 0.66).toFixed(0),
            "zone3": (maxHeartRate * 0.75).toFixed(0),
            "zone4": (maxHeartRate * 0.85).toFixed(0),
            "zone5": (maxHeartRate).toFixed(0)
        };
    }
    else if (String(sport).toLocaleLowerCase() === 'r') {
        return {
            "zone1": (maxHeartRate * 0.58).toFixed(0),
            "zone2": (maxHeartRate * 0.68).toFixed(0),
            "zone3": (maxHeartRate * 0.77).toFixed(0),
            "zone4": (maxHeartRate * 0.87).toFixed(0),
            "zone5": (maxHeartRate).toFixed(0)
        };
    }
    else {
        console.log('Error: Sport not found.');
        console.log('Sports available are [c] for cycling or [r] for running.');
    }
};
exports.LTHRZones = LTHRZones;
var LTHRZone = function (age, gender, heartRate, sport) {
    var maxHeartRate = (0, exports.TheoricalMaxHeartRate)(age, gender);
    if (String(sport).toLocaleLowerCase() === 'c') {
        if (heartRate < (maxHeartRate * 0.56)) {
            return 'zone1';
        }
        else if ((heartRate >= (maxHeartRate * 0.56)) && (heartRate <= (maxHeartRate * 0.66))) {
            return 'zone2';
        }
        else if ((heartRate > (maxHeartRate * 0.66)) && (heartRate <= (maxHeartRate * 0.75))) {
            return 'zone3';
        }
        else if ((heartRate > (maxHeartRate * 0.75)) && (heartRate <= (maxHeartRate * 0.85))) {
            return 'zone4';
        }
        else if (heartRate > (maxHeartRate * 0.85)) {
            return 'zone5';
        }
    }
    else if (String(sport).toLocaleLowerCase() === 'r') {
        if (heartRate < (maxHeartRate * 0.56)) {
            return 'zone1';
        }
        else if ((heartRate >= (maxHeartRate * 0.58)) && (heartRate <= (maxHeartRate * 0.68))) {
            return 'zone2';
        }
        else if ((heartRate > (maxHeartRate * 0.68)) && (heartRate <= (maxHeartRate * 0.77))) {
            return 'zone3';
        }
        else if ((heartRate > (maxHeartRate * 0.77)) && (heartRate <= (maxHeartRate * 0.87))) {
            return 'zone4';
        }
        else if (heartRate > (maxHeartRate * 0.87)) {
            return 'zone5';
        }
    }
    else {
        console.log('Error: Sport not found.');
        console.log('Sports available are [c] for cycling and [r] for running.');
    }
};
exports.LTHRZone = LTHRZone;
var LTHRZonesPercentage = function (age, gender, sport, arr) {
    var zones = {
        z1: 0,
        z2: 0,
        z3: 0,
        z4: 0,
        z5: 0
    };
    var count = 0;
    arr.forEach(function (elem) {
        var zone = (0, exports.LTHRZone)(age, gender, elem, sport);
        switch (zone) {
            case 'zone1':
                zones.z1 = zones.z1 + 1;
                count++;
                break;
            case 'zone2':
                zones.z2 = zones.z2 + 1;
                count++;
                break;
            case 'zone3':
                zones.z3 = zones.z3 + 1;
                count++;
                break;
            case 'zone4':
                zones.z4 = zones.z4 + 1;
                count++;
                break;
            case 'zone5':
                zones.z5 = zones.z5 + 1;
                count++;
                break;
            default:
                console.log('Error: Key not found.');
                break;
        }
    });
    return {
        z1: ((zones.z1 / count) * 100).toFixed(2),
        z2: ((zones.z2 / count) * 100).toFixed(2),
        z3: ((zones.z3 / count) * 100).toFixed(2),
        z4: ((zones.z4 / count) * 100).toFixed(2),
        z5: ((zones.z5 / count) * 100).toFixed(2)
    };
};
exports.LTHRZonesPercentage = LTHRZonesPercentage;
var SpeedExtractor = function (file) {
    try {
        var fitDecoder = require('fit-decoder');
        var data = file.buffer;
        var json = fitDecoder.parseRecords(fitDecoder.fit2json(data));
        var array = fitDecoder.getRecordFieldValue(json, 'record', 'speed');
        var arr_2 = [];
        array.forEach(function (elem) {
            if (elem !== undefined)
                arr_2.push(Number((elem * 3.87).toFixed(1)));
        });
        return arr_2;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
exports.SpeedExtractor = SpeedExtractor;
// Informations Recuperables
// data: {
//     timestamp: 2023-07-26T08:07:02.000Z,
//     altitude: 34.86,
//     cadence: 0,
//     distance: 0,
//     heart_rate: 91,
//     grade: 0,
//     speed: 0.001,
//     temperature: 20
//   }
