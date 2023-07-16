import {lessons_db} from "@/consts/db";

export async function GET(id: string) {
    return lessons_db.find(lesson => lesson.id === id);
}