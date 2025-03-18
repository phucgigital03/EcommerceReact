import axios from "axios";
import { useSelector } from "react-redux";

// const token = localStorage.getItem("token") 

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials: true,
    // Nếu API backend của bạn sử dụng JWT lưu trong HttpOnly Cookies,
    // thì withCredentials: true giúp trình duyệt tự động gửi cookie
    // khi request.
    // headers: {
    //     Authorization: `Bearer ${}`, // Lấy token từ localStorage
    //     "Content-Type": "application/json",
    // },
})

// Thêm Interceptor để gắn Authorization header vào mọi request
api.interceptors.request.use(
    (config) => {
        const { jwtToken } = JSON.parse(localStorage.getItem("auth") || "{}");
        
        console.log("jwtToken: ",jwtToken)
        if (jwtToken) {
            config.headers["Authorization"] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, // Pass successful responses
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            // Handle Unauthorized (401) Errors
            if (status === 401) {
                console.error("Unauthorized:", data.message);
                if(data.message === "User not found with username: anonymousUser"){
                    window.location.href = "/login";
                    localStorage.removeItem("auth");
                }
                return Promise.reject(new Error("Unauthorized - Redirecting to login."));
            }

            // Handle Forbidden (403) Errors (if needed)
            if (status === 403) {
                console.warn("Forbidden:", data.message);
                return Promise.reject(new Error("Access Denied."));
            }

            // Handle Other Errors
            return Promise.reject(error);
        }

        // Handle Network Errors (no response from server)
        if (error.request) {
            console.error("Network Error:", error.message);
            return Promise.reject(new Error("Network error - Please try again."));
        }

        //Handle Unexpected Errors
        console.error("Unexpected Error:", error.message);
        return Promise.reject(error);
    }
);

export default api;

