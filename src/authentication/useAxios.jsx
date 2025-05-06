// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import config from "../configs/config";
// import { useContext } from "react";
// import AuthContext from "./AuthContext";

// const baseURL = "http://localhost:8000/";

// const useAxios = () => {
//   // const { authTokens, setAuthTokens, setUser } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL: baseURL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authTokens?.accessToken}`,
//     },
//   });

//   axiosInstance.interceptors.request.use(async (request) => {
//     const decodedToken = jwtDecode(authTokens.accessToken);
//     const isTokenExpired = decodedToken.exp * 1000 < Date.now();

//     if (!isTokenExpired) return request;

//     try {
//       const response = await axios.post(
//         `${baseURL}${config.apis.auth.base}/${config.apis.auth.endpoints.refresh}`,
//         {
//           refreshToken: authTokens.refreshToken,
//         }
//       );

//       if (response.status === 201) {
//         const newAuthTokens = response.data;
//         localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));
//         setAuthTokens(newAuthTokens);
//         setUser(jwtDecode(newAuthTokens.accessToken));
//       } else {
//         handleRefreshError(response);
//       }
//     } catch (error) {
//       return handleRefreshError(error);
//     }

//     request.headers.Authorization = `Bearer ${authTokens.accessToken}`;

//     return request;
//   });

//   return axiosInstance;
// };

// const handleRefreshError = (error) => {
//   console.error("Error refreshing token: ", error);
//   alert("Session expired. Please log in again.");
//   localStorage.clear();
//   setAuthTokens(null);
//   setUser(null);
//   window.location.href = "/login"; // Redirect to login page
//   return Promise.reject(error);
// };

// export default useAxios;
