import { useContext, useState } from "react";
import AuthContext from "../../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function LoginForm({ handleSnackbar }) {
  const { login } = useContext(AuthContext);

  let Navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData);
      if (result.loggedIn) {
        handleSnackbar(result.message || "Login successful");

        if (result.isProfileComplete) {
          setTimeout(() => {
            setLoading(false);
            Navigate("/");
          }, 2000);
        } else {
          setTimeout(() => {
            setLoading(false);
            Navigate("/complete-profile");
          }, 2000);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errorDetails.code === "INVALID_CREDENTIALS") {
        handleSnackbar(
          error.response?.data?.errorDetails.message ||
            "Login failed. Please try again."
        );
      } else {
        handleSnackbar("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="sign-in-form">
        <h2 className="title">Login</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            name="username"
            type="text"
            placeholder="Email or Phone Number"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {loading ? (
          <ClipLoader
            color="#41246D"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="syncloader"
            className="clip-loader"
          />
        ) : (
          <input type="submit" value="Login" className="form-btn" />
        )}
      </form>
      <button id="forgot-pass-btn">Forgot Password?</button>
    </>
  );
}

export default LoginForm;
