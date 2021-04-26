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

exports.FTPZones = (age, gender) => {
    let maxHeartRate = this.TheoricalMaxHeartRate(age, gender)
    let zones = {
        "zone1": (maxHeartRate * 0.75).toFixed(0),
        "zone2": (maxHeartRate * 0.85).toFixed(0),
        "zone3": (maxHeartRate * 0.92).toFixed(0),
        "zone4": (maxHeartRate * 0.96).toFixed(0),
        "zone5": (maxHeartRate * 1.05).toFixed(0),
        "zone6": (maxHeartRate * 1.2).toFixed(0),
        "zone7": (maxHeartRate * 1.5).toFixed(0),
    }
    return zones
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

exports.FTPZone = (age, gender, heartRate) => {
    let maxHeartRate = this.TheoricalMaxHeartRate(age, gender)
    if (heartRate <= (maxHeartRate * 0.75)) {
        return 'zone1'
    } else if ((heartRate > (maxHeartRate * 0.75)) && (heartRate <= (maxHeartRate * 0.85))) {
        return 'zone2'
    } else if ((heartRate > (maxHeartRate * 0.85)) && (heartRate <= (maxHeartRate * 0.92))) {
        return 'zone3'
    } else if ((heartRate > (maxHeartRate * 0.92)) && (heartRate <= (maxHeartRate * 0.96))) {
        return 'zone4'
    } else if ((heartRate > (maxHeartRate * 0.96)) && (heartRate <= (maxHeartRate * 1.05))) {
        return 'zone5'
    } else if ((heartRate > (maxHeartRate * 1.05)) && (heartRate <= (maxHeartRate * 1.2))) {
        return 'zone6'
    } else if ((heartRate > (maxHeartRate * 1.2))) {
        return 'zone7'
    }
}

exports.FTPZonesPercentage = (age, gender, arr) => {
    let zones = {
        z1: 0,
        z2: 0,
        z3: 0,
        z4: 0,
        z5: 0,
        z6: 0,
        z7: 0
    }
    let count = 0
    arr.forEach(elem => {
        zone = this.FTPZone(age, gender, elem)
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
            case 'zone5':
                zones.z5 = zones.z5 + 1
                count++
                break;
            case 'zone6':
                zones.z6 = zones.z6 + 1
                count++
                break;
            case 'zone7':
                zones.z7 = zones.z7 + 1
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
        z5: ((zones.z5 / count) * 100).toFixed(2),
        z6: ((zones.z6 / count) * 100).toFixed(2),
        z7: ((zones.z7 / count) * 100).toFixed(2)
    }
}