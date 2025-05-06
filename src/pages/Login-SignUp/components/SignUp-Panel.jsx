import image from "../images/register.svg";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";

function SignUpPanel() {
  return (
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us ?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laboriosam ad deleniti.
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
