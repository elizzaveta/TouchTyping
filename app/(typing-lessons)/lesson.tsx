'use client'
import React, {useEffect, useState} from 'react';
import {lessonType} from "@/types/lesson-type";
import {getLesson} from "@/app/api/hello/route";
import styles from "./lesson.module.css"

function Lesson() {
    const [hash, setHash] = useState<string>(window.location.hash);
    const [lesson, setLesson] = useState<lessonType>()
    const [currentChild, setCurrentChild] = useState<number>(-1);
    const [finished, setFinished] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>("");



    useEffect(() => {
        let textarea = document.getElementById("textarea");
        if (textarea) {
            textarea.addEventListener("keydown", handleKeydown, true)
            return () => {
                textarea && textarea.removeEventListener("keydown", handleKeydown, true);
            }
        }
    })
    useEffect(() => {
        window.addEventListener('hashchange', () => setHash(window.location.hash));
        return () => {
            window.removeEventListener('hashchange', () => setHash(window.location.hash));
        };
    }, []);

    useEffect(() => {
        (async function () {
            await getLesson(hash.substring(1)).then(data => {
                setLesson(data);
            });
            let textarea = document.getElementById("textarea");
            if(textarea) textarea.value = ''
            setUserInput('');
            setFinished(false)
            setCurrentChild(-1)
        })()
    }, [hash])

    function handleSpace() {
        if (finished) {
            alert("results")
        } else {
            setCurrentChild(prevState => prevState + 1);
        }
    }


    function handleBackSpace(e:KeyboardEvent) {

        if(userInput.substring(userInput.length-1) === ' '){
            e.preventDefault();
            return false;
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.code === 'Space') {
            handleSpace();
        } else if (e.key === 'Backspace') {
            handleBackSpace(e);
        }
    }

    useEffect(() => {
        if(currentChild===-1) return;

        let next = document.getElementById("lessonText");

        if (next) {
            let words = next.getElementsByTagName("span");
            if (words.length - 1 === currentChild) setFinished(true);
            let currWord = words[currentChild];
            let userWord = userInput.split(" ")[userInput.split(" ").length - 1];

            if (currWord.textContent === userWord) {
                currWord.className = styles.correct;
            } else {
                currWord.className = styles.wrong;
            }
        }
    }, [currentChild])

    const handleChange= (event:React.FormEvent<HTMLTextAreaElement>)=>{
        setUserInput(event.currentTarget.value);
    }

    return (
        <>
            {lesson &&
                <div>
                    <h1>{lesson.title}</h1>
                    {lesson.steps &&
                        <div id="lessonText" className={styles.lessonText}>
                            {lesson.steps.map(step => {
                                return step.split(" ").map((word, index) => {
                                    return (
                                        <span key={word + index}>{word}</span>
                                    )
                                })
                            })}
                        </div>
                    }
                    <textarea id="textarea" className={styles.textarea} onChange={handleChange} placeholder="Start typing..."></textarea>
                </div>
            }
        </>
    );
}

export default Lesson;