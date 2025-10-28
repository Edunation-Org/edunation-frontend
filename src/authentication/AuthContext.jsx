import config from "../configs/config";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() => {
    const authTokens = localStorage.getItem("authTokens");
    if (!authTokens) return null;

    try {
      return jwtDecode(JSON.parse(authTokens).accessToken);
    } catch (error) {
      console.error("Invalid access token: ", error);
      localStorage.removeItem("authTokens");
      return null;
    }
  });

  let Navigate = useNavigate();

  let login = async (formData) => {
    let response = await axiosInstance.post(
      `${config.apis.auth.base}/${config.apis.auth.endpoints.login}`,
      formData,
      {
        meta: { isPublic: true },
      }
    );

    if (response.status === 201) {
      const decodedToken = jwtDecode(response.data.accessToken);

      setAuthTokens(response.data);
      setUser(decodedToken);

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      if (decodedToken.isProfileComplete) {
        return {
          loggedIn: true,
          isProfileComplete: true,
          message: "Login successful!",
        };
      } else {
        return {
          loggedIn: true,
          isProfileComplete: false,
          message: "Login successful!",
        };
      }
    }
  };

  let signup = async (formData) => {
    let response = await axiosInstance.post(
      `${config.apis.auth.base}/${config.apis.auth.endpoints.signup}`,
      formData,
      {
        meta: { isPublic: true },
      }
    );
    if (response.status === 201) {
      return login({
        username: formData.email,
        password: formData.password,
      });
    }
  };

  let logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.clear();
    Navigate("/login");
  };

  let forgotPassword = async (email) => {
    let response = await axiosInstance.post(
      `${config.apis.auth.base}/${config.apis.auth.endpoints.forgotPassword}`,
      {
        email: email,
      },
      { meta: { isPublic: true } }
    );
    if (response.status === 201) {
      alert("Password reset link sent to your email");
      console.log(response);
    } else {
      window.alert(response.data.detail);
    }
  };

  let resetPassword = async (token, newPassword) => {
    let response = await axiosInstance.patch(
      `${config.apis.auth.base}/${config.apis.auth.endpoints.resetPassword}/?token=${token}`,
      {
        newPassword: newPassword,
      },
      {
        meta: { isPublic: true },
      }
    );

    if (response.status === 200) {
      alert("Password reset successfully");
      Navigate("/login");
    }

    if (response.status === 201) {
      window.alert(response.data.detail);
    } else {
      window.alert(response.data.detail);
    }
  };

  let completeProfile = async (formData) => {
    let response = await axiosInstance.post(
      `${config.apis.auth.base}/${config.apis.auth.endpoints.completeProfile}`,
      formData
    );
    if (response.status === 201) {
      setUser({
        ...user,
        isProfileComplete: true,
      });
      return { successful: true, message: "Thank you!" };
    }
  };

  let contextData = {
    login: login,
    signup: signup,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    completeProfile: completeProfile,
    user: user,
    setUser: setUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
