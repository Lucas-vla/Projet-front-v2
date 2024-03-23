import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, mail: null },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.mail = action.payload.mail;
          },

    }
})

export const {login} = userSlice.actions;
export default userSlice.reducer;