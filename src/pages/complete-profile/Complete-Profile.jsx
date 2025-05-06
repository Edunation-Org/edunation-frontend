import React, { useContext, useState, useEffect } from "react";
import s from "./Complete-Profile.module.css";
import AuthContext from "../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { State, City } from "country-state-city";
import { toTitleCase } from "../../global/utilities/to-title-case";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const gradeLevels = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "College",
  "Adult Learner",
];

const contactMethods = ["Call", "Text", "Email"];

export default function CompleteProfile() {
  const { completeProfile } = useContext(AuthContext);

  let Navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: {
      city: "",
      state: "",
    },
    guardianName: "",
    birthDate: "",
    preferredContactMethod: "Email",
    gradeLevel: "",
    schoolName: "",
  });

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
    const usStates = State.getStatesOfCountry("US");
    setStates(usStates);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      const cities = City.getCitiesOfState("US", value);
      setCities(cities);

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          state: value,
          city: "", // reset city when state changes
        },
      }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          city: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formattedData = {
      ...formData,
      firstName: toTitleCase(formData.firstName),
      lastName: toTitleCase(formData.lastName),
      guardianName: toTitleCase(formData.guardianName),
    };

    try {
      const result = await completeProfile(formattedData);

      if (result.successful) {
        handleSnackbar(result.message);
        setTimeout(() => {
          setLoading(false);
          Navigate("/profile/dashboard");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      handleSnackbar("Profile completion failed. Please try again.");
    }
  };

  const birthDate = new Date(formData.birthDate);
  const ageLimit = new Date();
  ageLimit.setFullYear(ageLimit.getFullYear() - 18);

  const isUnderage = birthDate > ageLimit;

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.address.city &&
    formData.address.state &&
    formData.birthDate &&
    formData.gradeLevel &&
    (!isUnderage || formData.guardianName);

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
      <div className={s.completeProfileContainer}>
        <h2>Help us get to know you better!</h2>
        <form onSubmit={handleSubmit} className={s.completeProfileForm}>
          <div className={s.nameInputs}>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="state"
            value={formData.address.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            required
            disabled={!formData.address.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            name="guardianName"
            placeholder="Guardian Name (required if under 18)"
            value={formData.guardianName}
            onChange={handleChange}
            {...(formData.birthDate <
            new Date().setFullYear(new Date().getFullYear() - 18)
              ? { required: true }
              : {})}
          />
          <input
            name="schoolName"
            placeholder="School Name (optional)"
            value={formData.schoolName}
            onChange={handleChange}
          />
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          <div>
            <label>
              <h3>Preferred Contact Method:</h3>
            </label>
            <div className={s.contactMethodContainer}>
              {contactMethods.map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value={method}
                    checked={formData.preferredContactMethod === method}
                    onChange={handleChange}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className={s.gradeLevelContainer}>
            <label>
              <h3>Grade Level:</h3>
            </label>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              required
              style={{ marginTop: "0.5rem", padding: "0.5rem" }}
            >
              <option value="">Select Grade Level</option>
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <ClipLoader
              color="#41246D"
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="syncloader"
              className="clip-loader center"
            />
          ) : (
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
