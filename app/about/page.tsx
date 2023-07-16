import styles from "./page.module.css"

export default function About() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>About this site</h1>
            <h2>Idea</h2>
            <p>Website is created for learning purposes: to practice NextJS. It is a Touch Typing Practice tool.</p>
            <h2>Technologies</h2>
            <ul>
                <li>ReactJS</li>
                <li>TypeScript</li>
                <li>NextJS 13</li>
                <li>Redux</li>
                <li>CSS Modules</li>
                <li>LocalStorage</li>
            </ul>
            <h2>Features</h2>
            <ul>
                <li>Touch Typing Practice</li>
                <ul>
                    <li>Lessons of different difficulty levels</li>
                    <li>Calculation of typing speed and num of typing errors</li>
                </ul>
                <li>Progress Tracking</li>
                <ul>
                    <li>User's typing results are saved</li>
                    <li>Typing speed is displayed as a chart</li>
                    <li>Calculation of best and average typing speed</li>
                    <li>Ability to delete selected typing attempts</li>
                </ul>
                <li>Touch Typing Cheat Sheet</li>
                <ul>
                    <li>Tips on Touch Typing</li>
                </ul>
            </ul>
            <h2>API</h2>
            <p>Data is taken from public Api: <a href="https://sampleapis.com/api-list/typer" target="_blank">Sample
                APIs: Typer</a>.</p>
            <p style={{color: "blue"}}>*currently API's down. So data is statically set*</p>
            <h2>Source Code</h2>
            <p>Source code of this project is placed on <a href="https://github.com/elizzaveta/TouchTyping"
                                                           target="_blank">GitHub</a>.</p>
            <h2>Deployment</h2>
            <p>This page is deployed on Vercel.</p>
        </div>
    )
}