import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Load tokens from localStorage
const storedTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

const storedUser = storedTokens ? jwtDecode(storedTokens.access) : null;

// Async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("authTokens", JSON.stringify(data));
                return { tokens: data, user: jwtDecode(data.access) };
            } else {
                return rejectWithValue("Invalid Credentials");
            }
        } catch (error) {
            return rejectWithValue("Server error. Please try again later.");
        }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, username, password, password2 }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, password2 }),
            });

            const data = await response.json();

            if (response.status === 201) {
                return "Registration Successful! Login Now";
            } else {
                if (data.email) return rejectWithValue("User with this email already exists.");
                if (data.password) return rejectWithValue(data.password.join(" "));
                return rejectWithValue("Something went wrong. Please try again.");
            }
        } catch {
            return rejectWithValue("Server error. Please try again later.");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedUser,
        authTokens: storedTokens,
        loading: false,
        error: null,
        notification: null
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.authTokens = null;
            localStorage.removeItem("authTokens");
            state.notification = "You have been logged out.";
        },
        clearNotification: (state) => {
            state.notification = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authTokens = action.payload.tokens;
                state.user = action.payload.user;
                state.notification = "Login Successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.notification = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { logoutUser, clearNotification } = authSlice.actions;
export default authSlice.reducer;

