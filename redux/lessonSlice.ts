import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Progress} from "@/enums/ProgressEnum";
import {RootState} from "@/redux/store";

interface LessonState {
    progress: Progress,
    numOfTypedWords: number,
    totalNumOfWords: number,
    userInput: string,
    numOfErrors: number,
    startTime: number,
    endTime: number,
}

const initialState: LessonState = {
    progress: Progress.NOT_STARTED,
    numOfTypedWords: 0,
    totalNumOfWords: 1,
    userInput: '',
    numOfErrors: 0,
    startTime: 0,
    endTime: 0,
}

export const lessonSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // errors
        incrementNumOfErrors: state => {
            state.numOfErrors += 1
        },
        resetNumOfErrors: state => {
            state.numOfErrors = 0
        },
        // typed words
        incrementNumOfTypedWords: state => {
            state.numOfTypedWords += 1
        },
        resetNumOfTypedWords: state => {
            state.numOfTypedWords = 0
        },
        // total words
        setTotalNumOfWords: (state, action: PayloadAction<number>) => {
            state.totalNumOfWords = action.payload
        },
        // lesson progress
        setProgress: (state, action: PayloadAction<Progress>) => {
            state.progress = action.payload
        },
        // user input
        addToUserInput: (state, action: PayloadAction<string>) => {
            state.userInput += action.payload
        },
        backspaceUserInput:(state)=>{
            state.userInput = state.userInput.substring(0, state.userInput.length - 1)
        },
        resetUserInput: state => {
            state.userInput = ''
        },
        // start/end time
        setStartTime: (state, action: PayloadAction<number>) => {
            state.startTime = action.payload
        },
        setEndTime: (state, action: PayloadAction<number>) => {
            state.endTime = action.payload
        },
        // reset lesson
        resetState: state => {
            state.progress = Progress.NOT_STARTED;
            state.numOfTypedWords= 0;
            state.totalNumOfWords= 1;
            state.userInput= '';
            state.numOfErrors= 0;
            state.startTime= 0;
            state.endTime= 0;
        },

    }
})

export const {
    incrementNumOfTypedWords,
    resetNumOfTypedWords,
    setTotalNumOfWords,
    setProgress,
    addToUserInput,
    resetUserInput,
    backspaceUserInput,
    incrementNumOfErrors,
    resetNumOfErrors,
    setEndTime,
    setStartTime,
    resetState
} = lessonSlice.actions

export const selectLesson = (state: RootState) => state.currentLesson

export default lessonSlice.reducer