import {combineReducers} from "redux";
import lessonSlice from "@/redux/lessonSlice";

export const rootReducer = combineReducers({
    currentLesson: lessonSlice
})