import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAll as getAllSolutions } from "./solutionsApi"

const initialState = {
  solutions: [],
  status: 'idle',
  error: null
}

export const fetchSolutions = createAsyncThunk('solutions/fetchSolutions', async () => {
  const response = await getAllSolutions()
  // 'solutions' is object with pagination so i should find a way to 
  // overwirte it completetely
  return [...response.data.data]
})

const solutionsSlice = createSlice({
  name: 'solutions',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchSolutions.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchSolutions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedSolutions = action.payload
        state.solutions = state.solutions.concat(loadedSolutions)
      })
      .addCase(fetchSolutions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllSolutions = (state) => state.solutions.solutions
export const getSolutionsStatus = (state) => state.solutions.status
export const getSolutionsError = (state) => state.solutions.error

export const { solutionAdded } = solutionsSlice.actions

export default solutionsSlice.reducer
