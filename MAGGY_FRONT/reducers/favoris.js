import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
}

export const favorisSlice = createSlice({
    name: 'favoris',
    initialState,
    reducers: {
        addFavoris: (state, action) => {
            state.value.push(action.payload)
        },
        removeFavoris: (state, action) => {
            state.value = state.value.filter(favoris => favoris.titre !== action.payload.titre)
        }
    }
})

export const { addFavoris, removeFavoris} = favorisSlice.actions
export default favorisSlice.reducer