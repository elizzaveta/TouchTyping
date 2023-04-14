import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './lessonListSkeleton.module.css'

function LessonListSkeleton(props: {numOfLessons: number}) {
    return (
        <div className={styles.wrapper}>
            <Skeleton height={24} className={styles.titlePlaceholder}/>
            <Skeleton count={props.numOfLessons} height={16} className={styles.lessonPlaceholder}/>

        </div>
    );
}

export default LessonListSkeleton;