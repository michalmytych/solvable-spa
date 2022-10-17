import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAll as getAllCourses } from "./coursesApi"

const initialState = {
  courses: [],
  status: 'idle',
  error: null
}

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await getAllCourses()
  return [...response.data]
})

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedCourses = action.payload
        state.courses = state.courses.concat(loadedCourses)
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllCourses = (state) => state.courses.courses
export const getCoursesStatus = (state) => state.courses.status
export const getCoursesError = (state) => state.courses.error

export const { courseAdded } = coursesSlice.actions

export default coursesSlice.reducer
