import { useContext, useState } from "react";
import AuthContext from "../../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (phoneNumber) =>
    /^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber);

  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear field-specific error on input
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
    setErrorMessage("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const { email, phoneNumber, password } = formData;
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Validate inputs
    let newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber =
        "Invalid phone number format. Use (999) 999-9999.";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
      return;
    }

    try {
      const result = await signup({
        ...formData,
        phoneNumber: cleanedPhoneNumber,
      });

      if (result.loggedIn) {
        setLoading(false);
        navigate("/complete-profile");
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errorDetails.code === "USER_ALREADY_EXISTS") {
        setErrorMessage(
          error.response.data.errorDetails.message || "User already exists."
        );
      } else {
        setErrorMessage("Sign-up failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="sign-up-form">
      <h2 className="title">Sign up</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {errors.email && <small className="error-message">{errors.email}</small>}

      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
      </div>
      {errors.phoneNumber && (
        <small className="error-message">{errors.phoneNumber}</small>
      )}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <InputMask
          id="phoneNumber"
          mask="(999) 999-9999"
          value={formData.phoneNumber}
          onChange={handleChange}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="tel"
              placeholder="Phone Number"
              className={errors.phoneNumber ? "error" : ""}
            />
          )}
        </InputMask>
      </div>
      {errors.password && (
        <small className="error-message">{errors.password}</small>
      )}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
      </div>

      {loading ? (
        <ClipLoader color="#97A4F7" loading={loading} className="clip-loader" />
      ) : (
        <input
          type="submit"
          value="Sign Up"
          className="form-btn"
          disabled={
            !formData.email || !formData.phoneNumber || !formData.password
          }
        />
      )}
    </form>
  );
}

export default SignUpForm;
