"use strict";
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
var HeartRateExtractor = function (file) {
    try {
        var fitDecoder = require('fit-decoder');
        var data = (file).buffer;
        var json = fitDecoder.parseRecords(fitDecoder.fit2json(data));
        var hrArray = fitDecoder.getRecordFieldValue(json, 'record', 'heart_rate');
        var arr_1 = [];
        hrArray.forEach(function (elem) {
            if (elem != undefined)
                arr_1.push(elem);
        });
        return arr_1;
    }
    catch (error) {
        console.log(error);
    }
};
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
