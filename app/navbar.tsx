import Link from "next/link";

function Navbar() {
    return (
        <header>
            <h2>Typer</h2>
            <div>
                <Link href="/"><p>Home</p></Link>
                <Link href="/about"><p>About</p></Link>
                <Link href="/progress"><p>Progress</p></Link>
            </div>
        </header>
    );
}

export default Navbar;