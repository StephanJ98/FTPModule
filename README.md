# FTPModule
***
Module designed for the calculation of cardiac parameters and to have the minimum of dependencies with other modules and to be as fast and light as possible.

| Function  |  Parameters |  Return |
|---|---|---|
| `TheoricalMaxHeartRate`  | `age: Number` `gender: {'m', 'f'}`  | `Number`  |
|  `FTPZones` | `age: Number` `gender: {'m', 'f'}`  | `Object: {"zone1": Number,"zone2": Number,"zone3": Number,"zone4": Number,"zone5": Number,"zone6": Number,"zone7": Number,}`  |
| `HeartRateExtractor`  | `file: GPX file from Strava`  | `Array: ['Number', 'Number', 'Number', 'Number', 'Number', 'Number', ...]`  |
| `FTPZone`  | `age: Number` `gender: {'m', 'f'}` `heartRate: Number`  | `String: {zone1, zone2, zone3, zone4, zone5, zone6, zone7}`  |
| `FTPZonesPercentage`  | `age: Number` `gender: {'m', 'f'}` `arr: arr: Array of Numbers from HeartRateExtractor function` | `Object: { z1: Percentage, z2: Percentage, z3: Percentage, z4: Percentage, z5: Percentage, z6: Percentage, z7: Percentage }`  |

***
## Instalation

- NPM: `npm i ftpmodule`
- Yarn: `yarn add ftpmodule`
***

## How to Use
- `TheoricalMaxHeartRate`:
```javascript
const { TheoricalMaxHeartRate } = require('ftpmodule')
console.log(TheoricalMaxHeartRate(23, 'm'))
// Should return 197
```
- `FTPZones`:
```javascript
const { FTPZones } = require('ftpmodule')
console.log(FTPZones(23, 'm'))
/* Should return {
        zone1: '148',
        zone2: '167',
        zone3: '181',
        zone4: '189',
        zone5: '207',
        zone6: '236',
        zone7: '296'
    } */
```
- `HeartRateExtractor`:
```javascript
const fs = require('fs')
const { HeartRateExtractor } = require('ftpmodule')
const data = fs.readFileSync('./file.gpx', 'UTF-8');
console.log(HeartRateExtractor(data))
// Should return a JSON array of number 
```
- `FTPZone`:
```javascript
const { FTPZone } = require('ftpmodule')
console.log(FTPZone(23, 'm', 184))
// Should return zone4
```
- `FTPZonesPercentage`:
```javascript
const fs = require('fs')
const { FTPZonesPercentage, HeartRateExtractor } = require('ftpmodule')
const data = fs.readFileSync('./file.gpx', 'UTF-8')
console.log(FTPZonesPercentage(23, 'm', HeartRateExtractor(data)))
/* Should return {
  z1: '55.27',
  z2: '33.97',
  z3: '9.52', 
  z4: '1.11', 
  z5: '0.13', 
  z6: '0.00', 
  z7: '0.00'  
} */
```
***
