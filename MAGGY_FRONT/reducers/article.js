import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { categorie : '', marque : '', etat:'', couleur: '', matiere:''}
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        addPhoto: (state, action) => {
            state.value = action.payload 
        },
        removePhoto: (state, action) => {
            state.value = null
        },
        importPhoto: (state, action) => {
            state.import = action.payload
        }
    }
})

export const { addPhoto, removePhoto, importPhoto} = articleSlice.actions
export default articleSlice.reducer