export function addResultsToLocalStorage(wpm: number) {
    let localStorage: {time:number, wpm:number}[] = JSON.parse(window.localStorage.getItem("wpm") ?? "[]");
    const time:number = +new Date();
    localStorage.push({time: time, wpm: wpm})
    window.localStorage.setItem("wpm", JSON.stringify(localStorage));
}

export function deleteWPM(time: number){
    let localStorage: {time:number, wpm:number}[] = JSON.parse(window.localStorage.getItem("wpm") ?? "[]");
    const indexOfTargetWPM = localStorage.findIndex((wpm,index)=>wpm.time===time)
    localStorage.splice(indexOfTargetWPM, 1);
    window.localStorage.setItem("wpm",JSON.stringify(localStorage));
}

export function getUserWPM(): {time:number, wpm:number}[]{
    return JSON.parse(window.localStorage.getItem("wpm") ?? "[]")
}

export function getUserStats(): {noHistory:boolean, best?: number, average?: number, numOfAttempts?: number } {
    const localStorage: {time:number, wpm:number}[] = JSON.parse(window.localStorage.getItem("wpm") ?? "[]")
    const wpmValues: number[] = localStorage.map((item)=>item.wpm);

    if (!localStorage || localStorage.length===0) return {
        noHistory: true
    };

    const bestWPM: number = Math.max(...wpmValues);
    const averageWPM: number = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;

    return {
        noHistory: false,
        best: bestWPM,
        average: Math.round(averageWPM),
        numOfAttempts: wpmValues.length
    }
}