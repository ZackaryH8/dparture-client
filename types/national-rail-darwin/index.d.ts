declare module 'national-rail-darwin' {
    type errRes = (error: boolean, result: Array<object>) => void;

    type GetDepartureBoardOptions = {
        /**
         * The number of services to return in the resulting station board.
         */
        numRows?: number;

        /**
         * The CRS code of either an origin or destination location to filter in.
         */
        filterCrs?: string;

        /**
         * The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to".
         */
        filterType?: 'to' | 'from';

        /**
         * An offset in minutes against the current time to provide the station board for. Between -120 and 120 exclusive. Defaults to 0.
         */
        timeOffset?: number;

        /**
         * How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120.
         */
        timeWindow?: number;
    };

    export default class Rail {
        constructor(text: string, options?: object);

        /**
         * Returns all public departures for the supplied CRS code within a defined time window.
         */
        getDepartureBoard(crs: string, options: GetDepartureBoardOptions, cb: errRes);
        getArrivalsBoard(crs: string, options: object, cb: errRes);
        getArrivalsBoardWithDetails(crs: string, options: object, cb: errRes);
        getArrivalsDepartureBoard(crs: string, options: object, cb: errRes);
        getArrivalsDepartureBoardWithDetails(crs: string, options: object, cb: errRes);
        getServiceDetails(crs: string, options: object, cb: errRes);

        getNextDeparture(crs: string, destinationCrs: string, options: object, cb: errRes);
        getNextDepartureWithDetails(crs: string, destinationCrs: string, options: object, cb: errRes);
        getDepartureBoardWithDetails(crs: string, options: object, cb: errRes);
        getFastestDeparture(crs: string, destinationCrs: string, options: object, cb: errRes);
        getFastestDepartureWithDetails(crs: string, destinationCrs: string, options: object, cb: errRes);
    }
}
