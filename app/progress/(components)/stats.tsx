'use client'
import React, {useEffect, useState} from 'react';
import {getUserStats} from "@/functions/localStorage";
import AttemptsManager from "@/app/progress/(components)/attemptsManager";
import TestDev from "@/app/progress/(components)/(test-dev)/testDev";
import styles from './stats.module.css'

function Stats(props: { callback: () => void, counter: number }) {
    const [stats, setStats] = useState<{
        noHistory: boolean,
        best?: number,
        average?: number,
        numOfAttempts?: number
    }>();


    useEffect(() => {
        setStats(getUserStats());
    }, [props.counter])

    return (
        <>
            {stats?.noHistory
                ? <div className={styles.wrapper}>
                    <p className={styles.infoMessage}>Complete at least one lesson to view statistics</p>
            </div>
                : <div className={styles.wrapper}>
                    <h2>Statistics</h2>
                    <p>Best speed: <span className={styles.accentText}>{stats?.best} wpm</span></p>
                    <p>Average speed: <span className={styles.accentText}>{stats?.average} wpm</span></p>
                    <p>Total num of attempts: <span className={styles.accentText}>{stats?.numOfAttempts}</span></p>
                    <AttemptsManager callback={props.callback}/>

                </div>
            }
            {/*<TestDev/>*/}
        </>
    );
}

export default Stats;