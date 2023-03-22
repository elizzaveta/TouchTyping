'use client'
import React, {useEffect, useState} from 'react';
import {getLesson} from "@/app/api/hello/route";
import {lessonType} from "@/types/lesson-type";

function Test() {
    const [hash, setHash] = useState<string>(window.location.hash);
    const [lesson, setLesson] = useState<lessonType>()

    useEffect(() => {
        (async function () {
            await getLesson(hash.substring(1)).then(data => {
                setLesson(data);
            });
            let textarea = document.getElementById("textarea");
            if(textarea) {
                // textarea.value = '' // works, but displays error in ide
                textarea.textContent = '' // works incorrectly
            }
        })()
    }, [hash])

    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.ctrlKey && e.key === "k") {
                alert("Ctrl+K")
                e.preventDefault();
            } else if (
                e.key.length === 1 ||
                e.key === "Backspace" ||
                e.key === "Tab"
            ) {
                alert("else")
                e.preventDefault();
            }
        };
        return () => {
            document.onkeydown = null;
        };
    }, []);


    return (
        <div></div>
    );
}

export default Test;