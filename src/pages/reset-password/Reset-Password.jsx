import s from "./Reset-Password.module.css";
import GradientBg from "./components/GradientBg.tsx";
import { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../../authentication/AuthContext.jsx";

export default function ResetPassword() {
  const { resetPassword } = useContext(AuthContext);

  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const token = searchParams.get("token");

      await resetPassword(token, formData.newPassword);
    } catch (error) {
      console.error("Reset Password Failed. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.resetPasswordContainer}>
      <form onSubmit={handleSubmit} className={s.resetPasswordForm}>
        <h1>Reset Password</h1>
        <label>
          <h2>New Password</h2>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
          />
        </label>
        <label>
          <h2>Confirm Password</h2>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
        </label>
        {loading ? (
          <ClipLoader
            color="#41246D"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="syncloader"
            className="clip-loader center"
          />
        ) : (
          <button type="submit" className={s.resetPasswordBtn}>
            Reset Password
          </button>
        )}
      </form>
      <div className={s.gradientBgContainer}>
        <GradientBg />
      </div>
    </div>
  );
}
