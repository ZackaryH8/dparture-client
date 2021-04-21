/* Round timeToStation property (seconds) to minutes */
export default function getMinutesToStation(seconds: number) {
    const round = Math.round(seconds / 60);
    if (round === 0) return '      ';
    if (round === 1) return `${round} Min `;
    return `${round} Mins`;
}