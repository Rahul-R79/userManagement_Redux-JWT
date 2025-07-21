import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state)=>{
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginFailure: (state, action)=>{
            state.error = action.payload;
            state.loading = false
        }
    }
});

export const {loginUser, loginSuccess, loginFailure} = userSlice.actions;
export default userSlice.reducer;