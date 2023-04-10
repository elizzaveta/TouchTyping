export function unixToStringYMD(time: number) { // get year/month/day
    const date: Date = new Date(time);
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
}

export function unixToStringHM(time: number) { // get hours:minutes
    const date: Date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
}