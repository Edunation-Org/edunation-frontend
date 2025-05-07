import "./Login-SignUp.css";
import s from "./styles/Login-Form.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import LoginForm from "./components/Login-Form";
import SignUpForm from "./components/SignUp-Form";
import LoginPanel from "./components/Login-Panel";
import SignUpPanel from "./components/SignUp-Panel";
import AuthContext from "../../authentication/AuthContext";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Login() {
  const { forgotPassword } = useContext(AuthContext);

  const containerRef = useRef(null);
  const forgotPassContainerRef = useRef(null);

  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  useEffect(() => {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");

    if (signInBtn && signUpBtn && containerRef.current) {
      const container = containerRef.current;

      const handleSignUpClick = () => container.classList.add("sign-up-mode");
      const handleSignInClick = () =>
        container.classList.remove("sign-up-mode");

      signUpBtn.addEventListener("click", handleSignUpClick);
      signInBtn.addEventListener("click", handleSignInClick);

      return () => {
        signUpBtn.removeEventListener("click", handleSignUpClick);
        signInBtn.removeEventListener("click", handleSignInClick);
      };
    }
  }, []);

  useEffect(() => {
    const forgotPassBtn = document.getElementById("forgot-pass-btn");
    const closeBtn = document.getElementById("close-btn");

    if (forgotPassBtn && closeBtn && forgotPassContainerRef.current) {
      const forgotPassContainer = forgotPassContainerRef.current;

      const handleForgotPassClick = () =>
        forgotPassContainer.classList.add(s.active);

      const handleCloseClick = () =>
        forgotPassContainer.classList.remove(s.active);

      forgotPassBtn.addEventListener("click", handleForgotPassClick);
      closeBtn.addEventListener("click", handleCloseClick);

      return () => {
        forgotPassBtn.removeEventListener("click", handleForgotPassClick);
        closeBtn.removeEventListener("click", handleCloseClick);
      };
    }
  }, []);

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
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div ref={containerRef} className="container">
        <h2 className="hero-btn">
          <a href="/">Edunation</a>
        </h2>
        <div className="forms-container">
          <div className="signin-signup">
            <LoginForm handleSnackbar={handleSnackbar} />
            <SignUpForm handleSnackbar={handleSnackbar} />
          </div>
        </div>

        <div className="panels-container">
          <LoginPanel />
          <SignUpPanel />
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
            <form
              onSubmit={handleForgotPassword}
              className={s.forgotPasswordForm}
            >
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
    </>
  );
}

export default Login;
