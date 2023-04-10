'use client'
import React, {useState} from "react";
import Plot from "@/app/progress/(components)/plot";
import Stats from "@/app/progress/(components)/stats";
import styles from "./page.module.css"

export default function Progress() {
    const [counter, setCounter] = useState<number>(0);

    const updateCounter = () => setCounter(counter+1);

    return (
        <>
            <h1 className={styles.title}>Your Progress</h1>
            <div className={styles.wrapper}>
                <Plot counter={counter}/>
                <Stats callback={updateCounter}  counter={counter}/>
            </div>
        </>
    )
}
