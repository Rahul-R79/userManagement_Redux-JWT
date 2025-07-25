//redux user state management slice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loginLoading: false,
    loginError: false,
    updateLoading: false,
    updateError: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state)=>{
            state.loginLoading = true;
            state.loginError = false;
        },
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loginLoading = false;
            state.loginError = false;
        },
        loginFailure: (state, action)=>{
            state.loginError = action.payload;
            state.loginLoading = false
        },
        resetError: (state)=>{
            state.loginError = false;
            state.updateError = false;
        },
        userLogout: (state)=>{
            state.currentUser = null;
        },
        updateProfileStart: (state)=>{
            state.updateLoading = true;
            state.updateError = false;
        },
        updateProfile: (state, action)=>{
            if(state.currentUser){
                state.currentUser = {...state.currentUser, ...action.payload};
                state.updateLoading = false;
                state.updateError = false;
            }
        },
        updateProfileFailure: (state, action)=>{
            state.updateError = action.payload;
            state.updateLoading = false;
        }
    }
});

export const {loginUser, loginSuccess, loginFailure, updateProfile, updateProfileFailure, updateProfileStart, resetError, userLogout} = userSlice.actions;
export default userSlice.reducer;