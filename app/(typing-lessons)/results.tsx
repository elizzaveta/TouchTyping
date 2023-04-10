import React from 'react';
import styles from "./results.module.css"
import {addResultsToLocalStorage} from "@/functions/localStorage";

function Results(props: { numOfWords: number, numOfErrors: number, typingTime: number }) {
    const wpm: string = (props.numOfWords / (((props.typingTime) / 1000) / 60)).toFixed(0);
    // addResultsToLocalStorage(wpm);
    return (
        <div className={styles.wrapper}>
            <h1>Results</h1>
            <p className={styles.wpmBlock}>Your typing speed is <b className={styles.wpmAccent}>{wpm} wmp</b> (words per minute)</p>
            <b></b>
            <p>Typing time: {(props.typingTime) / 1000}s</p>
            <p>Total words: {props.numOfWords}</p>
            <p>Num of errors: {props.numOfErrors}</p>
        </div>
    );
}

export default Results;