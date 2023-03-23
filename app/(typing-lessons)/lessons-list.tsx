'use client'
import React, {useEffect, useState} from 'react';
import {getLessons} from "@/app/api/hello/route";
import {lessonType} from "@/types/lesson-type";

import styles from "./lessons-list.module.css"

type sortedLessonsType = {
    easy: lessonType[],
    medium: lessonType[],
    hard: lessonType[]
}

function LessonsList() {
    const [sortedLessons, setSortedLessons] = useState<sortedLessonsType>();
    const [hash, setHash] = useState<string>();

    useEffect(()=>{
        setHash(window.location.hash.substring(1))
    })

    useEffect(() => {
        (async function () {
            await getLessons().then(data => {
                setSortedLessons({
                    easy: data.filter((l: lessonType) => l.difficulty === 'easy'),
                    medium: data.filter((l: lessonType) => l.difficulty === 'medium'),
                    hard: data.filter((l: lessonType) => l.difficulty === 'hard')
                })
            });
        })()

    }, [])
    useEffect(()=>{
        window.addEventListener('hashchange', ()=>setHash(window.location.hash.substring(1)));
    },[])




    const handleClick = (id:string)=>{
        window.location.hash = `${id}`
    }

    return (
        <div className={styles.wrapper}>
            <h1>Lessons</h1>
            {sortedLessons?.easy &&
                <div className={styles.difficultyBlock}>
                    <h2>Easy</h2>
                    <div className={styles.lessonsList}>
                        {sortedLessons.easy.map(lesson=>{
                            return(
                                <p key={lesson.id} className={lesson.id===hash ? styles.active : ''} onClick={()=>{handleClick(lesson.id)}}>{lesson.title}</p>
                            )
                        })}
                    </div>
                </div>
            }
            {sortedLessons?.medium &&
                <div className={styles.difficultyBlock}>
                    <h2>Medium</h2>
                    <div className={styles.lessonsList}>
                        {sortedLessons.medium.map(lesson=>{
                            return(
                                <p key={lesson.id} className={lesson.id===hash ? styles.active : ''} onClick={()=>{handleClick(lesson.id)}}>{lesson.title}</p>
                            )
                        })}
                    </div>
                </div>
            }
            {sortedLessons?.hard &&
                <div className={styles.difficultyBlock}>
                    <h2>Hard</h2>
                    <div className={styles.lessonsList}>
                        {sortedLessons.hard.map(lesson=>{
                            return(
                                <p key={lesson.id} className={lesson.id===hash ? styles.active : ''} onClick={()=>{handleClick(lesson.id)}}>{lesson.title}</p>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default LessonsList;