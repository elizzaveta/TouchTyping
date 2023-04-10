'use client'
import React, {useEffect, useState} from 'react';
import {lessonType} from "@/types/lesson-type";
import {getLesson} from "@/app/api/hello/route";
import styles from "./lesson.module.css"
import ProgressBar from "@ramonak/react-progress-bar";
import Results from "@/app/(typing-lessons)/results";
import {addResultsToLocalStorage} from "@/functions/localStorage";

enum Progress {
    NOT_STARTED,
    IN_PROGRESS,
    FINISHED
}


function Lesson() {
    const [hash, setHash] = useState<string>(window.location.hash);
    const [lesson, setLesson] = useState<lessonType>()
    const [currentWord, setCurrentWord] = useState<Element | null>();
    const [progress, setProgress] = useState<Progress>(Progress.NOT_STARTED);
    const [userInput, setUserInput] = useState<string>("");
    const [numOfTypedWords, setNumOfTypedWords] = useState<number>(0);
    const [totalNumOfWords, setTotalNumOfWords] = useState<number>(1);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [numOfErrors, setNumOfErrors] = useState<number>(0);

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
            if(!hash) return
            await getLesson(hash.substring(1)).then(data => {
                setLesson(data);
                setTotalNumOfWords(data.steps.join(' ').split(' ').filter((i: string) => i).length)
            });
        })();

        resetLesson()
    }, [hash])
    function resetLesson(){
        setUserInput('');
        setProgress(Progress.NOT_STARTED)
        setCurrentWord(null)
        setNumOfTypedWords(0);
        setNumOfErrors(0)
    }

    // keydown handlers
    function handleKeydown(e: KeyboardEvent) {
        if(progress === Progress.FINISHED){
            e.preventDefault();
            return false;
        }
        if (e.code === 'Space') {
            handleSpace(e);
        } else if (e.key === 'Backspace') {
            handleBackSpace(e);
        } else if (e.key === 'Enter') {
            if(numOfTypedWords+1===totalNumOfWords){
                handleSpace(e);
            }
            e.preventDefault();
        } else if (e.key.length === 1) {
            setUserInput(prevState => prevState + e.key)
        }
    }

    function handleSpace(e: KeyboardEvent) {
        e.preventDefault();
        if(userInput.substring(userInput.length-1, userInput.length)===' ') return false;
        setUserInput(prevState => prevState + ' ')
        setNumOfTypedWords(prevState => prevState + 1);
        if (!currentWord) {
            let lessonWords = document.getElementById("lessonText");
            if (lessonWords) setCurrentWord(lessonWords.firstElementChild);
            setStartTime(new Date().getTime())
        } else {
            setCurrentWord(prevState => prevState?.nextElementSibling);
        }
        // maybe move to timer later ??
        if (progress === Progress.NOT_STARTED) setProgress(Progress.IN_PROGRESS)
    }

    function handleBackSpace(e: KeyboardEvent) {
        if (userInput.substring(userInput.length - 1) !== ' ') {
            setUserInput(prevState => prevState.substring(0, prevState.length - 1))
        }
    }


    // check user input
    useEffect(() => {
        setTimeout(() => { // to scroll next word into view
            currentWord?.nextElementSibling?.scrollIntoView({block: 'center', behavior: 'smooth'})
        }, 0)

        if (!currentWord?.nextElementSibling && progress === Progress.IN_PROGRESS) {
            setProgress(Progress.FINISHED);
            setEndTime(new Date().getTime())

        }

        if (currentWord) {
            const userWords = userInput.split(" ").filter(i => i);
            const userWord = userWords[userWords.length - 1];

            if (currentWord.textContent === userWord) currentWord.className = styles.correct;
            else {
                currentWord.className = styles.wrong;
                setNumOfErrors(prevState => prevState+1)
            }
            if (currentWord.nextElementSibling) currentWord.nextElementSibling.className = styles.current;
        }
    }, [currentWord])

    useEffect(()=>{
        const wpm = parseInt((numOfTypedWords / (((endTime - startTime) / 1000) / 60)).toFixed(0))
        if(progress===Progress.FINISHED) addResultsToLocalStorage(wpm)
    },[progress])

    return (
        <>
            {lesson && lesson.steps && progress !== Progress.FINISHED &&
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>{lesson.title}</h1>
                    {totalNumOfWords && <p>Total num of words: {totalNumOfWords}</p>}
                    <ProgressBar className={styles.progressBar}
                                 completed={numOfTypedWords * 100 / totalNumOfWords}
                                 height='5px'
                                 baseBgColor='white'
                                 bgColor='rgb(205, 234, 192)'
                                 transitionDuration={'1'}
                                 transitionTimingFunction={'linear'}
                                 isLabelVisible={false}/>
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
                            {userInput}<span className={styles.caret}>|</span>
                    </div>
                    </div>
                </div>
            }
            {
                progress === Progress.FINISHED &&
                <div>
                    <Results numOfWords={numOfTypedWords} numOfErrors={numOfErrors} typingTime={endTime - startTime}/>
                    <button className={styles.button} onClick={resetLesson}>Try Again</button>
                </div>
            }
        </>
    );
}

export default Lesson;