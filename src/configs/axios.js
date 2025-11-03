// import the axios module
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/iraAPI",
    withCredentials: true //important so cookies are sent
})


// Automatically access the access token with each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


// Handle expired tokens and refresh automatically
api.interceptors.response.use((response) => response, async (error) => {

    const originalRequest = error.config

    // If the errors expires and we haven't retried It
    if (error.response?.status === 401 && !originalRequest._retry) {
        // retry it, If It had been retired before we would not retry it
        originalRequest._retry = true

        try {
            // get the refresh token from localStorage
            // const refreshToken = localStorage.getItem("refreshToken")

            const res = await axios.post("http://localhost:5000/iraAPI/refresh", {
                // token: refreshToken
            },
            { withCredentials: true }
            )

            // get the new access token
            const newAccessToken = res.data.accessToken

            // save the new access token
            // localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("accessToken", newAccessToken)

            // attach the new token to the headers and retry the request
            // api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`
            // originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
            
            // retry the request
            return api(originalRequest)

        } catch (refreshError) {
            console.error("Refresh token failed", refreshError)
        }
    }

    return Promise.reject(error)

})


export default api