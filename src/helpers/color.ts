import { colors } from '../assets/data/tflColors';

export const getLineBGColor = (name: string): string => {
    return colors.find((color: any) => color.name === name)?.hex;
};

export const getLineTextColor = (name: string): string => {
    if (name === 'circle' || name === 'hammersmith-city' || name === 'waterloo-city') return '#282828';
    return '#fff';
};