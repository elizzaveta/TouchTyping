'use client'
import React, {useEffect, useState} from 'react';
import {lessonType} from "@/types/lesson-type";
import {getLesson} from "@/app/api/hello/route";
import styles from "./lesson.module.css"
import ProgressBar from "@ramonak/react-progress-bar";

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
    const [totalNumOfWords, setTotalNumOfWords] = useState<number>(1)

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

        setUserInput('');
        setProgress(Progress.NOT_STARTED)
        setCurrentWord(null)
        setNumOfTypedWords(0)
    }, [hash])


    // keydown handlers
    function handleKeydown(e: KeyboardEvent) {
        if (e.code === 'Space') {
            handleSpace(e);
        } else if (e.key === 'Backspace') {
            handleBackSpace(e);
        } else if (e.key === 'Enter') {
            e.preventDefault();
        } else if (e.key.length === 1) {
            setUserInput(prevState => prevState + e.key)
        }
    }

    function handleSpace(e: KeyboardEvent) {
        e.preventDefault()
        setUserInput(prevState => prevState + ' ')
        setNumOfTypedWords(prevState => prevState + 1);
        if (!currentWord) {
            let lessonWords = document.getElementById("lessonText");
            if (lessonWords) setCurrentWord(lessonWords.firstElementChild);
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

        if (!currentWord?.nextElementSibling && progress === Progress.IN_PROGRESS) setProgress(Progress.FINISHED);

        if (currentWord) {
            const userWords = userInput.split(" ").filter(i => i);
            const userWord = userWords[userWords.length - 1];

            if (currentWord.textContent === userWord) currentWord.className = styles.correct;
            else currentWord.className = styles.wrong;

            if (currentWord.nextElementSibling) currentWord.nextElementSibling.className = styles.current;
        }
    }, [currentWord])


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
                        <textarea id="textarea" className={styles.textarea}
                                  onChange={(e) => setUserInput(e.currentTarget.value)} placeholder="Start typing..."
                                  value={userInput} disabled={true}>

                    </textarea>
                    </div>
                </div>
            }
            {
                progress === Progress.FINISHED &&
                <h1>Results</h1>
            }
        </>
    );
}

export default Lesson;