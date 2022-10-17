import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from '../features/courses/coursesSlice'
import solutionsReducer from '../features/solutions/solutionsSlice'

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        solutions: solutionsReducer
    }
})
