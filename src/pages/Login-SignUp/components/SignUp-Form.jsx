import { useContext, useState } from "react";
import AuthContext from "../../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

function SignUpForm({ handleSnackbar }) {
  const { signup } = useContext(AuthContext);

  let Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanedPhoneNumber = formData.phoneNumber.replace(/\D/g, "");
      const result = await signup({
        ...formData,
        phoneNumber: cleanedPhoneNumber,
      });

      if (result.loggedIn) {
        handleSnackbar(result.message || "Sign up successful!");
        setTimeout(() => {
          setLoading(false);
          Navigate("/complete-profile");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errorDetails.code === "USER_ALREADY_EXISTS") {
        handleSnackbar(
          error.response?.data?.errorDetails.message || "User already exists."
        );
      } else {
        handleSnackbar("Sign-up failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="sign-up-form">
      <h2 className="title">Sign up</h2>

      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <InputMask
          id="phoneNumber"
          mask="(999) 999-9999"
          value={formData.phoneNumber}
          onChange={handleChange}
        >
          {(inputProps) => (
            <input {...inputProps} type="tel" placeholder="Phone Number" />
          )}
        </InputMask>
      </div>

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {loading ? (
        <ClipLoader
          color="#97A4F7"
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="syncloader"
          className="clip-loader"
        />
      ) : (
        <input type="submit" value="Sign Up" className="form-btn" />
      )}
    </form>
  );
}

export default SignUpForm;
