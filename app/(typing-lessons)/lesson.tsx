'use client'
import React, {useEffect, useState} from 'react';
import {lessonType} from "@/types/lesson-type";
import {getLesson} from "@/app/api/hello/route";
import ProgressBar from "@ramonak/react-progress-bar";
import Results from "@/app/(typing-lessons)/results";
import {addResultsToLocalStorage} from "@/functions/localStorage";
import {Progress} from "@/app/enums/ProgressEnum";
import styles from "./lesson.module.css"
import {
    addToUserInput, backspaceUserInput,
    incrementNumOfErrors,
    incrementNumOfTypedWords, resetNumOfErrors,
    resetNumOfTypedWords, resetState, resetUserInput,
    selectLesson, setEndTime, setProgress, setStartTime, setTotalNumOfWords
} from "@/app/redux/lessonSlice";
import {useDispatch, useSelector} from "react-redux";
import LessonProgressBar from "@/app/(typing-lessons)/lessonProgressBar";

function Lesson() {
    const currentLesson = useSelector(selectLesson);
    const dispatch = useDispatch();

    const [hash, setHash] = useState<string>(window.location.hash);
    const [lesson, setLesson] = useState<lessonType>()
    const [currentWord, setCurrentWord] = useState<Element | null>();

    // event listeners
    useEffect(() => {
        document.onkeydown = (e) => handleKeydown(e);
        window.onhashchange = () => setHash(window.location.hash);
        return () => {
            window.onhashchange = null;
            document.onkeydown = null
        };
    });

    // hash change
    useEffect(() => {
        (async function () {
            await getLesson(hash.substring(1)).then(data => {
                setLesson(data);
                dispatch(setTotalNumOfWords(data.steps.join(' ').split(' ').filter((i: string) => i).length))
            });
        })();
        resetLesson()
    }, [hash])

    function resetLesson() {
        dispatch(resetState())
        setCurrentWord(null)
    }

    // keydown handlers
    function handleKeydown(e: KeyboardEvent) {
        if (currentLesson.progress === Progress.FINISHED) {
            e.preventDefault();
            return false;
        }

        if (e.code === 'Space') {
            handleSpace(e);
        } else if (e.key === 'Backspace') {
            handleBackSpace();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentLesson.numOfTypedWords + 1 === currentLesson.totalNumOfWords) {
                handleSpace(e);
            }
        } else if (e.key.length === 1) {
            if(currentLesson.userInput === '') dispatch(setStartTime(new Date().getTime()))
            dispatch(addToUserInput(e.key))
        }
    }

    function handleSpace(e: KeyboardEvent) {
        e.preventDefault();

        if (currentLesson.userInput.substring(currentLesson.userInput.length - 1, currentLesson.userInput.length) === ' ') return false;
        dispatch(addToUserInput(' '))
        dispatch(incrementNumOfTypedWords())

        if (!currentWord) {
            let lessonWords = document.getElementById("lessonText");
            if (lessonWords) setCurrentWord(lessonWords.firstElementChild);
        } else {
            setCurrentWord(prevState => prevState?.nextElementSibling);
        }
        if (currentLesson.progress === Progress.NOT_STARTED) dispatch(setProgress(Progress.IN_PROGRESS))
    }

    function handleBackSpace() {
        if (currentLesson.userInput.substring(currentLesson.userInput.length - 1) !== ' ') {
            dispatch(backspaceUserInput())
        }
    }


    // check user input
    useEffect(() => {
        setTimeout(() => { // to scroll next word into view
            currentWord?.nextElementSibling?.scrollIntoView({block: 'center', behavior: 'smooth'})
        }, 0)

        if (!currentWord?.nextElementSibling && currentLesson.progress === Progress.IN_PROGRESS) {
            dispatch(setProgress(Progress.FINISHED));
            dispatch(setEndTime(new Date().getTime()))
        }

        if (currentWord) {
            const userWords = currentLesson.userInput.split(" ").filter(i => i);
            const userWord = userWords[userWords.length - 1];

            if (currentWord.textContent === userWord) currentWord.className = styles.correct;
            else {
                currentWord.className = styles.wrong;
                dispatch(incrementNumOfErrors())
            }
            if (currentWord.nextElementSibling) currentWord.nextElementSibling.className = styles.current;
        }
    }, [currentWord])

    useEffect(() => {
        if (currentLesson.progress === Progress.FINISHED){
            const wpm = parseInt((currentLesson.numOfTypedWords / (((currentLesson.endTime - currentLesson.startTime) / 1000) / 60)).toFixed(0))
            addResultsToLocalStorage(wpm)
        }
    }, [currentLesson.progress])

    return (
        <>
            {lesson && lesson.steps && currentLesson.progress !== Progress.FINISHED &&
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>{lesson.title}</h1>
                    <LessonProgressBar completed={currentLesson.numOfTypedWords * 100 / currentLesson.totalNumOfWords}/>
                    <div>
                        <div id="lessonText" className={styles.lessonText}>
                            {lesson.steps.map(step => {
                                return step.split(" ").map((word, index) => {
                                    return (
                                        <span key={word + index}>{word}</span>
                                    )
                                })
                            })}
                        </div>
                        <div id="textarea" className={styles.textarea}>
                            {currentLesson.userInput}<span className={styles.caret}>|</span>
                        </div>
                    </div>
                    {currentLesson.totalNumOfWords && <p>Total num of words: {currentLesson.totalNumOfWords}</p>}

                </div>
            }
            {
                currentLesson.progress === Progress.FINISHED &&
                <div>
                    <Results numOfWords={currentLesson.numOfTypedWords} numOfErrors={currentLesson.numOfErrors} typingTime={currentLesson.endTime - currentLesson.startTime}/>
                    <button className={styles.button} onClick={resetLesson}>Try Again</button>
                </div>
            }
        </>
    );
}

export default Lesson;