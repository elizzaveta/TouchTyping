import { Inter } from 'next/font/google'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <h1>Progress page</h1>
            <p>This page is still in progress</p>
        </>
    )
}
