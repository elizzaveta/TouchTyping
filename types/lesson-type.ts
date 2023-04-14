export type lessonType = {
    "title": string,
    category: string,
    difficulty: string,
    hasCompleted: boolean,
    steps: string[],
    id: string,
    numOfWords?: number
}

export type sortedLessonsType = {
    easy: lessonType[],
    medium: lessonType[],
    hard: lessonType[]
}