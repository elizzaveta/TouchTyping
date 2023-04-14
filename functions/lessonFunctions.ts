import {lessonType} from "@/types/lesson-type";

export const compareLessonsTitles = (a: lessonType, b: lessonType) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)