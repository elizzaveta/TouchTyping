'use client'
import styles from './page.module.css'
import React, {useEffect, useState} from "react";
import LessonsList from "@/app/(typing-lessons)/lessonsList";
import Lesson from "@/app/(typing-lessons)/lesson";
import Link from "next/link";
import {store} from "@/redux/store";
import {Provider} from "react-redux";

export default function Home() {
    const [hash, setHash] = useState<string>()

    useEffect(()=>{
        setHash(window.location.hash.substring(1))
    })

    useEffect(() => {
        window.onhashchange = () => {
            console.log('hash change'+window.location.hash.substring(1));
            setHash(window.location.hash.substring(1));
        }
        return () => {
            window.onhashchange = null;
        }
    },[])

    return (
        <main>
            <Provider store={store}>
            <div className={styles.wrapper}>
                <LessonsList/>
                {hash
                    ? <Lesson/>
                    : <div className={styles.welcomeMessage}>
                        <h1>Welcome to TYPER!</h1>
                        <p>Choose a lesson to practice your touch typing skill and check your typing speed.</p>
                        <p>Or check <Link href='/cheat-sheet'>Touch Typing Cheat Sheet</Link> first.</p>
                    </div>}

                {/*<Test/>*/}
            </div>
            </Provider>

        </main>
    )
}
