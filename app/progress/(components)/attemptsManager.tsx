'use client'
import React, {useEffect, useState} from 'react';
import {deleteWPM, getUserWPM} from "@/functions/localStorage";
import styles from "./attemptsManager.module.css"
import {unixToStringHM, unixToStringYMD} from "@/functions/unixTimeConverter";

function AttemptsManager(props: { callback: () => void }) {
    const [userWPM, setUserWPM] = useState<{ time: number, wpm: number }[]>();
    const [toggleAttempts, setToggleAttempts] = useState<boolean>(true);

    useEffect(() => {
        setUserWPM(getUserWPM());
    }, [])

    function handleDelete(event: React.MouseEvent<HTMLElement>, time: number) {
        const targetElement: HTMLElement | null = document.getElementById(time.toString());
        if (targetElement) {
            deleteWPM(time);
            props.callback();
            setUserWPM(userWPM?.filter((wpm:{time:number, wpm: number})=>{
                return wpm.time!=time;
            }));
        }
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={() => setToggleAttempts(!toggleAttempts)}>Manage Attempts
            </button>
            {!toggleAttempts && userWPM &&
                <div className={styles.floatMenu}>
                    <div className={styles.nav}>
                        <p>Manage Attempts</p>
                        <p className={styles.closeIcon} onClick={() => setToggleAttempts(!toggleAttempts)}>Close</p>
                    </div>
                    <div className={styles.wpmContainer}>
                        {userWPM.map((wpm: { time: number, wpm: number }) => {
                            return <div className={styles.wpmItem} key={wpm.time} id={(wpm.time).toString()}>
                                <p className={styles.attemptDate}>{unixToStringYMD(wpm.time)} {unixToStringHM(wpm.time)}</p>
                                <p className={styles.wpmValue}>{wpm.wpm} wpm</p>
                                <button className={styles.deleteAttemptButton}
                                        onClick={(e) => handleDelete(e, wpm.time)}>Delete
                                </button>
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default AttemptsManager;