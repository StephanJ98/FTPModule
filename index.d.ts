export declare const TheoricalMaxHeartRate: (age: number, gender: any) => number;
export declare const HeartRateExtractor: (file: any) => any[] | undefined;
export declare const LTHRZones: (age: any, gender: any, sport: any) => {
    zone1: string;
    zone2: string;
    zone3: string;
    zone4: string;
    zone5: string;
} | undefined;
export declare const LTHRZone: (age: any, gender: any, heartRate: number, sport: any) => "zone1" | "zone2" | "zone3" | "zone4" | "zone5" | undefined;
export declare const LTHRZonesPercentage: (age: any, gender: any, sport: any, arr: any[]) => {
    z1: string;
    z2: string;
    z3: string;
    z4: string;
    z5: string;
};
export declare const SpeedExtractor: (file: {
    buffer: any;
}) => number[];
