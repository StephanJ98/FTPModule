# lthrmodule
***
Module designed for the calculation of cardiac parameters and to have the minimum of dependencies with other modules and to be as fast and light as possible.

| Function  |  Parameters |  Return |
|---|---|---|
| `TheoricalMaxHeartRate`  | `age: Number` `gender: {'m', 'f'}`  | `Number`  |
|  `LTHRZones` | `age: Number` `gender: {'m', 'f'}` `sport: {'c', 'r'}`  | `Object: {"zone1": Number,"zone2": Number,"zone3": Number,"zone4": Number,"zone5": Number}`  |
| `HeartRateExtractor`  | `file: FIT file`  | `Array: ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']`  |
| `SpeedExtractor`  | `file: FIT file`  | `Array: ['Number', 'Number', 'Number', 'Number', 'Number', 'Number']`  |
| `LTHRZone`  | `age: Number` `gender: {'m', 'f'}` `heartRate: Number` `sport: {'c', 'r'}`  | `String: {zone1, zone2, zone3, zone4, zone5}`  |
| `LTHRZonesPercentage`  | `age: Number` `gender: {'m', 'f'}` `sport: {'c', 'r'}` `arr: Array of Numbers from HeartRateExtractor function` | `Object: { z1: Percentage, z2: Percentage, z3: Percentage, z4: Percentage, z5a: Percentage, z5b: Percentage, z5c: Percentage }`  |

***
## Instalation 

- NPM: `npm i lthrmodule`
- Yarn: `yarn add lthrmodule`
- PNPM: `pnpm add lthrmodule`
***

## How to Use
- `TheoricalMaxHeartRate`: Returns a number that is the person's maximum theoretical number of beats per minute
```javascript
const { TheoricalMaxHeartRate } = require('lthrmodule')
console.log(TheoricalMaxHeartRate(23, 'm'))
// Should return 197
```
- `LTHRZones`: Returns a JSON object with the upper bounds heart zones for the user characteristics.
```javascript
const { LTHRZones } = require('lthrmodule')
console.log(LTHRZones(23, 'm'))
```
- `HeartRateExtractor`: Returns an array of numbers with the heart rate for each iteration of time.
```javascript
const fs = require('fs')
const { HeartRateExtractor } = require('lthrmodule')
const data = fs.readFileSync('./file.fit', 'UTF-8');
console.log(HeartRateExtractor(data))
// Should return a JSON array of numbers 
```
- `SpeedExtractor`: Returns an array of numbers with the speed for each time iteration.
```javascript
const fs = require('fs')
const { SpeedExtractor } = require('lthrmodule')
const data = fs.readFileSync('./file.fit', 'UTF-8');
console.log(SpeedExtractor(data))
// Should return a JSON array of numbers 
```
- `LTHRZone`: Returns a string with the heart zone in which the person is located for the given data.
```javascript
const { LTHRZone } = require('lthrmodule')
console.log(LTHRZone(23, 'm', 184))
// Should return zone4
```
- `LTHRZonesPercentage`: Returns a JSON object with the heart zones and the percentage of time the user has been in.
```javascript
const fs = require('fs')
const { LTHRZonesPercentage, HeartRateExtractor } = require('lthrmodule')
const data = fs.readFileSync('./file.fit', 'UTF-8')
console.log(LTHRZonesPercentage(23, 'm', HeartRateExtractor(data)))

```
***

> At this time the only devices compatible are Decathlon HR Dual Band and systems that use the same data names.

> And only cycling and running are available as sports.
