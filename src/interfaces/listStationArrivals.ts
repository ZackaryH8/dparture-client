export interface Timing {
    $type: string;
    countdownServerAdjustment: string;
    source: Date;
    insert: Date;
    read: Date;
    sent: Date;
    received: Date;
}

export interface Service {
    $type: string;
    id: string;
    operationType: number;
    vehicleId: string;
    naptanId: string;
    stationName: string;
    lineId: string;
    lineName: string;
    platformName: string;
    direction: string;
    bearing: string;
    destinationNaptanId: string;
    destinationName: string;
    timestamp: Date;
    timeToStation: number;
    currentLocation: string;
    towards: string;
    expectedArrival: Date;
    timeToLive: Date;
    modeName: string;
    timing: Timing;
}

type Root = Record<string, Record<string, Service[]>>

export default Root