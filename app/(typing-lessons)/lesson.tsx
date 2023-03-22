'use client'
import React, {useEffect, useState} from 'react';
import {lessonType} from "@/types/lesson-type";
import {getLesson} from "@/app/api/hello/route";
import styles from "./lesson.module.css"

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
            });
        })();

        setUserInput('');
        setProgress(Progress.NOT_STARTED)
        setCurrentWord(null)
    }, [hash])


    // keydown handlers
    function handleKeydown(e: KeyboardEvent) {
        if (e.code === 'Space') {
            handleSpace();
        } else if (e.key === 'Backspace') {
            handleBackSpace(e);
        } else if (e.key === 'Enter') {
            e.preventDefault();
        } else if (e.key.length === 1) {
            setUserInput(prevState => prevState + e.key)
        }
    }

    function handleSpace() {
        setUserInput(prevState => prevState + ' ')
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

            if(currentWord.nextElementSibling) currentWord.nextElementSibling.className = styles.current;
        }
    }, [currentWord])


    return (
        <>
            {lesson && lesson.steps && progress !== Progress.FINISHED &&
                <div>
                    <h1>{lesson.title}</h1>
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
            }
            {
                progress === Progress.FINISHED &&
                <h1>Results</h1>
            }
        </>
    );
}

export default Lesson;