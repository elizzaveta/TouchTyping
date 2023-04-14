import {combineReducers} from "redux";
import lessonSlice from "@/app/redux/lessonSlice";

export const rootReducer = combineReducers({
    currentLesson: lessonSlice
})