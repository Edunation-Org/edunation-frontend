import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "../configs/config";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
console.log("🚀 ~ baseURL:", baseURL);

const axiosInstance = axios.create({
  baseURL: `${baseURL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  if (request.meta?.isPublic) return request;

  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  // If no tokens exist, skip authentication for this request
  if (!authTokens || !authTokens.accessToken) {
    return request;
  }

  const decodedToken = jwtDecode(authTokens.accessToken);
  const isTokenExpired = decodedToken.exp * 1000 < Date.now();

  if (!isTokenExpired) {
    request.headers.Authorization = `Bearer ${authTokens.accessToken}`;
    return request;
  }
  try {
    const response = await axios.post(
      `${baseURL}/${config.apis.auth.base}/${config.apis.auth.endpoints.refresh}`,
      {
        refreshToken: authTokens.refreshToken,
      }
    );

    if (response.status === 201) {
      const newAuthTokens = response.data;
      localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
      authTokens = newAuthTokens;
    }
  } catch (error) {
    console.error("Error refreshing token: ", error);
    alert("Session expired. Please log in again.");
    localStorage.removeItem("authTokens");
    window.location.href = "/login"; // Redirect to login page
    return Promise.reject(error);
  }

  request.headers.Authorization = `Bearer ${authTokens.accessToken}`;

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
