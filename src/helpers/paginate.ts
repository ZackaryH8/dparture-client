import type * as NRData from '../interfaces/NRData';

export function paginate(array: NRData.SubsequentCallingPoint[], pageSize: number, pageNumber: number) {
    return array.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
}
