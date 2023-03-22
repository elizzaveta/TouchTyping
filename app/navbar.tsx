import Link from "next/link";
import styles from "./navbar.module.css"

function Navbar() {
    return (
        <header className={styles.wrapper}>
            <Link href="/">
                <h2 className={styles.name}>Typer</h2>
                <p className={styles.description}>Touch Typing Practice</p>
            </Link>
            <div className={styles.nav}>
                <Link href="/"><b>Home</b></Link>
                <Link href="/cheat-sheet"><b>CheatSheet</b></Link>
                <Link href="/about"><b>About</b></Link>
                <Link href="/progress"><b>Progress</b></Link>
            </div>
        </header>
    );
}

export default Navbar;