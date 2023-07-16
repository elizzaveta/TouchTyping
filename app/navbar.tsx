'use client'
import Link from "next/link";
import styles from "./navbar.module.css"
import {usePathname} from "next/navigation";
import {routesNames} from "@/consts/routesNames";

function Navbar() {
    const pathname = usePathname();

    return (
        <header className={styles.wrapper}>
            <Link href="/">
                <h2 className={styles.name}>Typer</h2>
                <p className={styles.description}>Touch Typing Practice</p>
            </Link>
            <div className={styles.nav}>
                {routesNames.map((route)=>{
                    return(
                        <Link href={route.path}  className={pathname===route.path? styles.activePage : ''}><b>{route.title}</b></Link>
                    )
                })}
            </div>
        </header>
    );
}

export default Navbar;