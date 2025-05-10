import { useContext, useState } from "react";
import AuthContext from "../../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext);

  let Navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

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
        if (result.isProfileComplete) {
          setLoading(false);
          Navigate("/");
        } else {
          setLoading(false);
          Navigate("/complete-profile");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errorDetails.code === "INVALID_CREDENTIALS") {
        setError("Invalid username or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="sign-in-form">
        <h2 className="title">Login</h2>
        {error && <p className="error-message">{error}</p>}

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
        <p>
          Welcome back. Let’s keep learning and growing — together.
        </p>
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
