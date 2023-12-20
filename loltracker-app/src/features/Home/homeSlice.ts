import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeState {
  name: string
}

const initialState: HomeState = {
  name: ''
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { setName } = homeSlice.actions

export default homeSlice.reducer