import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAll as getAllLanguages } from "./languagesApi"

const initialState = {
  languages: [],
  status: 'idle',
  error: null
}

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  const response = await getAllLanguages()
  return response.data
})

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchLanguages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const loadedLanguages = action.payload
        state.languages = loadedLanguages
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllLanguages = (state) => state.languages.languages
export const getLanguagesStatus = (state) => state.languages.status
export const getLanguagesError = (state) => state.languages.error

export const { problemAdded } = languagesSlice.actions

export default languagesSlice.reducer
