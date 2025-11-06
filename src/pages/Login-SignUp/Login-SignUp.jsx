import "./Login-SignUp.css";
import s from "./styles/Login-Form.module.css";
import { useContext, useRef, useState } from "react";
import LoginForm from "./components/Login-Form";
import SignUpForm from "./components/SignUp-Form";
import AuthContext from "../../authentication/AuthContext";
import { XMarkIcon } from "@heroicons/react/16/solid";

function Login() {
  const { forgotPassword } = useContext(AuthContext);
  const forgotPassContainerRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="container simple-layout">
      <h2 className="hero-btn">
        <a href="/">EDUNATIONAL LEARNING ACADEMY</a>
      </h2>

      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm />

          {/* simple divider */}
          <hr style={{ width: "60%", margin: "2rem auto", opacity: 0.3 }} />

          {/* sign-up placed below */}
          <SignUpForm />
        </div>
      </div>

      <div ref={forgotPassContainerRef} className={s.forgotPasswordContainer}>
        <div className={s.formContainer}>
          <div className={s.header}>
            <h2 className="titleFont">Forgot Password?</h2>
            <button id="close-btn" className={s.closeBtn}>
              <XMarkIcon className={s.icon} />
            </button>
          </div>
          <p>Please enter your email to reset your password.</p>
          <form onSubmit={handleForgotPassword} className={s.forgotPasswordForm}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={s.forgotPasswordInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={s.forgotPasswordBtn}>
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

