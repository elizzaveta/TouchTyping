import Link from "next/link";
import styles from "./navbar.module.css"

function Navbar() {
    return (
        <header className={styles.wrapper}>
            <h2 className={styles.name}>Typer</h2>
            <div className={styles.nav}>
                <Link href="/"><b>Home</b></Link>
                <Link href="/about"><b>About</b></Link>
                <Link href="/progress"><b>Progress</b></Link>
            </div>
        </header>
    );
}

export default Navbar;