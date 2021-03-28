export interface CurrentStation {
    trainServices: TrainService[];
    locationInfo: LocationInfo;
}

export interface LocationInfo {
    messages: string[];
    name: string;
    crs: string;
}

export interface TrainService {
    std: string;
    etd: string;
    platform: string;
    operator: string;
    operatorCode: string;
    delayReason?: string;
    serviceId: string;
    rsid: string;
    origin: Origin;
    destination: Destination;
    subsequentCallingPoints: SubsequentCallingPoint[];
    currentPage: number;
    totalPages: number;
    length?: string;
}

export interface Destination {
    name: string;
    crs: string;
    via?: string;
}

export interface Origin {
    name: string;
    crs: string;
}

export interface SubsequentCallingPoint {
    locationName: string;
    crs: string;
    st: string;
    et: string;
    length?: string;
}
