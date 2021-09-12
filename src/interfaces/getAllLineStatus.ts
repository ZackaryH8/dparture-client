export interface ValidityPeriod {
    $type: string;
    fromDate: Date;
    toDate: Date;
    isNow: boolean;
}

export interface Disruption {
    $type: string;
    category: string;
    categoryDescription: string;
    description: string;
    additionalInfo: string;
    created: Date;
    affectedRoutes: any[];
    affectedStops: any[];
    closureText: string;
}

export interface LineStatus {
    $type: string;
    id: number;
    lineId: string;
    statusSeverity: number;
    statusSeverityDescription: string;
    reason: string;
    created: Date;
    validityPeriods: ValidityPeriod[];
    disruption: Disruption;
}

export interface ServiceType {
    $type: string;
    name: string;
    uri: string;
}

export interface Crowding {
    $type: string;
}

export interface Root {
    $type: string;
    id: string;
    name: string;
    modeName: string;
    disruptions: any[];
    created: Date;
    modified: Date;
    lineStatuses: LineStatus[];
    routeSections: any[];
    serviceTypes: ServiceType[];
    crowding: Crowding;
}


export default Root;

