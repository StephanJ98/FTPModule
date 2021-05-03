exports.TheoricalMaxHeartRate = (age, gender) => {
    switch (String(gender).toLocaleLowerCase()) {
        case 'm':
            return 220 - age
        case 'f':
            return 226 - age
        default:
            return 223 - age
    }
}

exports.HeartRateExtractor = (file) => {
    var convert = require('xml-js');
    let oneLine = ''

    try {
        file.split(/\r?\n/).forEach((line) => {
            oneLine = oneLine + line
        });
        var xml = oneLine.replace(/\s\s+/g, '');
        var result = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 4 }))
        let hr = []
        result.gpx.trk.trkseg.trkpt.forEach(elem => hr.push(elem.extensions['gpxtpx:TrackPointExtension']['gpxtpx:hr']._text))
        return hr
    } catch (err) {
        console.error(err);
    }
}

exports.FTHRZones = (age, gender, sport) => {
    let maxHeartRate = this.TheoricalMaxHeartRate(age, gender)
    if (String(sport).toLocaleLowerCase() === 'c') {
        return {
            "zone1": (maxHeartRate * 0.81).toFixed(0),
            "zone2": (maxHeartRate * 0.89).toFixed(0),
            "zone3": (maxHeartRate * 0.93).toFixed(0),
            "zone4": (maxHeartRate * 0.99).toFixed(0),
            "zone5a": (maxHeartRate * 1.02).toFixed(0),
            "zone5b": (maxHeartRate * 1.06).toFixed(0),
            "zone5c": (maxHeartRate * 1.2).toFixed(0),
        }
    } else if (String(sport).toLocaleLowerCase() === 'r') {
        return {
            "zone1": (maxHeartRate * 0.85).toFixed(0),
            "zone2": (maxHeartRate * 0.89).toFixed(0),
            "zone3": (maxHeartRate * 0.94).toFixed(0),
            "zone4": (maxHeartRate * 0.99).toFixed(0),
            "zone5a": (maxHeartRate * 1.02).toFixed(0),
            "zone5b": (maxHeartRate * 1.06).toFixed(0),
            "zone5c": (maxHeartRate * 1.2).toFixed(0),
        }
    } else {
        console.log('Error: Sport not found.')
        console.log('Sports available are [c] for cycling and [r] for running.')
    }
}

exports.FTHRZone = (age, gender, heartRate, sport) => {
    let maxHeartRate = this.TheoricalMaxHeartRate(age, gender)
    if (String(sport).toLocaleLowerCase() === 'c') {
        if (heartRate < (maxHeartRate * 0.81)) {
            return 'zone1'
        } else if ((heartRate >= (maxHeartRate * 0.81)) && (heartRate <= (maxHeartRate * 0.89))) {
            return 'zone2'
        } else if ((heartRate > (maxHeartRate * 0.89)) && (heartRate <= (maxHeartRate * 0.93))) {
            return 'zone3'
        } else if ((heartRate > (maxHeartRate * 0.93)) && (heartRate <= (maxHeartRate * 0.99))) {
            return 'zone4'
        } else if ((heartRate > (maxHeartRate * 0.99)) && (heartRate <= (maxHeartRate * 1.02))) {
            return 'zone5a'
        } else if ((heartRate > (maxHeartRate * 1.02)) && (heartRate <= (maxHeartRate * 1.06))) {
            return 'zone5b'
        } else if ((heartRate > (maxHeartRate * 1.06))) {
            return 'zone5c'
        }
    } else if (String(sport).toLocaleLowerCase() === 'r') {
        if (heartRate < (maxHeartRate * 0.85)) {
            return 'zone1'
        } else if ((heartRate >= (maxHeartRate * 0.85)) && (heartRate <= (maxHeartRate * 0.89))) {
            return 'zone2'
        } else if ((heartRate > (maxHeartRate * 0.89)) && (heartRate <= (maxHeartRate * 0.94))) {
            return 'zone3'
        } else if ((heartRate > (maxHeartRate * 0.94)) && (heartRate <= (maxHeartRate * 0.99))) {
            return 'zone4'
        } else if ((heartRate > (maxHeartRate * 0.99)) && (heartRate <= (maxHeartRate * 1.02))) {
            return 'zone5a'
        } else if ((heartRate > (maxHeartRate * 1.02)) && (heartRate <= (maxHeartRate * 1.06))) {
            return 'zone5b'
        } else if ((heartRate > (maxHeartRate * 1.06))) {
            return 'zone5c'
        }
    } else {
        console.log('Error: Sport not found.')
        console.log('Sports available are [c] for cycling and [r] for running.')
    }
}

exports.FTHRZonesPercentage = (age, gender, sport, arr) => {
    let zones = {
        z1: 0,
        z2: 0,
        z3: 0,
        z4: 0,
        z5a: 0,
        z5b: 0,
        z5c: 0
    }
    let count = 0
    arr.forEach(elem => {
        zone = this.FTHRZone(age, gender, elem, sport)
        switch (zone) {
            case 'zone1':
                zones.z1 = zones.z1 + 1
                count++
                break;
            case 'zone2':
                zones.z2 = zones.z2 + 1
                count++
                break;
            case 'zone3':
                zones.z3 = zones.z3 + 1
                count++
                break;
            case 'zone4':
                zones.z4 = zones.z4 + 1
                count++
                break;
            case 'zone5a':
                zones.z5a = zones.z5a + 1
                count++
                break;
            case 'zone5b':
                zones.z5b = zones.z5b + 1
                count++
                break;
            case 'zone5c':
                zones.z5c = zones.z5c + 1
                count++
                break;
            default:
                console.log('Error: Key not found.')
                break;
        }
    })

    return {
        z1: ((zones.z1 / count) * 100).toFixed(2),
        z2: ((zones.z2 / count) * 100).toFixed(2),
        z3: ((zones.z3 / count) * 100).toFixed(2),
        z4: ((zones.z4 / count) * 100).toFixed(2),
        z5a: ((zones.z5a / count) * 100).toFixed(2),
        z5b: ((zones.z5b / count) * 100).toFixed(2),
        z5c: ((zones.z5c / count) * 100).toFixed(2)
    }
}