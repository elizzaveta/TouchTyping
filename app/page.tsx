import { Inter } from 'next/font/google'
import styles from './page.module.css'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <main>
        <h1>Home page</h1>
      </main>
  )
}
