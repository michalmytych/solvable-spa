import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from '../features/courses/coursesSlice'
import solutionsReducer from '../features/solutions/solutionsSlice'
import problemsReducer from '../features/problems/problemsSlice'
import languagesReducer from '../features/languages/languagesSlice'

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        problems: problemsReducer,
        solutions: solutionsReducer,
        languages: languagesReducer
    }
})
