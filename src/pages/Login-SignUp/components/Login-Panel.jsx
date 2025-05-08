import image from "../images/log.svg";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";

function LoginPanel() {
  return (
    <div className="panel left-panel">
      <div className="content">
        <h3 style={{ color: "#FAFAFA" }}>New to EDUNATIONAL LEARNING ACADEMY? Let’s Launch Your Learning Journey.</h3>
        <p style={{ color: "#FAFAFA" }}>
          Whether you're catching up, getting ahead, or exploring your passion — we’re here to support you with personalized, high-quality tutoring. Especially for students who need it most.
        </p>
        <button className="panel-btn" id="sign-up-btn">
          <p>Sign up</p>
          <ArrowLongRightIcon className="signUpIcon panel-btn-icon" />
        </button>
      </div>
      <img src={image} className="image" alt="" />
    </div>
  );
}

export default LoginPanel;
