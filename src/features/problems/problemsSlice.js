import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAll as getAllProblems } from "./problemsApi"

const initialState = {
  problems: [],
  status: 'idle',
  error: null
}

export const fetchProblems = createAsyncThunk('problems/fetchProblems', async () => {
  const response = await getAllProblems()
  return response.data
})

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProblems.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedProblems = action.payload
        state.problems = loadedProblems
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllProblems = (state) => state.problems.problems
export const getProblemsStatus = (state) => state.problems.status
export const getProblemsError = (state) => state.problems.error

export const { problemAdded } = problemsSlice.actions

export default problemsSlice.reducer
