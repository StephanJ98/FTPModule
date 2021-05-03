# fthrmodule
***
Module designed for the calculation of cardiac parameters and to have the minimum of dependencies with other modules and to be as fast and light as possible.

| Function  |  Parameters |  Return |
|---|---|---|
| `TheoricalMaxHeartRate`  | `age: Number` `gender: {'m', 'f'}`  | `Number`  |
|  `FTHRZones` | `age: Number` `gender: {'m', 'f'}` `sport: {'c', 'r'}`  | `Object: {"zone1": Number,"zone2": Number,"zone3": Number,"zone4": Number,"zone5a": Number,"zone5b": Number,"zone5c": Number,}`  |
| `HeartRateExtractor`  | `file: GPX file from Strava`  | `Array: ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']`  |
| `FTHRZone`  | `age: Number` `gender: {'m', 'f'}` `heartRate: Number` `sport: {'c', 'r'}`  | `String: {zone1, zone2, zone3, zone4, zone5a, zone5b, zone5c}`  |
| `FTHRZonesPercentage`  | `age: Number` `gender: {'m', 'f'}` `sport: {'c', 'r'}` `arr: Array of Numbers from HeartRateExtractor function` | `Object: { z1: Percentage, z2: Percentage, z3: Percentage, z4: Percentage, z5a: Percentage, z5b: Percentage, z5c: Percentage }`  |

***
## Instalation

- NPM: `npm i fthrmodule`
- Yarn: `yarn add fthrmodule`
***

## How to Use
- `TheoricalMaxHeartRate`:
```javascript
const { TheoricalMaxHeartRate } = require('fthrmodule')
console.log(TheoricalMaxHeartRate(23, 'm'))
// Should return 197
```
- `FTHRZones`:
```javascript
const { FTHRZones } = require('fthrmodule')
console.log(FTHRZones(23, 'm'))
/* Should return {
        zone1: '148',
        zone2: '167',
        zone3: '181',
        zone4: '189',
        zone5a: '207',
        zone5b: '236',
        zone5c: '296'
    } */
```
- `HeartRateExtractor`:
```javascript
const fs = require('fs')
const { HeartRateExtractor } = require('fthrmodule')
const data = fs.readFileSync('./file.gpx', 'UTF-8');
console.log(HeartRateExtractor(data))
// Should return a JSON array of number 
```
- `FTHRZone`:
```javascript
const { FTHRZone } = require('fthrmodule')
console.log(FTHRZone(23, 'm', 184))
// Should return zone4
```
- `FTHRZonesPercentage`:
```javascript
const fs = require('fs')
const { FTHRZonesPercentage, HeartRateExtractor } = require('fthrmodule')
const data = fs.readFileSync('./file.gpx', 'UTF-8')
console.log(FTHRZonesPercentage(23, 'm', HeartRateExtractor(data)))
/* Should return {
  z1: '55.27',
  z2: '33.97',
  z3: '9.52', 
  z4: '1.11', 
  z5a: '0.13', 
  z5b: '0.00', 
  z5c: '0.00'  
} */
```
***

> At this time the only devices compatible are Decathlon HR Dual Band and systems that use the same data names.

> And only cycling and running are available as sports.
