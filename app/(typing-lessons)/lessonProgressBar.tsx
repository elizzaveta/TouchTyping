import React from 'react';
import styles from "@/app/(typing-lessons)/lessonProgressBar.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

function LessonProgressBar(props: { completed: number}) {
    return (
        <ProgressBar className={styles.progressBar}
                     completed={props.completed}
                     height='7px'
                     baseBgColor='white'
                     bgColor='rgb(205, 234, 192)'
                     transitionDuration={'0.3s'}
                     transitionTimingFunction={'linear'}
                     isLabelVisible={false}/>
    );
}

export default LessonProgressBar;