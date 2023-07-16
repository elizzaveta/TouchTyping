import {lessons_db} from "@/consts/db";

export async function GET() {
    return lessons_db;
}