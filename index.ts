export const TheoricalMaxHeartRate = (age: number, gender: any) => {
    switch (String(gender).toLocaleLowerCase()) {
        case 'm':
            return 220 - age
        case 'f':
            return 226 - age
        default:
            return 223 - age
    }
}

export const HeartRateExtractor = async (contenido: string) => {
    try {
        const fitDecoder = require('fit-decoder')
        const data = new TextEncoder().encode(contenido)
        
        const json = fitDecoder.parseRecords(fitDecoder.fit2json(data.buffer));
        const hrArray = fitDecoder.getRecordFieldValue(json, 'record', 'heart_rate');
        let arr: number[] = [];
        hrArray.forEach((elem: number | undefined) => {
            if (elem != undefined)
                arr.push(elem);
        })
        
        return arr;
    }
    catch (error) {
        console.log(error);
    }
}

export const LTHRZones = (age: any, gender: any, sport: any) => {
    let maxHeartRate = TheoricalMaxHeartRate(age, gender)
    if (String(sport).toLocaleLowerCase() === 'c') {
        return {
            "zone1": (maxHeartRate * 0.56).toFixed(0),
            "zone2": (maxHeartRate * 0.66).toFixed(0),
            "zone3": (maxHeartRate * 0.75).toFixed(0),
            "zone4": (maxHeartRate * 0.85).toFixed(0),
            "zone5": (maxHeartRate).toFixed(0)
        }
    } else if (String(sport).toLocaleLowerCase() === 'r') {
        return {
            "zone1": (maxHeartRate * 0.58).toFixed(0),
            "zone2": (maxHeartRate * 0.68).toFixed(0),
            "zone3": (maxHeartRate * 0.77).toFixed(0),
            "zone4": (maxHeartRate * 0.87).toFixed(0),
            "zone5": (maxHeartRate).toFixed(0)
        }
    } else {
        console.log('Error: Sport not found.')
        console.log('Sports available are [c] for cycling or [r] for running.')
    }
}

export const LTHRZone = (age: any, gender: any, heartRate: number, sport: any) => {
    let maxHeartRate = TheoricalMaxHeartRate(age, gender)
    if (String(sport).toLocaleLowerCase() === 'c') {
        if (heartRate < (maxHeartRate * 0.56)) {
            return 'zone1'
        } else if ((heartRate >= (maxHeartRate * 0.56)) && (heartRate <= (maxHeartRate * 0.66))) {
            return 'zone2'
        } else if ((heartRate > (maxHeartRate * 0.66)) && (heartRate <= (maxHeartRate * 0.75))) {
            return 'zone3'
        } else if ((heartRate > (maxHeartRate * 0.75)) && (heartRate <= (maxHeartRate * 0.85))) {
            return 'zone4'
        } else if (heartRate > (maxHeartRate * 0.85)) {
            return 'zone5'
        }
    } else if (String(sport).toLocaleLowerCase() === 'r') {
        if (heartRate < (maxHeartRate * 0.56)) {
            return 'zone1'
        } else if ((heartRate >= (maxHeartRate * 0.58)) && (heartRate <= (maxHeartRate * 0.68))) {
            return 'zone2'
        } else if ((heartRate > (maxHeartRate * 0.68)) && (heartRate <= (maxHeartRate * 0.77))) {
            return 'zone3'
        } else if ((heartRate > (maxHeartRate * 0.77)) && (heartRate <= (maxHeartRate * 0.87))) {
            return 'zone4'
        } else if (heartRate > (maxHeartRate * 0.87)) {
            return 'zone5'
        }
    } else {
        console.log('Error: Sport not found.')
        console.log('Sports available are [c] for cycling and [r] for running.')
    }
}

export const LTHRZonesPercentage = (age: any, gender: any, sport: any, arr: any[]) => {
    let zones = {
        z1: 0,
        z2: 0,
        z3: 0,
        z4: 0,
        z5: 0
    }
    let count = 0
    arr.forEach((elem: any) => {
        let zone = LTHRZone(age, gender, elem, sport)
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
        z5: ((zones.z5 / count) * 100).toFixed(2)
    }
}


export const SpeedExtractor = (file: { buffer: any }): number[] => {
    try {
        const fitDecoder = require('fit-decoder')
        const data = file.buffer
        const json = fitDecoder.parseRecords(fitDecoder.fit2json(data))
        const array = fitDecoder.getRecordFieldValue(json, 'record', 'speed')

        const arr: number[] = []
        array.forEach((elem: number | undefined) => {
            if (elem !== undefined) arr.push(Number((elem * 3.87).toFixed(1)))
        })

        return arr
    } catch (error) {
        console.log(error)
        return []
    }
}

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