import styles from "./page.module.css"

export default function About() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>About this site</h1>
            <h2>Idea</h2>
            <p>Website is created for learning purposes: to practice NextJS. It is a Touch Typing Practice tool.</p>
            <h2>Features</h2>
            <ul>
                <li>Touch Typing Practice</li>
                <li>Progress Tracking</li>
                <li>Touch Typing Cheat Sheet</li>
            </ul>
            <h2>Technologies</h2>
            <ul>
                <li>ReactJS</li>
                <li>TypeScript</li>
                <li>NextJS</li>
                <li>CSS Modules</li>
                <li>LocalStorage</li>
            </ul>
            <h2>API</h2>
            <p>Data is taken from public Api: <a href="https://sampleapis.com/api-list/typer" target="_blank">Sample
                APIs: Typer</a>.</p>
            <h2>Source Code</h2>
            <p>Source code of this project is placed on <a href="https://github.com/elizzaveta/TouchTyping"
                                                           target="_blank">GitHub</a>.</p>
            <h2>Deployment</h2>
            <p>This page is deployed on Vercel.</p>
        </div>
    )
}