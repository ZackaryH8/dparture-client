/* Uhh... it works?*/
export function groupBy2PropertiesDesc(arr: any[]) {
    const mainFilter = 'lineId';
    const secFilter = 'platformName';
    const result = arr.reduce(function (map, obj) {
        let f1 = (map[obj[mainFilter]] = map[obj[mainFilter]] || {});

        if (Object.prototype.toString.call(obj[secFilter]) === '[object Array]') {
            for (let idx in obj[secFilter]) {
                let f2 = (f1[obj[secFilter][idx]] = f1[obj[secFilter][idx]] || []);
                f2.push(obj);
            }
        } else {
            let f2 = (f1[obj[secFilter]] = f1[obj[secFilter]] || []);
            f2.push(obj);
        }

        return map;
    }, Object.create(null));

    for (const key of Object.values(result)) {
        const platforms = Object.values(key);
        platforms.forEach((platform) => {
            platform.sort((a: { timeToStation: number }, b: { timeToStation: number }) => a.timeToStation - b.timeToStation);
        });
    }

    return result;
};