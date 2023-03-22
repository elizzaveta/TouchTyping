import React from 'react';
import allFingersPositions from "../../assets/images/Finger positions.png"
import leftHandStartingPositions from "../../assets/images/Left Hand Starting Positions.png"
import rightHandStartingPositions from "../../assets/images/Right Hand Starting Positions.png"
import Image from "next/image";
import styles from "./page.module.css"

function CheatSheet() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.hintBlock}>
                <h1>Touch Typing Cheat Sheet</h1>
                <Image src={allFingersPositions} className={styles.mainImage} alt='Touch Typing Fingers Positions'/>

            </div>
            <div className={styles.hintBlock}>
                <h2>Starting Positions</h2>
                <div className={styles.fingerPositionsWrapper}>
                    <Image src={leftHandStartingPositions} className={styles.startingPositionsImage} alt='Touch Typing Left Hand Starting Positions'></Image>
                    <Image src={rightHandStartingPositions} className={styles.startingPositionsImage} alt='Touch Typing Right Hand Starting Positions'></Image>
                </div>
            </div>
            <div className={styles.hintBlock}>
                <h2>Tips</h2>
                <div className={styles.tip}>
                    <h3>F and J Indication</h3>
                    <p>There are small little markers on keys F and J. Every keyboard will have it. The purpose of having those markers is to <b>place your hands on them without looking at keyboard</b>.</p>
                </div>
                <div className={styles.tip}>
                    <h3>Don't Look!</h3>
                    <p>An important aspect is not to look at the keyboard while typing. This helps in <b>registering key positions in your subconscious mind</b>.</p>
                </div>
                <div className={styles.tip}>
                    <h3>Practice Is the Key</h3>
                    <p>In learning to type, it all boils down to three points:</p>
                    <dl>
                        <dt>- Practice</dt>
                        <dt>- Practice some more</dt>
                        <dt>- And then practice some more</dt>
                    </dl>
                </div>
                <div className={styles.tip}>
                    <h3>Use all fingers</h3>
                    <p>Practice using all of your fingers and all of the keys.</p>
                </div>
                <div className={styles.tip}>
                    <h3>Set a typing goal</h3>
                    <p>For instance, you might currently type at 30wpm but you wish to reach ~60wpm. Keep accuracy goals in mind as you progress.</p>
                </div>
            </div>
        </div>
    );
}

export default CheatSheet;