export function getOperatorName(opName: string): string {
    if (opName === 'East Midlands Railway') return 'EMR';
    if (opName === 'London North Eastern Railway') return 'LNER';
    if (opName === 'South Western Railway') return 'SWR';
    return opName;
}
