'use client'
import React, {useEffect, useState} from 'react';
import {getLessons} from "@/app/api/hello/route";
import {lessonType, sortedLessonsType} from "@/types/lesson-type";

import styles from "./lessons-list.module.css"
import LessonListBlock from "@/app/(typing-lessons)/lesson-list-block";
import {compareLessonsTitles} from "@/functions/lessonFunctions";


function LessonsList() {
    const [sortedLessons, setSortedLessons] = useState<sortedLessonsType>();
    const [hash, setHash] = useState<string>();

    useEffect(() => {
        setHash(window.location.hash.substring(1))
    })

    useEffect(() => {
        (async function () {
            await getLessons().then(data => {
                setSortedLessons({
                    easy: data.filter((l: lessonType) => l.difficulty === 'easy').sort((a:lessonType, b:lessonType)=>compareLessonsTitles(a, b)),
                    medium: data.filter((l: lessonType) => l.difficulty === 'medium').sort((a:lessonType, b:lessonType)=>compareLessonsTitles(a, b)),
                    hard: data.filter((l: lessonType) => l.difficulty === 'hard').sort((a:lessonType, b:lessonType)=>compareLessonsTitles(a, b))
                })
            });
        })()
    }, [])

    useEffect(() => {
        window.addEventListener('hashchange', () => setHash(window.location.hash.substring(1)));
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1>Lessons</h1>
            {sortedLessons?.easy &&
                <LessonListBlock title='Easy' lessons={sortedLessons.easy} hash={hash}></LessonListBlock>
            }
            {sortedLessons?.medium &&
                <LessonListBlock title='Medium' lessons={sortedLessons.medium} hash={hash}></LessonListBlock>
            }
            {sortedLessons?.hard &&
                <LessonListBlock title='Hard' lessons={sortedLessons.hard} hash={hash}></LessonListBlock>
            }
        </div>
    );
}

export default LessonsList;