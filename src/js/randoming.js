// random number
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

// get random number
export function getRandomElem(list) {
    if (list.length) {
        return list[getRandomInt(0, list.length - 1)];
    };
};

export function getRandomKey(dic) {
    const list = [];
    for (let key in dic) {
        list.push(key);
    };
    return list[getRandomInt(0, list.length - 1)];
}