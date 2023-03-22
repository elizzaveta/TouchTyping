'use client'
import styles from './page.module.css'
import React, {useEffect, useState} from "react";
import LessonsList from "@/app/(typing-lessons)/lessons-list";
import Lesson from "@/app/(typing-lessons)/lesson";
import Test from "@/app/(typing-lessons)/test";
import Link from "next/link";

export default function Home() {
    const [hash, setHash] = useState<string>(window.location.hash.substring(1))
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
            <div className={styles.wrapper}>
                <LessonsList/>
                {hash
                    ? <Lesson/>
                    : <div>
                        <h1>Welcome to TYPER!</h1>
                        <p>Choose a lesson from the list to practice your touch typing skill.</p>
                        <p>Or check <Link href='/cheat-sheet'>Touch Typing Cheat Sheet</Link> first.</p>
                    </div>}

                {/*<Test/>*/}
            </div>
        </main>
    )
}
