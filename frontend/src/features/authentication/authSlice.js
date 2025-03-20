import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: false, // false = logged out
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.authStatus = true;  // Update state
        },
        logout: (state) => {
            state.authStatus = false;
        },
    },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;