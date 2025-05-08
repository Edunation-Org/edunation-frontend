import image from "../images/register.svg";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";

function SignUpPanel() {
  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>Already with EDUNATIONAL LEARNING ACADEMY?</h3>
        <p>
          Welcome back to your learning community. Let’s pick up right where you left off and keep working toward your goals.
        </p>
        <button className="panel-btn" id="sign-in-btn">
          <ArrowLongLeftIcon className="signInIcon panel-btn-icon" />
          <p>Login</p>
        </button>
      </div>
      <img src={image} className="image" alt="" />
    </div>
  );
}

export default SignUpPanel;
