import axios from "axios";
import { handleLogOut } from "../store/actions";

// const token = localStorage.getItem("token")

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
  // Nếu API backend của bạn sử dụng JWT lưu trong HttpOnly Cookies,
  // thì withCredentials: true giúp trình duyệt tự động gửi cookie
  // khi request.
});

// Thêm Interceptor để gắn Authorization header vào mọi request
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const { jwtToken } = JSON.parse(localStorage.getItem("auth") || "{}");
    console.log("jwtToken: ", jwtToken);
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// handle refresh token for multiple times
let refreshTokenPromise = null;

// Goi api refresh token voi refreshToken da dinh o cookie
const callRefreshTokenApi = async () => {
  const result = await api.get("/auth/token/refresh");
  return result;
};

api.interceptors.response.use(
  (response) => {
    // Any status codes that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    if (error.response) {
      // Any status codes that fall outside the range of 2xx cause this function to trigger
      // Do something with response data
      const { status, data } = error.response;
      // Handle Unauthorized (401) Errors
      if (status === 401) {
        console.error("Unauthorized:", data.message);
        // await handleLogOut();
        // localStorage.removeItem("auth");
        // window.location.href = "/login";
        return Promise.reject(
          new Error("Unauthorized - Redirecting to login.")
        );
      }

      // Handle Gone (410) to refresh token
      const originalRequest = error.config;
      console.log("original request: ", originalRequest);
      if (status === 410 && !originalRequest._retry) {
        // Gan them retry=true trong khoang thoi gian waiting
        // de viec refresh token nay chi lun goi 1 lan tai 1 thoi diem
        originalRequest._retry = true;

        if (!refreshTokenPromise) {
          // hold on with some API that is called after
          refreshTokenPromise = callRefreshTokenApi()
            .then((result) => {
              const { data } = result;
              const accessToken = data.accesstoken;
              console.log("Refresh token with new accesstoken: ", accessToken);
              // set localStore
              const auth = JSON.parse(localStorage.getItem("auth") || "{}");
              const newAuth = {
                ...auth,
                jwtToken: accessToken,
              };
              localStorage.setItem("auth", JSON.stringify(newAuth));
              // set for request
              api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            })
            .catch((_error) => {
              console.log("Refresh token fetch failed: ", _error);
              return Promise.reject(_error);
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }

        return refreshTokenPromise.then(() => {
          // call some APIs again
          return api(originalRequest);
        });
      }

      // Handle Forbidden (403) Errors (if needed)
      if (status === 403) {
        console.warn("Forbidden:", data.message);
        return Promise.reject(new Error("Access Denied."));
      }

      // Handle Bad Request (400) Errors (if needed)
      if (status === 400) {
        localStorage.removeItem("auth");
        window.location.href = "/login";
        return Promise.reject(
          new Error("Unauthorized - Redirecting to login.")
        );
      }

      // Handle Other Errors
      return Promise.reject(error);
    }

    // Handle Network Errors (no response from server)
    console.log(error.request);
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
