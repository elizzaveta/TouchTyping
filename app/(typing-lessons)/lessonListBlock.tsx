import React from 'react';
import {lessonType} from "@/types/lesson-type";
import styles from "@/app/(typing-lessons)/lessonsList.module.css";

function LessonListBlock(props: {title: string, lessons: lessonType[], hash?:string}) {
    const handleClick = (id: string) => {
        window.location.hash = `${id}`
    }
    return (
        <div className={styles.difficultyBlock}>
            <h2>{props.title}</h2>
            <div className={styles.lessonsList}>
                {props.lessons.map(lesson=>{
                    return(
                        <p key={lesson.id} className={lesson.id===props.hash ? styles.active : ''} onClick={()=>{handleClick(lesson.id)}}>{lesson.title}</p>
                    )
                })}
            </div>
        </div>
    );
}

export default LessonListBlock;