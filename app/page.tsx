import styles from './page.module.css'
import React from "react";
import LessonsList from "@/app/(typing-lessons)/lessons-list";
import Lesson from "@/app/(typing-lessons)/lesson";
import Test from "@/app/(typing-lessons)/test";

export default function Home() {
  return (
      <main>
          <div className={styles.wrapper}>
              <LessonsList/>
              <Lesson/>
              {/*<Test/>*/}
          </div>
      </main>
  )
}
