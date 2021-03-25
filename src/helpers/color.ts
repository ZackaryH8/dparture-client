import { colors } from '../assets/data/tflColors';

export function getLineBGColor(name: string): string {
    return colors.find((color: any) => color.name === name)?.hex;
};

export function getLineTextColor(name: string): string {
    if (name === 'circle' || name === 'hammersmith-city' || name === 'waterloo-city') return '#282828';
    return '#fff';
};

export function getDistruptionColor(str: string = ''): string {
    if (str === 'Good Service') return '#47b300';
    if (str === 'Minor Delays') return '#ffae00';
    if (str === 'Reduced Service' || str === 'Part Suspended') return '#db6300';
    if (str === 'Planned Closure' || str === 'Severe Delays' || str === 'Part Closure' || str === 'Service Closed') return '#db2c00';
    return '#424242';
}