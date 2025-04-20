import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../features/authentication/authSlice"; // Import logout action from your Redux slice
import { store } from "../app/store"; // Import your Redux store

const baseURL = "https://auctionhub.pythonanywhere.com/api/";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(async (config) => {
    let authTokens = store.getState().auth.authTokens; // Get tokens from Redux state

    if (authTokens) {
        const decodedToken = jwtDecode(authTokens.access);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
            try {
                // Attempt to refresh the token
                const response = await axios.post(`${baseURL}token/refresh/`, {
                    refresh: authTokens.refresh,
                });

                authTokens = {
                    access: response.data.access,
                    refresh: authTokens.refresh,
                };

                localStorage.setItem("authTokens", JSON.stringify(authTokens)); // Save new token
                config.headers["Authorization"] = `Bearer ${authTokens.access}`;
            } catch (error) {
                store.dispatch(logoutUser()); // Logout user if refresh fails
                return Promise.reject(error);
            }
        } else {
            config.headers["Authorization"] = `Bearer ${authTokens.access}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
